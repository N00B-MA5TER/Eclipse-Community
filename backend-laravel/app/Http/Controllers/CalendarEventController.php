<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use Illuminate\Http\Request;

class CalendarEventController extends Controller
{
    public function index()
    {
        return response()->json(CalendarEvent::orderBy('date')->orderBy('time')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|string|max:50',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'color' => 'required|string|max:100',
        ]);

        $event = CalendarEvent::create($validated);
        return response()->json($event, 201);
    }

    public function update(Request $request, $id)
    {
        $event = CalendarEvent::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'date' => 'sometimes|date',
            'time' => 'sometimes|string|max:50',
            'location' => 'sometimes|string|max:255',
            'type' => 'sometimes|string|max:50',
            'color' => 'sometimes|string|max:100',
        ]);

        $event->update($validated);
        return response()->json($event);
    }

    public function destroy($id)
    {
        $event = CalendarEvent::findOrFail($id);
        $event->delete();
        return response()->json(['message' => 'Event deleted successfully']);
    }
}
