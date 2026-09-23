"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface MiniCalendarProps {
  calendarDate: Date;
  today: Date;
  monthNames: string[];
  daysInMonth: number;
  firstDayOfMonth: number;
  prevMonth: () => void;
  nextMonth: () => void;
  hasEventOnDate: (day: number) => boolean;
}

export default function MiniCalendar({
  calendarDate,
  today,
  monthNames,
  daysInMonth,
  firstDayOfMonth,
  prevMonth,
  nextMonth,
  hasEventOnDate
}: MiniCalendarProps) {
  return (
    <div className="bg-neutral-50 border-b border-black -mx-6 sm:-mx-8 px-6 sm:px-8 py-6 mb-6">
      <div className="max-w-md mx-auto bg-white border border-black p-4 shadow-[4px_4px_0px_0px_#000000]">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-black">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center border border-black hover:bg-black hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-editorial-serif text-lg font-bold uppercase tracking-widest">
            {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
          </span>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center border border-black hover:bg-black hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d} className="text-neutral-500">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === today.getDate() && calendarDate.getMonth() === today.getMonth() && calendarDate.getFullYear() === today.getFullYear();
            const hasEvent = hasEventOnDate(day);
            
            return (
              <div key={day} className={`aspect-square flex items-center justify-center border font-mono text-xs font-bold transition-colors ${
                isToday ? 'bg-black text-white border-black' :
                hasEvent ? 'bg-[#f59e0b]/20 text-black border-[#f59e0b]' :
                'bg-white text-neutral-600 border-transparent hover:border-black'
              }`}>
                {day}
              </div>
            )
          })}
        </div>
        <div className="mt-4 pt-3 border-t border-black/10 flex items-center gap-4 text-[9px] font-mono uppercase tracking-widest text-neutral-500">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-black"></div> Today</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#f59e0b]/20 border border-[#f59e0b]"></div> Has Event</div>
        </div>
      </div>
    </div>
  );
}
