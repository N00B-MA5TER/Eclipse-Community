<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained('teams')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('role', ['leader', 'member'])->default('member');
            $table->timestamps();

            $table->unique(['team_id', 'user_id']);
            // A user may only belong to one team at a time, platform-wide.
            $table->unique('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};
