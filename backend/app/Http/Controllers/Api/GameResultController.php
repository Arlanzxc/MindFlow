<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GameResultController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'game_type' => ['sometimes', 'string', 'max:64'],
            'time_seconds' => ['required', 'numeric', 'min:0'],
        ]);

        $result = $request->user()->gameResults()->create([
            'game_type' => $validated['game_type'] ?? 'schulte_table',
            'time_seconds' => (float) $validated['time_seconds'],
        ]);

        return response()->json($result, 201);
    }
}
