<?php

namespace App\Console\Commands;

use App\Models\Event;
use App\Models\Notification;
use App\Models\Registration;
use App\Models\Team;
use App\Models\TeamJoinRequest;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ImportMongoExport extends Command
{
    protected $signature = 'mongo:import {path=storage/app/mongo_export : Directory containing the exported *.json collection files}';

    protected $description = 'Import the legacy MongoDB JSON export into the MySQL schema';

    /** @var array<string,int> old Firebase-style user _id/uid => new users.id */
    private array $userIdMap = [];

    /** @var array<string,int> old event _id string => new events.id */
    private array $eventIdMap = [];

    public function handle(): int
    {
        $path = base_path($this->argument('path'));

        if (!is_dir($path)) {
            $this->error("Directory not found: {$path}");
            return self::FAILURE;
        }

        DB::transaction(function () use ($path) {
            $this->importUsers($path);
            $this->importEvents($path);
            $this->importTeams($path);
            $this->importRegistrations($path);
            $this->importNotifications($path);
        });

        $this->newLine();
        $this->info('Import complete.');
        $this->table(['Table', 'Rows'], [
            ['users', User::count()],
            ['events', Event::count()],
            ['teams', Team::count()],
            ['team_members', TeamMember::count()],
            ['team_join_requests', TeamJoinRequest::count()],
            ['registrations', Registration::count()],
            ['notifications', Notification::count()],
        ]);

        return self::SUCCESS;
    }

    private function loadJson(string $path, string $file): array
    {
        $full = rtrim($path, '/') . '/' . $file;
        if (!file_exists($full)) {
            return [];
        }
        return json_decode(file_get_contents($full), true) ?? [];
    }

    /** Read a field trying both camelCase and snake_case keys (the export mixes both). */
    private function field(array $doc, string $camel, string $snake, $default = null)
    {
        if (array_key_exists($camel, $doc) && $doc[$camel] !== null) {
            return $doc[$camel];
        }
        if (array_key_exists($snake, $doc) && $doc[$snake] !== null) {
            return $doc[$snake];
        }
        return $default;
    }

    private function mongoDate($value): ?Carbon
    {
        if (!$value) {
            return null;
        }
        $millis = $value['$date']['$numberLong'] ?? null;
        if ($millis === null) {
            return null;
        }
        return Carbon::createFromTimestampMs((int) $millis);
    }

    /**
     * A handful of legacy team docs have their embedded leader/members/pendingMembers
     * fields double-encoded as JSON strings instead of native arrays/objects.
     */
    private function decodeEmbedded($value)
    {
        if (is_string($value)) {
            return json_decode($value, true) ?? $value;
        }
        return $value;
    }

    private function docId($doc): string
    {
        $id = $doc['_id'] ?? null;
        if (is_array($id)) {
            return $id['$oid'] ?? '';
        }
        return (string) $id;
    }

    private function importUsers(string $path): void
    {
        $users = $this->loadJson($path, 'users.json');
        $this->info('Importing ' . count($users) . ' users...');

        foreach ($users as $doc) {
            $oldId = $this->docId($doc);
            $uid = $this->field($doc, 'uid', 'uid') ?? $oldId;

            $user = User::create([
                'uid' => $uid,
                'name' => $this->field($doc, 'name', 'name', 'Unknown'),
                'email' => $doc['email'],
                'email_verified_at' => $this->mongoDate($this->field($doc, 'email_verified_at', 'email_verified_at')),
                'password' => $doc['password'] ?? null,
                'phone' => $this->field($doc, 'phone', 'phone'),
                'bio' => $this->field($doc, 'bio', 'bio'),
                'course' => $this->field($doc, 'course', 'course'),
                'year' => $this->field($doc, 'year', 'year'),
                'tech_skills' => $this->field($doc, 'techSkills', 'tech_skills'),
                'role' => $this->field($doc, 'role', 'role', 'participant'),
                'avatar' => $this->field($doc, 'avatar', 'avatar'),
                'oauth_providers' => $this->field($doc, 'oauthProviders', 'oauth_providers'),
            ]);

            $created = $this->mongoDate($this->field($doc, 'createdAt', 'created_at'));
            $updated = $this->mongoDate($this->field($doc, 'updatedAt', 'updated_at'));
            if ($created || $updated) {
                $user->timestamps = false;
                $user->created_at = $created ?? $user->created_at;
                $user->updated_at = $updated ?? $user->updated_at;
                $user->save();
            }

            $this->userIdMap[$oldId] = $user->id;
            if ($uid !== $oldId) {
                $this->userIdMap[$uid] = $user->id;
            }
        }
    }

    private function importEvents(string $path): void
    {
        $events = $this->loadJson($path, 'events.json');
        $this->info('Importing ' . count($events) . ' events...');

        foreach ($events as $doc) {
            $oldId = $this->docId($doc);

            $event = Event::create([
                'title' => $doc['title'],
                'type' => $doc['type'],
                'date' => $doc['date'],
                'time' => $doc['time'],
                'description' => $doc['description'] ?? '',
                'status' => $this->field($doc, 'status', 'status', 'Upcoming'),
                'registered_count' => $this->field($doc, 'registeredCount', 'registered_count', 0),
                'team_count' => $this->field($doc, 'teamCount', 'team_count', 0),
            ]);

            $created = $this->mongoDate($this->field($doc, 'createdAt', 'created_at'));
            $updated = $this->mongoDate($this->field($doc, 'updatedAt', 'updated_at'));
            if ($created || $updated) {
                $event->timestamps = false;
                $event->created_at = $created ?? $event->created_at;
                $event->updated_at = $updated ?? $event->updated_at;
                $event->save();
            }

            $this->eventIdMap[$oldId] = $event->id;
        }
    }

    private function importTeams(string $path): void
    {
        $teams = $this->loadJson($path, 'teams.json');
        $this->info('Importing ' . count($teams) . ' teams...');

        $skipped = 0;

        foreach ($teams as $doc) {
            $oldEventId = $this->field($doc, 'eventId', 'event_id');
            $eventId = $this->eventIdMap[$oldEventId] ?? null;

            $leader = $this->decodeEmbedded($doc['leader'] ?? null);
            $leaderUid = $leader['uid'] ?? null;
            $leaderId = $leaderUid ? ($this->userIdMap[$leaderUid] ?? null) : null;

            if (!$eventId || !$leaderId) {
                $skipped++;
                continue;
            }

            try {
                DB::transaction(function () use ($doc, $eventId, $leaderId) {
                    $this->importOneTeam($doc, $eventId, $leaderId);
                });
            } catch (\Throwable $e) {
                $skipped++;
                $this->warn("  - skipped team \"{$doc['name']}\": {$e->getMessage()}");
            }
        }

        if ($skipped > 0) {
            $this->warn("Skipped {$skipped} team(s) with unresolvable references or constraint conflicts (likely stale dev/test data).");
        }
    }

    private function importOneTeam(array $doc, int $eventId, int $leaderId): void
    {
            $team = Team::create([
                'event_id' => $eventId,
                'name' => $doc['name'],
                'code' => $doc['code'],
                'leader_id' => $leaderId,
                'max_members' => $this->field($doc, 'maxMembers', 'max_members', 4),
                'project_link' => $this->field($doc, 'projectLink', 'project_link'),
                'project_submitted_at' => $this->mongoDate($this->field($doc, 'projectSubmittedAt', 'project_submitted_at')),
            ]);

            $created = $this->mongoDate($this->field($doc, 'createdAt', 'created_at'));
            $updated = $this->mongoDate($this->field($doc, 'updatedAt', 'updated_at'));
            if ($created || $updated) {
                $team->timestamps = false;
                $team->created_at = $created ?? $team->created_at;
                $team->updated_at = $updated ?? $team->updated_at;
                $team->save();
            }

            $memberUids = [];
            foreach ($this->decodeEmbedded($doc['members'] ?? []) as $member) {
                $mUid = $member['uid'] ?? null;
                $mId = $mUid ? ($this->userIdMap[$mUid] ?? null) : null;
                if (!$mId || isset($memberUids[$mId])) {
                    continue;
                }
                $memberUids[$mId] = true;
                TeamMember::create([
                    'team_id' => $team->id,
                    'user_id' => $mId,
                    'role' => $mId === $leaderId ? 'leader' : 'member',
                ]);
            }
            // Ensure the leader always has a membership row, even if `members` omitted them.
            if (!isset($memberUids[$leaderId])) {
                TeamMember::create([
                    'team_id' => $team->id,
                    'user_id' => $leaderId,
                    'role' => 'leader',
                ]);
            }

            foreach ($this->decodeEmbedded($doc['pendingMembers'] ?? []) as $pending) {
                $pUid = $pending['uid'] ?? null;
                $pId = $pUid ? ($this->userIdMap[$pUid] ?? null) : null;
                if (!$pId || isset($memberUids[$pId])) {
                    continue;
                }
                TeamJoinRequest::create([
                    'team_id' => $team->id,
                    'user_id' => $pId,
                ]);
            }
    }

    private function importRegistrations(string $path): void
    {
        $registrations = $this->loadJson($path, 'registrations.json');
        $this->info('Importing ' . count($registrations) . ' registrations...');

        $skipped = 0;

        foreach ($registrations as $doc) {
            $oldEventId = $this->field($doc, 'eventId', 'event_id');
            $oldUserId = $this->field($doc, 'userId', 'user_id');
            $eventId = $this->eventIdMap[$oldEventId] ?? null;
            $userId = $oldUserId ? ($this->userIdMap[$oldUserId] ?? null) : null;

            if (!$eventId || !$userId) {
                $skipped++;
                continue;
            }

            // A user can only register once per event (unique constraint); skip dupes.
            if (Registration::where('event_id', $eventId)->where('user_id', $userId)->exists()) {
                continue;
            }

            $registration = Registration::create([
                'event_id' => $eventId,
                'user_id' => $userId,
                'status' => $this->field($doc, 'status', 'status', 'registered'),
            ]);

            $created = $this->mongoDate($this->field($doc, 'createdAt', 'created_at'));
            $updated = $this->mongoDate($this->field($doc, 'updatedAt', 'updated_at'));
            if ($created || $updated) {
                $registration->timestamps = false;
                $registration->created_at = $created ?? $registration->created_at;
                $registration->updated_at = $updated ?? $registration->updated_at;
                $registration->save();
            }
        }

        if ($skipped > 0) {
            $this->warn("Skipped {$skipped} registration(s) with unresolvable event/user references.");
        }
    }

    private function importNotifications(string $path): void
    {
        $notifications = $this->loadJson($path, 'notifications.json');
        $this->info('Importing ' . count($notifications) . ' notifications...');

        $skipped = 0;
        $rows = [];

        foreach ($notifications as $doc) {
            $oldUserId = $this->field($doc, 'userId', 'user_id');
            $userId = null;
            if ($oldUserId && $oldUserId !== 'admin') {
                $userId = $this->userIdMap[$oldUserId] ?? null;
                if (!$userId) {
                    $skipped++;
                    continue;
                }
            }

            $defaultRole = $userId ? 'user' : 'admin';

            $created = $this->mongoDate($this->field($doc, 'createdAt', 'created_at')) ?? now();
            $updated = $this->mongoDate($this->field($doc, 'updatedAt', 'updated_at')) ?? $created;

            $rows[] = [
                'user_id' => $userId,
                'target_role' => $this->field($doc, 'targetRole', 'target_role', $defaultRole),
                'title' => $doc['title'] ?? '',
                'message' => $doc['message'] ?? '',
                'type' => $doc['type'] ?? 'info',
                'read' => (bool) ($doc['read'] ?? false),
                'link' => $doc['link'] ?? null,
                'created_at' => $created,
                'updated_at' => $updated,
            ];
        }

        foreach (array_chunk($rows, 500) as $chunk) {
            Notification::insert($chunk);
        }

        if ($skipped > 0) {
            $this->warn("Skipped {$skipped} notification(s) with unresolvable user references.");
        }
    }
}
