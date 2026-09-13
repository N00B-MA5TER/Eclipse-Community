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
        $query = Registration::where('userId', $userId);
        
        if ($request->has('eventId') && trim($request->eventId) !== '') {
            $query->where('eventId', $request->eventId);
        }

        $registrations = $query->get()->map(function ($reg) use ($request) {
            return [
                'id' => (string) $reg->id,
                'eventId' => (string) $reg->eventId,
                'userId' => (string) $reg->userId,
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

        $existingRegistration = Registration::where('eventId', $eventId)
            ->where('userId', $userId)
            ->first();

        if ($existingRegistration) {
            return response()->json(['error' => 'You are already registered for this event.'], 400);
        }

        // Check if user is in any team for this event
        $userInTeam = Team::where('eventId', $eventId)
            ->where('memberIds', $userId)
            ->exists();

        if ($userInTeam) {
            return response()->json(['error' => 'You are already registered via a team for this event.'], 400);
        }

        $registration = new Registration();
        $registration->eventId = $eventId;
        $registration->userId = $userId;
        $registration->name = $request->user()->name;
        $registration->email = $request->user()->email;
        $registration->save();

        $event = Event::find($eventId);
        if ($event) {
            $event->increment('registeredCount');
        }

        return response()->json([
            'id' => (string) $registration->id,
            'eventId' => (string) $registration->eventId,
            'userId' => (string) $registration->userId,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'createdAt' => $registration->created_at,
        ], 201);
    }
}
