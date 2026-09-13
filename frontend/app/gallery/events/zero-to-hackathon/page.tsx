"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ZeroToHackathonGallery() {
  const photos = [
    "20260825_151418.jpg",
    "20260825_154812.jpg",
    "20260826_154641.jpg",
    "20260826_154657.jpg",
    "20260826_154706.jpg",
    "20260826_170311.jpg",
    "20260826_170321.jpg",
    "20260826_170456.jpg",
    "20260826_171200.jpg",
    "20260826_171206.jpg",
    "WhatsApp Image 2026-08-25 at 11.13.21 PM (1).jpeg",
    "WhatsApp Image 2026-08-25 at 11.13.21 PM.jpeg",
    "WhatsApp Image 2026-08-25 at 11.13.25 PM.jpeg",
    "WhatsApp Image 2026-08-25 at 11.14.15 PM.jpeg",
    "WhatsApp Image 2026-08-25 at 11.16.26 PM.jpeg",
    "WhatsApp Image 2026-08-25 at 11.16.30 PM.jpeg",
    "WhatsApp Image 2026-08-25 at 11.16.31 PM.jpeg",
    "WhatsApp Image 2026-08-25 at 11.16.32 PM.jpeg",
    "WhatsApp Image 2026-08-25 at 11.16.33 PM.jpeg",
    "WhatsApp Image 2026-08-25 at 11.16.34 PM.jpeg",
    "WhatsApp Image 2026-08-25 at 11.16.36 PM.jpeg",
    "WhatsApp Image 2026-08-25 at 3.57.30 PM.jpeg"
  ];

  const videos = [
    "WhatsApp Video 2026-08-25 at 11.16.26 PM.mp4",
    "WhatsApp Video 2026-08-25 at 11.16.34 PM.mp4"
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-[#22c55e] broadsheet-grid">
      <Navbar />

      <main className="pt-32 pb-24 min-h-screen relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="mb-16">
            <Link 
              href="/gallery/events" 
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-black hover:bg-neutral-100 font-mono text-xs font-bold uppercase tracking-widest transition-colors shadow-[2px_2px_0px_0px_#000000]"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Events
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black pb-8">
              <div className="max-w-2xl">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase mb-4"
                >
                  <span className="w-1.5 h-1.5 bg-[#22c55e]"></span>
                  HACKATHON EVENT
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-editorial-serif text-5xl md:text-6xl font-bold tracking-tight text-black leading-[1.1]"
                >
                  Zero to Hackathon
                  <br className="hidden md:block" />
                  <span className="italic font-normal">Build and Break.</span>
                </motion.h1>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-right"
              >
                <span className="text-neutral-400 font-mono text-xs uppercase tracking-widest block mb-1">DATE</span>
                <span className="font-mono text-sm font-bold text-black border border-black px-2 py-1 bg-[#22c55e]/10">Aug 25-26, 2026</span>
              </motion.div>
            </div>
          </div>

          {/* Videos Section */}
          <div className="mb-16">
            <h2 className="font-editorial-serif text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-3 h-3 bg-black"></span> Event Footages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((vid, i) => (
                <motion.div 
                  key={vid}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-2 border-black bg-neutral-100 p-2 shadow-[6px_6px_0px_0px_#000000]"
                >
                  <video 
                    src={`/zero-to-hackathon/videos/${vid}`} 
                    controls 
                    className="w-full aspect-video object-cover border border-black"
                    preload="none"
                  />
                  <div className="p-3 pb-1 border-t border-black mt-2 font-mono text-[10px] text-neutral-500 uppercase tracking-widest truncate">
                    {vid}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Photos Grid */}
          <div>
            <h2 className="font-editorial-serif text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-3 h-3 bg-[#22c55e] border border-black"></span> Gallery Shots
            </h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {photos.map((photo, i) => (
                <motion.div 
                  key={photo}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "50px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className="break-inside-avoid border-2 border-black bg-white p-2 shadow-[4px_4px_0px_0px_#22c55e] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#22c55e] transition-all duration-300"
                >
                  <Image 
                    src={`/zero-to-hackathon/photos/${photo}`} 
                    alt={`Hackathon moment ${i + 1}`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover border border-black filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
