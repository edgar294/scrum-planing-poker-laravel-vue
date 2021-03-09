<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use App\Models\Issue;
use App\Models\User;

class WorkanaTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_not_logued_cant_see_the_issues(){
       // $this->withoutExceptionHandling();
        $response = $this->get('/list/issues');
        $response->assertRedirect('/login');

        $user = User::factory()->create();
        Auth::login($user);

        $response = $this->get('/list/issues');
        $response->assertOk();
    }

    /** @test */
    public function vote_validations(){
        // $this->withoutExceptionHandling();

        $vote = rand(1, 99);
        $issue = Issue::factory()->create();
        $response = $this->postJson('/issue/vote', [
            'issue_id'   => $issue->id,
            'vote'       => $vote
        ]);

        $response->assertUnauthorized();

        $user = User::factory()->create();
        Auth::login($user);

        $response = $this->postJson('/issue/vote', [
            'issue_id'   => $issue->id,
            'vote'       => $vote
        ]);

        $response->assertOk();
        $response->assertJson([
            'success' => false
        ]);

        $response->assertJsonStructure(['success', 'message']);

        // Join the user in the Issue
        $issue->users()->attach($user);

        $response = $this->postJson('/issue/vote', [
            'issue_id'   => $issue->id,
            'vote'       => $vote
        ]);

        $response->assertOk();
        $response->assertJson([
            'success' => false
        ]);

        $response->assertJsonStructure(['success', 'message']);

        // Change the status of the issue to 'voting'
        $issue->status = 'voting';
        $issue->save();

        $response = $this->postJson('/issue/vote', [
            'issue_id'   => $issue->id,
            'vote'       => $vote
        ]);

        $response->assertOk();
        $response->assertJson([
            'success' => true
        ]);

        $response->assertJsonStructure(['success', 'vote']);

        // Try vote again
        $response = $this->postJson('/issue/vote', [
            'issue_id'   => $issue->id,
            'vote'       => $vote
        ]);

        $response->assertOk();
        $response->assertJson([
            'success' => false
        ]);

        $response->assertJsonStructure(['success', 'message']);
    }

    /** @test */
    public function issue_validations(){
        // $this->withoutExceptionHandling();

        $response = $this->postJson('/issue/join');
        $response->assertUnauthorized();

        $user = User::factory()->create();
        Auth::login($user);

        // Try Join witouth issue name
        $response = $this->postJson('/issue/join');
        $response->assertOk();
        $response->assertJson([
            'success' => false
        ]);

        $response->assertJsonStructure(['success', 'message']);

        // Join in the issue with the name
        $issueName = 'Example Name';
        $response = $this->postJson('/issue/join', [
            'name' => $issueName
        ]);

        $response->assertOk();
        $response->assertJson([
            'success' => true
        ]);
        $response->assertJsonStructure(['success', 'issue']);

        $this->assertDatabaseCount('issues', 1);

        $issue =  Issue::first();
        $response = $this->postJson('/issue/join', [
            'issue' => $issue->id
        ]);

        $response->assertOk();
        $response->assertJson([
            'success' => true
        ]);

        $this->assertDatabaseCount('issues', 1);
    }
}
