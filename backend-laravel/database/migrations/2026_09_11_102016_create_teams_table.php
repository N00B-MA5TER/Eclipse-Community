<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->onDelete('cascade');
            $table->string('name');
            $table->string('code')->unique();
            $table->foreignId('leader_id')->constrained('users')->onDelete('cascade');
            $table->integer('max_members');
            $table->string('project_link')->nullable();
            $table->timestamp('project_submitted_at')->nullable();
            $table->timestamps();
            
            // Allow same team name across different events, but unique per event
            $table->unique(['event_id', 'name']);

            // A user can lead at most one team per event
            $table->unique(['event_id', 'leader_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
