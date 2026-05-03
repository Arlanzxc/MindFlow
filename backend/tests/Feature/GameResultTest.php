<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class GameResultTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_save_schulte_table_result()
    {
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/game-results', [
            'game_type' => 'schulte_table',
            'time_seconds' => 34.5
        ]);

        $response->assertSuccessful();
        
        $this->assertDatabaseHas('game_results', [
            'game_type' => 'schulte_table',
            'time_seconds' => 34.5
        ]);
    }
}