<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Forum_threadsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title' => 'Best Ski Resorts in Europe',
                'user_id' => 1,
                'created_at' => '2023-11-20 12:00:00',
                'updated_at' => '2023-11-20 12:00:00',
            ],
            [
                'title' => 'New Ski Gear Recommendations',
                'user_id' => 2,
                'created_at' => '2023-11-21 08:30:00',
                'updated_at' => '2023-11-21 08:30:00',
            ],
            [
                'title' => 'Planning a Ski Trip to Canada',
                'user_id' => 3,
                'created_at' => '2023-11-22 14:00:00',
                'updated_at' => '2023-11-22 14:00:00',
            ],
            [
                'title' => 'Skiing in the Swiss Alps',
                'user_id' => 4,
                'created_at' => '2023-11-23 10:00:00',
                'updated_at' => '2023-11-23 10:00:00',
            ],
            [
                'title' => 'Favorite Skiing Destinations',
                'user_id' => 5,
                'created_at' => '2023-11-24 16:45:00',
                'updated_at' => '2023-11-24 16:45:00',
            ],
            [
                'title' => 'Skiing with Family and Friends',
                'user_id' => 6,
                'created_at' => '2023-11-25 09:20:00',
                'updated_at' => '2023-11-25 09:20:00',
            ],
            [
                'title' => 'Snowboarding vs. Skiing',
                'user_id' => 7,
                'created_at' => '2023-11-26 11:30:00',
                'updated_at' => '2023-11-26 11:30:00',
            ],
            [
                'title' => 'Après-Ski Recommendations',
                'user_id' => 8,
                'created_at' => '2023-11-27 13:15:00',
                'updated_at' => '2023-11-27 13:15:00',
            ],
            [
                'title' => 'Skiing in the Rockies',
                'user_id' => 9,
                'created_at' => '2023-11-28 15:45:00',
                'updated_at' => '2023-11-28 15:45:00',
            ],
            [
                'title' => 'Family Ski Trip for the Holidays',
                'user_id' => 10,
                'created_at' => '2023-11-29 18:00:00',
                'updated_at' => '2023-11-29 18:00:00',
            ],
        ];

        // Insert data into the database
        DB::table('Forum_threads')->insert($data);
    
    }
}
