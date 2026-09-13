"use client";

import { motion } from "framer-motion";

interface FilterPillsProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export function FilterPills({ categories, activeCategory, onSelect }: FilterPillsProps) {
  return (
    <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 scrollbar-hide w-full max-w-5xl mx-auto px-4 md:px-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap overflow-hidden
            ${activeCategory === category ? "text-white shadow-md" : "text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/60 dark:border-slate-800 hover:bg-white/80 dark:hover:bg-slate-800"}`}
        >
          {activeCategory === category && (
            <motion.div
              layoutId="activeFilterBg"
              className="absolute inset-0 bg-blue-600 rounded-full -z-10"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          {category}
        </button>
      ))}
    </div>
  );
}
