<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Team;
use App\Models\Event;
use App\Models\Notification;
use App\Models\User;

class TeamController extends Controller
{
    public function stream(Request $request)
    {
        $userId = $request->user()->id;
        
        return response()->stream(function () use ($userId, $request) {
            $lastHash = '';
            
            while (true) {
                if (connection_aborted()) {
                    break;
                }

                $query = Team::query();
                
                if ($request->has('eventId') && trim($request->eventId) !== '') {
                    $query->where('eventId', $request->eventId);
                }

                $teams = $query->get()->map(function ($team) use ($userId) {
                    return $this->formatTeam($team, $userId);
                });

                $currentHash = md5(json_encode($teams));
                
                if ($currentHash !== $lastHash) {
                    echo "data: " . json_encode($teams) . "\n\n";
                    ob_flush();
                    flush();
                    
                    $lastHash = $currentHash;
                }

                sleep(2);
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'Connection' => 'keep-alive',
        ]);
    }

    private function formatTeam($team, $userId)
    {
        // memberIds is an array of string UIDs
        $memberIds = $team->memberIds ?? [];
        $isMember = in_array((string)$userId, (array)$memberIds);
        
        $leaderUid = $team->leader['uid'] ?? null;
        $isLeader = $leaderUid == $userId;

        $leaderData = [
            'uid' => (string) $leaderUid,
            'name' => $team->leader['name'] ?? '',
        ];
        if ($isMember) {
            $leaderData['email'] = $team->leader['email'] ?? '';
        }

        $members = collect($team->members ?? [])->map(function ($m) use ($isMember, $leaderUid) {
            $data = [
                'uid' => (string) $m['uid'],
                'name' => $m['name'],
                'role' => $leaderUid == $m['uid'] ? 'leader' : 'member',
            ];
            if ($isMember) {
                $data['email'] = $m['email'] ?? '';
            }
            return $data;
        })->values();

        $safeTeam = [
            'id' => (string) $team->id,
            'name' => $team->name,
            'eventId' => (string) $team->eventId,
            'leader' => $leaderData,
            'members' => $members,
            'maxMembers' => $team->maxMembers ?? $team->max_members,
            'createdAt' => $team->created_at,
        ];

        if ($isMember) {
            $safeTeam['projectLink'] = $team->projectLink ?? $team->project_link;
            $safeTeam['code'] = $team->code;
            $safeTeam['memberIds'] = $memberIds;
            
            if ($isLeader) {
                $safeTeam['pendingMembers'] = collect($team->pendingMembers ?? [])->map(function($m) {
                    return [
                        'uid' => (string) $m['uid'],
                        'name' => $m['name'],
                        'email' => $m['email'] ?? '',
                    ];
                })->values();
            }
        }

        return $safeTeam;
    }

    public function index(Request $request)
    {
        $query = Team::query();
        
        if ($request->has('eventId') && trim($request->eventId) !== '') {
            $query->where('eventId', $request->eventId);
        }

        $teams = $query->get()->map(function ($team) use ($request) {
            return $this->formatTeam($team, $request->user()->id);
        });

        return response()->json($teams, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'eventId' => 'required',
            'maxMembers' => 'required|integer|min:2|max:10',
        ]);

        $userId = $request->user()->id;
        $eventId = $request->eventId;

        $lockKey = "team-create:{$eventId}:{$userId}";
        $lock = \Illuminate\Support\Facades\Cache::lock($lockKey, 10);

        try {
            if (!$lock->block(5)) {
                return response()->json(['error' => 'Too many requests. Please try again.'], 429);
            }

            // Check if user is already in a team (Approved)
            if (Team::where('memberIds', 'like', "%\"{$userId}\"%")->exists()) {
                throw new \Exception("409:You are already in a team. Leave your existing team to create a new one.");
            }

            $event = Event::find($eventId);
            if (!$event && $eventId != 1 && $eventId != 2) {
                throw new \Exception("404:Event not found");
            }

            // Check name uniqueness per event
            if (Team::where('eventId', $eventId)->where('name', $request->name)->exists()) {
                throw new \Exception("409:A team with this name already exists for this event.");
            }

            // Generate unique code
            do {
                $code = strtoupper(Str::random(6));
            } while (Team::where('code', $code)->exists());

            $team = new Team();
            $team->eventId = $eventId;
            $team->name = $request->name;
            $team->code = $code;
            $team->maxMembers = (int) $request->maxMembers;
            $team->leader = [
                'uid' => $userId,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
            ];
            $team->members = [
                [
                    'uid' => $userId,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                ]
            ];
            $team->memberIds = [$userId];
            $team->pendingMembers = [];
            $team->save();

            if ($event) {
                $event->increment('registeredCount');
                $event->increment('teamCount'); // Adjust based on exact MongoDB schema keys
            }

            Notification::create([
                'userId' => null, // null implies admin target
                'target_role' => 'admin',
                'title' => 'New Team Created',
                'message' => 'Team "' . $request->name . '" was just created by ' . $request->user()->name . '.',
                'type' => 'team_created',
                'link' => '/admin/teams',
            ]);

            return response()->json($this->formatTeam($team, $userId), 201);
        } catch (\Exception $e) {
            $message = $e->getMessage();
            if (str_contains($message, 'E11000 duplicate key error')) {
                return response()->json(['error' => 'You have already created a team for this event.'], 409);
            }
            if (str_contains($message, ':')) {
                [$status, $msg] = explode(':', $message, 2);
                return response()->json(['error' => $msg], (int) $status);
            }
            return response()->json(['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()], 500);
        } finally {
            optional($lock)->release();
        }
    }

    public function join(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'eventId' => 'required',
        ]);

        $userId = $request->user()->id;

        try {
            if (Team::where('memberIds', $userId)->exists()) {
                throw new \Exception("409:You are already in a team. Leave your existing team to join a new one.");
            }

            $team = Team::where('code', $request->code)
                ->where('eventId', $request->eventId)
                ->first();

            if (!$team) {
                throw new \Exception("404:Invalid join code or team not found for this event");
            }

            $currentMembers = count((array)$team->memberIds);
            if ($currentMembers >= ($team->maxMembers ?? 4)) {
                throw new \Exception("400:This team is already full.");
            }

            // Check if already in pendingMembers
            $pendingUids = collect($team->pendingMembers ?? [])->pluck('uid')->toArray();
            if (in_array($userId, $pendingUids)) {
                throw new \Exception("400:You have already requested to join this team.");
            }

            // Push to pendingMembers atomically
            $team->push('pendingMembers', [
                'uid' => $userId,
                'name' => $request->user()->name,
                'email' => $request->user()->email
            ]);

            // Notify leader
            $leaderUid = $team->leader['uid'] ?? null;
            if ($leaderUid) {
                Notification::create([
                    'userId' => $leaderUid,
                    'target_role' => 'user',
                    'title' => 'New Join Request',
                    'message' => $request->user()->name . ' wants to join your team ' . $team->name . '.',
                    'type' => 'team_join_request',
                    'link' => '/dashboard/teams',
                ]);
            }

            return response()->json(['message' => 'Join request sent successfully!'], 200);
        } catch (\Exception $e) {
            $message = $e->getMessage();
            if (str_contains($message, ':')) {
                [$status, $msg] = explode(':', $message, 2);
                return response()->json(['error' => $msg], (int) $status);
            }
            return response()->json(['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()], 500);
        }
    }

    public function approve(Request $request, $id)
    {
        $request->validate(['targetUid' => 'required']);
        $targetUserId = $request->targetUid;
        $userId = $request->user()->id;

        try {
            if (Team::where('memberIds', $targetUserId)->exists()) {
                throw new \Exception("409:This user has already joined another team.");
            }

            $team = Team::find($id);
            if (!$team) throw new \Exception("404:Team not found");

            $leaderUid = $team->leader['uid'] ?? null;
            if ($leaderUid != $userId) {
                throw new \Exception("403:Only the team leader can approve requests.");
            }

            $currentMembersCount = count((array)$team->memberIds);
            if ($currentMembersCount >= ($team->maxMembers ?? 4)) {
                throw new \Exception("400:Team is already full.");
            }

            // Find user in pendingMembers
            $pendingMembers = collect($team->pendingMembers ?? []);
            $memberObj = $pendingMembers->firstWhere('uid', $targetUserId);

            if (!$memberObj) {
                throw new \Exception("400:User is not in pending requests.");
            }

            // Remove from pending, add to members and memberIds atomically
            $team->pull('pendingMembers', ['uid' => $targetUserId]);
            $team->push('members', $memberObj);
            $team->push('memberIds', $targetUserId);

            if ($currentMembersCount + 1 >= ($team->maxMembers ?? 4)) {
                Notification::create([
                    'userId' => null,
                    'target_role' => 'admin',
                    'title' => 'Team Full',
                    'message' => 'Team "' . $team->name . '" has reached its maximum capacity.',
                    'type' => 'team_full',
                    'link' => '/admin/teams',
                ]);
            }

            return response()->json(['message' => 'Request approved!'], 200);
        } catch (\Exception $e) {
            $message = $e->getMessage();
            if (str_contains($message, ':')) {
                [$status, $msg] = explode(':', $message, 2);
                return response()->json(['error' => $msg], (int) $status);
            }
            return response()->json(['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()], 500);
        }
    }

    public function reject(Request $request, $id)
    {
        $request->validate(['targetUid' => 'required']);
        $targetUserId = $request->targetUid;
        $userId = $request->user()->id;

        $team = Team::find($id);
        if (!$team) return response()->json(['error' => 'Team not found'], 404);

        $leaderUid = $team->leader['uid'] ?? null;
        if ($leaderUid != $userId) {
            return response()->json(['error' => 'Only the team leader can reject requests.'], 403);
        }

        $team->pull('pendingMembers', ['uid' => $targetUserId]);

        return response()->json(['message' => 'Request rejected.'], 200);
    }

    public function leave(Request $request, $id)
    {
        $userId = $request->user()->id;

        try {
            $team = Team::find($id);
            if (!$team) throw new \Exception("404:Team not found");

            $memberIds = (array) $team->memberIds;
            if (!in_array($userId, $memberIds)) {
                throw new \Exception("400:You are not in this team.");
            }

            $leaderUid = $team->leader['uid'] ?? null;
            $isLeader = $leaderUid == $userId;

            if ($isLeader) {
                // Find someone else to be leader
                $otherMembers = collect($team->members ?? [])->where('uid', '!=', $userId)->values();

                if ($otherMembers->isEmpty()) {
                    // Delete team entirely
                    $eventId = $team->eventId;
                    $team->delete();
                    
                    $event = Event::find($eventId);
                    if ($event) {
                        $event->decrement('teamCount');
                    }
                } else {
                    // Assign new leader
                    $newLeaderObj = $otherMembers->first();
                    $team->leader = $newLeaderObj;
                    $team->pull('members', ['uid' => $userId]);
                    $team->pull('memberIds', $userId);
                    $team->save(); // Save the leader update explicitly
                }
            } else {
                $team->pull('members', ['uid' => $userId]);
                $team->pull('memberIds', $userId);
            }

            return response()->json(['message' => 'Successfully left the team.'], 200);
        } catch (\Exception $e) {
            $message = $e->getMessage();
            if (str_contains($message, ':')) {
                [$status, $msg] = explode(':', $message, 2);
                return response()->json(['error' => $msg], (int) $status);
            }
            return response()->json(['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $userId = $request->user()->id;
        $team = Team::find($id);
        if (!$team) return response()->json(['error' => 'Team not found'], 404);

        $leaderUid = $team->leader['uid'] ?? null;
        if ($leaderUid != $userId) {
            return response()->json(['error' => 'Only the team leader can edit the team.'], 403);
        }

        if ($request->has('maxMembers')) {
            $currentMembersCount = count((array)$team->memberIds);
            if ($request->maxMembers < $currentMembersCount) {
                return response()->json(['error' => 'Max members cannot be less than current member count.'], 400);
            }
        }

        if ($request->has('name') && $request->name != $team->name) {
            $nameExists = Team::where('eventId', $team->eventId)->where('name', $request->name)->exists();
            if ($nameExists) {
                return response()->json(['error' => 'A team with this name already exists.'], 400);
            }
        }

        $updates = [];
        if ($request->has('name')) {
            $updates['name'] = $request->name;
        }
        if ($request->has('maxMembers')) {
            $updates['maxMembers'] = (int)$request->maxMembers;
        }

        if (!empty($updates)) {
            $team->update($updates);
        }

        return response()->json(['message' => 'Team updated successfully.'], 200);
    }

    public function destroy(Request $request, $id)
    {
        $userId = $request->user()->id;
        $isAdmin = $request->user()->role === 'admin';

        try {
            $team = Team::find($id);
            if (!$team) throw new \Exception("404:Team not found");

            $leaderUid = $team->leader['uid'] ?? null;
            if ($leaderUid != $userId && !$isAdmin) {
                throw new \Exception("403:Not authorized to delete this team.");
            }

            $eventId = $team->eventId;
            $team->delete();

            $event = Event::find($eventId);
            if ($event) {
                $event->decrement('teamCount');
            }

            return response()->json(['message' => 'Team deleted successfully.'], 200);
        } catch (\Exception $e) {
            $message = $e->getMessage();
            if (str_contains($message, ':')) {
                [$status, $msg] = explode(':', $message, 2);
                return response()->json(['error' => $msg], (int) $status);
            }
            return response()->json(['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()], 500);
        }
    }

    public function submitProject(Request $request, $id)
    {
        $request->validate(['projectLink' => 'required|url']);
        $userId = $request->user()->id;
        
        $team = Team::find($id);
        if (!$team) return response()->json(['error' => 'Team not found'], 404);

        $leaderUid = $team->leader['uid'] ?? null;
        if ($leaderUid != $userId) {
            return response()->json(['error' => 'Only the team leader can submit projects.'], 403);
        }

        if (isset($team->projectLink) || isset($team->project_link)) {
            return response()->json(['error' => 'A project has already been submitted for this team.'], 400);
        }

        $team->update([
            'projectLink' => $request->projectLink,
            'projectSubmittedAt' => now(),
        ]);

        return response()->json(['message' => 'Project submitted successfully!'], 200);
    }
}
