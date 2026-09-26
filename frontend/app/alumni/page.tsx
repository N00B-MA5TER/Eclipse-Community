"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, ArrowUpRight, GraduationCap } from "lucide-react";

interface Alumni {
  id: string;
  photo_url: string | null;
  name: string;
  department: string;
  graduation_year: number;
  current_role: string;
}

export default function AlumniPage() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const getImageUrl = (url: string | null) => {
    if (!url) return '';
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
    const baseUrl = apiUrl.replace(/\/api\/?$/, '');
    
    if (url.includes('/api/storage/')) {
      return `${baseUrl}${url.substring(url.indexOf('/storage/'))}`;
    }
    if (url.startsWith('/storage/')) {
      return `${baseUrl}${url}`;
    }
    if (url.startsWith('http')) {
      return url;
    }
    return `${baseUrl}/${url}`;
  };

  const fetchAlumni = async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/alumni?page=${pageNum}&per_page=12`);
      if (!res.ok) throw new Error("Failed to fetch alumni");
      
      const data = await res.json();
      
      if (pageNum === 1) {
        setAlumni(data.data || []);
      } else {
        setAlumni(prev => [...prev, ...(data.data || [])]);
      }
      
      setHasMore(data.current_page < data.last_page);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load alumni. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni(1);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#0c111d] selection:bg-[#f59e0b] selection:text-[#0c111d] font-sans relative">
      
      {/* Background Dot Pattern for Brutalist Vibe */}
      <div className="absolute inset-0 bg-[radial-gradient(#0c111d_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none fixed" />
      
      <Navbar />

      {/* Marquee Banner */}
      <div className="fixed top-[72px] left-0 right-0 overflow-hidden bg-[#0c111d] text-[#f59e0b] py-2 border-y-4 border-[#0c111d] z-40 flex whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          className="flex gap-4 font-mono-code font-bold uppercase tracking-widest text-sm"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <span>ECLIPSE ALUMNI NETWORK</span>
              <span className="text-white">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      <main className="pt-40 pb-32 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          
          {/* Brutalist Hero Section */}
          <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b-8 border-[#0c111d] pb-12">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-[#f59e0b] text-[#0c111d] font-mono-code font-black uppercase tracking-widest px-4 py-2 border-4 border-[#0c111d] mb-6 shadow-[4px_4px_0px_0px_#0c111d]"
              >
                The Directory
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif-display text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-[#0c111d] uppercase leading-[0.85]"
              >
                ALUMNI
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-mono-code text-[#0c111d] text-lg md:text-xl font-bold uppercase tracking-widest mt-8 max-w-xl"
              >
                Connecting the people who shaped our community.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full md:w-auto"
            >
              <Link 
                href="/alumni/register"
                className="group flex items-center justify-between w-full md:w-auto gap-6 bg-[#f59e0b] text-[#0c111d] px-8 py-6 font-mono-code font-black text-xl uppercase tracking-widest transition-all border-4 border-[#0c111d] shadow-[8px_8px_0px_0px_#0c111d] hover:shadow-[16px_16px_0px_0px_#0c111d] hover:-translate-y-2 hover:-translate-x-2 active:shadow-[0px_0px_0px_0px_#0c111d] active:translate-y-0 active:translate-x-0"
              >
                <span>Join Network</span>
                <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Directory Grid */}
          {loading && alumni.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 border-4 border-[#0c111d] bg-white shadow-[8px_8px_0px_0px_#0c111d]">
              <Loader2 className="w-16 h-16 animate-spin text-[#0c111d] mb-6" />
              <p className="font-mono-code text-xl font-bold text-[#0c111d] uppercase tracking-widest">Loading Records...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 border-4 border-[#0c111d] bg-red-500 shadow-[8px_8px_0px_0px_#0c111d]">
              <p className="font-mono-code font-bold text-white text-xl mb-6 uppercase">{error}</p>
              <button 
                onClick={() => fetchAlumni(1)}
                className="px-8 py-4 bg-white border-4 border-[#0c111d] text-[#0c111d] font-mono-code font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_#0c111d] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#0c111d] transition-all"
              >
                Try Again
              </button>
            </div>
          ) : alumni.length === 0 ? (
            <div className="text-center py-32 bg-[#0c111d] border-4 border-[#0c111d] shadow-[16px_16px_0px_0px_#f59e0b]">
              <GraduationCap className="w-24 h-24 text-[#f59e0b] mx-auto mb-8" />
              <h3 className="font-serif-display text-4xl text-white mb-6 uppercase">Directory Empty</h3>
              <p className="font-mono-code text-gray-400 font-bold mb-10 uppercase tracking-widest">No records found in the database.</p>
              <Link 
                href="/alumni/register"
                className="inline-block px-8 py-4 bg-[#f59e0b] border-4 border-[#0c111d] text-[#0c111d] font-mono-code font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_#ffffff] hover:-translate-y-2 hover:-translate-x-2 transition-all hover:shadow-[16px_16px_0px_0px_#ffffff]"
              >
                Create First Profile
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 justify-center">
                {alumni.map((person, index) => (
                  <motion.div 
                    key={person.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group bg-white border-4 border-[#0c111d] flex flex-col shadow-[8px_8px_0px_0px_#0c111d] hover:shadow-[16px_16px_0px_0px_#f59e0b] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 relative"
                  >
                    {/* Brutalist Badge */}
                    <div className="absolute -top-4 -right-4 z-20 bg-[#f59e0b] text-[#0c111d] text-xs font-mono-code font-black uppercase tracking-widest px-4 py-2 border-4 border-[#0c111d] shadow-[4px_4px_0px_0px_#0c111d] rotate-3 group-hover:rotate-6 transition-transform">
                      Class of '{String(person.graduation_year).slice(2)}
                    </div>
                    
                    <div className="w-full aspect-[4/5] relative overflow-hidden bg-[#0c111d] border-b-4 border-[#0c111d]">
                      {person.photo_url ? (
                        <img 
                          src={getImageUrl(person.photo_url)} 
                          alt={person.name} 
                          className="w-full h-full object-cover object-top grayscale contrast-[1.2] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" 
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
                          <span className="font-mono-code font-bold text-gray-400 uppercase">No Photo</span>
                        </div>
                      )}
                      {/* Halftone Overlay Effect */}
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay opacity-30 pointer-events-none"></div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1 bg-white">
                      <h3 className="font-serif-display text-3xl font-black text-[#0c111d] uppercase leading-none mb-4 group-hover:text-[#f59e0b] transition-colors">{person.name}</h3>
                      
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-[#0c111d] text-white font-mono-code font-bold text-[10px] uppercase tracking-widest border-2 border-[#0c111d]">
                          {person.department}
                        </span>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t-4 border-[#0c111d] border-dotted">
                        <p className="text-sm text-[#0c111d] font-mono-code font-bold uppercase tracking-wider leading-tight">
                          {person.current_role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {hasMore && (
                <div className="mt-24 flex justify-center">
                  <button 
                    onClick={() => {
                      setPage(p => p + 1);
                      fetchAlumni(page + 1);
                    }}
                    disabled={loading}
                    className="group bg-[#fcfbf9] px-12 py-6 border-4 border-[#0c111d] font-mono-code font-black text-xl uppercase tracking-widest text-[#0c111d] shadow-[8px_8px_0px_0px_#0c111d] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_#f59e0b] active:translate-x-0 active:translate-y-0 active:shadow-[0px_0px_0px_0px_#0c111d] transition-all disabled:opacity-50"
                  >
                    {loading ? "Loading..." : "Load More Records"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
