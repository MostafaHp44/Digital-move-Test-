<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = Project::orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($projects);
    }

    public function show(string $id): JsonResponse
    {
        $project = Project::findOrFail($id);

        return response()->json($project);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'year' => 'required|string|max:10',
            'blurb' => 'nullable|string',
            'media_url' => 'nullable|string',
            'media_type' => 'nullable|in:image,video',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'year' => 'required|string|max:10',
            'blurb' => 'nullable|string',
            'media_url' => 'nullable|string',
            'media_type' => 'nullable|in:image,video',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $project->update($validated);

        return response()->json($project);
    }

    public function destroy(string $id): JsonResponse
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json(['message' => 'Project deleted']);
    }
}
