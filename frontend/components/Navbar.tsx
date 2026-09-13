"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ChevronDown, MonitorPlay, User, LogOut } from "lucide-react";

export function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const searchData = [
    { title: "Home", href: "/", category: "General", description: "The landing page and general overview." },
    { title: "About Us", href: "/about", category: "General", description: "Learn about ECLIPSE club and what we do." },
    { title: "Mission", href: "/mission", category: "Identity", description: "Our mission to Learn, Create, Challenge, and Evolve." },
    { title: "Vision", href: "/vision", category: "Identity", description: "We don't prepare for the future. We build it." },
    { title: "Achievements", href: "/achievements", category: "Showcase", description: "Successful events, workshops, and hackathons." },
    { title: "Core Team", href: "/gallery/teams", category: "People", description: "Meet the passionate individuals behind ECLIPSE." },
    { title: "Faculty Members", href: "/gallery/faculty", category: "People", description: "Our guiding faculty and mentors." },
    { title: "Projects", href: "/gallery/projects", category: "Showcase", description: "Projects built by our members." },
    { title: "Membership", href: "/contact/membership", category: "Join", description: "Step into something greater. Join our club." },
    { title: "Dashboard", href: "/dashboard", category: "App", description: "Your personalized student dashboard." },
  ];

  const filteredSearch = searchData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  const NavLink = ({ href, children, exact = true }: { href: string; children: React.ReactNode; exact?: boolean }) => {
    const active = exact ? pathname === href : isActive(href);
    
    return (
      <Link 
        href={href} 
        className={`px-4 py-1.5 rounded-none transition-colors border border-transparent font-semibold ${
          active 
            ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-none" 
            : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:border-neutral-200 dark:hover:border-neutral-800"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <>
      <div className="flex flex-col w-full relative z-50">
        {/* Top Ticker Bar */}
        <div className="border-b border-black dark:border-white bg-white dark:bg-neutral-950 text-[11px] font-mono tracking-widest text-neutral-600 dark:text-neutral-400 uppercase px-4 sm:px-8 lg:px-12 py-2.5 flex flex-wrap justify-between items-center z-50 relative">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-1.5 bg-[#22c55e]"></span>
            <span className="font-bold text-black dark:text-white tracking-wider">DIATM / COLL. ARCHIVE / VOL. 26</span>
          </div>
          <span className="hidden md:inline border-x border-neutral-200 dark:border-neutral-800 px-6 py-0.5 text-neutral-500 font-mono tracking-widest">OFFICIAL STUDENT TECH INITIATIVE</span>
          <span className="font-bold text-black dark:text-white tracking-wider">EST. 2026</span>
        </div>

        {/* Main Header */}
        <header className="w-full relative z-40 border-b border-black dark:border-white bg-white dark:bg-neutral-950" data-purpose="site-header">
          <div className="w-full px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
            
            <div className="flex items-center space-x-6 pr-8 border-r border-neutral-200 dark:border-neutral-800 h-full py-2">
              <Link href="/" className="flex items-center group focus:outline-none h-full">
                <img src="/final-logo-black.png" alt="Eclipse Logo" className="w-auto h-full object-contain" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-1 text-[13px] font-medium tracking-tight text-neutral-600 dark:text-neutral-400">
              <NavLink href="/" exact={true}>Home</NavLink>
              <NavLink href="/about">About Us</NavLink>
              <NavLink href="/mission">Mission</NavLink>
              <NavLink href="/vision">Vision</NavLink>
              <NavLink href="/achievements">Achievements</NavLink>
              
              <div 
                className="relative"
                onMouseEnter={() => setDesktopDropdown('gallery')}
                onMouseLeave={() => setDesktopDropdown(null)}
              >
                <button 
                  type="button" 
                  onClick={() => setDesktopDropdown(desktopDropdown === 'gallery' ? null : 'gallery')}
                  className="inline-flex items-center px-4 py-1.5 rounded-none hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 focus:outline-none"
                >
                  <span>Gallery</span>
                  <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${desktopDropdown === 'gallery' ? 'rotate-180 text-black dark:text-white' : 'text-neutral-400'}`} />
                </button>
                {desktopDropdown === 'gallery' && (
                  <div className="absolute left-0 top-full mt-0 w-48 bg-white dark:bg-neutral-950 border border-black dark:border-white py-1.5 shadow-lg z-50">
                    <Link href="/gallery" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white border-b border-neutral-100 dark:border-neutral-900">Overview</Link>
                    <Link href="/gallery/teams" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white">Core Team</Link>
                    <Link href="/gallery/faculty" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white">Faculty Members</Link>
                    <Link href="/gallery/projects" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white">Projects</Link>
                    <Link href="/gallery/events" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white">Events Gallery</Link>
                  </div>
                )}
              </div>
              
              <div 
                className="relative"
                onMouseEnter={() => setDesktopDropdown('contact')}
                onMouseLeave={() => setDesktopDropdown(null)}
              >
                <button 
                  type="button" 
                  onClick={() => setDesktopDropdown(desktopDropdown === 'contact' ? null : 'contact')}
                  className="inline-flex items-center px-4 py-1.5 rounded-none hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 focus:outline-none"
                >
                  <span>Contact</span>
                  <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${desktopDropdown === 'contact' ? 'rotate-180 text-black dark:text-white' : 'text-neutral-400'}`} />
                </button>
                {desktopDropdown === 'contact' && (
                  <div className="absolute right-0 top-full mt-0 w-48 bg-white dark:bg-neutral-950 border border-black dark:border-white py-1.5 shadow-lg z-50">
                    <Link href="/contact" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white border-b border-neutral-100 dark:border-neutral-900">Overview</Link>
                    <Link href="/contact" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white">General Inquiries</Link>
                    <Link href="/contact/membership" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white">Join Chapter</Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3 pl-8 border-l border-neutral-200 dark:border-neutral-800 h-full">
              <button 
                aria-label="Search" 
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 flex items-center justify-center rounded-none border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>

              {!loading && user ? (
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/dashboard"
                    className="inline-flex items-center justify-center text-xs font-mono font-bold uppercase tracking-wider px-5 py-2 rounded-none border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-[#22c55e] dark:hover:bg-[#22c55e] hover:text-black hover:border-black dark:hover:border-black transition-all duration-150"
                  >
                    DASHBOARD
                  </Link>
                  <Link 
                    href="/dashboard/profile"
                    className="w-9 h-9 flex items-center justify-center rounded-none border border-black dark:border-white bg-white dark:bg-neutral-950 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]"
                    title="Profile"
                  >
                    <User className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => logout().then(() => router.push("/"))}
                    className="w-9 h-9 flex items-center justify-center rounded-none border border-black dark:border-white bg-white dark:bg-neutral-950 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]"
                    title="Logout"
                    type="button"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : !loading ? (
                <Link 
                  href="/login"
                  className="inline-flex items-center justify-center text-xs font-mono font-bold uppercase tracking-wider px-5 py-2 rounded-none border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-[#22c55e] dark:hover:bg-[#22c55e] hover:text-black hover:border-black dark:hover:border-black transition-all duration-150"
                >
                  LOGIN
                </Link>
              ) : null}

              <button 
                aria-label="Toggle Menu" 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-none border border-black dark:border-white bg-white dark:bg-neutral-950 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Fullscreen Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div 
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-none border-[1.5px] border-black dark:border-white shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#ffffff] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center border-b border-black dark:border-white p-4">
                <Search className="w-5 h-5 text-neutral-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search pages, events, or features..."
                  className="flex-1 bg-transparent border-none outline-none text-lg text-black dark:text-white placeholder:text-neutral-400 font-mono"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredSearch.length === 0 ? (
                  <div className="p-8 text-center text-neutral-500 font-mono">
                    <p>No results found for "{searchQuery}"</p>
                  </div>
                ) : (
                  <div className="grid gap-1">
                    {filteredSearch.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-4 p-3 rounded-none hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-black dark:text-white group-hover:border-black dark:group-hover:border-white transition-colors">
                          <MonitorPlay className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-black dark:text-white mb-0.5">{item.title}</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.description}</p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 rounded-sm">
                            {item.category}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t border-black dark:border-white bg-neutral-50 dark:bg-neutral-900 p-3 flex justify-between items-center text-xs text-neutral-500 font-mono">
                <span><kbd className="px-1.5 py-0.5 rounded-sm bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white mr-1">ESC</kbd> to close</span>
                <span><kbd className="px-1.5 py-0.5 rounded-sm bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white mr-1">↑↓</kbd> to navigate</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-neutral-950 lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-black dark:border-white">
              <Link href="/" className="font-editorial-serif font-extrabold text-2xl tracking-tight text-black dark:text-white flex items-center gap-2">
                <span className="w-3 h-3 bg-black dark:bg-white rotate-45"></span>
                Eclipse
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-none bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white border border-black dark:border-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/mission", label: "Mission" },
                { href: "/vision", label: "Vision" },
                { href: "/achievements", label: "Achievements" },
                { 
                  label: "Gallery", 
                  subItems: [
                    { href: "/gallery", label: "Overview" },
                    { href: "/gallery/teams", label: "Core Team" },
                    { href: "/gallery/faculty", label: "Faculty Members" },
                    { href: "/gallery/projects", label: "Projects" },
                    { href: "/gallery/events", label: "Events Gallery" },
                  ]
                },
                { 
                  label: "Contact",
                  subItems: [
                    { href: "/contact", label: "General Inquiries" },
                    { href: "/contact/membership", label: "Join Chapter" },
                  ]
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-neutral-200 dark:border-neutral-800"
                >
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between text-2xl font-editorial-serif font-bold text-black dark:text-white py-4"
                      >
                        {item.label}
                        <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col space-y-3 pb-4 pl-4 border-l border-neutral-200 dark:border-neutral-800 ml-2"
                          >
                            {item.subItems.map(sub => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href as string}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-2xl font-editorial-serif font-bold text-black dark:text-white py-4"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="p-6 border-t border-black dark:border-white bg-neutral-50 dark:bg-neutral-900">
              <Link 
                href={user ? "/dashboard" : "/login"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center text-sm font-mono font-bold uppercase tracking-wider px-6 py-4 border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-[#22c55e] transition-colors"
              >
                {user ? "Go to Dashboard" : "Login to Portal"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
