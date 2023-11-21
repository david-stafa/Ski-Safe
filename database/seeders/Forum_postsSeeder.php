<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Forum_postsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'forum_thread_id' => 1,
                'content' => 'I had an amazing time skiing in the Alps last weekend! The fresh powder was incredible.',
                'user_id' => 1,
                'created_at' => '2023-11-20 12:54:48',
                'updated_at' => '2023-11-20 12:54:48',
            ],
            [
                'forum_thread_id' => 1,
                'content' => 'Just bought a new pair of skis, can\'t wait to hit the slopes!',
                'user_id' => 2,
                'created_at' => '2023-11-20 13:15:22',
                'updated_at' => '2023-11-20 13:15:22',
            ],
            [
                'forum_thread_id' => 2,
                'content' => 'Anyone know of any good ski resorts in Canada? Planning a trip for next winter.',
                'user_id' => 3,
                'created_at' => '2023-11-21 09:45:10',
                'updated_at' => '2023-11-21 09:45:10',
            ],
            [
                'forum_thread_id' => 2,
                'content' => 'Just completed my first black diamond run! Feeling accomplished!',
                'user_id' => 4,
                'created_at' => '2023-11-21 10:30:55',
                'updated_at' => '2023-11-21 10:30:55',
            ],
            [
                'forum_thread_id' => 3,
                'content' => 'Skiing with friends is the best way to spend a winter weekend.',
                'user_id' => 5,
                'created_at' => '2023-11-22 14:20:30',
                'updated_at' => '2023-11-22 14:20:30',
            ],
            [
                'forum_thread_id' => 3,
                'content' => 'Just tried snowboarding for the first time. I think I\'ll stick to skiing!',
                'user_id' => 6,
                'created_at' => '2023-11-22 15:05:18',
                'updated_at' => '2023-11-22 15:05:18',
            ],
            [
                'forum_thread_id' => 4,
                'content' => 'Dreaming of a ski vacation in the Swiss Alps. Anyone been there?',
                'user_id' => 7,
                'created_at' => '2023-11-23 11:12:40',
                'updated_at' => '2023-11-23 11:12:40',
            ],
            [
                'forum_thread_id' => 4,
                'content' => 'Just upgraded my ski gear! Ready for the season.',
                'user_id' => 8,
                'created_at' => '2023-11-23 12:01:05',
                'updated_at' => '2023-11-23 12:01:05',
            ],
            [
                'forum_thread_id' => 5,
                'content' => 'Best après-ski spot in town? Looking for recommendations!',
                'user_id' => 9,
                'created_at' => '2023-11-24 17:30:22',
                'updated_at' => '2023-11-24 17:30:22',
            ],
            [
                'forum_thread_id' => 5,
                'content' => 'Just booked a ski trip with my family. Can\'t wait for the holidays!',
                'user_id' => 10,
                'created_at' => '2023-11-24 18:15:48',
                'updated_at' => '2023-11-24 18:15:48',
            ],
        ];

        // Insert data into the database
        DB::table('Forum_posts')->insert($data);
    }
}
