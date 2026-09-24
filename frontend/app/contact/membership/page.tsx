"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MembershipModal } from "@/components/MembershipModal";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, Zap, Target, Users, X } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { MembershipCard } from "@/components/MembershipCard";

export default function MembershipPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const [membership, setMembership] = useState<any>(null);

  // If user just logged in and we were returning from a redirect, open modal
  useEffect(() => {
    if (user && typeof window !== 'undefined' && window.location.search.includes('open_membership=true')) {
      setIsModalOpen(true);
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [user]);

  useEffect(() => {
    const fetchMembership = async () => {
      if (!user) {
        setMembership(null);
        return;
      }
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/memberships/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setMembership(data);
        } else {
          setMembership(null);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMembership();
  }, [user, isModalOpen]); // refetch when modal closes

  const handleBecomeMemberClick = () => {
    if (!user) {
      router.push('/login?redirect=/contact/membership?open_membership=true');
    } else {
      setIsModalOpen(true);
    }
  };

  // Deterministic array for the barcode widths to avoid hydration errors
  const barcodeWidths = [
    3.3, 3.2, 2.4, 2.1, 2.0, 3.8, 1.1, 3.1, 2.2, 1.3,
    2.1, 2.6, 3.9, 2.3, 2.2, 1.9, 1.1, 4.7, 2.1, 2.3,
    3.5, 1.9, 1.9, 1.2, 3.2, 2.4, 4.4, 3.7, 4.7, 1.4,
    2.9, 3.2, 2.2, 2.1, 2.1, 3.8, 3.3, 4.7, 3.6, 1.8
  ];

  const benefits = [
    { title: "Hackathons", desc: "Priority access to flagship events", icon: <Zap className="w-6 h-6" /> },
    { title: "Mentorship", desc: "Exclusive alumni sessions", icon: <Target className="w-6 h-6" /> },
    { title: "Community", desc: "Private Discord network", icon: <Users className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#0c111d] selection:bg-[#f59e0b] selection:text-[#0c111d] font-sans relative">
      
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0c111d_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none fixed" />
      
      <Navbar />

      <main className="pt-32 pb-32 relative z-10 min-h-[90vh] flex items-center">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full">
          
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: Content */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-[#f59e0b] text-[#0c111d] font-mono-code font-black uppercase tracking-widest px-4 py-2 border-4 border-[#0c111d] mb-8 shadow-[4px_4px_0px_0px_#0c111d]"
              >
                Official Membership
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif-display text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#0c111d] uppercase leading-[0.9] mb-8"
              >
                JOIN THE<br />COMMUNITY.
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-mono-code text-[#0c111d] text-lg font-bold uppercase tracking-widest mb-10 max-w-xl border-l-4 border-[#f59e0b] pl-6 py-2"
              >
                "Step into something greater. Question the ordinary, pursue the unknown."
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="grid sm:grid-cols-3 gap-4 mb-12"
              >
                {benefits.map((benefit, i) => (
                  <div key={i} className="bg-white border-4 border-[#0c111d] p-4 shadow-[4px_4px_0px_0px_#0c111d]">
                    <div className="text-[#f59e0b] mb-2">{benefit.icon}</div>
                    <h3 className="font-mono-code font-black uppercase text-sm mb-1">{benefit.title}</h3>
                    <p className="font-mono-code font-bold uppercase tracking-wider text-[10px] text-gray-600">{benefit.desc}</p>
                  </div>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {membership ? (
                  <div className="inline-flex items-center gap-4 bg-[#f59e0b] text-[#0c111d] px-8 py-6 font-mono-code font-black text-xl uppercase tracking-widest border-4 border-[#0c111d] shadow-[8px_8px_0px_0px_#0c111d]">
                    <Zap className="w-8 h-8 fill-current" />
                    <span>You are a Member</span>
                  </div>
                ) : (
                  <button 
                    onClick={handleBecomeMemberClick}
                    className="group inline-flex items-center gap-6 bg-[#f59e0b] text-[#0c111d] px-8 py-6 font-mono-code font-black text-xl uppercase tracking-widest transition-all border-4 border-[#0c111d] shadow-[8px_8px_0px_0px_#0c111d] hover:shadow-[16px_16px_0px_0px_#0c111d] hover:-translate-y-2 hover:-translate-x-2 active:shadow-[0px_0px_0px_0px_#0c111d] active:translate-y-0 active:translate-x-0"
                  >
                    <span>Become a Member</span>
                    <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" />
                  </button>
                )}
                <div className="mt-6">
                  <button 
                    onClick={() => setIsTermsModalOpen(true)}
                    className="font-mono-code font-bold text-xs uppercase tracking-wider text-gray-500 hover:text-[#0c111d] underline decoration-gray-300 hover:decoration-[#0c111d] underline-offset-4 transition-colors"
                  >
                    Read Terms & Conditions
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right: Graphic/Card */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end h-[500px]">
              {membership ? (
                <div className="w-full max-w-[320px] mx-auto h-full perspective-1000">
                  <MembershipCard
                    member={{
                      name: membership.name,
                      profilePhoto: user?.photoURL || null,
                      memberId: membership.membership_id || "PENDING",
                      membershipType: membership.status === 'approved' ? "PRO MEMBER" : "PENDING MEMBER"
                    }}
                  />
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 3 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="relative w-full max-w-md aspect-[3/4] bg-[#0c111d] border-8 border-[#0c111d] p-8 flex flex-col shadow-[16px_16px_0px_0px_#f59e0b] group overflow-hidden"
                >
                  {/* Halftone texture overlay */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay opacity-30 pointer-events-none"></div>
                  
                  {/* ID Card Hole */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#fcfbf9] border-4 border-[#0c111d] rounded-full shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.2)]"></div>

                  <div className="relative z-10 flex flex-col h-full pt-10">
                    <div className="flex justify-between items-start mb-12">
                      <div>
                        <div className="font-serif-display font-black text-4xl text-white uppercase leading-none">ECLIPSE</div>
                        <div className="font-mono-code font-bold text-[#f59e0b] text-[10px] uppercase tracking-[0.3em] mt-1">Tech Community</div>
                      </div>
                      <div className="px-3 py-1 bg-[#f59e0b] text-[#0c111d] text-[10px] font-mono-code font-black uppercase tracking-widest border-2 border-[#0c111d]">
                        PRO
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-auto">
                      <div className="aspect-square bg-gray-200 border-4 border-[#0c111d] shadow-[4px_4px_0px_0px_#f59e0b] grayscale flex items-center justify-center p-2 overflow-hidden bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=eclipse&backgroundColor=e5e7eb')] bg-cover">
                        {/* Avatar placeholder */}
                      </div>
                      <div className="flex flex-col justify-end gap-4">
                        <div className="w-full h-2 bg-[#f59e0b]"></div>
                        <div className="w-3/4 h-2 bg-white"></div>
                        <div className="w-full h-2 bg-white"></div>
                        <div className="w-1/2 h-2 bg-white"></div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t-4 border-dashed border-white/20">
                      <p className="text-[#f59e0b] font-mono-code font-bold text-xs mb-1 uppercase tracking-widest">MEMBERSHIP PASS</p>
                      <h3 className="font-serif-display text-3xl text-white uppercase tracking-tight font-black mb-6">2026-2027</h3>
                      
                      {/* Fake barcode */}
                      <div className="w-full h-12 bg-white flex items-center justify-between px-2 py-2 gap-[2px]">
                        {barcodeWidths.map((w, i) => (
                          <div key={i} className="h-full bg-[#0c111d]" style={{ width: `${w}px` }}></div>
                        ))}
                      </div>
                      <div className="text-center font-mono-code text-[10px] font-bold tracking-[0.4em] text-white mt-2">
                        000-ECL-2026
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
      
      <MembershipModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Terms and Conditions Modal */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#fcfbf9] border-4 border-[#0c111d] shadow-[16px_16px_0px_0px_#f59e0b] w-full max-w-3xl my-8 relative flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-4 border-[#0c111d] shrink-0 bg-white">
              <h2 className="font-serif-display font-black text-3xl uppercase tracking-tight text-[#0c111d]">
                Terms & Conditions
              </h2>
              <button 
                onClick={() => setIsTermsModalOpen(false)}
                className="w-10 h-10 bg-white border-2 border-[#0c111d] flex items-center justify-center hover:bg-[#f59e0b] hover:text-[#0c111d] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto font-sans text-sm md:text-base text-gray-800 space-y-6">
              
              <div className="space-y-2">
                <h3 className="font-mono-code font-black uppercase text-lg text-[#0c111d]">1. Membership Validity</h3>
                <p className="leading-relaxed font-medium">This card is issued exclusively to a registered member of ECLIPSE and remains valid only for the membership period specified by the community.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono-code font-black uppercase text-lg text-[#0c111d]">2. Non-Transferable</h3>
                <p className="leading-relaxed font-medium">The membership card is strictly personal and must not be transferred, lent, reproduced, altered, or used by any other individual.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono-code font-black uppercase text-lg text-[#0c111d]">3. Authorized Use</h3>
                <p className="leading-relaxed font-medium">The card may be required for identification, access to designated ECLIPSE activities, member-only resources, workspace facilities, events, and other privileges as notified by the community.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono-code font-black uppercase text-lg text-[#0c111d]">4. Code of Conduct</h3>
                <p className="leading-relaxed font-medium">Members are expected to maintain professional, respectful, inclusive, and responsible conduct in all ECLIPSE activities, platforms, and representations.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono-code font-black uppercase text-lg text-[#0c111d]">5. Community Standards</h3>
                <p className="leading-relaxed font-medium">Members must respect fellow members, faculty, organizers, institutional policies, intellectual property, privacy, and the reputation of ECLIPSE and DIATM.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono-code font-black uppercase text-lg text-[#0c111d]">6. Responsible Participation</h3>
                <p className="leading-relaxed font-medium">Membership does not guarantee participation, selection, leadership positions, awards, event access, or any particular opportunity. Such opportunities may be subject to eligibility, availability, selection, or performance criteria.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono-code font-black uppercase text-lg text-[#0c111d]">7. Loss or Misuse</h3>
                <p className="leading-relaxed font-medium">Any loss, theft, damage, duplication, or suspected misuse of this card must be reported to the ECLIPSE Executive Council at the earliest.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono-code font-black uppercase text-lg text-[#0c111d]">8. Intellectual Property & Confidentiality</h3>
                <p className="leading-relaxed font-medium">Members must respect ownership, confidentiality, attribution, and usage rights relating to projects, research, content, designs, source code, ideas, and other community resources.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono-code font-black uppercase text-lg text-[#0c111d]">9. Digital & Public Representation</h3>
                <p className="leading-relaxed font-medium">Members may not represent themselves as an authorized spokesperson, official representative, or office-bearer of ECLIPSE without appropriate authorization.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono-code font-black uppercase text-lg text-[#0c111d]">10. Disciplinary Action</h3>
                <p className="leading-relaxed font-medium">Violation of these terms, the ECLIPSE Code of Conduct, or applicable institutional rules may result in warning, suspension, restriction of privileges, or termination of membership, subject to the applicable community and institutional procedures.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono-code font-black uppercase text-lg text-[#0c111d]">11. Amendments</h3>
                <p className="leading-relaxed font-medium">ECLIPSE reserves the right to modify membership policies, privileges, and terms when necessary. Members will be informed of material changes through official communication channels.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono-code font-black uppercase text-lg text-[#0c111d]">12. Card Return</h3>
                <p className="leading-relaxed font-medium">Upon expiry, suspension, or termination of membership, the card may be required to be returned or deactivated as directed by ECLIPSE.</p>
              </div>

              <div className="mt-8 pt-8 border-t-4 border-[#0c111d] bg-[#f59e0b] p-6 text-[#0c111d]">
                <p className="font-mono-code font-black uppercase text-sm mb-4">
                  This card remains the property of ECLIPSE and is issued for authorized community purposes only.
                </p>
                <div className="font-serif-display font-black text-xl uppercase tracking-tighter">
                  ECLIPSE — Official Tech Community of DIATM
                </div>
                <div className="font-mono-code font-bold text-[10px] uppercase tracking-widest mt-1">
                  Many Worlds. One Orbit.
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t-4 border-[#0c111d] shrink-0 bg-white flex justify-end">
              <button 
                onClick={() => setIsTermsModalOpen(false)}
                className="bg-[#0c111d] text-white px-8 py-3 font-mono-code font-black uppercase tracking-widest text-sm hover:bg-[#f59e0b] hover:text-[#0c111d] transition-colors border-2 border-[#0c111d]"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
