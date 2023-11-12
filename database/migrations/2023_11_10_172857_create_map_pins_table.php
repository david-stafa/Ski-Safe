<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('map_pins', function (Blueprint $table) {
            $table->id();
            $table->varchar('title');
            $table->text('description');
            $table->unsignedBigInteger('category_id'); 
            $table->unsignedBigInteger('type_id'); 
            $table->unsignedBigInteger('creator_id'); 
            $table->float('latitude');
            $table->float('longitude');
            $table->varchar('images');
            $table->timestamps(); 

           
            $table->foreign('category_id')->references('id')->on('pin_categories');
            $table->foreign('type_id')->references('id')->on('pin_severity');
            $table->foreign('creator_id')->references('id')->on('users');
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('map_pins');
    }
};
