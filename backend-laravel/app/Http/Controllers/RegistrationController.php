<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Registration;
use App\Models\Event;
use App\Models\Team;

class RegistrationController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $query = Registration::where('user_id', $userId);

        if ($request->has('eventId') && trim($request->eventId) !== '') {
            $query->where('event_id', $request->eventId);
        }

        $registrations = $query->get()->map(function ($reg) use ($request) {
            return [
                'id' => (string) $reg->id,
                'eventId' => (string) $reg->event_id,
                'userId' => (string) $reg->user_id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'createdAt' => $reg->created_at,
            ];
        });

        return response()->json($registrations, 200);
    }

    public function store(Request $request)
    {
        $request->validate(['eventId' => 'required']);
        $userId = $request->user()->id;
        $eventId = $request->eventId;

        $existingRegistration = Registration::where('event_id', $eventId)
            ->where('user_id', $userId)
            ->first();

        if ($existingRegistration) {
            return response()->json(['error' => 'You are already registered for this event.'], 400);
        }

        // Check if user is in any team for this event
        $userInTeam = Team::where('event_id', $eventId)
            ->whereHas('members', function ($q) use ($userId) {
                $q->where('users.id', $userId);
            })
            ->exists();

        if ($userInTeam) {
            return response()->json(['error' => 'You are already registered via a team for this event.'], 400);
        }

        $registration = new Registration();
        $registration->event_id = $eventId;
        $registration->user_id = $userId;
        $registration->save();

        $event = Event::find($eventId);
        if ($event) {
            $event->increment('registered_count');
        }

        return response()->json([
            'id' => (string) $registration->id,
            'eventId' => (string) $registration->event_id,
            'userId' => (string) $registration->user_id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'createdAt' => $registration->created_at,
        ], 201);
    }
}
