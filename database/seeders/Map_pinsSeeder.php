<?php

namespace Database\Seeders;

use App\Models\Map_pin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Map_pinsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $map_pins = [
            [
                'longitude' => -117.29,
                // -117.23 with aberration 0.06
                'latitude' => 52.33,
                // 52.16 with aberration 0.06
                'title' => 'Location Three Retreat',
                'severity_id' => 3,
                // number 1, 2, or 3
                'slug' => 'Mystic Grove Hideaway',
                'description' => 'Discover the magic of an enchanted forest in this hidden retreat.',
                'active' => true,
            ],
            [
                'longitude' => -117.17,
                // -117.23 with aberration 0.06
                'latitude' => 52.22,
                // 52.16 with aberration 0.06
                'title' => 'Location Four Retreat',
                'severity_id' => 1,
                // number 1, 2, or 3
                'slug' => 'Tranquil Waters',
                'description' => 'Experience tranquility by the water in this picturesque sunset cove.',
                'active' => true,
            ],
            [
                'longitude' => -117.23,
                // -117.23 with aberration 0.06
                'latitude' => 52.16,
                // 52.16 with aberration 0.06
                'title' => 'Location Five Retreat',
                'severity_id' => 2,
                // number 1, 2, or 3
                'slug' => 'Nature\'s Haven',
                'description' => 'Unwind in the beauty of nature at this rustic ridge retreat.',
                'active' => true,
            ],
            [
                'longitude' => -117.17,
                // -117.23 with aberration 0.06
                'latitude' => 52.22,
                // 52.16 with aberration 0.06
                'title' => 'Location Six Retreat',
                'severity_id' => 3,
                // number 1, 2, or 3
                'slug' => 'Sylvan Haven',
                'description' => 'Listen to the soothing whispers of the pines at this idyllic lodge.',
                'active' => true,
            ],
            [
                'longitude' => -117.23,
                // -117.23 with aberration 0.06
                'latitude' => 52.16,
                // 52.16 with aberration 0.06
                'title' => 'Location Seven Retreat',
                'severity_id' => 1,
                // number 1, 2, or 3
                'slug' => 'Springtime Paradise',
                'description' => 'Immerse yourself in the eternal beauty of natural springs at this oasis.',
                'active' => true,
            ],
            [
                'longitude' => -117.9,
                // -117.23 with aberration 0.06
                'latitude' => 52.50,
                // 52.16 with aberration 0.06
                'title' => 'Location Eight Retreat',
                'severity_id' => 2,
                // number 1, 2, or 3
                'slug' => 'Blue Horizon Retreat',
                'description' => 'Escape to a haven beneath an azure sky with endless possibilities.',
                'active' => true,
            ],
            [
                'longitude' => -117.83,
                // -117.23 with aberration 0.06
                'latitude' => 52.3,
                // 52.16 with aberration 0.06
                'title' => 'Location Nine Retreat',
                'severity_id' => 1,
                // number 1, 2, or 3
                'slug' => 'Peaceful Nook',
                'description' => 'Discover harmony in a secluded hollow, a perfect peaceful nook.',
                'active' => true,
            ],
            [
                'longitude' => -118.00,
                // -117.23 with aberration 0.06
                'latitude' => 52.10,
                // 52.16 with aberration 0.06
                'title' => 'Location Ten Retreat',
                'severity_id' => 2,
                // number 1, 2, or 3
                'slug' => 'Timberland Serenity',
                'description' => 'Escape to tranquility in the heart of a peaceful and serene timberland.',
                'active' => true,
            ],
            [
                'longitude' => -116.9,
                // -117.23 with aberration 0.06
                'latitude' => 52.88,
                // 52.16 with aberration 0.06
                'title' => 'Location Eleven Retreat',
                'severity_id' => 3,
                // number 1, 2, or 3
                'slug' => 'Eco-friendly Escape',
                'description' => 'Embrace sustainability in an eco-friendly escape surrounded by nature.',
                'active' => true,
            ],
            [
                'longitude' => -117.43,
                // -117.23 with aberration 0.06
                'latitude' => 53.16,
                // 52.16 with aberration 0.06
                'title' => 'Location Twelve Retreat',
                'severity_id' => 1,
                // number 1, 2, or 3
                'slug' => 'Majestic Meadows',
                'description' => 'Revel in the majesty of open meadows in this serene retreat.',
                'active' => true,
            ],
            [
                'longitude' => -117.29,
                // -117.23 with aberration 0.06
                'latitude' => 51.90,
                // 52.16 with aberration 0.06
                'title' => 'Location Thirteen Retreat',
                'severity_id' => 2,
                // number 1, 2, or 3
                'slug' => 'Tranquil Trails',
                'description' => 'Embark on tranquil trails through nature\'s wonders in this retreat.',
                'active' => true,
            ],
            [
                'longitude' => -118.17,
                // -117.23 with aberration 0.06
                'latitude' => 53.22,
                // 52.16 with aberration 0.06
                'title' => 'Location Fourteen Retreat',
                'severity_id' => 3,
                // number 1, 2, or 3
                'slug' => 'Golden Glades',
                'description' => 'Bask in the beauty of golden glades in this serene and peaceful retreat.',
                'active' => true,
            ],
            [
                'longitude' => -117.63,
                // -117.23 with aberration 0.06
                'latitude' => 53.86,
                // 52.16 with aberration 0.06
                'title' => 'Location Fifteen Retreat',
                'severity_id' => 1,
                // number 1, 2, or 3
                'slug' => 'Riverside Haven',
                'description' => 'Find tranquility by the riverside in this nature lover\'s haven.',
                'active' => true,
            ],
            [
                'longitude' => -117.89,
                // -117.23 with aberration 0.06
                'latitude' => 54.00,
                // 52.16 with aberration 0.06
                'title' => 'Location Sixteen Retreat',
                'severity_id' => 2,
                // number 1, 2, or 3
                'slug' => 'Serene Sand Dunes',
                'description' => 'Experience serenity amidst the peaceful sand dunes in this retreat.',
                'active' => true,
            ],
            [
                'longitude' => -117.71,
                // -117.23 with aberration 0.06
                'latitude' => 51.22,
                // 52.16 with aberration 0.06
                'title' => 'Location Seventeen Retreat',
                'severity_id' => 3,
                // number 1, 2, or 3
                'slug' => 'Whispering Willows',
                'description' => 'Listen to the whispers of the willows in this serene and secluded retreat.',
                'active' => true,
            ],
            [
                'longitude' => -117.00,
                // -117.23 with aberration 0.06
                'latitude' => 53.16,
                // 52.16 with aberration 0.06
                'title' => 'Location Eighteen Retreat',
                'severity_id' => 1,
                // number 1, 2, or 3
                'slug' => 'Mystical Mountainside',
                'description' => 'Uncover the mystical charm of a mountainside retreat in nature.',
                'active' => true,
            ],
            [
                'longitude' => -116.29,
                // -117.23 with aberration 0.06
                'latitude' => 54.10,
                // 52.16 with aberration 0.06
                'title' => 'Location Nineteen Retreat',
                'severity_id' => 2,
                // number 1, 2, or 3
                'slug' => 'Sunlit Sanctuary',
                'description' => 'Bask in the sunlit beauty of a serene sanctuary surrounded by nature.',
                'active' => true,
            ],
            [
                'longitude' => -116.17,
                // -117.23 with aberration 0.06
                'latitude' => 53.22,
                // 52.16 with aberration 0.06
                'title' => 'Location Twenty Retreat',
                'severity_id' => 3,
                // number 1, 2, or 3
                'slug' => 'Tranquil Treetops',
                'description' => 'Find tranquility high above in the tranquil treetops of this nature retreat.',
                'active' => true,
            ],
        ];


        foreach ($map_pins as $pin) {
            $map_pin = new Map_pin();
            $map_pin->longitude = $pin['longitude'];
            $map_pin->latitude = $pin['latitude'];
            $map_pin->title = $pin['title'];
            $map_pin->severity_id = $pin['severity_id'];
            $map_pin->slug = $pin['slug'];
            $map_pin->description = $pin['description'];
            $map_pin->active = $pin['active'];
            $map_pin->save();


        }
    }
}
