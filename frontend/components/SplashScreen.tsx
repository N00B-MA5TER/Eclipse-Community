"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // useLayoutEffect runs synchronously before DOM mutations are painted.
  // This prevents the splash screen from flashing on subsequent page loads.
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
      if (hasSeenSplash) {
        setIsVisible(false);
      }
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    // Play splash screen for 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("hasSeenSplash", "true");
    }, 2500);

    return () => clearTimeout(timer);
  }, [isVisible]);

  // Prevent rendering anything during SSR if we know it might be hidden, 
  // but wait, useLayoutEffect happens after SSR anyway. 
  // To avoid hydration mismatch where SSR renders it but client immediately hides it:
  if (!isClient) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)", scale: 1.05 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-3xl overflow-hidden"
        >
          {/* Animated Content */}
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex items-center gap-4"
            >
              {/* Optional minimal logo icon */}
              <div className="w-8 h-8 md:w-12 md:h-12 bg-white flex items-center justify-center rotate-45">
                <div className="w-4 h-4 md:w-6 md:h-6 bg-black"></div>
              </div>
              
              <h1 className="font-editorial-serif text-5xl md:text-7xl font-bold tracking-tight text-white">
                ECLIPSE
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6 flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-[#22c55e] animate-ping rounded-full"></div>
              <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                Initializing System
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
