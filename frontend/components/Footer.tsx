import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-neutral-950 border-t border-black dark:border-white">
      <div className="px-4 sm:px-8 lg:px-12 py-12 lg:py-16 max-w-[80rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 flex flex-col justify-between pr-0 md:pr-8 space-y-4">
            <div>
              <div className="flex items-center mb-4 sm:mb-0 group cursor-pointer">
                <img src="/final-logo-black.png" alt="Eclipse Logo" className="w-auto h-12 sm:h-[72px] object-contain" />
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm font-sans leading-relaxed">
                The ultimate technical hub and event management platform for Durgapur Institute of Advanced Technology and Management 155.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 mt-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-black dark:text-white font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
                <span>COLLEGIATE CHAPTER • VOL. 26</span>
              </div>
            </div>
            <div className="pt-4">
              <p className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                Design and Developed by <span className="text-black dark:text-white font-bold">Shubhsanket Sharma</span>
              </p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h3 className="font-mono text-xs text-black dark:text-white font-bold uppercase tracking-wider">Platform</h3>
            <ul className="space-y-2 font-mono text-xs text-neutral-600 dark:text-neutral-400">
              <li><Link className="hover:text-black dark:hover:text-white transition-colors" href="/">Home</Link></li>
              <li><Link className="hover:text-black dark:hover:text-white transition-colors" href="/about">About Us</Link></li>
              <li><Link className="hover:text-black dark:hover:text-white transition-colors" href="/mission">Mission</Link></li>
              <li><Link className="hover:text-black dark:hover:text-white transition-colors" href="/vision">Vision</Link></li>
              <li><Link className="hover:text-black dark:hover:text-white transition-colors" href="/achievements">Achievements</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h3 className="font-mono text-xs text-black dark:text-white font-bold uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2 font-mono text-xs text-neutral-600 dark:text-neutral-400">
              <li><Link className="hover:text-black dark:hover:text-white transition-colors" href="/gallery">Gallery</Link></li>
              <li><Link className="hover:text-black dark:hover:text-white transition-colors" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-black dark:hover:text-white transition-colors" href="/contact/membership">Membership</Link></li>
              <li><Link className="hover:text-black dark:hover:text-white transition-colors" href="/events">Events & Hackathons</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h3 className="font-mono text-xs text-black dark:text-white font-bold uppercase tracking-wider">Get in Touch</h3>
            <div className="space-y-2 font-mono text-xs text-neutral-600 dark:text-neutral-400">
              <p className="text-black dark:text-white font-semibold">designershubh1208@gmail.com</p>
              <p className="text-black dark:text-white font-semibold">+91 9229803634</p>
              <p className="text-neutral-500 pt-1 leading-normal font-sans text-xs">
                Durgapur Institute of Advanced Technology & Management, Rajbandh, Durgapur, West Bengal 713212
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Eclipse Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link className="hover:text-black dark:hover:text-white transition-colors" href="/privacy">Privacy Policy</Link>
            <Link className="hover:text-black dark:hover:text-white transition-colors" href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
