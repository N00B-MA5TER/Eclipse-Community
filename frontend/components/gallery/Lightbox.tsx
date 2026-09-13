"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { GalleryItem } from "@/lib/dummyGalleryData";

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({ item, onClose, onNext, onPrev }: LightboxProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Content */}
        <motion.div
          key={item.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === 'video' ? (
            <video 
              src={item.url} 
              className="w-full h-full object-contain max-h-[85vh] rounded-2xl outline-none"
              controls autoPlay playsInline
            />
          ) : (
            <img 
              src={item.url} 
              alt={item.title} 
              className="w-full h-full object-contain max-h-[85vh] rounded-2xl"
            />
          )}
          
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-2xl font-bold">{item.title}</h3>
            <p className="text-white/80 font-medium">{item.event}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
