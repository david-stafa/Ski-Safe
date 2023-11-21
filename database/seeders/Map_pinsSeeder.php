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
                'longitude' => -140.366182,
                // -117.23 with aberration 0.06
                'latitude' => 60.635321,
                // 52.16 with aberration 0.06
                'title' => 'Gondola Gully',
                'severity_id' => 1,
                "type_id" => 2,
                // number 1, 2, or 3
                'slug' => 'Gondola Gully',
                'description' => 'Lift waiting times',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2013/04/01/21/33/ski-lift-99315_1280.png'
            ],
            [
                'longitude' => -140.226386,
                // -117.23 with aberration 0.06
                'latitude' => 60.581963,
                // 52.16 with aberration 0.06
                'title' => 'Crevasse Chair',
                'severity_id' => 1,
                "type_id" => 2,
                // number 1, 2, or 3
                'slug' => 'Crevasse Chair',
                'description' => 'Lift waiting times',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2013/04/01/21/33/ski-lift-99315_1280.png'
            ],
            [
                'longitude' => -140.316840,
                // -117.23 with aberration 0.06
                'latitude' => 60.631233,
                // 52.16 with aberration 0.06
                'title' => 'Logans Lift',
                'severity_id' => 1,
                "type_id" => 2,
                // number 1, 2, or 3
                'slug' => 'Logans Lift',
                'description' => 'Lift waiting times',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2013/04/01/21/33/ski-lift-99315_1280.png'
            ],
            [
                'longitude' => -140.316840,
                // -117.23 with aberration 0.06
                'latitude' => 60.631233,
                // 52.16 with aberration 0.06
                'title' => 'Relaxing Ridge',
                'severity_id' => 1,
                "type_id" => 2,
                // number 1, 2, or 3
                'slug' => 'Relaxing Ridge',
                'description' => 'Lift waiting times',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2013/04/01/21/33/ski-lift-99315_1280.png'
            ],
            [
                'longitude' => -140.236054,
                // -117.23 with aberration 0.06
                'latitude' => 60.637602,
                // 52.16 with aberration 0.06
                'title' => 'Turbulent T-Bars',
                'severity_id' => 1,
                "type_id" => 2,
                // number 1, 2, or 3
                'slug' => 'Turbulent T-Bars',
                'description' => 'Lift waiting times',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2013/04/01/21/33/ski-lift-99315_1280.png'
            ],
            [
                'longitude' => -140.404811,
                // -117.23 with aberration 0.06
                'latitude' => 60.568208,
                // 52.16 with aberration 0.06
                'title' => 'Icy Surface',
                'severity_id' => 2,
                "type_id" => 1,
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
                'severity_id' => 4,
                "type_id" => 1,
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
                'severity_id' => 4,
                "type_id" => 1,
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
                'severity_id' => 2,
                "type_id" => 1,
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
                'severity_id' => 4,
                "type_id" => 1,
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
                "type_id" => 1,
                'severity_id' => 3,
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

                'severity_id' => 3,
                "type_id" => 1,
                // number 1, 2, or 3
                'slug' => 'Slow: Debis in the area',
                'description' => 'An avalance last tuesday morning has left substantial debis, skiing is technical and dangerous. Experts only.',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2017/07/19/10/33/avalanche-2518679_1280.jpg'
            ],
            [
                'longitude' => -140.405911,
                // -117.23 with aberration 0.06
                'latitude' => 60.623059,
                // 52.16 with aberration 0.06
                'title' => 'Natural Half Pipe',

                'severity_id' => 1,
                "type_id" => 3,
                // number 1, 2, or 3
                'slug' => 'Great natural half pipe!',
                'description' => 'Me and my buddies rode here all day! We left a few nice kickers around, have fun!',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2016/01/26/00/26/canazei-1161799_1280.jpg'
            ],
            [
                'longitude' => -140.424205,
                // -117.23 with aberration 0.06
                'latitude' => 60.562849,
                // 52.16 with aberration 0.06
                'title' => 'Backcounrty Pow!',

                'severity_id' => 1,
                "type_id" => 3,
                // number 1, 2, or 3
                'slug' => 'Awesome Powdery Run!',
                'description' => 'Reall amazing conditions here! Careful not to venture onto the eastern aspect, I saw on the hazards filter that the avalanche hazard is high there. Peace!',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2019/03/19/19/22/snow-4066640_1280.jpg'
            ],
            [
                'longitude' => -140.291508,
                // -117.23 with aberration 0.06
                'latitude' => 60.644705,
                // 52.16 with aberration 0.06
                'title' => 'Snowball Fight',

                'severity_id' => 1,
                "type_id" => 3,
                // number 1, 2, or 3
                'slug' => 'FIGHT!!',
                'description' => 'Huge snowballfight at the kiddies slope, come on down...If you dare!',
                'active' => true,
                'images' => 'https://cdn.pixabay.com/photo/2014/12/23/14/57/snowball-fight-578445_1280.jpg'
            ],

        ];


        foreach ($map_pins as $pin) {
            $map_pin = new Map_pin();
            $map_pin->longitude = $pin['longitude'];
            $map_pin->latitude = $pin['latitude'];
            $map_pin->title = $pin['title'];
            $map_pin->type_id = $pin['type_id'];
            $map_pin->severity_id = $pin['severity_id'];
            $map_pin->slug = $pin['slug'];
            $map_pin->description = $pin['description'];
            $map_pin->active = $pin['active'];
            $map_pin->images = $pin['images'];
            $map_pin->save();
        }
    }
}
