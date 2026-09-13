<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Registration;
use App\Models\Team;

class EventController extends Controller
{
    /**
     * GET /api/events - Get all events
     */
    public function index()
    {
        $events = Event::orderBy('created_at', 'desc')->get()->map(function($event) {
            $data = $event->toArray();
            $data['id'] = (string) $event->id;
            return $data;
        });

        return response()->json($events, 200);
    }

    /**
     * GET /api/events/:id - Get a specific event
     */
    public function show($id)
    {
        $event = Event::find($id);

        if (! $event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        $data = $event->toArray();
        $data['id'] = (string) $event->id;

        // Calculate true participant count dynamically
        $participantUids = [];
        $registrations = Registration::where('event_id', $id)->get();
        foreach ($registrations as $reg) {
            $participantUids[(string)$reg->user_id] = true;
        }

        $teams = Team::with('members')->where('event_id', $id)->get();
        foreach ($teams as $team) {
            foreach ($team->members as $member) {
                $participantUids[(string)$member->id] = true;
            }
        }

        $data['trueParticipantCount'] = count($participantUids);

        return response()->json($data, 200);
    }

    /**
     * GET /api/events/:id/participants - Get event participants
     */
    public function participants($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        $participantsMap = [];

        // 1. Get Individual Registrations
        $registrations = Registration::with('user')->where('event_id', $id)->get();
        foreach ($registrations as $reg) {
            $uid = (string) $reg->user_id;
            if (!isset($participantsMap[$uid])) {
                $participantsMap[$uid] = [
                    'uid' => $uid,
                    'name' => $reg->user->name ?? '',
                    'type' => 'individual'
                ];
            }
        }

        // 2. Get Team Members
        $teams = Team::with('members')->where('event_id', $id)->get();
        foreach ($teams as $team) {
            foreach ($team->members as $member) {
                $uid = (string) $member->id;
                // Only take active members, not pending. Pending are in `team_join_requests`.
                if (!isset($participantsMap[$uid])) {
                    $participantsMap[$uid] = [
                        'uid' => $uid,
                        'name' => $member->name,
                        'type' => 'team_member'
                    ];
                }
            }
        }

        $participants = array_values($participantsMap);

        // Sort alphabetically by name (case-insensitive)
        usort($participants, function($a, $b) {
            return strcasecmp($a['name'], $b['name']);
        });

        return response()->json([
            'count' => count($participants),
            'participants' => $participants
        ], 200);
    }
}
