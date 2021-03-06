<?php

namespace Database\Factories;

use App\Models\Topic;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TopicFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Topic::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $randomUser = User::inRandomOrder()->first();

        return [
            'header' => $this->faker->text(20),
            'description' => $this->faker->paragraphs(5, true),
            'author_id' => $randomUser->id,
        ];
    }
}
