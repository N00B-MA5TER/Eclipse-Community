"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Award, ChevronRight, Trophy, Users, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  registeredCount: number;
  teamCount: number;
}

export default function AchievementsPage() {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';
        const res = await fetch(`${apiUrl}/events`);
        if (!res.ok) throw new Error('Failed to fetch events');
        
        const events: EventData[] = await res.json();
        const hackathon = events.find(e => e.title.toLowerCase().includes('zero to hackathon'));
        
        if (hackathon) {
          setEventData(hackathon);
        }
      } catch (error) {
        console.error("Error fetching achievements data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "August 2026";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-blue-100 :bg-blue-900/50 selection:text-blue-900 :text-blue-100 transition-colors duration-300">
      <Navbar />

      <main className="pt-32 pb-24 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-blue-50/50  border border-blue-100/50 text-black text-[11px] font-bold tracking-wide mb-6 shadow-none border border-black"
            >
              Our Milestones
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-4xl font-heading uppercase tracking-tight md:text-5xl font-heading uppercase tracking-tight font-extrabold text-gray-900  mb-6"
            >
              Achievements & <span className="text-black">Impact</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-neutral-600 font-mono text-xs uppercase tracking-wider  text-lg max-w-2xl mx-auto font-medium"
            >
              We measure our success by the scale of opportunities we provide. Here is the real-world impact we have created.
            </motion.p>
          </div>

          <div className="space-y-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-none animate-spin"></div>
              </div>
            ) : eventData ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white  rounded-[2.5rem] overflow-hidden shadow-none border border-black shadow-none border border-black-900/5  border border-black text-left border border-black  transition-all duration-300 w-full"
              >
                 <div className="p-8 md:p-12">
                   
                   {/* Main Event Header */}
                   <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 pb-10 border-b border-black ">
                     <div className="flex gap-6">
                       <div className="w-20 h-20 rounded-[1.25rem] bg-blue-50  flex items-center justify-center border border-black  shrink-0">
                         <Trophy className="w-10 h-10 text-black " />
                       </div>
                       <div>
                         <div className="inline-flex items-center justify-center px-3 py-1 mb-3 bg-blue-50  text-blue-700  font-bold text-[10px] uppercase tracking-wider rounded-none">
                           Successful Event
                         </div>
                         <h3 className="font-heading text-3xl font-heading uppercase tracking-tight md:text-4xl font-heading uppercase tracking-tight font-extrabold text-gray-900  capitalize leading-tight mb-2">
                           {eventData.title.toLowerCase()}
                         </h3>
                         <p className="text-base font-bold text-gray-400">{formatDate(eventData.date)}</p>
                       </div>
                     </div>
                     <Link href="/gallery" className="hidden md:flex shrink-0 items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-100  :bg-white text-gray-900  text-sm font-bold rounded-none transition-colors">
                       Event Gallery <ChevronRight className="w-4 h-4 text-gray-400" />
                     </Link>
                   </div>
                   
                   <p className="text-neutral-600 font-mono text-xs uppercase tracking-wider  text-lg leading-relaxed mb-12 font-medium max-w-3xl">
                     Our inaugural hackathon brought together brilliant minds to learn, collaborate, and build real-world projects over an intensive 48-hour period. The impact was incredible, fostering both community engagement and incredible technical teamwork.
                   </p>

                   {/* Embedded Stat Cards */}
                   <div className="grid md:grid-cols-2 gap-6">
                     
                     {/* Users Stat */}
                     <div className="bg-white  p-6 rounded-none border border-black  hover:border-emerald-200 :border-emerald-900/50 transition-colors">
                       <div className="flex items-center justify-between mb-4">
                         <div className="w-12 h-12 rounded-none bg-white  flex items-center justify-center shadow-none border border-black">
                           <Users className="w-6 h-6 text-emerald-600 " />
                         </div>
                         <div className="inline-flex items-center justify-center px-3 py-1.5 bg-emerald-100  text-emerald-700  font-bold text-xs rounded-none">
                           {eventData.registeredCount} Participants
                         </div>
                       </div>
                       <h4 className="font-heading text-xl font-extrabold text-gray-900  mb-2">Community Engagement</h4>
                       <p className="text-sm font-medium text-neutral-600 font-mono text-xs uppercase tracking-wider  leading-relaxed">
                         Students from across the campus actively joined our platform to participate in the hackathon, creating a vibrant technical community.
                       </p>
                     </div>

                     {/* Teams Stat */}
                     <div className="bg-white  p-6 rounded-none border border-black  hover:border-purple-200 :border-purple-900/50 transition-colors relative overflow-hidden">
                       <div className="flex items-center justify-between mb-4 relative z-10">
                         <div className="w-12 h-12 rounded-none bg-white  flex items-center justify-center shadow-none border border-black">
                           <Award className="w-6 h-6 text-purple-600 " />
                         </div>
                         <div className="inline-flex items-center justify-center px-3 py-1.5 bg-purple-100  text-purple-700  font-bold text-xs rounded-none">
                           {eventData.teamCount} Teams Formed
                         </div>
                       </div>
                       <h4 className="font-heading text-xl font-extrabold text-gray-900  mb-2 relative z-10">Team Collaboration</h4>
                       <p className="text-sm font-medium text-neutral-600 font-mono text-xs uppercase tracking-wider  leading-relaxed mb-6 relative z-10">
                         Brilliant minds grouped together to brainstorm, collaborate, and build innovative real-world projects during the event.
                       </p>
                       <Link href="/gallery/teams" className="inline-flex items-center text-purple-600  text-[13px] font-bold hover:underline gap-1 relative z-10">
                         View Teams <ChevronRight className="w-4 h-4" />
                       </Link>
                     </div>

                   </div>
                   
                   {/* Mobile Gallery Button */}
                   <Link href="/gallery" className="mt-8 flex md:hidden items-center justify-center gap-2 w-full px-6 py-4 bg-white  text-gray-900  text-sm font-bold rounded-none">
                     Event Gallery <ChevronRight className="w-4 h-4 text-gray-400" />
                   </Link>

                 </div>
              </motion.div>
            ) : (
              <div className="text-center py-20 text-neutral-600 font-mono text-xs uppercase tracking-wider  font-medium">
                No achievement data available at the moment.
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
