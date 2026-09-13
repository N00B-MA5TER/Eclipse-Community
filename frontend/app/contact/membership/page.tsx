"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MembershipPage() {
  const benefits = [
    "Priority access to all flagship hackathons and workshops",
    "Exclusive mentorship sessions with alumni and industry professionals",
    "Early bird registration for limited-seat events",
    "Access to the private community Discord server",
    "Opportunities to join the core organizing team",
    "Free swag and merchandise at major events"
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-blue-100 :bg-blue-900/50 transition-colors duration-300">
      <Navbar />

      <main className="pt-32 pb-24 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
          
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left: Content */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-heading text-5xl font-heading uppercase tracking-tight md:text-6xl font-black text-gray-900  mb-6 leading-tight uppercase tracking-tight">
                  JOIN OUR CLUB
                </h1>
                
                <p className="text-xl md:text-2xl font-heading uppercase tracking-tight font-bold italic text-black  mb-8 font-heading">
                  "STEP INTO SOMETHING GREATER."
                </p>

                <div className="space-y-6 text-lg text-neutral-600 font-mono text-xs uppercase tracking-wider  font-medium leading-relaxed mb-10">
                  <p>
                    ECLIPSE is a space for those who <em className="text-gray-900  font-bold not-italic">question the ordinary, pursue the unknown, and create what doesn't exist yet.</em>
                  </p>
                  <p>
                    Join a community where <em className="text-gray-900  font-bold not-italic">ideas find people, people find purpose, and curiosity becomes creation.</em>
                  </p>
                  <p className="italic text-gray-900  font-semibold">
                    Your next idea could be the beginning of something extraordinary.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register">
                    <Button size="lg" className="w-full sm:w-auto rounded-none bg-black text-white hover:bg-blue-700 text-white px-10 h-14 text-[15px] font-bold shadow-none border border-black shadow-none border border-black-500/30 border-0 transition-transform hover:scale-105 uppercase tracking-wide">
                      BECOME A MEMBER →
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right: Graphic/Card */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative w-full max-w-md aspect-[3/4] bg-white   rounded-[3rem] p-8 text-white shadow-none border border-black flex flex-col overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-none blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-none blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-auto">
                    <div className="font-heading font-black text-2xl font-heading uppercase tracking-tight tracking-widest uppercase">ECLIPSE</div>
                    <div className="px-3 py-1 bg-white/20  rounded-none text-xs font-bold uppercase tracking-widest border border-white/30">
                      Pro Member
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="w-16 h-16 rounded-none bg-white/20  border border-white/30 flex items-center justify-center mb-6">
                      <div className="w-8 h-8 border-[3px] border-white rounded-none opacity-80"></div>
                    </div>
                    <p className="text-white/70 font-medium text-sm mb-1">MEMBERSHIP CARD</p>
                    <h3 className="font-heading text-3xl font-heading uppercase tracking-tight font-bold mb-8">Valid for 2026-2027</h3>
                    <div className="w-full h-12 bg-white/10  rounded-none border border-white/20 flex items-center px-4">
                      <div className="w-full h-1.5 bg-white/30 rounded-none overflow-hidden flex gap-1">
                        <div className="w-8 h-full bg-white/80 rounded-none"></div>
                        <div className="w-4 h-full bg-white/80 rounded-none"></div>
                        <div className="w-12 h-full bg-white/80 rounded-none"></div>
                        <div className="w-6 h-full bg-white/80 rounded-none"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
