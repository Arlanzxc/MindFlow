<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\FocusSession;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class FocusSessionTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_start_focus_session()
    {
        Sanctum::actingAs(User::factory()->create()); 

        $response = $this->postJson('/api/focus-sessions/start', [
            'duration_minutes' => 45
        ]);

        $response->assertSuccessful();
        $this->assertDatabaseHas('focus_sessions', [
            'duration_minutes' => 45,
            'status' => 'working'
        ]);
    }

    public function test_user_can_snooze_session()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $session = FocusSession::create([
            'user_id' => $user->id,
            'duration_minutes' => 25,
            'snooze_count' => 0,
            'status' => 'working'
        ]);

        $response = $this->postJson("/api/focus-sessions/{$session->id}/snooze");

        $response->assertSuccessful();
        
        $this->assertDatabaseHas('focus_sessions', [
            'id' => $session->id,
            'snooze_count' => 1
        ]);
    }
}