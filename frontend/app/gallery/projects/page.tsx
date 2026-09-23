"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Campus Navigation App",
      category: "Mobile Dev",
      tech: ["React Native", "Mapbox", "Node.js"],
      description: "An interactive mobile application designed to help freshmen navigate the complex campus layout, featuring real-time event location tracking.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200&h=800",
      href: "#"
    },
    {
      id: 2,
      title: "Smart Attendance System",
      category: "IoT & CV",
      tech: ["Python", "OpenCV", "Raspberry Pi"],
      description: "Automated attendance tracking using facial recognition, drastically reducing manual entry time for professors during large lectures.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee57d5?auto=format&fit=crop&q=80&w=800&h=1000",
      href: "#"
    },
    {
      id: 3,
      title: "Alumni Connect Portal",
      category: "Web App",
      tech: ["Next.js", "MongoDB", "Firebase"],
      description: "A networking platform specifically built to bridge the gap between current students and successful college alumni for mentorship.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=800",
      href: "#"
    },
    {
      id: 4,
      title: "Eco-Tracker",
      category: "Data Science",
      tech: ["Django", "React", "Pandas"],
      description: "A dashboard visualizing the campus's carbon footprint and energy consumption in real-time, promoting sustainable habits.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=800",
      href: "#"
    }
  ];

  const bentoClasses = [
    "md:col-span-8 md:row-span-2 min-h-[450px] md:min-h-[550px]", 
    "md:col-span-4 md:row-span-2 min-h-[350px] md:min-h-[550px]", 
    "md:col-span-5 min-h-[400px]", 
    "md:col-span-7 min-h-[400px]"
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-[#f59e0b] broadsheet-grid">
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
                <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                Innovation Hub
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-editorial-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.1]"
              >
                Featured <br className="hidden md:block" />
                <span className="italic font-normal">Projects.</span>
              </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-600 font-mono text-xs uppercase tracking-wider font-medium max-w-sm"
            >
              Explore the incredible real-world applications and tools built by our student community during hackathons and workshops.
            </motion.p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={project.href}
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
                    src={project.image} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
                  />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-white/90 group-hover:bg-black/70 transition-colors duration-500 z-10 border-[10px] border-white group-hover:border-black"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 z-30 p-8 md:p-10 flex flex-col justify-between">
                    {/* Top: Category Tag & Tech Stack */}
                    <div className="flex flex-col gap-3 items-start">
                      <span className="inline-flex bg-black text-white px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase shadow-[2px_2px_0px_0px_#f59e0b]">
                        {project.category}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-white border border-black text-black font-mono text-[9px] uppercase tracking-wider group-hover:bg-transparent group-hover:text-white group-hover:border-white transition-colors duration-500">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom: Text & Actions */}
                    <div className="mt-auto">
                      <h3 className="font-editorial-serif text-3xl md:text-4xl font-bold text-black group-hover:text-white transition-colors duration-500 mb-3 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-neutral-700 font-mono text-[11px] uppercase tracking-wide group-hover:text-neutral-300 transition-colors duration-500 max-w-lg mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <button className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-[#f59e0b] hover:text-black transition-colors shrink-0 group/btn shadow-[3px_3px_0px_0px_#000000] hover:shadow-none">
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
