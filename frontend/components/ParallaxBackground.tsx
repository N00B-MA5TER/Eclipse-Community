"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function ParallaxBackground() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track global window scroll
  const { scrollY } = useScroll();
  
  // Apply a spring for buttery smooth parallax movement
  const smoothScrollY = useSpring(scrollY, { stiffness: 50, damping: 20, restDelta: 0.001 });

  // Different elements move at different speeds to create the parallax depth illusion
  const y1 = useTransform(smoothScrollY, [0, 3000], [0, 800]); // Moves down slowly
  const y2 = useTransform(smoothScrollY, [0, 3000], [0, -600]); // Moves up medium
  const y3 = useTransform(smoothScrollY, [0, 3000], [0, 400]); // Moves down very slowly

  if (!mounted) return null;

  if (isMobile) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-blue-600/5 dark:bg-blue-500/10 blur-[120px]" />
        <div className="absolute top-[30%] right-[-15%] w-[45%] aspect-square rounded-full bg-fuchsia-600/5 dark:bg-fuchsia-500/10 blur-[120px]" />
        <div className="absolute top-[70%] left-[10%] w-[60%] aspect-square rounded-full bg-emerald-600/5 dark:bg-emerald-500/10 blur-[150px]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] opacity-70">
      {/* Orb 1: Top Left */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-blue-600/5 dark:bg-blue-500/10 blur-[120px]"
      />
      
      {/* Orb 2: Middle Right */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[30%] right-[-15%] w-[45%] aspect-square rounded-full bg-fuchsia-600/5 dark:bg-fuchsia-500/10 blur-[120px]"
      />
      
      {/* Orb 3: Bottom Left */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute top-[70%] left-[10%] w-[60%] aspect-square rounded-full bg-emerald-600/5 dark:bg-emerald-500/10 blur-[150px]"
      />
    </div>
  );
}
