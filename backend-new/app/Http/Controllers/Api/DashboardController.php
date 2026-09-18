<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Project;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $services = Service::count();
        $projects = Project::count();
        $messages = Message::count();
        $unreadMessages = Message::where('is_read', false)->count();

        return response()->json([
            'services' => $services,
            'projects' => $projects,
            'messages' => $messages,
            'unread_messages' => $unreadMessages,
        ]);
    }
}
