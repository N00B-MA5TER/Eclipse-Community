"use client";

import { HelpCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] w-full bg-white relative">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon Container */}
        <div className="w-16 h-16 bg-[#f0f7ff] flex items-center justify-center mb-2">
          <HelpCircle className="w-8 h-8 text-black" strokeWidth={2} />
        </div>
        
        {/* Text */}
        <h1 className="font-editorial-serif text-3xl font-bold tracking-tight text-black uppercase">
          HELP &amp; SUPPORT
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
          This feature is coming soon!
        </p>
      </div>
    </div>
  );
}
