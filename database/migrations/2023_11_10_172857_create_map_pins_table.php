<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('map_pins', function (Blueprint $table) {
            $table->id();
            $table->float('longitude');
            $table->float('latitude');
            $table->string('title');
            $table->unsignedBigInteger('severity_id');
            $table->string('slug');
            $table->text('description');
            $table->unsignedBigInteger('type_id')->nullable();
            $table->unsignedBigInteger('creator_id')->nullable();
            $table->string('video')->nullable();
            $table->string('images')->nullable();
            $table->boolean('active');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('map_pins');
    }
};
