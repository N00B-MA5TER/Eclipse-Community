<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminAlumniController extends Controller
{
    public function pending(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden: Admin access required'], 403);
        }

        $pending = Alumni::where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($alumni) {
                return [
                    'id' => (string) $alumni->id,
                    'photo_url' => $alumni->photo ? Storage::url($alumni->photo) : null,
                    'name' => $alumni->name,
                    'department' => $alumni->department,
                    'graduation_year' => $alumni->graduation_year,
                    'current_role' => $alumni->current_role,
                    'status' => $alumni->status,
                    'created_at' => $alumni->created_at,
                ];
            });

        return response()->json($pending, 200);
    }

    public function approve(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden: Admin access required'], 403);
        }

        $alumni = Alumni::find($id);
        if (!$alumni) {
            return response()->json(['error' => 'Alumni record not found'], 404);
        }

        $alumni->status = 'approved';
        $alumni->save();

        return response()->json(['message' => 'Alumni approved successfully'], 200);
    }

    public function reject(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden: Admin access required'], 403);
        }

        $alumni = Alumni::find($id);
        if (!$alumni) {
            return response()->json(['error' => 'Alumni record not found'], 404);
        }

        $alumni->status = 'rejected';
        $alumni->save();

        return response()->json(['message' => 'Alumni rejected successfully'], 200);
    }

    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden: Admin access required'], 403);
        }

        $all = Alumni::orderBy('created_at', 'desc')
            ->get()
            ->map(function ($alumni) {
                return [
                    'id' => (string) $alumni->id,
                    'photo_url' => $alumni->photo ? Storage::url($alumni->photo) : null,
                    'name' => $alumni->name,
                    'department' => $alumni->department,
                    'graduation_year' => $alumni->graduation_year,
                    'current_role' => $alumni->current_role,
                    'status' => $alumni->status,
                    'created_at' => $alumni->created_at,
                ];
            });

        return response()->json($all, 200);
    }

    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden: Admin access required'], 403);
        }

        $alumni = Alumni::find($id);
        if (!$alumni) {
            return response()->json(['error' => 'Alumni record not found'], 404);
        }

        // Delete photo from storage if it exists
        if ($alumni->photo) {
            Storage::disk('public')->delete($alumni->photo);
        }

        $alumni->delete();

        return response()->json(['message' => 'Alumni deleted successfully'], 200);
    }
}
