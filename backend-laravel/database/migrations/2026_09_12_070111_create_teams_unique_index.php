<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use MongoDB\Laravel\Schema\Blueprint;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::connection('mongodb')->table('teams', function (Blueprint $collection) {
            $collection->unique(['eventId', 'leader.uid'], 'event_leader_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mongodb')->table('teams', function (Blueprint $collection) {
            $collection->dropIndex('event_leader_unique');
        });
    }
};
