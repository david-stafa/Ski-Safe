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
                'longitude' => -140.404811,
                // -117.23 with aberration 0.06
                'latitude' => 60.568208,
                // 52.16 with aberration 0.06
                'title' => 'Icy Surface',
                'severity_id' => 1,
                // number 1, 2, or 3
                'slug' => 'Caution when exiting the chairlift',
                'description' => 'Please take care when exiting the chair lift; a recent thaw has created slick ice',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2021/11/14/08/42/cable-car-6793989_1280.jpg'
            ],
            [
                'longitude' => -140.389878,
                // -117.23 with aberration 0.06
                'latitude' => 60.560101,
                // 52.16 with aberration 0.06
                'title' => 'Avalance Hazard',
                'severity_id' => 3,
                // number 1, 2, or 3
                'slug' => 'Serious Avalanche Danger',
                'description' => 'This slope has not released since the snowfall last wednesday, our Patrollers advise no off-piste skiing on this aspect',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2012/06/07/23/52/ridge-49485_1280.jpg'
            ],
            [
                'longitude' => -140.277760,
                // -117.23 with aberration 0.06
                'latitude' => 60.593593,
                // 52.16 with aberration 0.06
                'title' => 'Large Moulin',
                'severity_id' => 3,
                // number 1, 2, or 3
                'slug' => 'Large Moulin',
                'description' => 'A skiier recently fell into a large moulin at these coordinates. If you are going to ski in this area please be aware that snow bridges are weak. And be sure to carry all your glacier rescue equipment.',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2017/11/06/16/15/glacier-2924065_1280.jpg'

            ],
            [
                'longitude' => -140.364329,
                // -117.23 with aberration 0.06
                'latitude' => 60.619015,
                // 52.16 with aberration 0.06
                'title' => 'Ski School',
                'severity_id' => 1,
                // number 1, 2, or 3
                'slug' => 'SLOW: Ski School in progress',
                'description' => 'Caution, young an inexperienced skiiers are using this area',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2012/02/26/10/58/active-17089_1280.jpg'
            ],
            [
                'longitude' => -140.422923,
                // -117.23 with aberration 0.06
                'latitude' => 60.573097,
                // 52.16 with aberration 0.06
                'title' => 'Cornice',
                'severity_id' => 3,
                // number 1, 2, or 3
                'slug' => 'Out of bounds: Large Cornice',
                'description' => 'Please do not approach the edge, a large cornice is expected to fall soon. Skiing in this location will present serious risk to backcountry skiiers below.',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2019/02/23/16/38/winter-4016000_1280.jpg'
            ],
            [
                'longitude' => -140.404043,
                // -117.23 with aberration 0.06
                'latitude' => 60.599151,
                // 52.16 with aberration 0.06
                'title' => 'Accident',
                'severity_id' => 2,
                // number 1, 2, or 3
                'slug' => 'SLOW: Accident',
                'description' => 'Please slow down, are partollers are responding to an accident at this location',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2010/12/13/10/10/ski-2410_1280.jpg'
            ],
            [
                'longitude' => -140.318391,
                // -117.23 with aberration 0.06
                'latitude' => 60.581170,
                // 52.16 with aberration 0.06
                'title' => 'Avalanche Debris',
                'severity_id' => 2,
                // number 1, 2, or 3
                'slug' => 'Slow: Debis in the area',
                'description' => 'An avalance last tuesday morning has left substantial debis, skiing is technical and dangerous. Experts only.',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2017/07/19/10/33/avalanche-2518679_1280.jpg'
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
