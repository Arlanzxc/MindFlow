<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AiAssistantController extends Controller
{
    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        // Используем mb_strtolower для правильной работы с кириллицей
        $message = mb_strtolower($validated['message']);

        if (str_contains($message, 'tired') || str_contains($message, 'устал')) {
            $reply = "Я вижу, что ты устал. Обязательно закончи текущий блок, выпей воды и сделай разминку для глаз!";
        } elseif (str_contains($message, 'help') || str_contains($message, 'помощь')) {
            $reply = "Я твой ИИ-ассистент MindFlow. Я слежу за твоим фокусом. Напиши мне 'устал', 'прокрастинация' или попроси 'совет'.";
        } elseif (str_contains($message, 'tip') || str_contains($message, 'совет')) {
            $reply = "Совет для фокуса: Разбей задачу на микрошаги. Какой следующий символ тебе нужно напечатать? Сделай только это.";
        } elseif (str_contains($message, 'procrastinat') || str_contains($message, 'прокрастинац') || str_contains($message, 'отвлека')) {
            $reply = "Прокрастинация — это часто просто скрытый страх сложной задачи. Включи 'Emergency Mode', закрой ютуб и пообещай себе поработать ровно 5 минут. Импульс появится!";
        } elseif (str_contains($message, 'joke') || str_contains($message, 'шутка')) {
            $reply = "Почему программисты предпочитают темную тему? Потому что свет привлекает баги! 🐛";
        } elseif (str_contains($message, 'hi') || str_contains($message, 'привет') || str_contains($message, 'здравствуй')) {
            $reply = "Привет! Готов к продуктивной сессии? Запускай таймер, как будешь готов.";
        } elseif (str_contains($message, 'спин') || str_contains($message, 'осанк') || str_contains($message, 'posture')) {
            $reply = "Молодец, что следишь за спиной! Ноги ровно на полу, плечи расслаблены, монитор на уровне глаз.";
        } else {
            $reply = "Пока я простой ИИ и работаю по ключевым словам. Я услышал: '{$validated['message']}'. Продолжай в том же духе!";
        }

        return response()->json(['reply' => $reply]);
    }
}