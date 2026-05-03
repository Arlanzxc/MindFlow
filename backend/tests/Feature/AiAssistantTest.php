<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AiAssistantTest extends TestCase
{
    use RefreshDatabase;

    public function test_ai_responds_to_tired_keyword()
    {
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/ai/chat', [
            'message' => 'Я очень устал и не могу работать'
        ]);

        $response->assertSuccessful();
        $this->assertNotEmpty($response->json('reply') ?? $response->json('message'));
    }
}