"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
// No lucide-react imports needed here for icons

// Custom SVG since Instagram might not exist in the installed lucide-react version
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
      socials: { github: "#", linkedin: "#", mail: "#" }
    },
    {
      id: 2,
      name: "Shubhsanket Sharma",
      role: "Vice President & Tech Lead",
      description: "Driving technical innovation and overseeing the club's development initiatives.",
      image: "/core-teams/Shubhsanket_Sharma_Vice_President-and-Tech_Lead.png?v=4",
      position: "object-[center_20%]",
      socials: { github: "#", linkedin: "#", mail: "#" }
    },
    {
      id: 14,
      name: "Rajdeep Nandy",
      role: "General Secretary",
      description: "Managing core operations and bridging communication across all departments.",
      image: "/core-teams/Rajdeep_Nandi_General_Secratary.jpeg",
      position: "object-center",
      socials: { github: "#", linkedin: "#", mail: "#" }
    }
  ];

  const coreTeams = [
    {
      id: 3,
      name: "Rishav Banerjee",
      role: "Chief Coordinator",
      description: "Ensuring seamless coordination and execution of all major club activities.",
      image: "/core-teams/Rishav_Banerjee_Chief_Coordinator.png",
      socials: { github: "#", linkedin: "#", mail: "#" }
    },
    {
      id: 4,
      name: "Siddhartha Lala",
      role: "Chief Moderator",
      description: "Maintaining community standards and facilitating effective communication.",
      image: "/core-teams/Siddhartha_Lala_Chief_Moderator.png?v=2",
      socials: { github: "#", linkedin: "#", mail: "#" }
    },
    {
      id: 11,
      name: "Sweta Pandit",
      role: "Innovation Officer",
      description: "Driving creative solutions and fostering a culture of continuous innovation.",
      image: "/core-teams/Sweta_Pandit_Innovation_officer.jpeg",
      socials: { github: "#", linkedin: "#", mail: "#" }
    },
    {
      id: 5,
      name: "Aneek Nandi",
      role: "PR & Marketing Head",
      description: "Crafting the club's public image and managing outreach campaigns.",
      image: "/core-teams/Aneek_Nandi_PR_&_Marketing_Head.png",
      socials: { github: "#", linkedin: "#", mail: "#" }
    },
    {
      id: 12,
      name: "Chanda Mishra",
      role: "Media & Content Head",
      description: "Leading content strategy and managing digital media presence.",
      image: "/core-teams/Divya_Mishra_Media_and_Content_Head.jpeg",
      socials: { github: "#", linkedin: "#", mail: "#" }
    },
    {
      id: 6,
      name: "SK Nasim Ali",
      role: "Finance Head",
      description: "Managing budgets, sponsorships, and financial planning for events.",
      image: "/core-teams/SK_Nasim_Ali_Finance_Head.png",
      socials: { github: "#", linkedin: "#", mail: "#" }
    },
    {
      id: 7,
      name: "Sanjib Garu",
      role: "Technical Coordinator",
      description: "Assisting in the smooth deployment of technical projects and workshops.",
      image: "/core-teams/Sanjib_Garu_Technical_Coordinator.jpg",
      position: "object-[center_20%]",
      socials: { github: "#", linkedin: "#", mail: "#" }
    },
    {
      id: 8,
      name: "Alok Kumar Boita",
      role: "IT Administrator",
      description: "Managing cloud infrastructure and internal tooling for the club.",
      image: "/core-teams/Alok_kumar_boita_IT_Administrator.png?v=2",
      position: "object-[center_20%]",
      socials: { github: "#", linkedin: "#", mail: "#" }
    },
    {
      id: 13,
      name: "Sonal Priya",
      role: "Cybersecurity Head",
      description: "Ensuring robust digital security and infrastructure protection.",
      image: "/core-teams/Sonal_Priya_Cybersecurity.jpeg",
      socials: { github: "#", linkedin: "#", mail: "#" }
    },
    {
      id: 9,
      name: "Amit Kumar Mahato",
      role: "Community Moderator",
      description: "Fostering an inclusive and engaging environment for all members.",
      image: "/core-teams/Amit_Kumar_Mahato_Community_Moderator.png",
      socials: { github: "#", linkedin: "#", mail: "#" }
    },
    {
      id: 10,
      name: "Prem Kumar Singh",
      role: "Operations & Tech Support",
      description: "Managing logistical operations and providing comprehensive technical support.",
      image: "/core-teams/Prem_Kumar_Singh_Operations_&_Tech_Support.jpg",
      socials: { github: "#", linkedin: "#", mail: "#" }
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-blue-100 :bg-blue-900/50 transition-colors duration-300">
      <Navbar />

      <main className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-4xl uppercase tracking-tight md:text-5xl font-extrabold text-gray-900 mb-6"
            >
              Meet the <span className="text-black">Core Team</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-600 font-mono text-xs uppercase tracking-wider text-lg max-w-2xl mx-auto font-medium"
            >
              The passionate individuals working tirelessly behind the scenes to bring you the best technical events on campus.
            </motion.p>
          </div>

          {/* Top Tier (President, VP, General Secretary) in Larger Boxes */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {topTeams.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-none border border-black hover:-translate-y-2 transition-transform duration-300 flex flex-col"
              >
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-neutral-100">
                  <img src={member.image} alt={member.name} className={`w-full h-full object-cover ${member.position || 'object-top'}`} />
                </div>
                <div className="p-8 flex flex-col flex-1 text-center items-center overflow-hidden">
                  <h3 className="font-heading text-2xl lg:text-xl xl:text-2xl uppercase tracking-tight font-black text-gray-900 mb-2 w-full whitespace-nowrap truncate overflow-hidden text-ellipsis">{member.name}</h3>
                  <p className="text-[10px] sm:text-xs font-bold text-black mb-4 uppercase tracking-widest px-4 py-1.5 bg-blue-50 rounded-none whitespace-nowrap truncate max-w-full">{member.role}</p>
                  <p className="text-base text-neutral-600 font-mono text-xs uppercase tracking-wider font-medium leading-relaxed mb-6 flex-1 max-w-sm">
                    {member.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <a href={member.socials.instagram || '#'} className="w-10 h-10 rounded-none bg-white flex items-center justify-center text-neutral-600 font-mono text-xs uppercase tracking-wider hover:text-pink-600 transition-colors">
                      <InstagramIcon className="w-5 h-5" />
                    </a>
                    <a href={member.socials.linkedin || '#'} className="w-10 h-10 rounded-none bg-white flex items-center justify-center text-neutral-600 font-mono text-xs uppercase tracking-wider hover:text-black transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rest of the Core Team in Standard Boxes */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
            {coreTeams.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + (index * 0.05) }}
                className="bg-white rounded-none overflow-hidden shadow-none border border-black hover:-translate-y-2 transition-transform duration-300 flex flex-col"
              >
                <div className="w-full aspect-square relative overflow-hidden bg-neutral-100">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-6 flex flex-col flex-1 text-center items-center">
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-xs font-bold text-black mb-4 uppercase tracking-wider px-3 py-1 bg-blue-50">{member.role}</p>
                  <p className="text-xs text-neutral-600 font-mono uppercase tracking-wider font-medium leading-relaxed mb-6 flex-1">
                    {member.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <a href={member.socials.instagram || '#'} className="w-8 h-8 rounded-none bg-white flex items-center justify-center text-neutral-600 font-mono text-xs uppercase tracking-wider hover:text-pink-600 transition-colors">
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a href={member.socials.linkedin || '#'} className="w-8 h-8 rounded-none bg-white flex items-center justify-center text-neutral-600 font-mono text-xs uppercase tracking-wider hover:text-black transition-colors">
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
