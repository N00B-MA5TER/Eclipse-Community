<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Event;
use App\Models\Team;
use App\Models\TeamMember;
use Illuminate\Support\Facades\Hash;

class TeamFeatureTest extends TestCase
{
    use RefreshDatabase;

    private function createUser($name, $email) {
        return User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make('password123'),
        ]);
    }

    private function createEvent() {
        return Event::create([
            'title' => 'Test Event',
            'type' => 'Hackathon',
            'date' => '2026-10-10',
            'time' => '10:00 AM',
            'description' => 'Test event desc',
        ]);
    }

    public function test_team_creation_and_rules()
    {
        $this->withoutExceptionHandling();
        $user1 = $this->createUser('User 1', 'u1@test.com');
        $user2 = $this->createUser('User 2', 'u2@test.com');
        $user3 = $this->createUser('User 3', 'u3@test.com');
        $event = $this->createEvent();

        // 1. Create a team
        $response = $this->actingAs($user1)->postJson('/api/teams', [
            'name' => 'Team Alpha',
            'eventId' => $event->id,
            'maxMembers' => 2,
        ]);
        if ($response->status() !== 201) {
            $response->dump();
        }
        $response->assertStatus(201);
        $teamCode = $response->json('code');
        $teamId = $response->json('id');

        // 2. Joining while already in another team (user1 is already in Team Alpha)
        $response = $this->actingAs($user1)->postJson('/api/teams/join', [
            'code' => $teamCode,
            'eventId' => $event->id,
        ]);
        $response->assertStatus(409)->assertJson(['error' => 'You are already in a team. Leave your existing team to join a new one.']);

        // 3. User 2 requests to join
        $response = $this->actingAs($user2)->postJson('/api/teams/join', [
            'code' => $teamCode,
            'eventId' => $event->id,
        ]);
        $response->assertStatus(200);

        // 4. Duplicate join request
        $response = $this->actingAs($user2)->postJson('/api/teams/join', [
            'code' => $teamCode,
            'eventId' => $event->id,
        ]);
        $response->assertStatus(400)->assertJson(['error' => 'You have already requested to join this team.']);

        // 5. Unauthorized approval (user 2 tries to approve themselves)
        $response = $this->actingAs($user2)->postJson('/api/teams/' . $teamId . '/approve', [
            'targetUid' => $user2->id
        ]);
        $response->assertStatus(403);

        // 6. Authorized approval (user 1 approves user 2)
        $response = $this->actingAs($user1)->postJson('/api/teams/' . $teamId . '/approve', [
            'targetUid' => $user2->id
        ]);
        $response->assertStatus(200);

        // 7. Capacity overflow (user 3 tries to join full team)
        $response = $this->actingAs($user3)->postJson('/api/teams/join', [
            'code' => $teamCode,
            'eventId' => $event->id,
        ]);
        $response->assertStatus(400)->assertJson(['error' => 'This team is already full.']);

        // 8. Unauthorized deletion (user 2 tries to delete team)
        $response = $this->actingAs($user2)->deleteJson('/api/teams/' . $teamId);
        $response->assertStatus(403);

        // 9. Leave team (user 2 leaves)
        $response = $this->actingAs($user2)->postJson('/api/teams/' . $teamId . '/leave');
        $response->assertStatus(200);

        // User 3 can now request to join
        $response = $this->actingAs($user3)->postJson('/api/teams/join', [
            'code' => $teamCode,
            'eventId' => $event->id,
        ]);
        $response->assertStatus(200);

        // Leader deletion
        $response = $this->actingAs($user1)->deleteJson('/api/teams/' . $teamId);
        $response->assertStatus(200);
    }
}
