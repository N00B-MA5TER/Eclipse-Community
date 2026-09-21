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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
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
        className={`px-3 py-1.5 rounded transition ${
          active 
            ? "bg-[#0c111d] text-[#fcfbf9] font-bold" 
            : "text-[#0c111d] hover:bg-[#0c111d]/5"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <>
      <div className="flex flex-col w-full relative z-50">
        {/* Top Metadata Hairline Bar */}
        <div className="border-b border-[#0c111d]/15 bg-[#f5f4ef] text-[10px] tracking-[0.18em] uppercase font-mono-code py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 text-[#434656]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-[#0c111d]"></span>
            <span className="font-bold text-[#0c111d]">DIATM / COLL. ARCHIVE / VOL. 26</span>
          </div>
          <div className="hidden md:block font-medium tracking-[0.25em] text-[#0c111d]/70">
            OFFICIAL STUDENT TECH INITIATIVE
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#007b54] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007b54] animate-pulse"></span> SYSTEM: ONLINE
            </span>
            <span className="text-[#737688]">|</span>
            <span className="">EST. 2026</span>
          </div>
        </div>

        {/* Primary BroadSheet Navbar */}
        <header className="border-b border-[#0c111d] bg-[#fcfbf9] sticky top-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Diamond Mark + Brand */}
            <Link className="flex items-center gap-2.5 group" href="/">
              <div className="w-6 h-6 bg-[#0c111d] text-[#fcfbf9] flex items-center justify-center rotate-45 transform group-hover:rotate-90 transition-transform duration-300">
                <div className="w-2 h-2 bg-[#acffd4] -rotate-45"></div>
              </div>
              <span className="font-serif-display text-2xl font-black tracking-[-0.03em] text-[#0c111d] ml-1">
                Ecllipse
              </span>
            </Link>
            
            {/* Broadsheet Minimal Navlinks */}
            <nav className="hidden lg:flex items-center gap-1 font-mono-code text-[12px] tracking-[0.05em] uppercase font-medium">
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
                  className="inline-flex items-center px-3 py-1.5 rounded transition text-[#0c111d] hover:bg-[#0c111d]/5"
                >
                  <span>Gallery</span>
                  <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${desktopDropdown === 'gallery' ? 'rotate-180' : ''}`} />
                </button>
                {desktopDropdown === 'gallery' && (
                  <div className="absolute left-0 top-full mt-0 w-48 bg-[#fcfbf9] border border-[#0c111d] py-1.5 shadow-[4px_4px_0px_0px_#0c111d] z-50">
                    <Link href="/gallery" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono-code text-xs text-[#0c111d] hover:bg-[#0c111d] hover:text-[#fcfbf9] border-b border-[#0c111d]/20">Overview</Link>
                    <Link href="/gallery/teams" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono-code text-xs text-[#0c111d] hover:bg-[#0c111d] hover:text-[#fcfbf9]">Core Team</Link>
                    <Link href="/gallery/faculty" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono-code text-xs text-[#0c111d] hover:bg-[#0c111d] hover:text-[#fcfbf9]">Faculty Members</Link>
                    <Link href="/gallery/projects" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono-code text-xs text-[#0c111d] hover:bg-[#0c111d] hover:text-[#fcfbf9]">Projects</Link>
                    <Link href="/gallery/events" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono-code text-xs text-[#0c111d] hover:bg-[#0c111d] hover:text-[#fcfbf9]">Events Gallery</Link>
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
                  className="inline-flex items-center px-3 py-1.5 rounded transition text-[#0c111d] hover:bg-[#0c111d]/5"
                >
                  <span>Contact</span>
                  <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${desktopDropdown === 'contact' ? 'rotate-180' : ''}`} />
                </button>
                {desktopDropdown === 'contact' && (
                  <div className="absolute right-0 top-full mt-0 w-48 bg-[#fcfbf9] border border-[#0c111d] py-1.5 shadow-[4px_4px_0px_0px_#0c111d] z-50">
                    <Link href="/contact" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono-code text-xs text-[#0c111d] hover:bg-[#0c111d] hover:text-[#fcfbf9] border-b border-[#0c111d]/20">Overview</Link>
                    <Link href="/contact" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono-code text-xs text-[#0c111d] hover:bg-[#0c111d] hover:text-[#fcfbf9]">General Inquiries</Link>
                    <Link href="/contact/membership" onClick={() => setDesktopDropdown(null)} className="block px-4 py-2 font-mono-code text-xs text-[#0c111d] hover:bg-[#0c111d] hover:text-[#fcfbf9]">Join Chapter</Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
          
          {/* Nav Right Controls */}
          <div className="flex items-center gap-2.5">
            <button 
              aria-label="Search" 
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 border border-[#0c111d] flex items-center justify-center hover:bg-[#0c111d] hover:text-[#fcfbf9] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>
            
            {!loading && user ? (
              <div className="hidden sm:flex items-center space-x-2">
                <Link 
                  href="/dashboard"
                  className="bg-[#0c111d] text-[#fcfbf9] font-mono-code text-[11px] font-bold tracking-[0.14em] uppercase px-4 h-9 flex items-center justify-center hover:bg-[#0045cc] transition-colors border border-[#0c111d]"
                >
                  DASHBOARD
                </Link>
                <button
                  onClick={() => logout().then(() => router.push("/"))}
                  className="w-9 h-9 flex items-center justify-center border border-[#0c111d] bg-[#fcfbf9] text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-[#fcfbf9] transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : !loading ? (
              <Link 
                href="/login"
                className="hidden sm:flex bg-[#0c111d] text-[#fcfbf9] font-mono-code text-[11px] font-bold tracking-[0.14em] uppercase px-4 h-9 items-center justify-center hover:bg-[#0045cc] transition-colors border border-[#0c111d]"
              >
                LOGIN
              </Link>
            ) : null}

            <button 
              aria-label="Toggle Menu" 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center border border-[#0c111d] hover:bg-[#0c111d] hover:text-[#fcfbf9] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
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
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 bg-[#fcfbf9]/90 backdrop-blur-md"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div 
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-[#ffffff] border-2 border-[#0c111d] shadow-[6px_6px_0px_0px_#0c111d] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center border-b-2 border-[#0c111d] p-4 bg-[#fcfbf9]">
                <Search className="w-5 h-5 text-[#0c111d] mr-3" />
                <input
                  type="text"
                  placeholder="Search pages, events, or features..."
                  className="flex-1 bg-transparent border-none outline-none text-lg text-[#0c111d] placeholder:text-[#737688] font-mono-code"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 hover:bg-[#0c111d]/5 text-[#0c111d] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredSearch.length === 0 ? (
                  <div className="p-8 text-center text-[#737688] font-mono-code">
                    <p>No results found for "{searchQuery}"</p>
                  </div>
                ) : (
                  <div className="grid gap-1">
                    {filteredSearch.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-4 p-3 hover:bg-[#0c111d]/5 transition-colors group border border-transparent hover:border-[#0c111d]/20"
                      >
                        <div className="w-10 h-10 bg-[#f5f4ef] border border-[#0c111d] flex items-center justify-center text-[#0c111d] group-hover:bg-[#0c111d] group-hover:text-[#fcfbf9] transition-colors">
                          <MonitorPlay className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0c111d] mb-0.5">{item.title}</h4>
                          <p className="text-xs text-[#434656]">{item.description}</p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider px-2 py-1 bg-[#f5f4ef] text-[#737688] border border-[#0c111d]/20">
                            {item.category}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t-2 border-[#0c111d] bg-[#f5f4ef] p-3 flex justify-between items-center text-xs text-[#434656] font-mono-code">
                <span><kbd className="px-1.5 py-0.5 bg-[#ffffff] border border-[#0c111d] text-[#0c111d] mr-1">ESC</kbd> to close</span>
                <span><kbd className="px-1.5 py-0.5 bg-[#ffffff] border border-[#0c111d] text-[#0c111d] mr-1">↑↓</kbd> to navigate</span>
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
            className="fixed inset-0 z-[100] bg-[#fcfbf9] lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b-2 border-[#0c111d] bg-[#fcfbf9]">
              <Link href="/" className="font-serif-display font-extrabold text-2xl tracking-[-0.03em] text-[#0c111d] flex items-center gap-2 group">
                <div className="w-6 h-6 bg-[#0c111d] text-[#fcfbf9] flex items-center justify-center rotate-45 transform transition-transform">
                  <div className="w-2 h-2 bg-[#acffd4] -rotate-45"></div>
                </div>
                Ecllipse
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center border border-[#0c111d] text-[#0c111d] hover:bg-[#0c111d] hover:text-[#fcfbf9]"
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
                  className="border-b border-[#0c111d]/20"
                >
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between text-2xl font-serif-display font-bold text-[#0c111d] py-4"
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
                            className="overflow-hidden flex flex-col space-y-3 pb-4 pl-4 border-l-2 border-[#0c111d] ml-2"
                          >
                            {item.subItems.map(sub => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg font-mono-code text-[#434656] hover:text-[#0c111d]"
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
                      className="block text-2xl font-serif-display font-bold text-[#0c111d] py-4"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="p-6 border-t-2 border-[#0c111d] bg-[#f5f4ef]">
              <Link 
                href={user ? "/dashboard" : "/login"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center text-sm font-mono-code font-bold uppercase tracking-wider px-6 py-4 border border-[#0c111d] bg-[#0c111d] text-[#fcfbf9] hover:bg-[#0045cc] transition-colors"
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
