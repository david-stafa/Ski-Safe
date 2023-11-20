<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'id' => 1,
                'name' => 'hazard',
                'slug' => 'dangers for customers'
            ],
            [
                'id' => 2,
                'name' => 'lifts',
                'slug' => 'ski lifts'

            ],
            [
                'id' => 3,
                'name' => 'POI',
                'slug' => 'Powder of intrest'
            ],
        ];

        foreach ($types as $item) {
            $type = new Type();
            $type->id = $item['id'];
            $type->name = $item['name'];
            $type->slug = $item['slug'];
            $type->save();

        }
    }
}
