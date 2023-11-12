<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PinSeverityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('pin_severities')->insert([
            ['name' => 'Low'],
            ['name' => 'Moderate'],
            ['name' => 'Severe'],
           
        ]);
    }

}
