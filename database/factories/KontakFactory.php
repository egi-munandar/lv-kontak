<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kontak>
 */
class KontakFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => fake('id_ID')->name,
            'no_hp' => fake('id_ID')->phoneNumber,
            'email' => fake('id_ID')->safeEmail,
            'alamat' => fake('id_ID')->address
        ];
    }
}
