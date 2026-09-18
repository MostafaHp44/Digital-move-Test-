<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = Service::orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($services);
    }

    public function show(string $id): JsonResponse
    {
        $service = Service::findOrFail($id);

        return response()->json($service);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:10',
            'features' => 'nullable|array',
            'media_url' => 'nullable|string',
            'media_type' => 'nullable|in:image,video',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $service = Service::create($validated);

        return response()->json($service, 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:10',
            'features' => 'nullable|array',
            'media_url' => 'nullable|string',
            'media_type' => 'nullable|in:image,video',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $service->update($validated);

        return response()->json($service);
    }

    public function destroy(string $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json(['message' => 'Service deleted']);
    }
}
