"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-blue-100 :bg-blue-900/50 transition-colors duration-300">
      <Navbar />

      <main className="pt-32 pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-4xl font-heading uppercase tracking-tight md:text-5xl font-heading uppercase tracking-tight font-extrabold text-gray-900  mb-6"
            >
              Get in <span className="text-black">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-600 font-mono text-xs uppercase tracking-wider  text-lg max-w-2xl mx-auto font-medium"
            >
              Have a question, proposal, or want to collaborate? We'd love to hear from you.
            </motion.p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Contact Info */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white  p-8 rounded-none shadow-none border border-black border border-black "
              >
                <div className="w-12 h-12 bg-blue-50  rounded-none flex items-center justify-center text-black  mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900  mb-2">Email Us</h3>
                <p className="text-neutral-600 font-mono text-xs uppercase tracking-wider  text-sm mb-4">Our team is here to help.</p>
                <a href="mailto:designershubh1208@gmail.com" className="text-black font-bold hover:underline">designershubh1208@gmail.com</a>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white  p-8 rounded-none shadow-none border border-black border border-black "
              >
                <div className="w-12 h-12 bg-blue-50  rounded-none flex items-center justify-center text-black  mb-6">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900  mb-2">Call Us</h3>
                <p className="text-neutral-600 font-mono text-xs uppercase tracking-wider  text-sm mb-4">Mon-Fri from 9am to 6pm.</p>
                <a href="tel:+919229803634" className="text-black font-bold hover:underline">+91 9229803634</a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white  p-8 rounded-none shadow-none border border-black border border-black "
              >
                <div className="w-12 h-12 bg-blue-50  rounded-none flex items-center justify-center text-black  mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900  mb-2">Visit Us</h3>
                <p className="text-neutral-600 font-mono text-xs uppercase tracking-wider  text-sm leading-relaxed">
                  Durgapur Institute of Advanced Technology and Management<br />
                  West Bengal, India
                </p>
              </motion.div>
            </div>

            {/* Contact Form Placeholder */}
            <div className="w-full lg:w-2/3">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white  p-8 md:p-12 rounded-[2.5rem] shadow-none border border-black shadow-none border border-black-200/50  border border-black border border-black "
              >
                <h3 className="font-heading text-2xl font-heading uppercase tracking-tight font-bold text-gray-900  mb-8">Send us a message</h3>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ">First Name</label>
                      <input type="text" className="w-full h-12 px-4 rounded-none bg-white  border border-black  focus:outline-none focus:ring-0 focus:ring-0-500/50 transition-all" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ">Last Name</label>
                      <input type="text" className="w-full h-12 px-4 rounded-none bg-white  border border-black  focus:outline-none focus:ring-0 focus:ring-0-500/50 transition-all" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ">Email</label>
                    <input type="email" className="w-full h-12 px-4 rounded-none bg-white  border border-black  focus:outline-none focus:ring-0 focus:ring-0-500/50 transition-all" placeholder="john@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ">Message</label>
                    <textarea rows={5} className="w-full p-4 rounded-none bg-white  border border-black  focus:outline-none focus:ring-0 focus:ring-0-500/50 transition-all resize-none" placeholder="How can we help you?"></textarea>
                  </div>
                  
                  <button type="submit" className="w-full h-14 bg-black text-white hover:bg-blue-700 text-white font-bold text-lg rounded-none shadow-none border border-black shadow-none border border-black-500/30 transition-transform hover:scale-[1.02] flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" /> Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
