<?php

use App\Models\User;
use App\Models\Wallets;
use Database\Factories\WalletsFactory;
use Illuminate\Foundation\Testing\RefreshDatabaseState;
use Illuminate\Testing\Fluent\AssertableJson;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;


beforeEach(function (){
    $this->user = User::factory()->create();
});

it('can fetch all wallets', function (){
    Wallets::factory()->create(['user_id' => $this->user->id]);
    Wallets::factory()->create(['user_id' => $this->user->id]);

    actingAs($this->user);

    $response = get('/api/wallets');

    $response->dump();  // This will print the full response to your terminal


    $response->assertStatus(200)->assertJson(
        fn (AssertableJson $json) => $json->has('wallets', 2)
    );

});