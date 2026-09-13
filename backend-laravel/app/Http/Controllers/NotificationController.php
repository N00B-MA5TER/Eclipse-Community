<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function stream(Request $request)
    {
        $userId = $request->user()->id;
        $role = $request->user()->role;

        return response()->stream(function () use ($userId, $role) {
            $lastId = 0;

            while (true) {
                if (connection_aborted()) {
                    break;
                }

                $query = Notification::where(function($q) use ($userId, $role) {
                    $q->where('user_id', $userId)
                      ->orWhere(function($sub) use ($role) {
                          $sub->whereNull('user_id')->where('target_role', $role);
                      });
                });

                if ($lastId !== 0) {
                    $query->where('id', '>', $lastId);
                }

                $notifications = $query->orderBy('created_at', 'asc')->get();

                if ($notifications->count() > 0) {
                    $formatted = $notifications->map(function($notif) {
                        return [
                            'id' => (string) $notif->id,
                            'userId' => $notif->user_id ? (string) $notif->user_id : 'admin',
                            'title' => $notif->title,
                            'message' => $notif->message,
                            'type' => $notif->type,
                            'read' => (bool) $notif->read,
                            'link' => $notif->link,
                            'createdAt' => $notif->created_at,
                        ];
                    });

                    echo "data: " . json_encode($formatted) . "\n\n";
                    ob_flush();
                    flush();

                    $lastId = $notifications->last()->id;
                }

                sleep(2); // Poll every 2 seconds
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'Connection' => 'keep-alive',
        ]);
    }

    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $role = $request->user()->role;

        $notifications = Notification::where(function($query) use ($userId, $role) {
            $query->where('user_id', $userId)
                  ->orWhere(function($q) use ($role) {
                      $q->whereNull('user_id')->where('target_role', $role);
                  });
        })->orderBy('created_at', 'desc')->get()->map(function($notif) {
            return [
                'id' => (string) $notif->id,
                'userId' => $notif->user_id ? (string) $notif->user_id : 'admin',
                'title' => $notif->title,
                'message' => $notif->message,
                'type' => $notif->type,
                'read' => (bool) $notif->read,
                'link' => $notif->link,
                'createdAt' => $notif->created_at,
            ];
        });

        return response()->json($notifications, 200);
    }

    public function markRead(Request $request)
    {
        $userId = $request->user()->id;
        $role = $request->user()->role;

        $ids = $request->input('ids', []);

        if (!empty($ids)) {
            Notification::whereIn('id', $ids)
                ->where(function($query) use ($userId, $role) {
                    $query->where('user_id', $userId)
                        ->orWhere(function($q) use ($role) {
                            $q->whereNull('user_id')->where('target_role', $role);
                        });
                })->update(['read' => true]);
        }

        return response()->json(['message' => 'Notifications marked as read'], 200);
    }
}
