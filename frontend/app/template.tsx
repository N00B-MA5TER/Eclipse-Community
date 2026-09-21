"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname}>
      {/* Glassmorphism Page Transition Overlay */}
      <motion.div
        className="fixed inset-0 z-[9998] bg-black/10 backdrop-blur-3xl pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "opacity" }}
      />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(20px)", scale: 0.98 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ willChange: "transform, opacity, filter" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
