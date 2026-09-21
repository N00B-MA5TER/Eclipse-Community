"use client";

import Link from "next/link";
import { useAuth } from "@/lib/firebase/auth";
import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
    <div className="min-h-screen bg-[#fcfbf9] text-[#0c111d] font-body-lg antialiased selection:bg-[#acffd4] selection:text-[#0c111d] relative">
      <Navbar />
      
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 lg:py-12">
        {/* VARIANT 3 HERO: CLASSIC NEWSPAPER MASTHEAD FORMAT */}
        <div className="border-b-2 border-[#0c111d] pb-8 mb-10 text-center">
          {/* Top Subhead Wire & Tag Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0c111d]/20 pb-3 mb-6 font-mono-code text-[11px] text-[#434656]">
            <div className="inline-flex items-center gap-2 bg-[#0c111d] text-[#fcfbf9] px-3.5 py-1 rounded-full font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#acffd4] inline-block animate-ping"></span>
              <span>• OFFICIAL TECH CLUB OF DIATM</span>
            </div>
            <div className="font-bold tracking-wider text-[#0c111d]">
              COLLEGIATE ARCHITECTURAL EDITION
            </div>
            <div className="text-[#737688]">
              RELEASE CODENAME: BROAD-MONO-07
            </div>
          </div>
          
          {/* Full-Width Massive Centered Headline */}
          <div className="py-4">
            <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.95] text-[#0c111d] uppercase">
              Outshine the Ordinary.
            </h1>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl tracking-[-0.02em] uppercase text-[#0c111d]">
                DEFINE THE FUTURE.
              </span>
              <span className="bg-[#acffd4] text-[#002113] border border-[#007b54] px-3 py-1 text-[11px] font-mono-code font-bold uppercase tracking-wider">
                TECH INITIATIVE // ACTIVE RECRUITMENT
              </span>
            </div>
          </div>
          
          {/* Masthead Lower Hairline Rule */}
          <div className="border-t border-[#0c111d] pt-3 mt-4 flex flex-wrap items-center justify-between text-[11px] font-mono-code text-[#434656]">
            <span className="font-bold text-[#0c111d]">DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING</span>
            <span>COLLEGIATE BROADSHEET JOURNAL — ISSUE NO. 26</span>
            <span className="text-[#737688]">AUTUMN TERM 2026</span>
          </div>
        </div>

        {/* BALANCED 3-COLUMN HERO LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 pb-16 border-b-2 border-[#0c111d]">
          {/* LEFT COLUMN: Club Overview & CTAs */}
          <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#0c111d] pb-8 lg:pb-0 lg:pr-8">
            <div>
              <div className="flex items-center gap-2 border-b border-[#0c111d] pb-2 mb-4 font-mono-code text-[11px]">
                <span className="w-2 h-2 bg-[#0c111d]"></span>
                <span className="font-bold tracking-wider text-[#0c111d]">■ COLUMN 01 // OVERVIEW</span>
              </div>
              <div className="border-l-4 border-[#0c111d] pl-4 py-1 mb-6">
                <p className="font-body-lg text-base sm:text-lg text-[#0c111d] leading-relaxed font-normal">
                  Ecllipse is the official Tech Club of our college. Join a vibrant community of passionate developers and creators to host workshops, collaborate on epic projects, and push the boundaries of technology.
                </p>
                <p className="mt-4 text-xs text-[#434656] font-mono-code">
                  // INCUBATING OPEN-SOURCE, SYSTEMS PROGRAMMING &amp; EXPERIMENTAL INTERACTION DESIGN.
                </p>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-[#0c111d]/20">
              <div className="flex flex-wrap items-center gap-3">
                <Link 
                  className="h-12 px-6 bg-[#0c111d] text-[#fcfbf9] font-mono-code text-xs font-bold uppercase tracking-wider flex items-center justify-center hover:bg-[#0045cc] transition-colors shadow-[3px_3px_0px_0px_#acffd4] border border-[#0c111d]" 
                  href={user ? "/dashboard" : "/register"}
                >
                  GET STARTED
                </Link>
                <Link
                  aria-label="Explore action" 
                  className="w-12 h-12 border border-[#0c111d] bg-[#ffffff] flex items-center justify-center hover:bg-[#0c111d] hover:text-[#fcfbf9] transition-colors" 
                  href="/about"
                >
                  <span className="material-symbols-outlined text-lg">north_east</span>
                </Link>
              </div>
              <Link className="inline-flex items-center gap-2 font-mono-code text-xs uppercase font-bold tracking-wider text-[#0c111d] hover:underline underline-offset-4 pt-2" href="/gallery/events">
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                <span>Watch club highlights</span>
              </Link>
            </div>
          </div>

          {/* CENTER COLUMN: Program Snapshot Card */}
          <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#0c111d] pb-8 lg:pb-0 lg:pr-8">
            <div className="relative border-2 border-[#0c111d] bg-[#ffffff] p-6 bracket-corner-tl bracket-corner-br shadow-[4px_4px_0px_0px_#0c111d]">
              {/* Card Header Telemetry */}
              <div className="flex items-center justify-between border-b border-[#0c111d] pb-3 mb-5 font-mono-code text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#0c111d]"></span>
                  <span className="font-bold tracking-wider text-[#0c111d]">■ PROGRAM SNAPSHOT</span>
                </div>
                <span className="text-[#737688] font-semibold">DIATM.DEV // 2026</span>
              </div>
              
              {/* Event Headline & Visual Token */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#0c111d] text-[#acffd4] flex items-center justify-center font-mono-code font-black text-xl shrink-0">
                  #01
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-display text-xl font-bold text-[#0c111d]">Hackathon 2026</h3>
                    <span className="bg-[#acffd4] text-[#002113] text-[9px] font-mono-code font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#007b54]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007b54]"></span> LIVE
                    </span>
                  </div>
                  <p className="text-[13px] text-[#434656] mt-0.5">
                    Create, manage, and join epic events.
                  </p>
                </div>
              </div>
              
              {/* Capacity Bar & Gauge */}
              <div className="space-y-1.5 my-5 bg-[#f5f4ef] p-3 border border-[#0c111d]/20">
                <div className="flex justify-between text-[11px] font-mono-code">
                  <span className="text-[#434656]">COHORT CAPACITY</span>
                  <span className="font-bold text-[#0c111d]">72% ALLOCATED</span>
                </div>
                <div className="h-3 w-full bg-[#e2e7ff] border border-[#0c111d] overflow-hidden flex">
                  <div className="bg-[#0c111d] h-full w-[54%]"></div>
                  <div className="bg-[#acffd4] h-full w-[18%]"></div>
                  <div className="bg-transparent h-full w-[28%]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono-code text-[#737688]">
                  <span>[■ COMMITTED]</span>
                  <span>[▨ RESERVED]</span>
                  <span>[□ OPEN SLOTS]</span>
                </div>
              </div>
              
              {/* Team Avatars & Full status */}
              <div className="border-t border-b border-[#0c111d] py-3.5 my-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5 font-mono-code text-[11px] font-bold">
                    <span className="w-7 h-7 rounded bg-[#0c111d] text-[#fcfbf9] flex items-center justify-center border border-[#ffffff]">AK</span>
                    <span className="w-7 h-7 rounded bg-[#283044] text-[#fcfbf9] flex items-center justify-center border border-[#ffffff]">RD</span>
                    <span className="w-7 h-7 rounded bg-[#434656] text-[#fcfbf9] flex items-center justify-center border border-[#ffffff]">PS</span>
                    <span className="w-7 h-7 rounded bg-[#007b54] text-[#acffd4] flex items-center justify-center border border-[#ffffff]">MS</span>
                  </div>
                  <span className="text-[12px] font-mono-code font-semibold text-[#0c111d] ml-1">4 / 4 Team is full!</span>
                </div>
                <div className="text-right">
                  <span className="font-mono-code font-bold text-sm text-[#0c111d]">2.4k</span>
                  <p className="text-[10px] font-mono-code text-[#737688] uppercase">Registrations</p>
                </div>
              </div>
              
              {/* Snapshot Telemetry Bottom Foot */}
              <div className="flex items-center justify-between text-[10px] font-mono-code text-[#434656] pt-1">
                <span className="font-bold text-[#0c111d]">■ NETWORK SYSTEM: ACTIVE</span>
                <span className="text-[#007b54] font-bold">01 // 03</span>
              </div>
            </div>
            <div className="mt-4 border border-[#0c111d] p-3 bg-[#f5f4ef] flex items-center justify-between text-[11px] font-mono-code">
              <span className="text-[#434656]">AFFILIATED COLLECTIVE</span>
              <span className="font-bold text-[#0c111d]">DIATM TECH FORUM // AUTUMN '26</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Affiliation & Campus Credentials */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-[#0c111d] pb-2 mb-4 font-mono-code text-[11px]">
                <span className="w-2 h-2 bg-[#0c111d]"></span>
                <span className="font-bold tracking-wider text-[#0c111d]">■ DISPATCH CREDENTIALS</span>
              </div>
              <div className="border border-[#0c111d] bg-[#ffffff] divide-y divide-[#0c111d]">
                <div className="p-4">
                  <p className="text-[10px] font-mono-code uppercase tracking-wider text-[#737688]">FOUNDED</p>
                  <p className="text-base font-mono-code font-bold text-[#0c111d] mt-1">Durgapur, WB</p>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-mono-code uppercase tracking-wider text-[#737688]">AFFILIATION</p>
                  <p className="text-base font-mono-code font-bold text-[#0c111d] mt-1">Dept. of CSE &amp; IT</p>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-mono-code uppercase tracking-wider text-[#737688]">STATUS</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#007b54]"></span>
                    <span className="text-xs font-mono-code font-bold uppercase text-[#007b54] bg-[#acffd4] px-2 py-0.5 border border-[#007b54]">
                      Open Admissions
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 border border-[#0c111d] p-4 bg-[#f5f4ef] font-mono-code text-[11px] text-[#434656] space-y-2">
              <p className="font-bold text-[#0c111d] uppercase border-b border-[#0c111d]/20 pb-1.5">// DISPATCH VERIFICATION</p>
              <p>COLLEGIATE ARCHITECTURAL EDITION</p>
              <p>DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING</p>
              <p className="text-[#737688]">RELEASE CODENAME: BROAD-MONO-07</p>
            </div>
          </div>
        </div>

        {/* SECTION 01: OUR IDENTITY */}
        <section className="py-14 border-b-2 border-[#0c111d]" id="about">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#0c111d] pb-3 mb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono-code font-bold text-sm text-[#0c111d]">01 / IDENTITY</span>
              <span className="text-[#737688]">/</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0c111d]">Who We Are &amp; Core Pillars</h2>
            </div>
            <span className="font-mono-code text-[11px] text-[#737688] uppercase tracking-widest">ARCHITECTURAL MANIFESTO</span>
          </div>

          <div className="space-y-6">
            {/* Narrative Card 1 */}
            <div className="border border-[#0c111d] bg-[#ffffff] hover:shadow-[4px_4px_0px_0px_#0c111d] transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#0c111d]">
                <div className="lg:col-span-3 p-6 bg-[#f5f4ef] flex flex-col justify-between">
                  <div className="font-mono-code text-[11px]">
                    <span className="font-bold text-[#0c111d]">01 / ARCH</span>
                    <span className="block text-[#737688] mt-1">FOUNDATIONAL</span>
                  </div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#0c111d] mt-4">Who We Are</h3>
                </div>
                <div className="lg:col-span-5 p-6 flex flex-col justify-between">
                  <p className="font-body-md text-sm sm:text-base text-[#434656] leading-relaxed">
                    A premier collegiate collective pushing technological boundaries, fostering peer mentorship and pioneering digital craft across systems, product design, and computation.
                  </p>
                  <Link className="inline-flex items-center gap-2 font-mono-code text-[11px] font-bold uppercase tracking-wider text-[#0c111d] hover:text-[#0045cc] mt-4 pt-4 border-t border-[#0c111d]/10" href="/about">
                    <span>DISCOVER WHO WE ARE</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
                <div className="lg:col-span-4 p-6 bg-[#ffffff] flex items-center">
                  <div className="w-full border-l-4 border-[#0c111d] pl-4 py-2 bg-[#f5f4ef] text-sm font-serif-display italic text-[#0c111d]">
                    "Autonomous learning through collective execution."
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Card 2 */}
            <div className="border border-[#0c111d] bg-[#ffffff] hover:shadow-[4px_4px_0px_0px_#0c111d] transition-shadow" id="mission">
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#0c111d]">
                <div className="lg:col-span-3 p-6 bg-[#f5f4ef] flex flex-col justify-between">
                  <div className="font-mono-code text-[11px]">
                    <span className="font-bold text-[#0c111d]">02 / CORE</span>
                    <span className="block text-[#737688] mt-1">TRAJECTORY</span>
                  </div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#0c111d] mt-4">Our Mission</h3>
                </div>
                <div className="lg:col-span-5 p-6 flex flex-col justify-between">
                  <p className="font-body-md text-sm sm:text-base text-[#434656] leading-relaxed">
                    To transform classroom theory into production-ready software and hardware engineering. We organize student sprints, hackathons, and technical bootcamps that cultivate industry readiness.
                  </p>
                  <Link className="inline-flex items-center gap-2 font-mono-code text-[11px] font-bold uppercase tracking-wider text-[#0c111d] hover:text-[#0045cc] mt-4 pt-4 border-t border-[#0c111d]/10" href="/mission">
                    <span>EXPLORE OUR SPRINT SCHEDULE</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
                <div className="lg:col-span-4 p-6 bg-[#ffffff] flex items-center">
                  <div className="w-full border-l-4 border-[#0c111d] pl-4 py-2 bg-[#f5f4ef] text-sm font-serif-display italic text-[#0c111d]">
                    "Bridging the gap between academia and modern engineering."
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Card 3 */}
            <div className="border border-[#0c111d] bg-[#ffffff] hover:shadow-[4px_4px_0px_0px_#0c111d] transition-shadow" id="vision">
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#0c111d]">
                <div className="lg:col-span-3 p-6 bg-[#f5f4ef] flex flex-col justify-between">
                  <div className="font-mono-code text-[11px]">
                    <span className="font-bold text-[#0c111d]">03 / HORIZON</span>
                    <span className="block text-[#737688] mt-1">TARGET 2028</span>
                  </div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#0c111d] mt-4">Our Vision</h3>
                </div>
                <div className="lg:col-span-5 p-6 flex flex-col justify-between">
                  <p className="font-body-md text-sm sm:text-base text-[#434656] leading-relaxed">
                    Establishing DIATM as an internationally recognized hub of student innovation, competitive programming excellence, and open-source contributions with scalable real-world utility.
                  </p>
                  <Link className="inline-flex items-center gap-2 font-mono-code text-[11px] font-bold uppercase tracking-wider text-[#0c111d] hover:text-[#0045cc] mt-4 pt-4 border-t border-[#0c111d]/10" href="/vision">
                    <span>READ VISION ARCHIVE</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
                <div className="lg:col-span-4 p-6 bg-[#ffffff] flex items-center">
                  <div className="w-full border-l-4 border-[#0c111d] pl-4 py-2 bg-[#f5f4ef] text-sm font-serif-display italic text-[#0c111d]">
                    "Building institutions that outlast four-year degrees."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: SUCCESSFUL EVENTS */}
        <section className="py-14 border-b-2 border-[#0c111d]" id="achievements">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#0c111d] pb-3 mb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono-code font-bold text-sm text-[#0c111d]">02 / RECORD</span>
              <span className="text-[#737688]">/</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0c111d]">Successful Events &amp; Retrospectives</h2>
            </div>
            <span className="font-mono-code text-[11px] text-[#737688] uppercase tracking-widest">ARCHIVE // 2025-2026</span>
          </div>

          <div className="border-2 border-[#0c111d] bg-[#ffffff] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-[5px_5px_0px_0px_#0c111d]">
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-[#ffffff] border-b lg:border-b-0 lg:border-r border-[#0c111d]">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3 font-mono-code text-[11px]">
                  <span className="text-[#007b54] font-bold">ANNUAL FLAGSHIP SPRINT</span>
                  <span className="text-[#737688]">•</span>
                  <span className="text-[#737688]">CONCLUDED FEB 2026</span>
                </div>
                <h3 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0c111d] mb-4 leading-tight">
                  Zero to Hackathon: Build and Break
                </h3>
                <p className="font-body-md text-base text-[#434656] leading-relaxed mb-6">
                  A 24-hour sprint that immersed students from first-year basics through building fully operational full-stack web and IoT prototypes. 36 projects were judged by industry alumni from leading tech giants.
                </p>
                <div className="grid grid-cols-3 border border-[#0c111d] bg-[#f5f4ef] mb-6 divide-x divide-[#0c111d]">
                  <div className="p-3.5 text-center">
                    <p className="font-mono-code text-2xl font-bold text-[#0c111d]">120+</p>
                    <p className="text-[10px] font-mono-code uppercase text-[#737688] mt-0.5">Builders</p>
                  </div>
                  <div className="p-3.5 text-center">
                    <p className="font-mono-code text-2xl font-bold text-[#0c111d]">36</p>
                    <p className="text-[10px] font-mono-code uppercase text-[#737688] mt-0.5">Projects</p>
                  </div>
                  <div className="p-3.5 text-center">
                    <p className="font-mono-code text-2xl font-bold text-[#0c111d]">24h</p>
                    <p className="text-[10px] font-mono-code uppercase text-[#737688] mt-0.5">Continuous</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#0c111d]/20 font-mono-code text-xs">
                <span className="text-[#434656]">WINNER: TEAM CYBER-SYNTHESIS</span>
                <Link className="bg-[#0c111d] text-[#fcfbf9] px-5 py-2.5 font-bold uppercase tracking-wider hover:bg-[#0045cc] transition-colors text-center" href="/achievements">
                  VIEW EVENT RECAP &amp; SUBMISSIONS →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative min-h-[360px] bg-[#f5f4ef]">
              <div className="w-full h-full bg-cover bg-center absolute inset-0 filter grayscale hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('/zero-to-hackathon/photos/20260825_151418.jpg')" }}></div>
              <div className="absolute top-3 left-3 bg-[#0c111d] text-[#acffd4] px-2.5 py-1 text-[10px] font-mono-code font-bold uppercase tracking-wider">
                CASE STUDY // EVENT #04
              </div>
              <div className="absolute bottom-3 right-3 bg-[#ffffff] border border-[#0c111d] px-2.5 py-1 text-[10px] font-mono-code font-semibold shadow-sm">
                STATUS: COMPLETED
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: TECHNOLOGIES WE WORK WITH */}
        <section className="py-14 border-b-2 border-[#0c111d]">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#0c111d] pb-3 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono-code font-bold text-sm text-[#0c111d]">03 / STACK</span>
              <span className="text-[#737688]">/</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0c111d]">Technologies We Work With</h2>
            </div>
            <span className="font-mono-code text-[11px] text-[#737688] uppercase tracking-widest">ACTIVE TOOLCHAINS // V26</span>
          </div>

          <div className="border-y-2 border-[#0c111d] bg-[#ffffff] overflow-hidden py-3 my-4">
            <div className="animate-marquee flex items-center gap-8">
              {/* Set 1 */}
              <div className="flex items-center gap-8 font-mono-code shrink-0">
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">React</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Frontend UI</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">Python</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Algorithms &amp; AI</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">Next.js</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Full-Stack</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">TypeScript</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Type Systems</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">Node.js</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Runtime</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">Arduino</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Hardware / IoT</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">TensorFlow</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Machine Learning</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">Figma</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Interface Systems</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
              </div>
              
              {/* Duplicate Set for Seamless Continuous Marquee */}
              <div aria-hidden="true" className="flex items-center gap-8 font-mono-code shrink-0">
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">React</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Frontend UI</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">Python</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Algorithms &amp; AI</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">Next.js</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Full-Stack</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">TypeScript</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Type Systems</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">Node.js</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Runtime</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">Arduino</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Hardware / IoT</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">TensorFlow</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Machine Learning</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
                <div className="flex items-center gap-3 px-3">
                  <span className="font-black text-2xl text-[#0c111d]">Figma</span>
                  <span className="text-[10px] uppercase text-[#737688] bg-[#f5f4ef] px-2 py-0.5 border border-[#0c111d]/20">Interface Systems</span>
                </div>
                <span className="text-[#0c111d]/30 font-bold">/</span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 p-2.5 bg-[#f5f4ef] border border-[#0c111d] flex flex-wrap items-center justify-between text-[11px] font-mono-code text-[#434656]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#007b54]"></span>
              <span>COMPUTE REPO: DIATM-ECLLIPSE / LAB-INFRA</span>
            </div>
            <div>
              <span>CI/CD PIPELINE: PASSED [100%]</span>
            </div>
          </div>
        </section>

        {/* SECTION 05: COMPACT CENTERED COLLEGIATE ANNOUNCEMENT BLOCK */}
        <section className="py-14" id="register">
          <div className="bg-[#0c111d] text-[#fcfbf9] border-2 border-[#0c111d] p-8 sm:p-12 text-center relative overflow-hidden shadow-[8px_8px_0px_0px_#acffd4] max-w-4xl mx-auto">
            <div className="text-[10px] font-mono-code text-[#737688] tracking-widest uppercase mb-4">
              ADMISSION BATCH: AUTUMN 2026 // SLOTS LIMITED
            </div>
            <div className="inline-flex items-center gap-2 bg-[#ffffff]/10 text-[#acffd4] px-3.5 py-1 rounded text-xs font-mono-code uppercase font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#acffd4] animate-pulse"></span>
              <span>OPEN ADMISSIONS RECRUITMENT</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-extrabold text-[#fcfbf9] leading-tight mb-4">
              Ready to outshine the ordinary?
            </h2>
            <p className="font-body-lg text-[#e6ebf4] text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Join the collective. Whether you build compilers, design systems, configure circuits, or craft communities, Ecllipse is where DIATM builds the future.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link 
                className="h-12 px-8 bg-[#acffd4] text-[#002113] font-mono-code text-xs font-black uppercase tracking-wider flex items-center justify-center hover:bg-[#6ffbbe] transition-colors border border-[#acffd4]" 
                href={user ? "/dashboard" : "/register"}
              >
                {user ? "GO TO DASHBOARD" : "REGISTER NOW"}
              </Link>
              <Link 
                className="h-12 px-6 border border-[#fcfbf9] text-[#fcfbf9] font-mono-code text-xs font-bold uppercase tracking-wider flex items-center justify-center hover:bg-[#ffffff]/10 transition-colors" 
                href="/about"
              >
                READ CLUB CONSTITUTION
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
