"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Award, ChevronRight, Trophy, Users, ArrowUpRight } from "lucide-react";
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
    <div className="min-h-screen bg-[#fcfbf9] text-[#0c111d] selection:bg-[#f59e0b] selection:text-[#0c111d] font-sans relative">
      <Navbar />

      <main className="pt-32 pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          <div className="mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#f59e0b] text-[#0c111d] font-mono-code font-black text-sm uppercase tracking-widest border-4 border-[#0c111d] shadow-[4px_4px_0px_0px_#0c111d] mb-8"
            >
              Our Milestones
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#0c111d] uppercase leading-[0.9] mb-8"
            >
              ACHIEVEMENTS<br />& IMPACT.
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono-code text-[#0c111d] text-base md:text-lg font-bold uppercase tracking-widest border-l-4 border-[#f59e0b] pl-6 py-2 max-w-3xl"
            >
              "We measure our success by the scale of opportunities we provide. Here is the real-world impact we have created."
            </motion.div>
          </div>

          <div className="space-y-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-[#0c111d] border-t-[#f59e0b] rounded-full animate-spin"></div>
              </div>
            ) : eventData ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white border-4 border-[#0c111d] shadow-[16px_16px_0px_0px_#f59e0b] w-full"
              >
                 <div className="p-8 md:p-12 lg:p-16">
                   
                   {/* Main Event Header */}
                   <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12 pb-12 border-b-4 border-[#0c111d]">
                     <div className="flex flex-col sm:flex-row gap-8">
                       <div className="w-24 h-24 bg-[#f59e0b] flex items-center justify-center border-4 border-[#0c111d] shadow-[6px_6px_0px_0px_#0c111d] shrink-0">
                         <Trophy className="w-12 h-12 text-[#0c111d]" />
                       </div>
                       <div>
                         <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 bg-[#0c111d] text-white font-mono-code font-black text-[10px] uppercase tracking-[0.2em]">
                           Successful Event
                         </div>
                         <h3 className="font-serif-display text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0c111d] leading-none mb-4">
                           {eventData.title}
                         </h3>
                         <p className="font-mono-code font-black text-[#f59e0b] text-sm uppercase tracking-widest">
                           {formatDate(eventData.date)}
                         </p>
                       </div>
                     </div>
                     <Link 
                        href="/gallery" 
                        className="hidden md:inline-flex group items-center justify-center gap-4 bg-white text-[#0c111d] px-6 py-4 font-mono-code font-black text-sm uppercase tracking-widest transition-all border-4 border-[#0c111d] shadow-[4px_4px_0px_0px_#0c111d] hover:shadow-[8px_8px_0px_0px_#0c111d] hover:-translate-y-1 hover:-translate-x-1 active:shadow-[0px_0px_0px_0px_#0c111d] active:translate-y-0 active:translate-x-0 shrink-0"
                     >
                       <span>Event Gallery</span>
                       <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                     </Link>
                   </div>
                   
                   <p className="font-mono-code font-bold uppercase tracking-wider text-sm md:text-base leading-relaxed mb-16 max-w-4xl border-l-4 border-[#0c111d] pl-6 text-gray-700">
                     Our inaugural hackathon brought together brilliant minds to learn, collaborate, and build real-world projects over an intensive 48-hour period. The impact was incredible, fostering both community engagement and incredible technical teamwork.
                   </p>

                   {/* Embedded Stat Cards */}
                   <div className="grid md:grid-cols-2 gap-8">
                     
                     {/* Users Stat */}
                     <div className="bg-white p-8 border-4 border-[#0c111d] shadow-[8px_8px_0px_0px_#0c111d] hover:shadow-[12px_12px_0px_0px_#0c111d] hover:-translate-y-1 transition-all">
                       <div className="flex items-center justify-between mb-8">
                         <div className="w-16 h-16 bg-white flex items-center justify-center border-4 border-[#0c111d]">
                           <Users className="w-8 h-8 text-[#0c111d]" />
                         </div>
                         <div className="inline-flex items-center justify-center px-4 py-2 bg-[#f59e0b] text-[#0c111d] font-mono-code font-black text-xs uppercase tracking-widest border-2 border-[#0c111d]">
                           {eventData.registeredCount} Participants
                         </div>
                       </div>
                       <h4 className="font-mono-code font-black text-2xl uppercase tracking-tight text-[#0c111d] mb-4">Community Engagement</h4>
                       <p className="font-mono-code font-bold text-xs uppercase tracking-wider text-gray-600 leading-relaxed">
                         Students from across the campus actively joined our platform to participate in the hackathon, creating a vibrant technical community.
                       </p>
                     </div>

                     {/* Teams Stat */}
                     <div className="bg-[#0c111d] text-white p-8 border-4 border-[#0c111d] shadow-[8px_8px_0px_0px_#f59e0b] hover:shadow-[12px_12px_0px_0px_#f59e0b] hover:-translate-y-1 transition-all flex flex-col">
                       <div className="flex items-center justify-between mb-8">
                         <div className="w-16 h-16 bg-[#f59e0b] flex items-center justify-center border-4 border-[#0c111d]">
                           <Award className="w-8 h-8 text-[#0c111d]" />
                         </div>
                         <div className="inline-flex items-center justify-center px-4 py-2 bg-white text-[#0c111d] font-mono-code font-black text-xs uppercase tracking-widest border-2 border-[#0c111d]">
                           {eventData.teamCount} Teams Formed
                         </div>
                       </div>
                       <h4 className="font-mono-code font-black text-2xl uppercase tracking-tight text-white mb-4">Team Collaboration</h4>
                       <p className="font-mono-code font-bold text-xs uppercase tracking-wider text-gray-400 leading-relaxed mb-8 grow">
                         Brilliant minds grouped together to brainstorm, collaborate, and build innovative real-world projects during the event.
                       </p>
                       <Link 
                          href="/gallery/teams" 
                          className="inline-flex items-center font-mono-code font-black text-[#f59e0b] text-sm uppercase tracking-widest hover:text-white transition-colors gap-2 group w-fit"
                       >
                         <span>View Teams</span>
                         <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                       </Link>
                     </div>

                   </div>
                   
                   {/* Mobile Gallery Button */}
                   <Link 
                      href="/gallery" 
                      className="mt-12 flex md:hidden group items-center justify-center gap-4 bg-white text-[#0c111d] w-full px-6 py-4 font-mono-code font-black text-sm uppercase tracking-widest transition-all border-4 border-[#0c111d] shadow-[4px_4px_0px_0px_#0c111d] active:shadow-[0px_0px_0px_0px_#0c111d] active:translate-y-1"
                   >
                     <span>Event Gallery</span>
                     <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                   </Link>

                 </div>
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-white border-4 border-[#0c111d] shadow-[8px_8px_0px_0px_#0c111d]">
                <div className="font-mono-code font-black text-[#0c111d] text-lg uppercase tracking-widest">
                  NO ACHIEVEMENT DATA AVAILABLE.
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
