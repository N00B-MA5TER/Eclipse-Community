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
        $registrations = Registration::where('eventId', $id)->get();
        foreach ($registrations as $reg) {
            $participantUids[(string)$reg->userId] = true;
        }

        $teams = Team::where('eventId', $id)->get();
        foreach ($teams as $team) {
            $members = $team->members ?? [];
            foreach ($members as $member) {
                $participantUids[(string)$member['uid']] = true;
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
        $registrations = Registration::where('eventId', $id)->get();
        foreach ($registrations as $reg) {
            $uid = (string) $reg->userId;
            if (!isset($participantsMap[$uid])) {
                $participantsMap[$uid] = [
                    'uid' => $uid,
                    'name' => $reg->name,
                    'type' => 'individual'
                ];
            }
        }

        // 2. Get Team Members
        $teams = Team::where('eventId', $id)->get();
        foreach ($teams as $team) {
            $members = $team->members ?? [];
            foreach ($members as $member) {
                $uid = (string) $member['uid'];
                // Only take active members, not pending. Pending are in `pendingMembers`.
                if (!isset($participantsMap[$uid])) {
                    $participantsMap[$uid] = [
                        'uid' => $uid,
                        'name' => $member['name'],
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
