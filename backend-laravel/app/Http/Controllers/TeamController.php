<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Database\QueryException;
use App\Models\Team;
use App\Models\TeamMember;
use App\Models\TeamJoinRequest;
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
                    $query->where('event_id', $request->eventId);
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

    private function formatTeam(Team $team, $userId)
    {
        $memberIds = $team->members->pluck('id')->map(fn ($id) => (string) $id)->values()->all();
        $isMember = in_array((string) $userId, $memberIds);

        $leaderUid = $team->leader_id;
        $isLeader = $leaderUid == $userId;

        $leaderData = [
            'uid' => (string) $leaderUid,
            'name' => $team->leader->name ?? '',
        ];
        if ($isMember) {
            $leaderData['email'] = $team->leader->email ?? '';
        }

        $members = $team->members->map(function ($m) use ($isMember, $leaderUid) {
            $data = [
                'uid' => (string) $m->id,
                'name' => $m->name,
                'role' => $leaderUid == $m->id ? 'leader' : 'member',
            ];
            if ($isMember) {
                $data['email'] = $m->email ?? '';
            }
            return $data;
        })->values();

        $safeTeam = [
            'id' => (string) $team->id,
            'name' => $team->name,
            'eventId' => (string) $team->event_id,
            'leader' => $leaderData,
            'members' => $members,
            'maxMembers' => $team->max_members,
            'createdAt' => $team->created_at,
        ];

        if ($isMember) {
            $safeTeam['projectLink'] = $team->project_link;
            $safeTeam['code'] = $team->code;
            $safeTeam['memberIds'] = $memberIds;

            if ($isLeader) {
                $safeTeam['pendingMembers'] = $team->joinRequests->map(function ($jr) {
                    return [
                        'uid' => (string) $jr->user_id,
                        'name' => $jr->user->name ?? '',
                        'email' => $jr->user->email ?? '',
                    ];
                })->values();
            }
        }

        return $safeTeam;
    }

    public function index(Request $request)
    {
        $query = Team::with(['leader', 'members', 'joinRequests.user']);

        if ($request->has('eventId') && trim($request->eventId) !== '') {
            $query->where('event_id', $request->eventId);
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
            if (TeamMember::where('user_id', $userId)->exists()) {
                throw new \Exception("409:You are already in a team. Leave your existing team to create a new one.");
            }

            $event = Event::find($eventId);
            if (!$event && $eventId != 1 && $eventId != 2) {
                throw new \Exception("404:Event not found");
            }

            // Check name uniqueness per event
            if (Team::where('event_id', $eventId)->where('name', $request->name)->exists()) {
                throw new \Exception("409:A team with this name already exists for this event.");
            }

            // Generate unique code
            do {
                $code = strtoupper(Str::random(6));
            } while (Team::where('code', $code)->exists());

            $team = new Team();
            $team->event_id = $eventId;
            $team->name = $request->name;
            $team->code = $code;
            $team->max_members = (int) $request->maxMembers;
            $team->leader_id = $userId;
            $team->save();

            TeamMember::create([
                'team_id' => $team->id,
                'user_id' => $userId,
                'role' => 'leader',
            ]);

            if ($event) {
                $event->increment('registered_count');
                $event->increment('team_count');
            }

            Notification::create([
                'user_id' => null, // null implies admin target
                'target_role' => 'admin',
                'title' => 'New Team Created',
                'message' => 'Team "' . $request->name . '" was just created by ' . $request->user()->name . '.',
                'type' => 'team_created',
                'link' => '/admin/teams',
            ]);

            $team->load(['leader', 'members', 'joinRequests.user']);

            return response()->json($this->formatTeam($team, $userId), 201);
        } catch (QueryException $e) {
            if (str_contains($e->getMessage(), 'Duplicate entry')) {
                return response()->json(['error' => 'You have already created a team for this event.'], 409);
            }
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            $message = $e->getMessage();
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
            if (TeamMember::where('user_id', $userId)->exists()) {
                throw new \Exception("409:You are already in a team. Leave your existing team to join a new one.");
            }

            $team = Team::where('code', $request->code)
                ->where('event_id', $request->eventId)
                ->first();

            if (!$team) {
                throw new \Exception("404:Invalid join code or team not found for this event");
            }

            $currentMembers = $team->members()->count();
            if ($currentMembers >= ($team->max_members ?? 4)) {
                throw new \Exception("400:This team is already full.");
            }

            // Check if already in pending join requests
            if (TeamJoinRequest::where('team_id', $team->id)->where('user_id', $userId)->exists()) {
                throw new \Exception("400:You have already requested to join this team.");
            }

            TeamJoinRequest::create([
                'team_id' => $team->id,
                'user_id' => $userId,
            ]);

            // Notify leader
            if ($team->leader_id) {
                Notification::create([
                    'user_id' => $team->leader_id,
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
            if (TeamMember::where('user_id', $targetUserId)->exists()) {
                throw new \Exception("409:This user has already joined another team.");
            }

            $team = Team::find($id);
            if (!$team) throw new \Exception("404:Team not found");

            if ($team->leader_id != $userId) {
                throw new \Exception("403:Only the team leader can approve requests.");
            }

            $currentMembersCount = $team->members()->count();
            if ($currentMembersCount >= ($team->max_members ?? 4)) {
                throw new \Exception("400:Team is already full.");
            }

            $joinRequest = TeamJoinRequest::where('team_id', $team->id)
                ->where('user_id', $targetUserId)
                ->first();

            if (!$joinRequest) {
                throw new \Exception("400:User is not in pending requests.");
            }

            \Illuminate\Support\Facades\DB::transaction(function () use ($joinRequest, $team, $targetUserId) {
                $joinRequest->delete();
                TeamMember::create([
                    'team_id' => $team->id,
                    'user_id' => $targetUserId,
                    'role' => 'member',
                ]);
            });

            if ($currentMembersCount + 1 >= ($team->max_members ?? 4)) {
                Notification::create([
                    'user_id' => null,
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

        if ($team->leader_id != $userId) {
            return response()->json(['error' => 'Only the team leader can reject requests.'], 403);
        }

        TeamJoinRequest::where('team_id', $team->id)->where('user_id', $targetUserId)->delete();

        return response()->json(['message' => 'Request rejected.'], 200);
    }

    public function leave(Request $request, $id)
    {
        $userId = $request->user()->id;

        try {
            $team = Team::find($id);
            if (!$team) throw new \Exception("404:Team not found");

            $membership = TeamMember::where('team_id', $team->id)->where('user_id', $userId)->first();
            if (!$membership) {
                throw new \Exception("400:You are not in this team.");
            }

            $isLeader = $team->leader_id == $userId;

            if ($isLeader) {
                $otherMember = TeamMember::where('team_id', $team->id)
                    ->where('user_id', '!=', $userId)
                    ->first();

                if (!$otherMember) {
                    // Delete team entirely
                    $eventId = $team->event_id;
                    $team->delete();

                    $event = Event::find($eventId);
                    if ($event) {
                        $event->decrement('team_count');
                    }
                } else {
                    \Illuminate\Support\Facades\DB::transaction(function () use ($team, $otherMember, $membership) {
                        $team->leader_id = $otherMember->user_id;
                        $team->save();
                        $otherMember->role = 'leader';
                        $otherMember->save();
                        $membership->delete();
                    });
                }
            } else {
                $membership->delete();
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

        if ($team->leader_id != $userId) {
            return response()->json(['error' => 'Only the team leader can edit the team.'], 403);
        }

        if ($request->has('maxMembers')) {
            $currentMembersCount = $team->members()->count();
            if ($request->maxMembers < $currentMembersCount) {
                return response()->json(['error' => 'Max members cannot be less than current member count.'], 400);
            }
        }

        if ($request->has('name') && $request->name != $team->name) {
            $nameExists = Team::where('event_id', $team->event_id)->where('name', $request->name)->exists();
            if ($nameExists) {
                return response()->json(['error' => 'A team with this name already exists.'], 400);
            }
        }

        $updates = [];
        if ($request->has('name')) {
            $updates['name'] = $request->name;
        }
        if ($request->has('maxMembers')) {
            $updates['max_members'] = (int) $request->maxMembers;
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

            if ($team->leader_id != $userId && !$isAdmin) {
                throw new \Exception("403:Not authorized to delete this team.");
            }

            $eventId = $team->event_id;
            $team->delete();

            $event = Event::find($eventId);
            if ($event) {
                $event->decrement('team_count');
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

        if ($team->leader_id != $userId) {
            return response()->json(['error' => 'Only the team leader can submit projects.'], 403);
        }

        if ($team->project_link) {
            return response()->json(['error' => 'A project has already been submitted for this team.'], 400);
        }

        $team->update([
            'project_link' => $request->projectLink,
            'project_submitted_at' => now(),
        ]);

        return response()->json(['message' => 'Project submitted successfully!'], 200);
    }
}
