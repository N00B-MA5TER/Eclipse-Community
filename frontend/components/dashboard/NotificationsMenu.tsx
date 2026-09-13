"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Check, Users, ShieldAlert, Info, X } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth";
import Link from "next/link";

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  link?: string;
  createdAt: any;
}

export function NotificationsMenu({ isAdmin = false }: { isAdmin?: boolean }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [toastNotif, setToastNotif] = useState<Notification | null>(null);
  const isInitialRender = useRef(true);
  const prevNotifsRef = useRef<Notification[]>([]);

  useEffect(() => {
    let isMounted = true;
    let pollInterval: NodeJS.Timeout;

    const fetchNotifications = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';
        
        const res = await fetch(`${apiUrl}/notifications`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch notifications");

        const data = await res.json();
        
        if (isMounted) {
          setNotifications(data);
          
          if (isInitialRender.current) {
            isInitialRender.current = false;
          } else {
            const oldIds = new Set(prevNotifsRef.current.map(n => n.id));
            const newNotifs = data.filter((n: Notification) => !oldIds.has(n.id) && !n.read);
            if (newNotifs.length > 0) {
              setToastNotif(newNotifs[0]);
              setTimeout(() => setToastNotif(null), 5000);
            }
          }
          prevNotifsRef.current = data;
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    fetchNotifications();
    pollInterval = setInterval(fetchNotifications, 5000);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, [user, isAdmin]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = async (id: string) => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';
      await fetch(`${apiUrl}/notifications/mark-read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: [id] })
      });
      // socket event will trigger re-fetch
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;
    try {
      const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
      if (unreadIds.length === 0) return;
      
      const token = await user.getIdToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';
      await fetch(`${apiUrl}/notifications/mark-read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: unreadIds })
      });
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'team_join_request': return <Users className="w-4 h-4 text-blue-500" />;
      case 'team_full': return <ShieldAlert className="w-4 h-4 text-purple-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 flex items-center justify-center border border-black bg-white text-black hover:bg-neutral-100 transition-smooth" type="button"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#22c55e] border border-black"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-black shadow-[4px_4px_0px_0px_#000000] overflow-hidden z-50 flex flex-col max-h-[80vh]">
          <div className="p-4 border-b border-black bg-neutral-100 flex items-center justify-between sticky top-0 z-10">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-black">Notifications</h3>
              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mt-1">{unreadCount} unread</p>
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-[10px] font-mono font-bold uppercase tracking-wider text-black hover:bg-[#00e599] border border-black px-2.5 py-1.5 rounded-none transition-colors"
              >
                Mark Read
              </button>
            )}
          </div>
          
          <div className="overflow-y-auto overflow-x-hidden flex-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                  <Bell className="w-5 h-5 text-gray-300" />
                </div>
                <p className="text-[13px] font-medium">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-4 transition-colors hover:bg-gray-50 flex gap-3 relative group ${!notif.read ? 'bg-blue-50/30' : ''}`}
                    onClick={() => {
                      if (!notif.read) markAsRead(notif.id);
                    }}
                  >
                    {!notif.read && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                    )}
                    
                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                      {getIcon(notif.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0 pr-4">
                      {notif.link ? (
                        <Link href={notif.link} className="block group-hover:text-blue-600 transition-colors">
                          <p className="text-[13px] font-bold text-gray-900 mb-0.5 truncate">{notif.title}</p>
                        </Link>
                      ) : (
                        <p className="text-[13px] font-bold text-gray-900 mb-0.5 truncate">{notif.title}</p>
                      )}
                      
                      <p className="text-[12px] text-gray-600 leading-snug line-clamp-2">{notif.message}</p>
                      
                      <p className="text-[10px] font-medium text-gray-400 mt-2">
                        {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : new Date().toLocaleString()}
                      </p>
                    </div>

                    {!notif.read && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notif.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 absolute right-4 top-4 p-1.5 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-blue-500 hover:border-blue-200 transition-all shadow-sm"
                        title="Mark as read"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Toast Popup for New Notifications */}
      {toastNotif && (
        <div className="fixed top-24 right-8 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
          <div className="p-4 flex gap-3 relative cursor-pointer" onClick={() => { setIsOpen(true); setToastNotif(null); }}>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
            <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
              {getIcon(toastNotif.type)}
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <p className="text-[13px] font-bold text-gray-900 mb-0.5 truncate">{toastNotif.title}</p>
              <p className="text-[12px] text-gray-600 leading-snug line-clamp-2">{toastNotif.message}</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setToastNotif(null); }}
              className="absolute right-4 top-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
