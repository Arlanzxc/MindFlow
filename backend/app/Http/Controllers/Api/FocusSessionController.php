<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FocusSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FocusSessionController extends Controller
{
    public function start(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'duration_minutes' => ['required', 'integer', 'min:1', 'max:1440'],
        ]);

        $session = $request->user()->focusSessions()->create([
            'duration_minutes' => $validated['duration_minutes'],
            'snooze_count' => 0,
            'status' => 'working',
        ]);

        return response()->json($session, 201);
    }

    public function snooze(Request $request, FocusSession $focusSession): JsonResponse
    {
        abort_unless($focusSession->user_id === $request->user()->id, 404);

        if ($focusSession->status !== 'working') {
            return response()->json([
                'message' => 'Only working sessions can be snoozed.',
            ], 422);
        }

        if ($focusSession->snooze_count >= 3) {
            return response()->json([
                'message' => 'Snooze limit reached (3).',
            ], 422);
        }

        $focusSession->increment('snooze_count');
        $focusSession->increment('duration_minutes', 5);
        $focusSession->refresh();

        return response()->json($focusSession);
    }

    public function complete(Request $request, FocusSession $focusSession): JsonResponse
    {
        abort_unless($focusSession->user_id === $request->user()->id, 404);

        if ($focusSession->status !== 'working') {
            return response()->json([
                'message' => 'Session is not active.',
            ], 422);
        }

        $focusSession->update(['status' => 'completed']);

        return response()->json($focusSession->fresh());
    }
}
