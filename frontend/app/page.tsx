"use client";

import Link from "next/link";
import { useAuth } from "@/lib/firebase/auth";
import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Layout,
  Users,
  BarChart3,
  ArrowRight,
  Play,
  Globe,
  Target,
  Lightbulb,
  ArrowUpRight,
  Bookmark,
  Code,
  FileCode2,
  PenTool,
  Cpu,
  BrainCircuit,
  Zap,
  Server,
} from "lucide-react";
import Image from "next/image";
import { Typewriter } from "@/components/ui/typewriter";

export default function Home() {
  const { user, loading } = useAuth();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans text-black dark:text-white selection:bg-black selection:text-[#22c55e] dark:selection:bg-white dark:selection:text-[#22c55e] relative broadsheet-grid">
      <Navbar />
      <main className="w-full pt-0 bg-surface min-h-[calc(100vh-14rem)]">
        {/*  Editorial Broadsheet Headline Banner  */}
        <section
          className="border-b border-black bg-white px-4 sm:px-8 lg:px-12 py-8 lg:py-12 relative overflow-hidden"
          data-purpose="editorial-headline-banner"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div
                className="inline-flex items-center space-x-2.5 px-3 py-1 bg-black text-white rounded-none border border-black mb-4"
                data-purpose="verified-badge"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#22c55e]">
                  OFFICIAL TECH COMMUNITY OF DIATM
                </span>
              </div>
              <h1 className="font-editorial-serif text-5xl sm:text-6xl lg:text-6xl xl:text-[6rem] font-bold tracking-tight text-black leading-[0.98] lg:whitespace-nowrap">
                Outshine the <br />
                Ordinary.
              </h1>
            </div>
            <div className="lg:text-right pb-2 flex-1 lg:flex-[1.2]">
              <p className="text-3xl sm:text-4xl lg:text-4xl xl:text-6xl font-sans font-bold tracking-tight text-black uppercase min-h-[80px] sm:min-h-[100px] xl:min-h-[72px] flex items-center justify-start lg:justify-end">
                <Typewriter 
                  phrases={[
                    "DEFINE THE FUTURE.",
                    "BUILD THE NEXT BIG THING.",
                    "INNOVATE BEYOND LIMITS.",
                    "CODE YOUR IMAGINATION."
                  ]} 
                />
              </p>
              <div className="inline-block mt-2 px-2 py-0.5 bg-[#22c55e] text-black font-mono text-[11px] font-bold tracking-widest uppercase">
                TECH INITIATIVE // ACTIVE RECRUITMENT
              </div>
            </div>
          </div>
        </section>
        {/*  Hero Bento Grid Matrix  */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-black bg-white">
          {/*  Left Console Column: Program Snapshot Bento  */}
          <section className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-black p-6 sm:p-8 lg:p-10 bg-neutral-50/50">
            <div className="relative bg-white border border-black p-6 sm:p-7 shadow-[4px_4px_0px_0px_#000000]">
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-black"></div>
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-black"></div>
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-black"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-black"></div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-5">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#22c55e]"></span>
                  <span className="text-[11px] font-mono tracking-widest text-black font-bold uppercase">
                    PROGRAM SNAPSHOT
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  DIATM.DEV // 2026
                </span>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-white border border-black rounded-none relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-none bg-black text-white flex items-center justify-center border border-black">
                      <Layout className="w-5 h-5" />
                    </div>
                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-none bg-[#22c55e]/15 border border-[#22c55e] text-black text-[10px] font-mono font-bold tracking-wide uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping"></span>
                      <span className="font-bold text-black">LIVE</span>
                    </div>
                  </div>
                  <div className="space-y-1 mb-5">
                    <h3 className="text-2xl font-editorial-serif font-bold text-black tracking-tight">
                      SIH 26' Internal Hackathon
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                      Create, manage, and join epic events.
                    </p>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-neutral-200">
                    <div className="flex justify-between text-[11px] font-mono text-neutral-600">
                      <span className="font-bold text-neutral-800 uppercase tracking-wider">
                        CAPACITY PROGRESS
                      </span>
                      <span className="font-bold text-black font-mono">
                        72%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-100 rounded-none h-2.5 overflow-hidden border border-neutral-300 p-0.5">
                      <div className="bg-black h-full w-[72%]"></div>
                    </div>
                    <div className="w-full bg-neutral-100 rounded-none h-1.5 overflow-hidden">
                      <div className="bg-[#22c55e] h-full w-[42%]"></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-black rounded-none flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-6 h-6 rounded-none bg-neutral-100 text-black border border-neutral-300 flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-bold text-black">
                          4 / 4
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-neutral-700 mb-3">
                        Team is full!
                      </p>
                    </div>
                    <div className="flex -space-x-1.5 overflow-hidden pt-1">
                      <div className="inline-block h-6 w-6 rounded-none border border-black bg-white flex items-center justify-center text-[10px] font-mono font-bold text-black">
                        AK
                      </div>
                      <div className="inline-block h-6 w-6 rounded-none border border-black bg-neutral-200 text-black flex items-center justify-center text-[10px] font-mono font-bold">
                        RD
                      </div>
                      <div className="inline-block h-6 w-6 rounded-none border border-black bg-black text-white flex items-center justify-center text-[10px] font-mono font-bold">
                        PS
                      </div>
                      <div className="inline-block h-6 w-6 rounded-none border border-black bg-[#22c55e] text-black flex items-center justify-center text-[10px] font-mono font-bold">
                        MS
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white border border-black rounded-none flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-6 h-6 rounded-none bg-neutral-100 text-black border border-neutral-300 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                        TOTAL
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-editorial-serif font-bold text-black tracking-tight">
                        2.4k
                      </div>
                      <p className="text-[11px] font-medium text-neutral-500">
                        Registrations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                <span className="flex items-center gap-1.5 text-black font-semibold">
                  <span className="w-1.5 h-1.5 bg-[#22c55e]"></span>NETWORK
                  SYSTEM : ACTIVE
                </span>
                <span className="text-neutral-400">01 // 03</span>
              </div>
            </div>
          </section>
          {/*  Right Editorial Column  */}
          <section className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 lg:p-12 bg-white">
            <div className="max-w-2xl space-y-8">
              <div className="border-l-4 border-black pl-6 py-2">
                <p className="text-lg sm:text-xl text-neutral-800 font-normal leading-relaxed">
                  Eclipse is the official Tech Community of our college. Join a
                  vibrant community of passionate developers and creators to
                  host workshops, collaborate on epic projects, and push the
                  boundaries of technology.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                <Link
                  className="px-8 py-3.5 bg-black hover:bg-[#22c55e] hover:text-black text-white font-mono text-xs uppercase tracking-wider font-bold rounded-none transition-all duration-200 border border-black shadow-[3px_3px_0px_0px_#000000] hover:shadow-none focus:outline-none flex items-center space-x-2 group"
                  href={user ? "/dashboard" : "/register"}
                >
                  <span>GET STARTED</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  className="group inline-flex items-center space-x-3 text-sm font-medium text-black hover:text-[#22c55e] transition-colors focus:outline-none py-3"
                  href="/gallery/events"
                >
                  <span className="w-10 h-10 rounded-none border border-black bg-white flex items-center justify-center group-hover:border-black group-hover:bg-neutral-100 transition-all shadow-[2px_2px_0px_0px_#000000]">
                    <Play className="w-5 h-5 ml-1 fill-current" />
                  </span>
                  <span className="tracking-tight font-sans font-semibold">
                    Watch club highlights
                  </span>
                </Link>
              </div>
            </div>
            <div className="mt-12 pt-6 border-t border-neutral-200 w-full grid grid-cols-2 gap-6 text-xs text-neutral-600 font-mono">
              <div className="border-l-2 border-neutral-200 pl-3">
                <span className="block text-neutral-400 uppercase text-[10px] tracking-wider mb-0.5">
                  FOUNDED
                </span>
                <span className="font-bold text-black">Durgapur, WB</span>
              </div>
              <div className="border-l-2 border-neutral-200 pl-3">
                <span className="block text-neutral-400 uppercase text-[10px] tracking-wider mb-0.5">
                  AFFILIATION
                </span>
                <span className="font-bold text-black">
                  Dept. of CSE &amp; IT
                </span>
              </div>
            </div>
          </section>
        </div>
        {/*  Identity Section  */}
        <section className="w-full py-16 lg:py-24 bg-white border-b border-black">
          <div className="px-4 sm:px-8 lg:px-12 max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-black">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black text-white rounded-none font-mono text-[11px] uppercase tracking-widest font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>{" "}
                  DISCOVER ECLIPSE
                </div>
                <h2 className="font-editorial-serif text-[36px] sm:text-[48px] leading-tight font-bold tracking-tight text-black uppercase mt-3">
                  Our Identity
                </h2>
              </div>
              <div className="text-right">
                <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider block">
                  PILLARS OF INGENUITY
                </span>
                <span className="font-mono text-[11px] text-black font-bold">
                  ARCHIVE ENTRY NO. 02
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white rounded-none p-7 border border-black shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-between hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all relative">
                <span className="absolute top-3 right-3 font-mono text-[11px] text-neutral-400">
                  01 / ARCH
                </span>
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-none bg-black text-white flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] text-[#22c55e] uppercase font-bold tracking-widest">
                      FOUNDATION
                    </span>
                    <h3 className="font-editorial-serif text-2xl font-bold text-black">
                      Who We Are
                    </h3>
                  </div>
                  <blockquote className="text-neutral-700 italic leading-relaxed pt-2 border-l-2 border-black pl-3 text-sm font-serif">
                    “ECLIPSE is the Official Tech Community of DIATM — a
                    multidisciplinary ecosystem where technology, creativity,
                    research, and culture converge.”
                  </blockquote>
                </div>
                <div className="pt-8">
                  <Link
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-black group-hover:text-[#22c55e] transition-colors"
                    href="/about"
                  >
                    <span>DISCOVER WHO WE ARE</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              <div className="group bg-white rounded-none p-7 border border-black shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-between hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all relative">
                <span className="absolute top-3 right-3 font-mono text-[11px] text-neutral-400">
                  02 / CORE
                </span>
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-none bg-black text-white flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] text-[#22c55e] uppercase font-bold tracking-widest">
                      ROADMAP
                    </span>
                    <h3 className="font-editorial-serif text-2xl font-bold text-black">
                      Our Mission
                    </h3>
                  </div>
                  <div className="pt-2">
                    <p className="font-editorial-serif text-[22px] sm:text-[26px] leading-snug font-bold text-black">
                      Learn. Create. Challenge. Evolve.
                    </p>
                    <p className="text-xs text-neutral-600 pt-2 leading-relaxed">
                      Democratizing technical proficiency across engineering
                      cohorts through hands-on fabrication, continuous peer
                      review, and competitive deployment.
                    </p>
                  </div>
                </div>
                <div className="pt-8">
                  <Link
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-black group-hover:text-[#22c55e] transition-colors"
                    href="/mission"
                  >
                    <span>READ OUR MISSION</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              <div className="group bg-white rounded-none p-7 border border-black shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-between hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all relative">
                <span className="absolute top-3 right-3 font-mono text-[11px] text-neutral-400">
                  03 / HORIZON
                </span>
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-none bg-black text-white flex items-center justify-center">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] text-[#22c55e] uppercase font-bold tracking-widest">
                      PERSPECTIVE
                    </span>
                    <h3 className="font-editorial-serif text-2xl font-bold text-black">
                      Our Vision
                    </h3>
                  </div>
                  <div className="pt-2">
                    <p className="font-editorial-serif text-[22px] sm:text-[26px] leading-snug font-bold text-black">
                      We don't prepare for the future. We build it.
                    </p>
                    <p className="text-xs text-neutral-600 pt-2 leading-relaxed">
                      Establishing an autonomous student-led innovation nexus
                      recognized across national hackathons and developer
                      ecosystems.
                    </p>
                  </div>
                </div>
                <div className="pt-8">
                  <Link
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-black group-hover:text-[#22c55e] transition-colors"
                    href="/vision"
                  >
                    <span>SEE OUR VISION</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  Successful Events  */}
        <section className="w-full py-16 lg:py-24 bg-white border-b border-black relative">
          <div className="px-4 sm:px-8 lg:px-12 max-w-container-max mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3 pb-4 border-b border-black">
              <div>
                <span className="font-mono text-xs text-black font-bold tracking-widest uppercase block mb-1">
                  ■ ACHIEVEMENTS
                </span>
                <h2 className="font-editorial-serif text-[32px] sm:text-[44px] font-bold tracking-tight text-black uppercase">
                  Successful Events
                </h2>
              </div>
              <Link
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-black hover:text-[#22c55e] transition-colors"
                href="/achievements"
              >
                <span>EVENT ARCHIVE (FULL INDEX)</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white border border-black rounded-none p-6 lg:p-10 shadow-[6px_6px_0px_0px_#000000]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 relative group overflow-hidden border border-black aspect-video sm:aspect-[4/3] bg-black flex flex-col justify-between">
                  <img
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 filter grayscale transition-all duration-500"
                    alt="Zero to Hackathon event moment"
                    src="/zero-to-hackathon/photos/20260825_151418.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="relative z-10 p-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-black font-mono text-[11px] font-bold uppercase tracking-wider border border-black">
                      <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping"></span>{" "}
                      COMPLETED SUCCESSFULLY
                    </span>
                    <span className="font-mono text-[11px] text-white bg-black/80 px-2 py-0.5 border border-white/20">
                      VOL. 01 // ED. 26
                    </span>
                  </div>
                  <div className="relative z-10 p-5 space-y-1">
                    <span className="font-mono text-[10px] text-[#22c55e] uppercase tracking-widest font-bold">
                      KEYNOTE &amp; CODE SPRINT
                    </span>
                    <p className="font-sans text-white font-bold text-lg">
                      49 builders , 12 project submit, 2 days workshop
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-black font-mono text-xs font-bold uppercase tracking-widest">
                      <Bookmark className="w-5 h-5" />
                      <span>INAUGURAL FLAGSHIP SESSION</span>
                    </div>
                    <h3 className="font-editorial-serif text-[32px] sm:text-[40px] leading-[1.1] font-bold text-black tracking-tight uppercase">
                      Zero to Hackathon: <br className="hidden sm:inline" />
                      <span className="text-neutral-500 font-normal">
                        Build and Break
                      </span>
                    </h3>
                  </div>
                  <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">
                    Our very first successfully conducted event! This inaugural
                    gathering combined deep-dive topics, an intensive hackathon,
                    and interactive hands-on sessions. It brought together
                    brilliant minds from our campus to learn, collaborate, and
                    build real-world projects.
                  </p>
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-neutral-300 font-mono text-xs">
                    <div>
                      <span className="block text-neutral-400 uppercase text-[10px]">
                        FORMAT
                      </span>
                      <span className="font-bold text-black">HYBRID LAB</span>
                    </div>
                    <div>
                      <span className="block text-neutral-400 uppercase text-[10px]">
                        AUDIENCE
                      </span>
                      <span className="font-bold text-black">DIATM 155</span>
                    </div>
                    <div>
                      <span className="block text-neutral-400 uppercase text-[10px]">
                        OUTCOME
                      </span>
                      <span className="font-bold text-black bg-[#22c55e]/20 px-1">
                        TOP 3 MENTORED
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link
                      className="inline-flex items-center gap-2.5 px-6 py-3 bg-black text-white hover:bg-[#22c55e] hover:text-black font-mono text-xs font-bold uppercase tracking-wider rounded-none transition-all shadow-[3px_3px_0px_0px_#000000] hover:shadow-none"
                      href="/gallery"
                    >
                      <span>VIEW EVENT GALLERY</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <span className="font-mono text-[11px] text-neutral-500">
                      ARCHIVED ON FEB 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  Multidisciplinary Stack Section  */}
        <section className="w-full py-16 lg:py-20 bg-neutral-50/50 border-b border-black">
          <div className="px-4 sm:px-8 lg:px-12 max-w-container-max mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-none font-mono text-[11px] uppercase tracking-widest font-semibold">
                <span>■</span> MULTIDISCIPLINARY STACK
              </div>
              <h2 className="font-editorial-serif text-[28px] sm:text-[38px] font-bold tracking-tight text-black uppercase">
                Technologies We Work With
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-sans">
                From embedded systems to enterprise cloud architectures and
                visual systems design.
              </p>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex w-[200%] animate-marquee hover:[animation-play-state:paused] gap-3">
                {/* First Set */}
                <div className="flex-1 flex gap-3">
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <Code className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">React</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">FRONTEND</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <FileCode2 className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">Python</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">AI / SCRIPT</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <PenTool className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">Figma</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">INTERFACE</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <Cpu className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">Arduino</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">HARDWARE</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <BrainCircuit className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">TensorFlow</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">ML MODELS</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <Zap className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">Next.js</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">FULL-STACK</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <Server className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">Node.js</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">BACKEND</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <Code className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">TypeScript</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">SYSTEMS</span>
                  </div>
                </div>
                {/* Second Set */}
                <div className="flex-1 flex gap-3" aria-hidden="true">
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <Code className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">React</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">FRONTEND</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <FileCode2 className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">Python</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">AI / SCRIPT</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <PenTool className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">Figma</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">INTERFACE</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <Cpu className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">Arduino</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">HARDWARE</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <BrainCircuit className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">TensorFlow</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">ML MODELS</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <Zap className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">Next.js</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">FULL-STACK</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <Server className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">Node.js</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">BACKEND</span>
                  </div>
                  <div className="flex-1 min-w-[120px] group bg-white border border-black rounded-none p-4 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_0px_#000000]">
                    <Code className="w-7 h-7 mb-2" />
                    <span className="font-mono text-xs font-bold text-black">TypeScript</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">SYSTEMS</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-white border border-black py-3 overflow-hidden shadow-[3px_3px_0px_0px_#000000] relative">
              {/* Marquee Wrapper */}
              <div className="flex w-[200%] animate-marquee hover:[animation-play-state:paused]">
                {/* First Set */}
                <div className="flex-1 flex items-center justify-around whitespace-nowrap font-mono text-xs text-neutral-600 uppercase tracking-widest px-4">
                  <span className="inline-flex items-center gap-2 text-black font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>{" "}
                    ACTIVE TOOLCHAINS:
                  </span>
                  <span>REACT</span>
                  <span>•</span>
                  <span>PYTHON</span>
                  <span>•</span>
                  <span>FIGMA</span>
                  <span>•</span>
                  <span>ARDUINO</span>
                  <span>•</span>
                  <span>TENSORFLOW</span>
                  <span>•</span>
                <span>NEXT.JS</span>
                <span>•</span>
                <span>NODE.JS</span>
                <span>•</span>
                <span>TYPESCRIPT</span>
                </div>
                {/* Second Set for seamless loop */}
                <div className="flex-1 flex items-center justify-around whitespace-nowrap font-mono text-xs text-neutral-600 uppercase tracking-widest px-4" aria-hidden="true">
                  <span className="inline-flex items-center gap-2 text-black font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>{" "}
                    ACTIVE TOOLCHAINS:
                  </span>
                  <span>REACT</span>
                  <span>•</span>
                  <span>PYTHON</span>
                  <span>•</span>
                  <span>FIGMA</span>
                  <span>•</span>
                  <span>ARDUINO</span>
                  <span>•</span>
                  <span>TENSORFLOW</span>
                  <span>•</span>
                  <span>NEXT.JS</span>
                  <span>•</span>
                  <span>NODE.JS</span>
                  <span>•</span>
                  <span>TYPESCRIPT</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  Callout Admission Banner  */}
        <section className="w-full py-16 bg-white border-b border-black">
          <div className="px-4 sm:px-8 lg:px-12 max-w-container-max mx-auto">
            <div className="bg-black text-white rounded-none p-8 sm:p-12 lg:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-black shadow-[6px_6px_0px_0px_#000000]">
              <div className="space-y-4 max-w-xl relative z-10">
                <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/10 text-[#22c55e] font-mono text-[11px] font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping"></span>{" "}
                  ADMISSIONS OPEN // COHORT 2026
                </span>
                <h2 className="font-editorial-serif text-[30px] sm:text-[44px] leading-tight font-bold tracking-tight uppercase">
                  Ready to Outshine the Ordinary?
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  Join DIATM's premier tech society. Gain direct access to
                  hackathon teams, industry mentoring, research pipelines, and
                  high-velocity project collabs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full md:w-auto">
                <Link
                  className="w-full sm:w-auto text-center px-8 py-4 bg-[#22c55e] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-none hover:bg-white transition-all shadow-[3px_3px_0px_0px_#ffffff] hover:shadow-none"
                  href={user ? "/dashboard" : "/register"}
                >
                  REGISTER NOW
                </Link>
                <Link
                  className="w-full sm:w-auto text-center px-7 py-4 bg-transparent hover:bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-none transition-all border border-white"
                  href="/contact"
                >
                  CONTACT US
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
