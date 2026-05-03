<?php

use App\Http\Controllers\Api\AiAssistantController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FocusSessionController;
use App\Http\Controllers\Api\GameResultController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/focus-sessions/start', [FocusSessionController::class, 'start']);
    Route::post('/focus-sessions/{focusSession}/snooze', [FocusSessionController::class, 'snooze']);
    Route::post('/focus-sessions/{focusSession}/complete', [FocusSessionController::class, 'complete']);

    Route::post('/game-results', [GameResultController::class, 'store']);

    Route::post('/ai/chat', [AiAssistantController::class, 'chat']);
});
