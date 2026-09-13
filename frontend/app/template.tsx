"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Deterministically choose a direction based on the path
  const { origin, scaleProp } = useMemo(() => {
    const directions = [
      { origin: "top", scaleProp: "scaleY" },     // Slides Up
      { origin: "bottom", scaleProp: "scaleY" },  // Slides Down
      { origin: "left", scaleProp: "scaleX" },    // Slides Left
      { origin: "right", scaleProp: "scaleX" }    // Slides Right
    ];
    
    let hash = 0;
    for (let i = 0; i < pathname.length; i++) {
      hash = pathname.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return directions[Math.abs(hash) % directions.length];
  }, [pathname]);

  return (
    <div key={pathname}>
      {/* Black Shutter */}
      <motion.div
        className="fixed inset-0 z-[9999] bg-black pointer-events-none"
        initial={{ [scaleProp]: 1 }}
        animate={{ [scaleProp]: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: origin, willChange: "transform" }}
      />
      {/* Green Shutter */}
      <motion.div
        className="fixed inset-0 z-[9998] bg-[#22c55e] pointer-events-none"
        initial={{ [scaleProp]: 1 }}
        animate={{ [scaleProp]: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{ transformOrigin: origin, willChange: "transform" }}
      />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: origin === "top" ? 40 : origin === "bottom" ? -40 : 0, x: origin === "left" ? 40 : origin === "right" ? -40 : 0 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
