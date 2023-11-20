<?php

namespace Database\Seeders;

use App\Models\Severity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeveritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $severties =
            [
                [
                    'id' => 1,
                    'name' => 'Not Applicable',
                    'description' => 'A pin with a type other than "hazard"'
                ],
                [
                    'id' => 2,
                    'name' => 'Low',
                    'description' => 'A hazard with either a low consequence of very low likelyhood'
                ],
                [
                    'id' => 3,
                    'name' => 'Moderate',
                    'description' => 'A hazard with a significant likelyhood, but low consequence and the inverse'
                ],
                [
                    'id' => 4,
                    'name' => 'High',
                    'description' => 'A hazard with either a high consequence or a moderate consequence and high likeihood'
                ],
            ];
        foreach ($severties as $item) {
            $severity = new Severity();
            $severity->name = $item['name'];
            $severity->description = $item['description'];
            $severity->save();
        }
    }
}