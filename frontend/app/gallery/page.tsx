"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/firebase/auth";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { GalleryItem, LOCAL_GALLERY_DATA } from "@/lib/dummyGalleryData";
import { FilterPills } from "@/components/gallery/FilterPills";
import { GalleryMasonry } from "@/components/gallery/GalleryMasonry";
import { Lightbox } from "@/components/gallery/Lightbox";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function GalleryPage() {
  const { user, loading } = useAuth();
  
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch events from the database and merge with local gallery data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';
        const res = await fetch(`${apiUrl}/events`);
        
        let allItems: GalleryItem[] = [];

        if (res.ok) {
          const eventsData = await res.json();
          eventsData.forEach((data: any, index: number) => {
            const eventTitle = data.title || 'Untitled Event';

            // Check if we have local static photos for this specific event
            const localMediaForEvent = LOCAL_GALLERY_DATA.filter(item => item.event === eventTitle);

            if (localMediaForEvent.length > 0) {
              // We have real photos! Add them all.
              allItems = [...allItems, ...localMediaForEvent];
            } else {
              // No real photos yet, just add a placeholder card for the event itself
              const ratios: ('square' | 'video' | 'portrait')[] = ['video', 'square', 'portrait', 'square'];
              allItems.push({
                id: data.id,
                type: 'image',
                url: data.bannerImage || `https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800&sig=${index}`,
                title: eventTitle,
                event: eventTitle,
                aspectRatio: ratios[index % ratios.length]
              });
            }
          });
        }
        
        setGalleryItems(allItems);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoadingEvents(false);
      }
    };
    
    fetchEvents();
  }, []);

  // Extract unique event types for the filter
  const categories = ["All Events", ...Array.from(new Set(galleryItems.map(item => item.event)))];

  const filteredItems = activeCategory === "All Events" 
    ? galleryItems 
    : galleryItems.filter(item => item.event === activeCategory);

  // Lenis smooth scrolling setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const handleNext = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((activeItemIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((activeItemIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="min-h-screen bg-white/50  font-sans text-gray-900  selection:bg-blue-100 :bg-blue-900/50 selection:text-blue-900 :text-blue-100 relative transition-colors duration-300">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[50%] w-[600px] h-[600px] bg-blue-400/5 rounded-none blur-[100px]"></div>
      </div>

      <div className="relative z-10">
        
        {/* Navigation */}
        <Navbar />

        {/* Page Header */}
        <main className="pt-40 pb-20">
          <div className="max-w-4xl mx-auto text-center px-4 mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-5xl uppercase tracking-tight md:text-7xl font-extrabold text-gray-900 mb-6"
            >
              Memories & <span className="text-black/60">Resources</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg text-neutral-600 font-mono text-xs uppercase tracking-wider font-medium max-w-2xl mx-auto"
            >
              Explore highlights from our past events. Download certificates, presentation slides, and relive the best moments from the Eclipse Tech Community.
            </motion.p>
          </div>

          {/* Filtering */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="flex justify-center w-full"
          >
            <FilterPills 
              categories={categories} 
              activeCategory={activeCategory} 
              onSelect={(cat) => {
                setActiveCategory(cat);
                setActiveItemIndex(null);
              }} 
            />
          </motion.div>

          {/* Gallery Grid or Loading */}
          {isLoadingEvents ? (
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-10">
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 pb-28">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className={`bg-gray-200  animate-pulse rounded-none break-inside-avoid shadow-none border border-black ${i % 3 === 0 ? 'aspect-[3/4]' : i % 2 === 0 ? 'aspect-video' : 'aspect-square'}`}></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-24 pb-20">
              {/* Guest Speaker Section */}
              {filteredItems.filter(i => i.section === 'guest_speaker').length > 0 && (
                <section>
                  <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-8">
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="font-heading text-3xl font-heading uppercase tracking-tight font-extrabold text-gray-900  flex items-center gap-4"
                    >
                      <span className="w-10 h-1.5 bg-amber-500 rounded-none"></span>
                      Guest Speaker ( SIH '24 WINNER )
                    </motion.h2>
                  </div>
                  <GalleryMasonry 
                    items={filteredItems.filter(i => i.section === 'guest_speaker')} 
                    onItemClick={(item) => setActiveItemIndex(filteredItems.findIndex(i => i.id === item.id))} 
                  />
                </section>
              )}

              {/* Images Section */}
              {filteredItems.filter(i => i.type === 'image' && i.section !== 'guest_speaker').length > 0 && (
                <section>
                  <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-8">
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="font-heading text-3xl font-heading uppercase tracking-tight font-extrabold text-gray-900  flex items-center gap-4"
                    >
                      <span className="w-10 h-1.5 bg-black text-white rounded-none"></span>
                      Visual Memories
                    </motion.h2>
                  </div>
                  <GalleryMasonry 
                    items={filteredItems.filter(i => i.type === 'image' && i.section !== 'guest_speaker')} 
                    onItemClick={(item) => setActiveItemIndex(filteredItems.findIndex(i => i.id === item.id))} 
                  />
                </section>
              )}

              {/* Videos Section */}
              {filteredItems.filter(i => i.type === 'video').length > 0 && (
                <section>
                  <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-8">
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="font-heading text-3xl font-heading uppercase tracking-tight font-extrabold text-gray-900  flex items-center gap-4"
                    >
                      <span className="w-10 h-1.5 bg-purple-600 rounded-none"></span>
                      Cinematic Highlights
                    </motion.h2>
                  </div>
                  <GalleryMasonry 
                    items={filteredItems.filter(i => i.type === 'video')} 
                    onItemClick={(item) => setActiveItemIndex(filteredItems.findIndex(i => i.id === item.id))} 
                  />
                </section>
              )}
              
              {/* Documents Section */}
              {filteredItems.filter(i => i.type === 'document').length > 0 && (
                <section>
                  <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-8">
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="font-heading text-3xl font-heading uppercase tracking-tight font-extrabold text-gray-900  flex items-center gap-4"
                    >
                      <span className="w-10 h-1.5 bg-emerald-500 rounded-none"></span>
                      Event Resources
                    </motion.h2>
                  </div>
                  <GalleryMasonry 
                    items={filteredItems.filter(i => i.type === 'document')} 
                    onItemClick={(item) => setActiveItemIndex(filteredItems.findIndex(i => i.id === item.id))} 
                  />
                </section>
              )}
            </div>
          )}

        </main>
        
        <Footer />
      </div>

      {/* Lightbox Overlay */}
      <Lightbox 
        item={activeItemIndex !== null ? filteredItems[activeItemIndex] : null}
        onClose={() => setActiveItemIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
