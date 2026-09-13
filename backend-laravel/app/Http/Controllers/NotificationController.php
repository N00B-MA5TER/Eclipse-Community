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
            $lastId = '';
            
            while (true) {
                if (connection_aborted()) {
                    break;
                }

                $query = Notification::where(function($q) use ($userId, $role) {
                    $q->where('userId', $userId)
                      ->orWhere(function($sub) use ($role) {
                          $sub->whereNull('userId')->where('targetRole', $role);
                      });
                });

                if ($lastId !== '') {
                    $query->where('_id', '>', $lastId); // Assuming object ID or string sorting
                }
                
                $notifications = $query->orderBy('createdAt', 'asc')->get();
                
                if ($notifications->count() > 0) {
                    $formatted = $notifications->map(function($notif) {
                        return [
                            'id' => (string) $notif->id,
                            'userId' => $notif->userId ? (string) $notif->userId : 'admin',
                            'title' => $notif->title,
                            'message' => $notif->message,
                            'type' => $notif->type,
                            'read' => (bool) $notif->read,
                            'link' => $notif->link,
                            'createdAt' => $notif->createdAt,
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
            $query->where('userId', $userId)
                  ->orWhere(function($q) use ($role) {
                      $q->whereNull('userId')->where('targetRole', $role);
                  });
        })->orderBy('createdAt', 'desc')->get()->map(function($notif) {
            return [
                'id' => (string) $notif->id,
                'userId' => $notif->userId ? (string) $notif->userId : 'admin',
                'title' => $notif->title,
                'message' => $notif->message,
                'type' => $notif->type,
                'read' => (bool) $notif->read,
                'link' => $notif->link,
                'createdAt' => $notif->createdAt,
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
            Notification::whereIn('_id', $ids)
                ->where(function($query) use ($userId, $role) {
                    $query->where('userId', $userId)
                        ->orWhere(function($q) use ($role) {
                            $q->whereNull('userId')->where('targetRole', $role);
                        });
                })->update(['read' => true]);
        }

        return response()->json(['message' => 'Notifications marked as read'], 200);
    }
}
