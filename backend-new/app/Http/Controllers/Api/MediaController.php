<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:51200|mimes:jpg,jpeg,png,gif,webp,svg,mp4,webm,ogg,mov',
        ]);

        $file = $request->file('file');
        $folder = $file->getMimeType() === 'video/mp4' ||
                   $file->getMimeType() === 'video/webm' ||
                   $file->getMimeType() === 'video/ogg' ||
                   $file->getMimeType() === 'video/quicktime'
            ? 'videos'
            : 'images';

        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs($folder, $filename, 'public');

        $url = Storage::disk('public')->url($path);

        return response()->json([
            'url' => $url,
            'type' => $folder === 'videos' ? 'video' : 'image',
        ]);
    }
}
