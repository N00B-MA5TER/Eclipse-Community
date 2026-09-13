<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Event;
use App\Models\Team;
use App\Models\Notification;
use App\Models\Registration;

class AdminController extends Controller
{
    public function createEvent(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'type' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
            'description' => 'required|string'
        ]);

        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden: Admin access required'], 403);
        }

        $event = Event::create([
            'title' => $request->title,
            'type' => $request->type,
            'date' => $request->date,
            'time' => $request->time,
            'description' => $request->description,
            'status' => 'Upcoming',
            'registered_count' => 0,
            'team_count' => 0,
        ]);

        return response()->json([
            'id' => (string) $event->id,
            'message' => 'Event created successfully'
        ], 201);
    }

    public function deleteEvent(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden: Admin access required'], 403);
        }

        $event = Event::find($id);
        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        $event->delete();
        return response()->json(['message' => 'Event deleted successfully'], 200);
    }

    public function users(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden: Admin access required'], 403);
        }

        $users = User::orderBy('created_at', 'desc')->get()->map(function($u) {
            return [
                'id' => (string) $u->id,
                'uid' => (string) $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'phone' => $u->phone,
                'bio' => $u->bio,
                'course' => $u->course,
                'year' => $u->year,
                'techSkills' => $u->tech_skills,
                'role' => $u->role,
                'createdAt' => $u->created_at,
            ];
        });

        return response()->json($users, 200);
    }

    public function broadcast(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden: Admin access required'], 403);
        }

        $request->validate([
            'title' => 'required|string',
            'message' => 'required|string',
            'target' => 'required|string', // all, event, team
        ]);

        $targetUserIds = [];

        if ($request->target === 'all') {
            $targetUserIds = User::pluck('id')->toArray();
        } elseif ($request->target === 'event') {
            if (!$request->targetId) {
                return response()->json(['error' => 'targetId (event ID) is required for event broadcasts'], 400);
            }
            
            $regs = Registration::where('eventId', $request->targetId)->pluck('userId')->toArray();
            $teamMembers = Team::where('eventId', $request->targetId)
                ->pluck('memberIds')
                ->flatten()
                ->toArray();
                
            $targetUserIds = array_unique(array_merge($regs, $teamMembers));
        } elseif ($request->target === 'team') {
            if (!$request->targetId) {
                return response()->json(['error' => 'targetId (team ID) is required for team broadcasts'], 400);
            }
            $team = Team::find($request->targetId);
            if (!$team) {
                return response()->json(['error' => 'Team not found'], 404);
            }
            
            $targetUserIds = (array) ($team->memberIds ?? []);
        } else {
            return response()->json(['error' => 'Invalid target type'], 400);
        }

        if (empty($targetUserIds)) {
            return response()->json(['error' => 'No users found for the specified target'], 400);
        }

        // Insert notifications
        $now = now();
        $notifications = array_map(function($id) use ($request, $now) {
            return [
                'userId' => (string) $id,
                'targetRole' => 'user',
                'title' => $request->title,
                'message' => $request->message,
                'type' => $request->type ?? 'info',
                'read' => false,
                'createdAt' => $now,
                'updatedAt' => $now,
            ];
        }, $targetUserIds);

        Notification::insert($notifications);

        return response()->json(['message' => "Successfully broadcasted to " . count($targetUserIds) . " users."], 200);
    }
}
