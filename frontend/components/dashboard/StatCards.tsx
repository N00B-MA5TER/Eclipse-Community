"use client";

import Link from "next/link";
import { useAuth } from "@/lib/firebase/auth";
import { useEffect, useState } from "react";
import { Calendar, Users, Component } from "lucide-react";

export function StatCards() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    eventsRegistered: 0,
    activeTeams: 0,
    upcomingDeadlines: 0,
  });

  // Placeholder for fetching real stats
  useEffect(() => {
    // In a real app, fetch these from /api/users/stats
    setStats({
      eventsRegistered: 1,
      activeTeams: 1,
      upcomingDeadlines: 2,
    });
  }, [user]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6" data-purpose="active-team-preview">
      {/* Card 1: Team Status Card */}
      <div className="bg-white p-6 rounded-none border border-black shadow-[3px_3px_0px_0px_#000000] flex flex-col justify-between relative">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">ASSIGNED TEAM</span>
            <h4 className="font-editorial-serif text-xl font-bold text-black">Apex Innovators</h4>
          </div>
          <div className="w-9 h-9 rounded-none bg-neutral-100 border border-black flex items-center justify-center font-mono font-bold text-black text-xs">
            AI
          </div>
        </div>
        <div className="pt-4 mt-4 border-t border-neutral-200 flex items-center justify-between">
          <p className="text-xs font-mono font-medium text-black flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#f59e0b] border border-black animate-pulse"></span>
            <span>Sprint 3 in Progress</span>
          </p>
          <span className="text-[10px] font-mono text-neutral-400">STAGE 03</span>
        </div>
      </div>
      
      {/* Card 2: Mentorship & Review */}
      <div className="bg-white p-6 rounded-none border border-black shadow-[3px_3px_0px_0px_#000000] flex flex-col justify-between relative">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">NEXT MENTORSHIP</span>
            <h4 className="font-editorial-serif text-xl font-bold text-black">Design System Audit</h4>
          </div>
          <div className="w-9 h-9 rounded-none bg-neutral-100 border border-black flex items-center justify-center text-black">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="pt-4 mt-4 border-t border-neutral-200 flex items-center justify-between">
          <p className="text-xs font-mono font-semibold text-black">Tomorrow at 10:30 AM</p>
          <span className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 text-[10px] font-mono uppercase">CONFIRMED</span>
        </div>
      </div>

      {/* Card 3: Submissions Quick Banner (Jet Black Block with Acid Green Progress) */}
      <div className="bg-black text-white p-6 rounded-none border border-black shadow-[3px_3px_0px_0px_#f59e0b] flex flex-col justify-between relative">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold text-[#f59e0b] uppercase tracking-widest">SUBMISSION PORTAL</span>
            <span className="text-[10px] font-mono text-neutral-400">DUE IN 4 DAYS</span>
          </div>
          <h4 className="font-editorial-serif text-xl font-bold text-white mb-2">Project Deck V2</h4>
          
          {/* Progress bar with acid green fill */}
          <div className="w-full bg-neutral-800 rounded-none h-1.5 overflow-hidden my-3 border border-neutral-700">
            <div className="bg-[#f59e0b] h-full w-[65%]"></div>
          </div>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <span className="text-[11px] font-mono text-neutral-400">Review pending</span>
          <Link href="/dashboard/submissions" className="px-4 py-1.5 rounded-none bg-[#f59e0b] hover:bg-white text-black text-xs font-mono font-bold uppercase tracking-wider transition-smooth shrink-0 border border-black">
            Submit
          </Link>
        </div>
      </div>
    </section>
  );
}
