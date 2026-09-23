"use client";

import { Calendar, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/firebase/auth";

export function ScheduleWidget() {
  const { user } = useAuth();
  const [events, setEvents] = useState<any[]>([]);

  const fetchEvents = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';
      
      const res = await fetch(`${apiUrl}/events`, { headers });
      if (res.ok) {
        const data = await res.json();
        // Assuming ownerId filter equivalent or just getting some user events
        const userEvents = data.filter((e: any) => e.ownerId === user.uid);
        userEvents.sort((a: any, b: any) => {
          const timeA = new Date(a.startTime || 0).getTime();
          const timeB = new Date(b.startTime || 0).getTime();
          return timeA - timeB;
        });
        setEvents(userEvents);
      }
    } catch (error) {
      console.error("Failed to fetch schedule events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();

    const __poll = setInterval(fetchEvents, 10000);
    
    return () => {
      clearInterval(__poll);
    };
  }, [user]);

  const displayEvents = events.length > 0 ? events : [
    { id: 1, title: "Kickoff Meeting", time: "01:00 PM to 02:30 PM", color: "bg-amber-500", avatars: ["https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=5"] },
    { id: 2, title: "Create Wordpress website for event Registration", time: "04:00 PM to 02:30 PM", color: "bg-blue-500", avatars: ["https://i.pravatar.cc/150?u=6", "https://i.pravatar.cc/150?u=7"] },
    { id: 3, title: "Create User flow for hotel booking", time: "05:00 PM to 02:30 PM", color: "bg-purple-500", avatars: ["https://i.pravatar.cc/150?u=8", "https://i.pravatar.cc/150?u=9"] }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-900 font-bold">
          <Calendar className="w-5 h-5" />
          Schedule
        </div>
        <button className="text-gray-400 hover:text-gray-900 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Week Calendar */}
      <div className="flex justify-between border-b border-gray-50 pb-4 mb-4">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, i) => (
          <div key={day} className={`flex flex-col items-center justify-center w-10 h-12 rounded-xl ${i === 2 ? 'bg-fuchsia-200 text-fuchsia-900' : 'text-gray-500'}`}>
            <span className="text-[11px] font-bold">{day}</span>
            <span className={`text-[13px] font-bold ${i === 2 ? 'text-fuchsia-900' : 'text-gray-900'}`}>{15 + i}</span>
          </div>
        ))}
      </div>

      {/* Events List */}
      <div className="flex flex-col gap-5">
        {displayEvents.map((evt) => (
          <div key={evt.id} className="flex items-start gap-4 group">
            <div className={`w-1.5 h-10 rounded-full ${evt.color} mt-1`}></div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-[13px] font-bold text-gray-800 mb-1">{evt.title}</h4>
                  <p className="text-[11px] font-bold text-gray-400">{evt.time}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex -space-x-1.5">
                    {evt.avatars.map((avatar: string, i: number) => (
                      <img key={i} src={avatar} className="w-5 h-5 rounded-full border border-white" alt="Participant" />
                    ))}
                  </div>
                  <button className="text-gray-400 hover:text-gray-900">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
