<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Message::orderBy('created_at', 'desc');

        if ($request->has('unread')) {
            $query->where('is_read', false);
        }

        $messages = $query->get();

        return response()->json($messages);
    }

    public function show(string $id): JsonResponse
    {
        $message = Message::findOrFail($id);

        if (! $message->is_read) {
            $message->update(['is_read' => true]);
        }

        return response()->json($message);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $message = Message::create($validated);

        return response()->json($message, 201);
    }

    public function markRead(string $id): JsonResponse
    {
        $message = Message::findOrFail($id);
        $message->update(['is_read' => true]);

        return response()->json($message);
    }

    public function markAllRead(): JsonResponse
    {
        Message::where('is_read', false)->update(['is_read' => true]);

        return response()->json(['message' => 'All messages marked as read']);
    }

    public function destroy(string $id): JsonResponse
    {
        $message = Message::findOrFail($id);
        $message->delete();

        return response()->json(['message' => 'Message deleted']);
    }

    public function stats(): JsonResponse
    {
        $total = Message::count();
        $unread = Message::where('is_read', false)->count();

        return response()->json([
            'total' => $total,
            'unread' => $unread,
        ]);
    }
}
