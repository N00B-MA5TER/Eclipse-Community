"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, Component, ChevronRight, Clock, ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const MiniCalendar = dynamic(() => import("@/components/dashboard/MiniCalendar"), { ssr: false });

export function UpcomingEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api'}/events`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();

    const __poll = setInterval(fetchEvents, 10000);
    
    return () => {
      clearInterval(__poll);
    };
  }, []);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const upcomingEvents = events.filter(evt => {
    const evtDate = new Date(evt.date);
    return evtDate >= today && evt.status !== 'Completed';
  });

  const completedEvents = events.filter(evt => {
    const evtDate = new Date(evt.date);
    return evtDate < today || evt.status === 'Completed';
  });

  // Calendar Helpers
  const daysInMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  const nextMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));

  const hasEventOnDate = (day: number) => {
    const dateToCheck = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
    return events.some(evt => {
      const evtDate = new Date(evt.date);
      return evtDate.getDate() === dateToCheck.getDate() && 
             evtDate.getMonth() === dateToCheck.getMonth() && 
             evtDate.getFullYear() === dateToCheck.getFullYear();
    });
  };

  const renderEventRow = (evt: any, isCompleted: boolean) => {
    const dateObj = new Date(evt.date);
    return (
      <div key={evt.id} className={`py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-neutral-50 -mx-4 px-4 transition-smooth border-b border-black/10 last:border-0 ${isCompleted ? 'opacity-80 hover:opacity-100' : ''}`}>
        {/* Left: Date + Main Info */}
        <div className="flex items-center gap-5">
          <div className={`w-14 h-16 rounded-none bg-black text-white flex flex-col items-center justify-center shrink-0 border border-black ${isCompleted ? 'shadow-[2px_2px_0px_0px_#737373]' : 'shadow-[2px_2px_0px_0px_#f59e0b]'}`}>
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest leading-tight ${isCompleted ? 'text-neutral-400' : 'text-[#f59e0b]'}`}>
              {dateObj.toLocaleString('default', { month: 'short' })}
            </span>
            <span className="font-editorial-serif text-2xl font-bold leading-none mt-0.5">
              {dateObj.getDate() || '--'}
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-neutral-100 text-black border border-black uppercase tracking-wider">
                {evt.type || 'Event'}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider ${
                isCompleted 
                  ? 'bg-neutral-100 border border-neutral-300 text-neutral-500' 
                  : 'bg-[#f59e0b]/15 border border-[#f59e0b] text-black'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-neutral-400' : 'bg-[#f59e0b] animate-ping'}`}></span>
                {isCompleted ? 'Completed' : (evt.status || 'Upcoming')}
              </span>
            </div>
            <h3 className={`font-editorial-serif text-xl sm:text-2xl font-bold text-black group-hover:text-[#f59e0b] group-hover:bg-black group-hover:px-1 inline-block transition-all ${isCompleted ? 'line-through decoration-black/30' : ''}`}>
              {evt.title}
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-black" />
              <span>{evt.time || "TBD"}</span>
            </div>
          </div>
        </div>

        {/* Right: Stats & Action Button */}
        <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10 border-t md:border-t-0 pt-4 md:pt-0 border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-none bg-neutral-100 border border-neutral-300 flex items-center justify-center text-black">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">Participants</p>
              <p className="font-editorial-serif text-xl font-bold text-black">{Math.max(0, evt.registeredCount || 0)}</p>
            </div>
          </div>
          <div className="h-8 w-px bg-neutral-200 hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-none bg-neutral-100 border border-neutral-300 flex items-center justify-center text-black">
              <Component className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">Teams</p>
              <p className="font-editorial-serif text-xl font-bold text-black">{Math.max(0, evt.teamCount || 0)}</p>
            </div>
          </div>
          <Link href={`/dashboard/events/${evt.id}`} className="w-9 h-9 rounded-none bg-black hover:bg-[#f59e0b] text-white hover:text-black border border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000000] hover:shadow-none transition-smooth shrink-0 ml-2">
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className="relative bg-white border border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_#000000]" data-purpose="upcoming-events-container">
      {/* Architectural Corner Crosshairs */}
      <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-black"></div>
      <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-black"></div>
      <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-black"></div>
      <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-black"></div>
      
      {/* Events Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-none bg-black text-white flex items-center justify-center border border-black">
            <Calendar className="w-5 h-5 text-[#f59e0b]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-editorial-serif text-2xl font-bold tracking-tight text-black">Event Schedule</h2>
              <span className="w-1.5 h-1.5 bg-[#f59e0b]"></span>
            </div>
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Track your upcoming & past workshops</p>
          </div>
        </div>
        {/* View Calendar Button */}
        <button 
          onClick={() => setShowCalendar(!showCalendar)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-none text-xs font-mono uppercase tracking-wider font-bold border border-black transition-smooth ${showCalendar ? 'bg-black text-white shadow-none' : 'text-black bg-white hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_#000000]'}`} 
          type="button"
        >
          <span>{showCalendar ? 'Hide Calendar' : 'View Calendar'}</span>
          {!showCalendar && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Mini Calendar View */}
      {showCalendar && (
        <MiniCalendar 
          calendarDate={calendarDate}
          today={today}
          monthNames={monthNames}
          daysInMonth={daysInMonth}
          firstDayOfMonth={firstDayOfMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          hasEventOnDate={hasEventOnDate}
        />
      )}
      
      {/* Event Rows List */}
      <div className="mt-6 space-y-10">
        
        {/* Upcoming Section */}
        <div>
          <h3 className="font-mono text-xs font-bold text-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#f59e0b]"></span> Upcoming Events
          </h3>
          <div className="border-t border-black/10">
            {upcomingEvents.length === 0 ? (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <p className="text-[12px] font-mono text-neutral-500 uppercase tracking-widest">No upcoming events found</p>
              </div>
            ) : (
              upcomingEvents.map(evt => renderEventRow(evt, false))
            )}
          </div>
        </div>

        {/* Completed Section */}
        <div>
          <h3 className="font-mono text-xs font-bold text-black uppercase tracking-widest mb-4 flex items-center gap-2 opacity-70">
            <span className="w-2 h-2 bg-neutral-400"></span> Completed Events
          </h3>
          <div className="border-t border-black/10">
            {completedEvents.length === 0 ? (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <p className="text-[12px] font-mono text-neutral-500 uppercase tracking-widest">No completed events found</p>
              </div>
            ) : (
              completedEvents.map(evt => renderEventRow(evt, true))
            )}
          </div>
        </div>

      </div>

      {/* Bottom Micro-Caption in Event Card */}
      <div className="mt-8 pt-3 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
        <span className="flex items-center gap-1.5 text-black font-semibold">
          <span className="w-1.5 h-1.5 bg-[#f59e0b]"></span>
          PROGRAM STATUS : SYNCHRONIZED
        </span>
        <span className="text-neutral-400">UPCOMING: {upcomingEvents.length} // COMPLETED: {completedEvents.length}</span>
      </div>
    </section>
  );
}
