"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function TeamsPage() {
  const topTeams = [
    {
      id: 1,
      name: "Debjit Chowdhury",
      role: "President",
      description: "Leading the vision and execution of ECLIPSE's multidisciplinary ecosystem.",
      image: "/core-teams/Debjit_Chowdhury_President.png",
      position: "object-[center_30%]",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    {
      id: 2,
      name: "Shubhsanket Sharma",
      role: "Vice President & Tech Lead",
      description: "Driving technical innovation and overseeing the club's development initiatives.",
      image: "/core-teams/Shubhsanket_Sharma_Vice_President-and-Tech_Lead.png?v=4",
      position: "object-[center_20%]",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    {
      id: 14,
      name: "Rajdeep Nandy",
      role: "General Secretary",
      description: "Managing core operations and bridging communication across all departments.",
      image: "/core-teams/Rajdeep_Nandi_General_Secratary.jpeg",
      position: "object-center",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    }
  ];

  const coreTeams = [
    {
      id: 3,
      name: "Rishav Banerjee",
      role: "Chief Coordinator",
      description: "Ensuring seamless coordination and execution of all major club activities.",
      image: "/core-teams/Rishav_Banerjee_Chief_Coordinator.png",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    {
      id: 4,
      name: "Siddhartha Lala",
      role: "Chief Moderator",
      description: "Maintaining community standards and facilitating effective communication.",
      image: "/core-teams/Siddhartha_Lala_Chief_Moderator.png?v=2",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    {
      id: 11,
      name: "Sweta Pandit",
      role: "Innovation Officer",
      description: "Driving creative solutions and fostering a culture of continuous innovation.",
      image: "/core-teams/Sweta_Pandit_Innovation_officer.jpeg",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    {
      id: 5,
      name: "Aneek Nandi",
      role: "PR & Marketing Head",
      description: "Crafting the club's public image and managing outreach campaigns.",
      image: "/core-teams/Aneek_Nandi_PR_&_Marketing_Head.png",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    {
      id: 12,
      name: "Chanda Mishra",
      role: "Media & Content Head",
      description: "Leading content strategy and managing digital media presence.",
      image: "/core-teams/Divya_Mishra_Media_and_Content_Head.jpeg",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    {
      id: 6,
      name: "SK Nasim Ali",
      role: "Finance Head",
      description: "Managing budgets, sponsorships, and financial planning for events.",
      image: "/core-teams/SK_Nasim_Ali_Finance_Head.png",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    {
      id: 7,
      name: "Sanjib Garu",
      role: "Technical Coordinator",
      description: "Assisting in the smooth deployment of technical projects and workshops.",
      image: "/core-teams/Sanjib_Garu_Technical_Coordinator.jpg",
      position: "object-[center_20%]",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    {
      id: 8,
      name: "Alok Kumar Boita",
      role: "IT Administrator",
      description: "Managing cloud infrastructure and internal tooling for the club.",
      image: "/core-teams/Alok_kumar_boita_IT_Administrator.png?v=2",
      position: "object-[center_20%]",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    {
      id: 13,
      name: "Sonal Priya",
      role: "Cybersecurity Head",
      description: "Ensuring robust digital security and infrastructure protection.",
      image: "/core-teams/Sonal_Priya_Cybersecurity.jpeg",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    {
      id: 9,
      name: "Amit Kumar Mahato",
      role: "Community Moderator",
      description: "Fostering an inclusive and engaging environment for all members.",
      image: "/core-teams/Amit_Kumar_Mahato_Community_Moderator.png",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    {
      id: 10,
      name: "Prem Kumar Singh",
      role: "Operations & Tech Support",
      description: "Managing logistical operations and providing comprehensive technical support.",
      image: "/core-teams/Prem_Kumar_Singh_Operations_&_Tech_Support.jpg",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#0c111d] font-sans selection:bg-[#f59e0b] selection:text-[#0c111d] transition-colors duration-300">
      <Navbar />

      <main className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center mb-16 md:mb-24">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#0c111d] uppercase leading-[0.9] mb-8"
            >
              MEET THE<br />CORE TEAM.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono-code text-[#0c111d] text-sm md:text-base font-bold uppercase tracking-widest border-l-4 border-[#f59e0b] pl-6 py-2 max-w-2xl mx-auto text-left"
            >
              The passionate individuals working tirelessly behind the scenes to bring you the best technical events on campus.
            </motion.div>
          </div>

          {/* Top Tier */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {topTeams.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                className="bg-white border-4 border-[#0c111d] shadow-[8px_8px_0px_0px_#0c111d] hover:shadow-[12px_12px_0px_0px_#f59e0b] hover:-translate-y-2 transition-all flex flex-col group"
              >
                <div className="w-full aspect-[4/4] relative overflow-hidden bg-[#0c111d] border-b-4 border-[#0c111d]">
                  <img src={member.image} alt={member.name} className={`w-full h-full object-cover ${member.position || 'object-top'}`} />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1 text-left">
                  <div className="inline-flex w-fit px-3 py-1 mb-4 bg-[#f59e0b] text-[#0c111d] font-mono-code font-black text-[10px] uppercase tracking-widest border-2 border-[#0c111d]">
                    {member.role}
                  </div>
                  <h3 className="font-serif-display text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0c111d] mb-4 w-full break-words">{member.name}</h3>
                  <p className="font-mono-code font-bold text-xs uppercase tracking-wider text-gray-600 leading-relaxed mb-8 flex-1">
                    {member.description}
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <a href={member.socials.instagram || '#'} className="w-10 h-10 border-2 border-[#0c111d] bg-white hover:bg-[#0c111d] text-[#0c111d] hover:text-[#f59e0b] flex items-center justify-center transition-colors">
                      <InstagramIcon className="w-5 h-5" />
                    </a>
                    <a href={member.socials.linkedin || '#'} className="w-10 h-10 border-2 border-[#0c111d] bg-white hover:bg-[#0c111d] text-[#0c111d] hover:text-[#f59e0b] flex items-center justify-center transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rest of the Core Team */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
            {coreTeams.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.05) }}
                className="bg-white border-4 border-[#0c111d] shadow-[4px_4px_0px_0px_#0c111d] hover:shadow-[8px_8px_0px_0px_#f59e0b] hover:-translate-y-1 transition-all flex flex-col group"
              >
                <div className="w-full aspect-square relative overflow-hidden bg-[#0c111d] border-b-4 border-[#0c111d]">
                  <img src={member.image} alt={member.name} className={`w-full h-full object-cover ${member.position || 'object-top'}`} />
                </div>
                <div className="p-6 flex flex-col flex-1 text-left">
                  <div className="inline-flex w-fit px-2 py-1 mb-3 bg-[#f59e0b] text-[#0c111d] border-2 border-[#0c111d] font-mono-code font-black text-[9px] uppercase tracking-widest">
                    {member.role}
                  </div>
                  <h3 className="font-serif-display text-xl font-black uppercase tracking-tight text-[#0c111d] mb-3">{member.name}</h3>
                  <p className="font-mono-code font-bold text-[10px] uppercase tracking-wider text-gray-600 leading-relaxed mb-6 flex-1">
                    {member.description}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <a href={member.socials.instagram || '#'} className="w-8 h-8 border-2 border-[#0c111d] bg-white hover:bg-[#0c111d] text-[#0c111d] hover:text-[#f59e0b] flex items-center justify-center transition-colors">
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a href={member.socials.linkedin || '#'} className="w-8 h-8 border-2 border-[#0c111d] bg-white hover:bg-[#0c111d] text-[#0c111d] hover:text-[#f59e0b] flex items-center justify-center transition-colors">
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
