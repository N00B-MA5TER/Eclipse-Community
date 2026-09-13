"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  Rocket,
  Target,
  GraduationCap,
  Users,
  Globe,
  Lightbulb,
  Layout,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-[#22c55e] relative broadsheet-grid">
      <Navbar />
      <main className="flex-grow">
        {/*  BEGIN: HeroSection  */}
        {/*  Foundational Mission Statement & Architectural Registry Frame  */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16">
          {/*  Top Classification Row  */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black pb-4 mb-8 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-600 block mb-2">
                FOUNDATIONAL DIRECTIVE // ARCHIVE ENTRY NO. 02
              </span>
              <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-black">
                Mission of
                <br />
                <span className="tracking-tight uppercase">ECLIPSE</span>
              </h1>
            </div>
            <div className="text-left md:text-right font-mono text-xs flex flex-col items-start md:items-end space-y-1">
              <span className="font-bold text-black tracking-wider text-[11px]">
                DURGAPUR INSTITUTE OF ADVANCED TECHNOLOGY &amp; MANAGEMENT
              </span>
              <span className="text-neutral-500 text-[10px]">
                DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING / IT
              </span>
              <div className="inline-block bg-[#00e599] text-black font-bold font-mono px-2 py-0.5 mt-1 text-[10px] border border-black/20">
                CHAPTER ID: 155 // EST. 2026
              </div>
            </div>
          </div>
          {/*  Split Grid / Manifesto Frame with Technical Accents  */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/*  Left Column: Primary Directive Statement (8 cols)  */}
            <article
              className="lg:col-span-8 border border-black p-6 md:p-10 flex flex-col justify-between bg-white relative bracket-corner"
              data-purpose="manifesto-card"
            >
              <div>
                {/*  Section Micro-header  */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                    ┌ OFFICIAL MANDATE // PURPOSE STATEMENT ┐
                  </span>
                  <span className="font-mono text-[10px] text-neutral-400">
                    P.01 - 04
                  </span>
                </div>
                {/*  Massive Mission Statement Quote from Document  */}
                <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-black mb-8">
                  “To create a culture where curiosity becomes capability and
                  ideas become impact.”
                </blockquote>
                {/*  Document Mission Body Explanations  */}
                <div className="space-y-4 font-sans text-neutral-700 text-sm md:text-base leading-relaxed max-w-3xl">
                  <p className="">
                    <strong className="text-black font-semibold">
                      ECLIPSE
                    </strong>{" "}
                    empowers{" "}
                    <em className="font-serif italic font-medium text-black">
                      thinkers, builders, researchers, and creators
                    </em>{" "}
                    through hands-on innovation, interdisciplinary
                    collaboration, experimentation, and real-world problem
                    solving.
                  </p>
                  <p className="">
                    We strive to{" "}
                    <em className="font-serif italic text-black">
                      learn without limits, build without boundaries, and
                      challenge what already exists
                    </em>{" "}
                    — creating an ecosystem where every member has the freedom
                    to explore, fail, evolve, and create what comes next.
                  </p>
                </div>
              </div>
              {/*  Meta Information Row at Bottom  */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-8 pt-4 border-t border-black text-neutral-600 font-mono text-[10px] uppercase">
                <div className="bg-neutral-50 p-2 border border-neutral-200">
                  <span className="text-neutral-400 block text-[9px]">
                    ORIGIN
                  </span>
                  FOUNDED: DURGAPUR, WB
                </div>
                <div className="bg-neutral-50 p-2 border border-neutral-200">
                  <span className="text-neutral-400 block text-[9px]">
                    ACADEMIC AFFILIATION
                  </span>
                  DEPT. OF CSE &amp; IT
                </div>
                <div className="bg-[#00e599]/10 p-2 border border-[#00e599]/40 text-black">
                  <span className="text-neutral-500 block text-[9px]">
                    REGISTRY CODE
                  </span>
                  CHAPTER ID: 155
                </div>
              </div>
            </article>
            {/*  Right Column: Institutional Registry Card (4 cols)  */}
            <aside
              className="lg:col-span-4 border border-black p-6 md:p-8 flex flex-col justify-between bg-neutral-50/50"
              data-purpose="registry-card"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-6 font-mono text-[10px]">
                  <span className="tracking-widest uppercase font-semibold text-black">
                    MISSION REGISTRY
                  </span>
                  <span className="bg-[#00e599] text-black px-2 py-0.5 font-bold rounded-none">
                    ACTIVE
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-black tracking-tight mb-3">
                  CULTURE OF EXECUTION
                </h3>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed mb-6">
                  Cultivating an open laboratory environment where collegiate
                  engineering transcends textbooks into real-world production
                  systems, industrial sponsorships, and community software
                  releases.
                </p>
                <div className="space-y-3 font-mono text-[11px] border-t border-b border-neutral-200 py-4 my-6">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">TACTICAL DOMAIN:</span>
                    <span className="font-semibold text-black">
                      INTERDISCIPLINARY
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">OPERATIONAL CYCLE:</span>
                    <span className="font-semibold text-black">
                      SPRINT 2026.01
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">COHORT STATUS:</span>
                    <span className="text-emerald-700 font-semibold">
                      SYNCHRONIZED
                    </span>
                  </div>
                </div>
              </div>
              {/*  Geolocation Telemetry Footer  */}
              <div className="font-mono text-[10px] text-neutral-500 pt-4 border-t border-neutral-200 flex justify-between">
                <span className="">LAT: 23.5204° N</span>
                <span className="">LONG: 87.3119° E</span>
              </div>
            </aside>
          </div>
        </section>
        {/*  END: HeroSection  */}
        {/*  BEGIN: FourCorePillarsSection  */}
        {/*  Architectural Bento Grid: Learn, Create, Challenge, Evolve  */}
        <section className="border-t border-black py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/*  Header Row  */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-black/20 gap-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 bg-black text-white px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 bg-[#00e599]"></span>
                  <span className="">CORE CONSTITUTION</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black">
                  THE FOUR FOUNDATIONAL PILLARS
                </h2>
              </div>
              <div className="text-left md:text-right font-mono text-xs text-neutral-500 max-w-sm">
                <span className="block uppercase font-bold text-black text-[10px] tracking-wider mb-1">
                  SYSTEMIC DIRECTIVES
                </span>
                A blueprint driving student-led innovation across engineering
                disciplines.
              </div>
            </div>
            {/*  4-Column Action Directives Grid  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/*  Pillar 01: LEARN  */}
              <article
                className="border border-black p-6 bg-white hover:border-black transition-all flex flex-col justify-between group hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                data-purpose="pillar-card-01"
              >
                <div>
                  <div className="flex justify-between items-start font-mono text-[10px] text-neutral-500 mb-6">
                    <span className="w-6 h-6 border border-black flex items-center justify-center font-bold text-black">
                      01
                    </span>
                    <span className="uppercase tracking-widest text-neutral-400">
                      FOUNDATION
                    </span>
                  </div>
                  <span className="inline-block font-mono text-[10px] font-bold text-[#00a86b] uppercase tracking-wider mb-2">
                    DISCOVERY
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-black tracking-tight mb-3">
                    Learn
                  </h3>
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                    Pushing past boundaries to discover new technologies,
                    unconventional frameworks, and advanced engineering
                    methodologies.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-neutral-200 font-mono text-[10px] flex items-center justify-between group-hover:text-black">
                  <span className="uppercase font-semibold">
                    TRACK: KNOWLEDGE LABS
                  </span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </article>
              {/*  Pillar 02: CREATE  */}
              <article
                className="border border-black p-6 bg-white hover:border-black transition-all flex flex-col justify-between group hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                data-purpose="pillar-card-02"
              >
                <div>
                  <div className="flex justify-between items-start font-mono text-[10px] text-neutral-500 mb-6">
                    <span className="w-6 h-6 border border-black flex items-center justify-center font-bold text-black">
                      02
                    </span>
                    <span className="uppercase tracking-widest text-neutral-400">
                      EXECUTION
                    </span>
                  </div>
                  <span className="inline-block font-mono text-[10px] font-bold text-[#00a86b] uppercase tracking-wider mb-2">
                    PRACTICE
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-black tracking-tight mb-3">
                    Create
                  </h3>
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                    Turning curiosity into tangible impact through hands-on
                    innovation, code sprints, hardware prototypes, and deployed
                    products.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-neutral-200 font-mono text-[10px] flex items-center justify-between group-hover:text-black">
                  <span className="uppercase font-semibold">
                    TRACK: BUILD LABS
                  </span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </article>
              {/*  Pillar 03: CHALLENGE  */}
              <article
                className="border border-black p-6 bg-white hover:border-black transition-all flex flex-col justify-between group hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                data-purpose="pillar-card-03"
              >
                <div>
                  <div className="flex justify-between items-start font-mono text-[10px] text-neutral-500 mb-6">
                    <span className="w-6 h-6 border border-black flex items-center justify-center font-bold text-black">
                      03
                    </span>
                    <span className="uppercase tracking-widest text-neutral-400">
                      RIGOR
                    </span>
                  </div>
                  <span className="inline-block font-mono text-[10px] font-bold text-[#00a86b] uppercase tracking-wider mb-2">
                    CRITIQUE
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-black tracking-tight mb-3">
                    Challenge
                  </h3>
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                    Questioning what exists to find better, more efficient
                    solutions. Stress-testing ideas through rigorous hackathons
                    and technical debates.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-neutral-200 font-mono text-[10px] flex items-center justify-between group-hover:text-black">
                  <span className="uppercase font-semibold">
                    TRACK: COMPETITIVE LABS
                  </span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </article>
              {/*  Pillar 04: EVOLVE  */}
              <article
                className="border border-black p-6 bg-white hover:border-black transition-all flex flex-col justify-between group hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                data-purpose="pillar-card-04"
              >
                <div>
                  <div className="flex justify-between items-start font-mono text-[10px] text-neutral-500 mb-6">
                    <span className="w-6 h-6 border border-black flex items-center justify-center font-bold text-black">
                      04
                    </span>
                    <span className="uppercase tracking-widest text-neutral-400">
                      ITERATION
                    </span>
                  </div>
                  <span className="inline-block font-mono text-[10px] font-bold text-[#00a86b] uppercase tracking-wider mb-2">
                    RESILIENCE
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-black tracking-tight mb-3">
                    Evolve
                  </h3>
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                    Embracing failure as a vital stepping stone to constant
                    growth, refining codebases, and transitioning into seasoned
                    technical leaders.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-neutral-200 font-mono text-[10px] flex items-center justify-between group-hover:text-black">
                  <span className="uppercase font-semibold">
                    TRACK: RESEARCH COHORTS
                  </span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>
        {/*  END: FourCorePillarsSection  */}
        {/*  BEGIN: ResearchImpactTelemetrySection  */}
        {/*  Applied Impact & Photographic Sprint Archive matching Screen 2  */}
        <section className="border-t border-black py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/*  Section Title Header  */}
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 mb-8 border-b border-black/20 gap-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-600 block mb-1">
                  ■ RESEARCH &amp; COMPUTATION
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-black">
                  COLLABORATIVE COGNITION
                </h2>
              </div>
              <span className="font-mono text-xs text-neutral-500 tracking-wider">
                CAMPUS CENTRAL LAB // SPRINT ARCHIVE #04
              </span>
            </div>
            {/*  2-Column Applied Showcase  */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/*  Left: Big Lab Photographic Card (7 cols)  */}
              <div className="lg:col-span-7 border border-black p-2 bg-white relative">
                <div className="relative bg-neutral-900 overflow-hidden aspect-[16/10]">
                  <img
                    alt="Engineering students working collaboratively in DIATM campus robotics laboratory"
                    className="w-full h-full object-cover filter grayscale contrast-125 opacity-90"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpSN5kXuyuV-JJvpbFHX58ziTARidg3i9a2qtsYm_jNl-5dTmXuz0sN408Xo_t9Vn2F44Dk0qc4hBVa1NO04NFLxo0J0GwmF2p31rnMRs8Uels5h-DkabUHGfpWDM2fOXNXgNZZX_n6RHvGmlP_NBngBtMnaXt6VzE7YQgRL2pyVdK5qp4-eqDwjM_YABCOINoZIBShFLX3wnUVPxIwBBpZkJn7ew2A8xv6s_ZWNhGaUmrWdFCEY5xEA"
                  />
                  {/*  Telemetry Stamp Overlays  */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white font-mono text-[9px] px-2 py-1 border border-neutral-700">
                    DIATM HACK-LAB // LIVE TELEMETRY
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#00e599] text-black font-mono font-bold text-[9px] px-2 py-0.5">
                    CAMPUS CENTRAL LAB
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white font-mono text-[9px] px-2 py-1">
                    FIG 01.1 — SPRINT ARCHIVE #04
                  </div>
                </div>
              </div>
              {/*  Right: Secondary Lab & Live Index Metric Matrices (5 cols)  */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                {/*  Secondary Frame with Mini Picture  */}
                <div className="border border-black p-3 bg-white flex space-x-4 items-center">
                  <div className="w-1/3 aspect-[4/3] bg-neutral-800 overflow-hidden relative border border-black">
                    <img
                      alt="Student workspace screen session"
                      className="w-full h-full object-cover filter grayscale contrast-110"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkzhXvdzEAmccwibCFjUleI_bv_0cgJIeGMx12LHLkS4e4dwFqpU21_q78RpbMeGXJK_7vtkOPungIpsoCGVrrksuUMGK0l7rYoyNMhIQZfBTD0P3nav4mKFGzLeAIJ_sSDK04IqR1d2Q0lzELwPFgTOuyjCIIlUfibHDwyMjVuHPw3jCIcu_kKy4FCfxjYOE6aFuLNjubJOAV-ZZFHwMF6I0eX__fYKpgm-JCDDeksQqM4cx266O4rA"
                    />
                  </div>
                  <div className="w-2/3 font-mono">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] text-neutral-400">
                        FIG 01.2 — WORKSPACE
                      </span>
                      <span className="bg-black text-white text-[9px] px-1.5 py-0.5">
                        STATION
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-black">
                      ADVANCED RESEARCH SPACES
                    </h4>
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Equipped with high-performance edge compute, neural model
                      training servers, and rapid prototyping benches.
                    </p>
                  </div>
                </div>
                {/*  Index Metrics Telemetry Box  */}
                <div className="border border-black p-6 bg-white">
                  <div className="flex justify-between items-center pb-3 border-b border-black mb-6 font-mono text-[10px]">
                    <span className="font-bold tracking-wider uppercase text-black">
                      ■ INDEX METRICS
                    </span>
                    <span className="text-neutral-500 tracking-wider">
                      TELEMETRY MATRIX
                    </span>
                  </div>
                  {/*  3 Horizontal Stat Counters  */}
                  <div className="grid grid-cols-3 divide-x divide-black text-center py-2">
                    <div className="px-2">
                      <div className="font-serif font-bold text-3xl md:text-4xl text-black">
                        120+
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 mt-1">
                        BUILDERS
                      </div>
                    </div>
                    <div className="px-2">
                      <div className="font-serif font-bold text-3xl md:text-4xl text-black">
                        04
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 mt-1">
                        CORE PILLARS
                      </div>
                    </div>
                    <div className="px-2">
                      <div className="font-serif font-bold text-3xl md:text-4xl text-[#00a86b]">
                        100%
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 mt-1">
                        OPEN SOURCE
                      </div>
                    </div>
                  </div>
                  {/*  Status Telemetry Bar  */}
                  <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-between items-center font-mono text-[10px]">
                    <span className="text-neutral-500">SYSTEM RUNTIME:</span>
                    <span className="font-bold text-black">99.8% UPTIME</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  END: ResearchImpactTelemetrySection  */}
        {/*  BEGIN: OperationalRadarSection  */}
        {/*  Operational Radar & Telemetry Matrix (From Screen 2)  */}
        <section className="border-t border-black py-16 bg-neutral-50/40">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/*  Section Bar  */}
            <div className="flex justify-between items-center pb-4 mb-8 border-b border-black font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-black"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-black">
                  OPERATIONAL RADAR &amp; TELEMETRY MATRIX
                </span>
              </div>
              <div className="border border-black px-2.5 py-0.5 text-[10px] uppercase font-semibold bg-white">
                CAMPUS STATUS: ACTIVE
              </div>
            </div>
            {/*  3 Tactical Columns  */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/*  Card 1: Member Roster  */}
              <div className="border border-black p-6 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-neutral-500 font-mono text-[10px] uppercase pb-2 border-b border-neutral-100 mb-4">
                    <span className="">MEMBER ROSTER</span>
                    <span className="">⚙</span>
                  </div>
                  <div className="font-serif font-bold text-2xl text-black mb-2">
                    120+ Builders
                  </div>
                  <p className="font-sans text-xs text-neutral-600 mb-6 leading-relaxed">
                    Cross-disciplinary engineers, UI/UX architects, ML
                    practitioners, and systems enthusiasts representing DIATM
                    batch cohorts.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[9px] uppercase mb-1">
                    <span className="text-neutral-400">CAPACITY: 82%</span>
                    <span className="text-black font-semibold">
                      SLOTS RESERVED
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 border border-black overflow-hidden">
                    <div className="bg-black h-full w-[82%]"></div>
                  </div>
                </div>
              </div>
              {/*  Card 2: Primary Vectors  */}
              <div className="border border-black p-6 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-neutral-500 font-mono text-[10px] uppercase pb-2 border-b border-neutral-100 mb-4">
                    <span className="">PRIMARY VECTORS</span>
                    <span className="">⬡</span>
                  </div>
                  <div className="font-serif font-bold text-2xl text-black mb-3">
                    5 Dedicated Tracks
                  </div>
                  {/*  Vector Badges Grid  */}
                  <div className="flex flex-wrap gap-1.5 mb-4 font-mono text-[9px] uppercase font-medium">
                    <span className="border border-black px-2 py-1 bg-white">
                      SYSTEMS
                    </span>
                    <span className="border border-black px-2 py-1 bg-white">
                      AI / ML
                    </span>
                    <span className="border border-black px-2 py-1 bg-white">
                      HARDWARE &amp; IOT
                    </span>
                    <span className="border border-black px-2 py-1 bg-white">
                      DESIGN &amp; UI
                    </span>
                    <span className="border border-black px-2 py-1 bg-white">
                      WEB3 &amp; DISTRIBUTED
                    </span>
                  </div>
                </div>
                <div className="pt-3 border-t border-neutral-200 flex justify-between items-center font-mono text-[10px]">
                  <span className="text-neutral-500">SPECIALIZED LABS</span>
                  <span className="bg-[#00e599] text-black font-bold px-2 py-0.5">
                    ALL ONLINE
                  </span>
                </div>
              </div>
              {/*  Card 3: Admissions Telemetry  */}
              <div className="border border-black p-6 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-neutral-500 font-mono text-[10px] uppercase pb-2 border-b border-neutral-100 mb-4">
                    <span className="">ADMISSIONS TELEMETRY</span>
                    <span className="">↗</span>
                  </div>
                  <div className="font-serif font-bold text-2xl text-black mb-2">
                    Cohort 2026 Active
                  </div>
                  <p className="font-sans text-xs text-neutral-600 mb-6 leading-relaxed">
                    Open calls for junior developers, researchers, and event
                    designers are undergoing review cycles.
                  </p>
                </div>
                <a
                  className="w-full text-center bg-black text-white hover:bg-[#00e599] hover:text-black font-mono font-bold text-xs uppercase py-3 border border-black transition-colors block"
                  href="/contact/membership"
                >
                  ACCESS RECRUITMENT PORTAL ↗
                </a>
              </div>
            </div>
          </div>
        </section>
        {/*  END: OperationalRadarSection  */}
        {/*  BEGIN: CallToActionBanner  */}
        {/*  Signature Editorial High-Contrast Dark CTA Banner matching Screen 2  */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div
            className="bg-black text-white p-8 sm:p-12 md:p-14 border border-black relative overflow-hidden"
            data-purpose="dark-cta-card"
          >
            {/*  Background Grid Ticks  */}
            <div className="absolute inset-0 tech-dots opacity-10 pointer-events-none"></div>
            <div className="relative z-10">
              {/*  Top Tag  */}
              <div className="inline-flex items-center space-x-2 bg-neutral-900 border border-neutral-800 px-3 py-1 mb-6 text-[10px] font-mono tracking-widest text-[#00e599] uppercase">
                <span className="w-1.5 h-1.5 bg-[#00e599] rounded-full animate-ping"></span>
                <span className="">■ ADMISSIONS OPEN // COHORT 2026</span>
              </div>
              {/*  Grid layout for Title vs Actions  */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-neutral-800">
                <div className="lg:col-span-8">
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white mb-4">
                    READY TO OUTSHINE THE ORDINARY?
                  </h2>
                  <p className="font-sans text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed">
                    Join DIATM's premier tech society. Gain direct access to
                    hackathon teams, industry mentoring, research pipelines, and
                    high-velocity project collabs.
                  </p>
                </div>
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                  <a
                    className="bg-[#00e599] hover:bg-[#00c584] text-black font-mono font-bold tracking-wider uppercase px-6 py-3.5 text-center text-xs transition-colors border border-[#00e599]"
                    href="/contact/membership"
                  >
                    REGISTER NOW
                  </a>
                  <a
                    className="bg-transparent hover:bg-neutral-900 text-white font-mono font-bold tracking-wider uppercase px-6 py-3.5 text-center text-xs transition-colors border border-neutral-700 hover:border-white"
                    href="/contact"
                  >
                    CONTACT US
                  </a>
                </div>
              </div>
              {/*  Bottom Telemetry Meta Strip  */}
              <div className="pt-6 flex flex-wrap justify-between items-center gap-4 font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                <div className="">COHORT CYCLE: 2026.01</div>
                <div className="">LOCATION: DIATM CAMPUS, RAJBANDH</div>
                <div className="text-[#00e599]">STATUS: ACCEPTING DOSSIERS</div>
              </div>
            </div>
          </div>
        </section>
        {/*  END: CallToActionBanner  */}
      </main>
      <Footer />
    </div>
  );
}
