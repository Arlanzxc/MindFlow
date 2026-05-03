<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AiAssistantController extends Controller
{
    /**
     * @var list<array{keywords: list<string>, reply: string}>
     */
    private const KEYWORD_REPLIES = [
        [
            'keywords' => ['tired', 'exhausted', 'fatigue', 'sleepy', 'drained', 'устал', 'устала', 'усталость', 'усталый', 'усталые', 'измотан'],
            'reply' => 'Fatigue detected. A 5-minute visual break is recommended.',
        ],
        [
            'keywords' => ['break', 'rest', 'pause', 'перерыв', 'отдых', 'пауза'],
            'reply' => 'Scheduled recovery intervals improve sustained output. Initiate a short break now.',
        ],
        [
            'keywords' => ['stress', 'anxious', 'overwhelmed', 'стресс', 'тревога', 'перегруз'],
            'reply' => 'Elevated cognitive load observed. Reduce stimulus density for 3–5 minutes.',
        ],
        [
            'keywords' => ['burnout', 'burn out', 'выгорание', 'выгорел'],
            'reply' => 'Long-cycle overload pattern. Step away from the screen. Hydrate. Resume at reduced intensity.',
        ],
        [
            'keywords' => ['help', 'what', 'how', 'помоги', 'что делать', 'как'],
            'reply' => 'Maintain focus blocks, insert micro-breaks, and log session outcomes. I will monitor adherence.',
        ],
    ];

    /**
     * @var list<string>
     */
    private const NEUTRAL_TIPS = [
        'Single-task for 25 minutes, then assess strain before continuing.',
        'Peripheral clutter competes for attention. Clear one non-essential tab.',
        'Hydration correlates with alertness. Consume water at regular intervals.',
        'Ambient noise variance reduces focus stability. Consider silence or steady sound.',
        'Posture drift increases fatigue. Reset spine alignment before the next block.',
        'Brightness mismatch with ambient light elevates eye strain. Calibrate display output.',
        'Task batching reduces context-switch cost. Group similar actions when possible.',
    ];

    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'max:2000'],
        ]);

        $normalized = mb_strtolower($validated['message'], 'UTF-8');

        foreach (self::KEYWORD_REPLIES as $rule) {
            foreach ($rule['keywords'] as $keyword) {
                if (str_contains($normalized, mb_strtolower($keyword, 'UTF-8'))) {
                    return response()->json([
                        'persona' => 'neutral_robot',
                        'reply' => $rule['reply'],
                    ]);
                }
            }
        }

        return response()->json([
            'persona' => 'neutral_robot',
            'reply' => self::NEUTRAL_TIPS[array_rand(self::NEUTRAL_TIPS)],
        ]);
    }
}
