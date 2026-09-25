"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function FacultyPage() {
  const faculty = [
    {
      id: 2,
      name: "Dr. Avick Kr. Dey",
      department: "Computer Science",
      designation: "Associate Dean",
      description: "Guiding the academic framework and fostering innovation in computing.",
      image: "/faculty-members/Avick_Dey_Associate_Dean_Computer_Science.jpeg"
    },
    {
      id: 7,
      name: "Mr. Rajib Choudhary",
      department: "Mathematics",
      designation: "Senior Professor",
      description: "Building strong analytical and mathematical foundations for students.",
      image: "/faculty-members/Rajib_choudhary_professor_Mathematics.jpeg"
    },
    {
      id: 9,
      name: "Dr. Aparna Kundu",
      department: "ECE",
      designation: "Professor",
      description: "Dedicated to shaping the next generation of engineers in Electronics and Communication.",
      image: "/faculty-members/Aparna_Ma'am_Professor_ECE.png"
    },
    {
      id: 3,
      name: "Ms. Sujata Dawn",
      department: "Computer Science",
      designation: "Head Of Department",
      description: "Spearheading the Computer Science department with a focus on modern technologies.",
      image: "/faculty-members/Sujata_Dawn_Head_Of_Department_Computer_Science.jpeg"
    },
    {
      id: 4,
      name: "Mr. Asish Das",
      department: "Computer Science",
      designation: "Professor",
      description: "Dedicated to shaping the next generation of software engineers.",
      image: "/faculty-members/Asish_Das_Professor_Computer_Science.jpeg"
    },
    {
      id: 5,
      name: "Ms. Bidipta Mukhopadhyay",
      department: "Computer Science",
      designation: "Professor",
      description: "Expert in computer science algorithms and advanced computing methodologies.",
      image: "/faculty-members/Bidipta_Mukhopadhyay_Professor_Computer_Science.jpeg"
    },
    {
      id: 6,
      name: "Ms. Meghna Chatterjee",
      department: "Computer Science",
      designation: "Professor",
      description: "Specializes in modern computing paradigms and student mentorship.",
      image: "/faculty-members/Meghna_Chatterjee_Professor_Computer_Science.jpeg"
    },
    {
      id: 8,
      name: "Mr. Samiddha Chakraborty",
      department: "Computer Science",
      designation: "Professor",
      description: "Focused on research and development in cutting-edge computer science domains.",
      image: "/faculty-members/Samiddha_Charkaborty_Professor_Computer_Science.jpeg"
    },
    {
      id: 10,
      name: "Mr. Saroj Patra",
      department: "Computer Science",
      designation: "Professor",
      description: "Bringing years of academic excellence and expertise in modern computer science.",
      image: "/faculty-members/Saroj_Patra_Professor_Computer_Science.jpg"
    },
    {
      id: 11,
      name: "Ms. Sonali Gayen",
      department: "Computer Science",
      designation: "Professor",
      description: "Guiding the academic framework and fostering innovation in computing.",
      image: "/faculty-members/Sonali_Gayen_Professor_Computer_Science.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#0c111d] font-sans selection:bg-[#f59e0b] selection:text-[#0c111d] transition-colors duration-300">
      <Navbar />

      <main className="pt-32 pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          <div className="text-center mb-16 md:mb-24">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#0c111d] uppercase leading-[0.9] mb-8"
            >
              OUR FACULTY<br />MENTORS.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono-code text-[#0c111d] text-sm md:text-base font-bold uppercase tracking-widest border-l-4 border-[#f59e0b] pl-6 py-2 max-w-2xl mx-auto text-left"
            >
              The guiding pillars of our institution, providing invaluable academic and technical mentorship to student innovators.
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                className="group relative aspect-[3/4] bg-white overflow-hidden border-4 border-[#0c111d] cursor-pointer shadow-[8px_8px_0px_0px_#0c111d] hover:shadow-[12px_12px_0px_0px_#f59e0b] hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                {/* Front of Card: Photo + White Label Bar */}
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex-1 overflow-hidden bg-[#0c111d]">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <div className="bg-white p-5 border-t-4 border-[#0c111d] z-10 flex flex-col justify-center shrink-0 h-auto min-h-[100px]">
                    <h3 className="font-serif-display text-xl sm:text-2xl uppercase tracking-tight font-black text-[#0c111d] mb-1 break-words">
                      {member.name}
                    </h3>
                    <p className="font-mono-code text-[10px] sm:text-xs font-bold text-[#f59e0b] uppercase tracking-widest break-words">
                      {member.designation}
                    </p>
                  </div>
                </div>

                {/* Back of Card: Solid Black Info Panel sliding up */}
                <div className="absolute inset-0 bg-[#0c111d] p-8 flex flex-col justify-center z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <h3 className="font-serif-display text-2xl sm:text-3xl uppercase tracking-tight font-black text-white mb-2 line-clamp-2">
                    {member.name}
                  </h3>
                  <p className="font-mono-code text-xs font-black text-[#f59e0b] uppercase tracking-widest mb-8">
                    {member.designation}
                  </p>
                  
                  <div className="flex flex-col gap-6">
                    <div className="inline-flex w-fit px-3 py-1 bg-white text-[#0c111d] font-mono-code font-black text-[10px] uppercase tracking-widest">
                      {member.department}
                    </div>
                    <p className="text-gray-300 font-mono-code text-xs uppercase tracking-wider font-bold leading-relaxed">
                      {member.description}
                    </p>
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
