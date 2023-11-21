<?php

namespace App\Http\Controllers;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    // EventController.php

public function index()
{
    // Fetch all events
    $events = Event::all();
    return response()->json($events);
}

public function store(Request $request)
{
    // Validate and store a new event
    $data = $request->validate([
        'title' => 'required|string',
        'description' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
        'creator_id' => 'required|exists:users,id',
    ]);

    $event = Event::create($data);

    return response()->json($event, 201);
}

public function show($id)
{
    // Fetch a single event
    $event = Event::findOrFail($id);
    return response()->json($event);
}

public function update(Request $request, $id)
{
    // Validate and update an event
    $data = $request->validate([
        'title' => 'string',
        'description' => 'string',
        'start_date' => 'date',
        'end_date' => 'date',
        'creator_id' => 'exists:users,id',
    ]);

    $event = Event::findOrFail($id);
    $event->update($data);

    return response()->json($event, 200);
}

public function destroy($id)
{
    // Delete an event
    $event = Event::findOrFail($id);
    $event->delete();

    return response()->json(null, 204);
}

}
