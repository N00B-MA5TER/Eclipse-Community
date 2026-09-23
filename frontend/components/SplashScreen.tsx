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
              <img src="/logo.png" alt="Eclipse" className="h-32 md:h-48 lg:h-64 w-auto object-contain drop-shadow-2xl scale-[1.5]" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 w-64"
            >
              {/* Animated Loading Bar */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, delay: 0.8, ease: "easeInOut" }}
                  className="h-full bg-white rounded-full shadow-[0_0_10px_#ffffff]"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
