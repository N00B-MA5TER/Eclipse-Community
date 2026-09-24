"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#0c111d] selection:bg-[#f59e0b] selection:text-[#0c111d] font-sans relative">
      <Navbar />

      <main className="pt-32 pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          <div className="text-center mb-24">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#0c111d] uppercase leading-[0.9] mb-8"
            >
              GET IN TOUCH.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono-code text-[#0c111d] text-base md:text-lg font-bold uppercase tracking-widest border-l-4 border-[#f59e0b] pl-6 py-2 max-w-2xl mx-auto text-left"
            >
              "Have a question, proposal, or want to collaborate? We'd love to hear from you."
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* Email Us */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 border-4 border-[#0c111d] shadow-[8px_8px_0px_0px_#0c111d] hover:shadow-[16px_16px_0px_0px_#f59e0b] hover:-translate-y-2 transition-all flex flex-col group"
            >
              <div className="w-16 h-16 bg-[#0c111d] flex items-center justify-center mb-8 border-4 border-[#0c111d] group-hover:bg-[#f59e0b] transition-colors">
                <Mail className="w-8 h-8 text-white group-hover:text-[#0c111d]" />
              </div>
              <h3 className="font-serif-display text-3xl font-black text-[#0c111d] uppercase tracking-tight mb-2">Email Us</h3>
              <p className="font-mono-code font-bold text-xs uppercase tracking-wider text-gray-600 mb-6">Our team is here to help.</p>
              <a href="mailto:eclipse.community@csediatm.in" className="font-mono-code font-black text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-[#f59e0b] hover:text-[#0c111d] hover:underline mt-auto break-all">
                eclipse.community@csediatm.in
              </a>
            </motion.div>
            
            {/* Call Us */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 border-4 border-[#0c111d] shadow-[8px_8px_0px_0px_#0c111d] hover:shadow-[16px_16px_0px_0px_#f59e0b] hover:-translate-y-2 transition-all flex flex-col group"
            >
              <div className="w-16 h-16 bg-[#0c111d] flex items-center justify-center mb-8 border-4 border-[#0c111d] group-hover:bg-[#f59e0b] transition-colors">
                <Phone className="w-8 h-8 text-white group-hover:text-[#0c111d]" />
              </div>
              <h3 className="font-serif-display text-3xl font-black text-[#0c111d] uppercase tracking-tight mb-2">Call Us</h3>
              <p className="font-mono-code font-bold text-xs uppercase tracking-wider text-gray-600 mb-6">Mon-Fri from 9am to 6pm.</p>
              <a href="tel:+919229803634" className="font-mono-code font-black text-lg uppercase tracking-widest text-[#f59e0b] hover:text-[#0c111d] hover:underline mt-auto">
                +91 9229803634
              </a>
            </motion.div>

            {/* Visit Us */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-[#0c111d] text-white p-8 border-4 border-[#0c111d] shadow-[8px_8px_0px_0px_#f59e0b] hover:shadow-[16px_16px_0px_0px_#0c111d] hover:-translate-y-2 transition-all flex flex-col group"
            >
              <div className="w-16 h-16 bg-[#f59e0b] flex items-center justify-center mb-8 border-4 border-[#0c111d] group-hover:bg-white transition-colors">
                <MapPin className="w-8 h-8 text-[#0c111d]" />
              </div>
              <h3 className="font-serif-display text-3xl font-black text-white uppercase tracking-tight mb-2">Visit Us</h3>
              <p className="font-mono-code font-bold text-xs uppercase tracking-wider text-gray-400 leading-relaxed mt-auto">
                Durgapur Institute of Advanced Technology and Management<br />
                West Bengal, India
              </p>
            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
