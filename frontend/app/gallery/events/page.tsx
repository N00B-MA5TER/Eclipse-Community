"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function EventsGalleryPage() {
  const events = [
    {
      id: "zero-to-hackathon",
      title: "Zero to Hackathon",
      category: "WORKSHOP",
      date: "Aug 25-26, 2026",
      description: "A comprehensive journey from ideation to building and breaking real-world projects.",
      image: "/zero-to-hackathon/photos/20260825_151418.jpg",
      href: "/gallery/events/zero-to-hackathon"
    },
    {
      id: "sih-ideathon",
      title: "SIH 26' Ideathon",
      category: "COMPETITION",
      date: "Aug 12, 2026",
      description: "Students pitching initial concepts for Smart India Hackathon.",
      image: "/SIH_Internals/IMG_20260914_101939020.jpg",
      href: "/gallery/events/sih-ideathon"
    },
    {
      id: "ai-workshop",
      title: "AI Workshop Series",
      category: "WORKSHOP",
      date: "Sep 05, 2026",
      description: "Hands-on session building neural networks from scratch.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800&h=1000",
      href: "#"
    },
    {
      id: "design-sprint",
      title: "Design System Sprint",
      category: "HACKATHON",
      date: "Jul 22, 2026",
      description: "A 24-hour sprint focused on standardizing UI components across club projects.",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800&h=800",
      href: "#"
    },
    {
      id: "symposium",
      title: "Annual Tech Symposium",
      category: "CONFERENCE",
      date: "Jan 15, 2026",
      description: "Guest lectures, networking, and project showcases featuring alumni.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200&h=800",
      href: "#"
    }
  ];

  const bentoClasses = [
    "md:col-span-8 md:row-span-2 min-h-[450px] md:min-h-[550px]", 
    "md:col-span-4 md:row-span-2 min-h-[350px] md:min-h-[550px]", 
    "md:col-span-4 min-h-[400px]", 
    "md:col-span-4 min-h-[400px]",
    "md:col-span-4 min-h-[400px]"
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#0c111d] font-sans selection:bg-[#f59e0b] selection:text-[#0c111d] transition-colors duration-300">
      <Navbar />

      <main className="pt-32 pb-24 min-h-screen relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-[#0c111d] pb-12">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#f59e0b] text-[#0c111d] font-mono-code font-black text-sm uppercase tracking-widest border-4 border-[#0c111d] shadow-[4px_4px_0px_0px_#0c111d] mb-6"
              >
                Gallery Archives
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#0c111d] uppercase leading-[0.9]"
              >
                EVENT<br className="hidden md:block" />
                MOMENTS.
              </motion.h1>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#0c111d] font-mono-code text-sm uppercase tracking-wider font-bold max-w-sm border-l-4 border-[#f59e0b] pl-4 text-left"
            >
              "A visual timeline of our workshops, hackathons, and community gatherings."
            </motion.div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {events.map((event, index) => (
              <Link
                key={event.id}
                href={event.href}
                className={bentoClasses[index % bentoClasses.length]}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                  className="group relative overflow-hidden border-4 border-[#0c111d] bg-white shadow-[8px_8px_0px_0px_#0c111d] hover:shadow-[16px_16px_0px_0px_#f59e0b] hover:-translate-y-2 transition-all duration-300 w-full h-full block flex flex-col"
                >
                  {/* Image Background */}
                  <div className="absolute inset-0 bg-[#0c111d]">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out opacity-80 group-hover:opacity-100 group-hover:scale-105" 
                    />
                  </div>
                  
                  {/* Overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c111d]/90 via-[#0c111d]/40 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="relative z-30 p-8 md:p-10 flex flex-col justify-between h-full">
                    {/* Top: Category Tag */}
                    <div className="flex justify-between items-start">
                      <span className="inline-flex bg-[#0c111d] text-white px-3 py-1 font-mono-code text-[10px] font-black tracking-widest uppercase border-2 border-[#0c111d]">
                        {event.category}
                      </span>
                      <span className="font-mono-code text-[10px] font-black text-[#0c111d] px-3 py-1 bg-[#f59e0b] border-2 border-[#0c111d] uppercase tracking-widest">
                        {event.date}
                      </span>
                    </div>

                    {/* Bottom: Text & Actions */}
                    <div className="mt-auto">
                      <h3 className="font-serif-display text-4xl md:text-5xl font-black text-white group-hover:text-[#f59e0b] uppercase tracking-tight transition-colors duration-500 mb-4 leading-none line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-300 font-mono-code text-xs uppercase tracking-wider font-bold max-w-lg mb-8 line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <button className="w-12 h-12 bg-white text-[#0c111d] border-4 border-[#0c111d] flex items-center justify-center group-hover:bg-[#f59e0b] transition-colors shrink-0 shadow-[4px_4px_0px_0px_#0c111d] group-hover:shadow-[6px_6px_0px_0px_#0c111d] group-hover:-translate-y-1">
                          <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
