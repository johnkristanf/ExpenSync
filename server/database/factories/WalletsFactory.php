<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Wallets>
 */
class WalletsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'icon' => fake()->imageUrl(64, 64, 'bussiness', true),
            'amount' => fake()->randomFloat(2, 0, 10000),
            'user_id' => User::factory(),
        ];
    }
}
