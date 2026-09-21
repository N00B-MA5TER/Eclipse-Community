"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function EventsGalleryPage() {
  const events = [
    {
      id: "zero-to-hackathon",
      title: "Zero to Hackathon: Build and Break",
      category: "WORKSHOP",
      date: "Aug 25-26, 2026",
      description: "A comprehensive journey from ideation to building and breaking real-world projects.",
      image: "/zero-to-hackathon/photos/20260825_151418.jpg",
      href: "/gallery/events/zero-to-hackathon"
    },
    {
      id: "sih-ideathon",
      title: "SIH 26' Ideathon Phase",
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
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-[#22c55e] broadsheet-grid">
      <Navbar />

      <main className="pt-32 pb-24 min-h-screen relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black pb-12">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase mb-6"
              >
                <span className="w-1.5 h-1.5 bg-[#22c55e]"></span>
                Gallery Archives
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-editorial-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.1]"
              >
                Event <br className="hidden md:block" />
                <span className="italic font-normal">Moments.</span>
              </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-600 font-mono text-xs uppercase tracking-wider font-medium max-w-sm"
            >
              A visual timeline of our workshops, hackathons, and community gatherings.
            </motion.p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
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
                  className="group relative overflow-hidden border border-black bg-white isolate w-full h-full block"
                >
                  {/* Image Background */}
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
                  />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-white/90 group-hover:bg-black/60 transition-colors duration-500 z-10 border-[10px] border-white group-hover:border-black"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 z-30 p-8 md:p-10 flex flex-col justify-between">
                    {/* Top: Category Tag */}
                    <div className="flex justify-between items-start">
                      <span className="inline-flex bg-black text-white px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase shadow-[2px_2px_0px_0px_#22c55e]">
                        {event.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-black group-hover:text-white transition-colors duration-500 px-2 py-1 bg-white border border-black group-hover:border-transparent group-hover:bg-black/50">
                        {event.date}
                      </span>
                    </div>

                    {/* Bottom: Text & Actions */}
                    <div className="mt-auto">
                      <h3 className="font-editorial-serif text-3xl md:text-4xl font-bold text-black group-hover:text-white transition-colors duration-500 mb-3 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-neutral-700 font-mono text-xs uppercase tracking-wide group-hover:text-neutral-300 transition-colors duration-500 max-w-lg mb-6">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <button className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-[#22c55e] hover:text-black transition-colors shrink-0 group/btn shadow-[3px_3px_0px_0px_#000000] hover:shadow-none">
                          <ArrowRight className="w-4 h-4 group-hover/btn:-rotate-45 transition-transform duration-300" />
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
