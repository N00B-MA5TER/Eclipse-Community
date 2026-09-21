"use client";

import { motion } from "framer-motion";

interface FilterPillsProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export function FilterPills({ categories, activeCategory, onSelect }: FilterPillsProps) {
  return (
    <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 scrollbar-hide w-full max-w-5xl mx-auto px-4 md:px-8 border-b border-[#0c111d]/20 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`relative px-4 py-2 text-[11px] font-mono-code font-bold uppercase tracking-wider transition-all border
            ${activeCategory === category ? "bg-[#0c111d] text-[#fcfbf9] border-[#0c111d]" : "bg-transparent text-[#0c111d] border-[#0c111d] hover:bg-[#0c111d]/5"}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
