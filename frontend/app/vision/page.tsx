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

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-[#f59e0b] relative broadsheet-grid">
      <Navbar />
      <main className="w-full bg-background min-h-screen pt-0">
        <div className="flex flex-col w-full bg-white text-black">
          <div className="border-b border-black bg-white px-4 sm:px-8 lg:px-12 py-4">
            <div className="max-w-container-max mx-auto flex flex-wrap items-center justify-between gap-4 font-label-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white border border-black font-label-mono text-[11px] uppercase tracking-widest font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
                  ■ WHO WE ARE // OUR VISION
                </span>
                <span className="hidden sm:inline-flex text-neutral-500 font-label-mono text-xs tracking-wider">
                  DOC_REF: ECLL-VIS-V26
                </span>
              </div>
              <div className="flex items-center gap-4 font-label-mono text-xs text-neutral-600 uppercase tracking-wider">
                <span className="">SECURITY LEVEL: PUBLIC DISCLOSURE</span>
                <span className="text-black font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
                  SYNCHRONIZED
                </span>
              </div>
            </div>
          </div>
          <section className="w-full px-margin-mobile md:px-margin-desktop pt-8 md:pt-12 pb-12 bg-white">
            <div className="max-w-container-max mx-auto flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black font-label-mono text-label-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold uppercase tracking-widest text-black flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-black inline-block"></span>
                    FOUNDATIONAL DIRECTIVE
                  </span>
                  <span className="text-neutral-400">//</span>
                  <span className="text-neutral-600 tracking-wider">
                    ARCHIVE ENTRY NO. 03
                  </span>
                </div>
                <div className="flex items-center gap-3 text-neutral-600 font-medium">
                  <span className="">CHAPTER ID: 155</span>
                  <span className="text-neutral-400">•</span>
                  <span className="">VOL. 26</span>
                </div>
              </div>
              <div className="py-8 md:py-12 border-b border-black">
                <h1
                  className="text-display-hero-mobile md:text-display-hero text-black tracking-tight font-extrabold uppercase mb-4 leading-none"
                  style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                >
                  Vision of ECLIPSE
                </h1>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 font-label-mono text-label-mono text-neutral-700 uppercase">
                  <span className="font-bold text-black">
                    Durgapur Institute of Advanced Technology &amp; Management
                  </span>
                  <span className="text-neutral-400">|</span>
                  <span className="">
                    Department of Computer Science &amp; Engineering / IT
                  </span>
                  <span className="text-neutral-400">|</span>
                  <span className="px-2 py-0.5 border border-black bg-black text-[#f59e0b] font-bold">
                    EST. 2026 // RAJBANDH CHAPTER
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-xl pt-8 md:pt-10">
                <div className="lg:col-span-8 flex flex-col justify-between bg-white p-6 md:p-10 border border-black relative">
                  <div className="flex items-center justify-between font-label-mono text-label-mono text-neutral-600 pb-4 mb-6 border-b border-black">
                    <span className="font-bold text-black">
                      ┌ OFFICIAL MANDATE // VISION STATEMENT ┐
                    </span>
                    <span className="tracking-widest font-bold text-black">
                      P. 01 — 04
                    </span>
                  </div>
                  <div className="space-y-6 md:space-y-8">
                    <blockquote
                      className="text-headline-lg-mobile md:text-headline-lg text-black font-bold tracking-tight leading-tight"
                      style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                    >
                      “ECLIPSE exists to build the future,{" "}
                      <br className="hidden sm:inline" />
                      not simply follow it.”
                    </blockquote>
                    <div className="space-y-4 font-body-lg text-body-lg text-neutral-800 leading-relaxed">
                      <p className="">
                        We envision a multidisciplinary ecosystem where{" "}
                        <strong className="text-black font-bold underline decoration-black decoration-2 underline-offset-4">
                          technology, creativity, research, and culture converge
                        </strong>{" "}
                        — turning curiosity into ideas, ideas into creation, and
                        creation into impact.
                      </p>
                      <p className="">
                        We empower{" "}
                        <strong className="text-black font-bold">
                          thinkers, builders, researchers, and creators
                        </strong>{" "}
                        to break boundaries, experiment without fear, and create
                        beyond convention.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-black">
                      <p
                        className="text-headline-md text-black font-extrabold tracking-tight"
                        style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                      >
                        We don't prepare for the future.{" "}
                        <span className="underline decoration-black decoration-4 underline-offset-4 font-black">
                          We build it.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 mt-8 border-t border-black font-label-mono text-label-mono">
                    <div className="p-3 bg-neutral-50 border border-black">
                      <span className="block text-[10px] text-neutral-600 uppercase tracking-wider font-semibold">
                        Origin Vector
                      </span>
                      <span className="font-bold text-black">
                        FOUNDED: DURGAPUR, WB
                      </span>
                    </div>
                    <div className="p-3 bg-neutral-50 border border-black">
                      <span className="block text-[10px] text-neutral-600 uppercase tracking-wider font-semibold">
                        Academic Affiliation
                      </span>
                      <span className="font-bold text-black">
                        DEPT. OF CSE &amp; IT
                      </span>
                    </div>
                    <div className="p-3 bg-neutral-50 border border-black">
                      <span className="block text-[10px] text-neutral-600 uppercase tracking-wider font-semibold">
                        Registry Identity
                      </span>
                      <span className="font-bold text-black">
                        CHAPTER ID: 155
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 flex flex-col gap-gutter-md">
                  <div className="p-6 md:p-8 bg-white border border-black flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-black font-label-mono text-label-mono">
                        <span className="font-bold text-black tracking-wider">
                          VISION REGISTRY
                        </span>
                        <span className="px-2 py-0.5 border border-black bg-[#f59e0b] text-black font-bold text-[10px] uppercase">
                          ACTIVE
                        </span>
                      </div>
                      <h3
                        className="text-headline-sm text-black font-bold mb-3 uppercase tracking-tight"
                        style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                      >
                        Architects of Tomorrow
                      </h3>
                      <p className="font-body-md text-body-md text-neutral-700 leading-relaxed mb-6">
                        Engineering generational platforms and establishing
                        autonomous collegiate venture studios that pioneer
                        open-source infrastructure and transformative
                        technological breakthroughs.
                      </p>
                    </div>
                    <div className="space-y-2.5 font-label-mono text-label-mono bg-neutral-50 p-4 border border-black">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-600">
                          TACTICAL DOMAIN:
                        </span>
                        <span className="font-bold text-black">
                          EXPONENTIAL TECH
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-600">HORIZON:</span>
                        <span className="font-bold text-black">
                          2030+ EXPANDED
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-600">
                          CHAPTER STATUS:
                        </span>
                        <span className="font-bold text-black flex items-center gap-1">
                          <span className="w-2 h-2 bg-[#f59e0b] inline-block"></span>
                          SYNCHRONIZED
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs pt-2 border-t border-neutral-300 text-[10px]">
                        <span className="text-neutral-600">COORDINATES:</span>
                        <span className="text-black font-semibold">
                          23.5204° N, 87.3119° E
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-black text-white border border-black flex flex-col justify-between">
                    <div className="flex items-center justify-between font-label-mono text-label-mono text-neutral-400 mb-2">
                      <span className="uppercase tracking-widest text-[10px] font-bold">
                        PHILOSOPHY PROTOCOL
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-[#f59e0b]">
                        verified
                      </span>
                    </div>
                    <p
                      className="text-headline-sm text-white font-bold tracking-tight mb-2"
                      style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                    >
                      100% Student-Driven Autonomy
                    </p>
                    <p className="font-body-sm text-body-sm text-neutral-300 leading-relaxed">
                      Decentralized tracks owned, engineered, and executed by
                      forward-thinking collegiate cohorts at DIATM.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full px-margin-mobile md:px-margin-desktop py-12 md:py-16 bg-white border-y border-black">
            <div className="max-w-container-max mx-auto flex flex-col">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-black">
                <div>
                  <div className="flex items-center gap-2 font-label-mono text-label-mono text-black font-bold uppercase tracking-widest mb-2">
                    <span className="w-2 h-2 bg-black inline-block"></span>
                    <span className="">■ STRATEGIC DIRECTIVES</span>
                    <span className="text-neutral-400">//</span>
                    <span className="text-neutral-600">FUTURE HORIZONS</span>
                  </div>
                  <h2
                    className="text-headline-lg text-black font-bold uppercase tracking-tight"
                    style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                  >
                    The Architecture of Impact
                  </h2>
                </div>
                <p className="font-body-md text-body-md text-neutral-700 max-w-md">
                  Systemic blueprints guiding student innovation, laboratory
                  research, and generational technological leadership at DIATM.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-md">
                <div className="bg-white p-6 border border-black flex flex-col justify-between hover:bg-neutral-50 transition-colors">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-black font-label-mono text-label-mono">
                      <span className="text-black font-bold">
                        01 / SPECULATE
                      </span>
                      <span className="text-neutral-500 text-[10px] font-semibold">
                        PILLAR.A
                      </span>
                    </div>
                    <h3
                      className="text-headline-sm text-black font-bold mb-2 tracking-tight"
                      style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                    >
                      Converge &amp; Speculate
                    </h3>
                    <p className="font-body-md text-body-md text-neutral-700 leading-relaxed">
                      Uniting computing, design, and hardware to architect
                      speculative systems before industry demand materializes.
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-black flex items-center justify-between font-label-mono text-label-mono">
                    <span className="text-neutral-700 text-xs font-semibold">
                      TRACK: FRONTIER LABS
                    </span>
                    <span className="material-symbols-outlined text-black text-[16px]">
                      arrow_forward
                    </span>
                  </div>
                </div>
                <div className="bg-white p-6 border border-black flex flex-col justify-between hover:bg-neutral-50 transition-colors">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-black font-label-mono text-label-mono">
                      <span className="text-black font-bold">
                        02 / EXPERIMENT
                      </span>
                      <span className="text-neutral-500 text-[10px] font-semibold">
                        PILLAR.B
                      </span>
                    </div>
                    <h3
                      className="text-headline-sm text-black font-bold mb-2 tracking-tight"
                      style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                    >
                      Fearless Experimentation
                    </h3>
                    <p className="font-body-md text-body-md text-neutral-700 leading-relaxed">
                      Empowering builders to take high-stakes technical risks in
                      autonomous sandboxes without fear of failure.
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-black flex items-center justify-between font-label-mono text-label-mono">
                    <span className="text-neutral-700 text-xs font-semibold">
                      TRACK: EXPERIMENTAL COHORTS
                    </span>
                    <span className="material-symbols-outlined text-black text-[16px]">
                      arrow_forward
                    </span>
                  </div>
                </div>
                <div className="bg-white p-6 border border-black flex flex-col justify-between hover:bg-neutral-50 transition-colors">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-black font-label-mono text-label-mono">
                      <span className="text-black font-bold">
                        03 / TRANSCEND
                      </span>
                      <span className="text-neutral-500 text-[10px] font-semibold">
                        PILLAR.C
                      </span>
                    </div>
                    <h3
                      className="text-headline-sm text-black font-bold mb-2 tracking-tight"
                      style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                    >
                      Beyond Convention
                    </h3>
                    <p className="font-body-md text-body-md text-neutral-700 leading-relaxed">
                      Rejecting standard collegiate limitations to ship
                      production-grade systems and published research on a
                      global stage.
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-black flex items-center justify-between font-label-mono text-label-mono">
                    <span className="text-neutral-700 text-xs font-semibold">
                      TRACK: SYSTEMS &amp; PROTOCOLS
                    </span>
                    <span className="material-symbols-outlined text-black text-[16px]">
                      arrow_forward
                    </span>
                  </div>
                </div>
                <div className="bg-white p-6 border border-black flex flex-col justify-between hover:bg-neutral-50 transition-colors">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-black font-label-mono text-label-mono">
                      <span className="text-black font-bold">04 / REALIZE</span>
                      <span className="text-neutral-500 text-[10px] font-semibold">
                        PILLAR.D
                      </span>
                    </div>
                    <h3
                      className="text-headline-sm text-black font-bold mb-2 tracking-tight"
                      style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                    >
                      We Build It
                    </h3>
                    <p className="font-body-md text-body-md text-neutral-700 leading-relaxed">
                      Transforming abstract ambition into operational
                      infrastructure, products, and decentralized tooling that
                      endure.
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-black flex items-center justify-between font-label-mono text-label-mono">
                    <span className="text-neutral-700 text-xs font-semibold">
                      TRACK: VENTURE INCUBATION
                    </span>
                    <span className="material-symbols-outlined text-black text-[16px]">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full px-margin-mobile md:px-margin-desktop py-12 md:py-16 bg-white">
            <div className="max-w-container-max mx-auto flex flex-col">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 mb-8 border-b border-black">
                <div>
                  <div className="flex items-center gap-2 font-label-mono text-label-mono text-black font-bold uppercase tracking-widest mb-2">
                    <span className="w-2 h-2 bg-black inline-block"></span>
                    <span className="">■ RESEARCH &amp; COMPUTATION</span>
                  </div>
                  <h2
                    className="text-headline-lg text-black font-bold uppercase tracking-tight"
                    style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                  >
                    Collaborative Cognition
                  </h2>
                </div>
                <div className="font-label-mono text-label-mono text-neutral-600 uppercase font-semibold">
                  CAMPUS CENTRAL LAB // SPRINT ARCHIVE #05
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-xl items-stretch">
                <div className="lg:col-span-7 flex flex-col bg-white p-3 border border-black">
                  <div className="relative w-full h-80 sm:h-96 md:h-[420px] overflow-hidden bg-neutral-100">
                    <img
                      className="w-full h-full object-cover grayscale contrast-125"
                      data-alt="Monochrome high-contrast documentary shot of young engineering students collaborating intensively in an engineering computer laboratory at DIATM, surrounded by laptops, circuit schematics, open-source terminal screens, and notebook wireframes, stark directional studio lighting with deep architectural shadows."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6lnazqjRBrbtidEurSyR30R-uGUWUXJVKUig-EY-mhcG2DhLTtlcKgtAXyJA5UmdpZkJYc9gED4b5pSAQo3MHD4SjhWmVS75qoIdLYowhgT9GRNCE5fHhLNbCG9iTSvjRNcY1EXFAkOQzfh2ed5Wmw_OqIBoYPcPB3dVVVZhn7kA1ZiqbT0JAiqmQOVdZPtQWXAgkUtwR6_eh1L6hwYNKTZryS5qMRRudB8YTAKc_xrgVLCQ2pLUqDg"
                    />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 bg-black text-white font-label-mono text-xs font-semibold border border-black">
                      <span className="w-2 h-2 bg-[#f59e0b]"></span>
                      <span className="">FIG 01.1 — SPRINT ARCHIVE #05</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 p-3 bg-white border border-black flex items-center justify-between font-label-mono text-xs">
                      <span className="font-bold text-black">
                        CENTRAL LAB / HIGH-INTENSITY BUILD WORKBENCH
                      </span>
                      <span className="text-black font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-[#f59e0b] inline-block"></span>
                        LIVE PROTOCOL
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col justify-between gap-gutter-md">
                  <div className="bg-white p-3 border border-black flex flex-col">
                    <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-neutral-100 mb-3">
                      <img
                        className="w-full h-full object-cover grayscale contrast-125"
                        data-alt="Minimalist broadsheet aesthetic close-up of developer hands configuring an IoT microcontroller board next to mechanical keyboard and code terminal, clean studio lighting, crisp monochrome detailing."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXbxEo6B3n9GHmfnP8Dr7Ws2x7vKsBotipMuVb1crleeZzUSPCg4HVkyuuOaaWHrs9nFCKY0-FmLmNtjRLEabBOGgRFcGHAnEmIt1aUYFDsaPt_Yf_Mt18R4isZ-vNsXGQs5lP1wPodQC5oXT1DUnF1GF_kvH1rveWqIvBawNIQXGEQHO0gkr6VKwRRWWKuagGXEL53-Jvnc5DlouzXu7wbo-yuUsl5Xc4UJcmgL1pFiAI4t5LP3FJSQ"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-black text-white border border-black text-[10px] font-label-mono font-bold tracking-wider uppercase">
                        FIG 01.2 — WORKSPACE
                      </div>
                    </div>
                    <div className="px-2 pb-1 font-body-sm text-body-sm text-neutral-700">
                      <strong className="text-black font-bold">
                        ADVANCED RESEARCH SPACES:
                      </strong>{" "}
                      High-performance compute &amp; prototyping benches
                      deployed for multi-track development cycles.
                    </div>
                  </div>
                  <div className="bg-white p-6 border border-black flex flex-col justify-between flex-1">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-black font-label-mono text-label-mono">
                      <span className="font-bold text-black tracking-wider">
                        ■ INDEX METRICS // TELEMETRY MATRIX
                      </span>
                      <span className="text-black font-bold text-xs uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#f59e0b] inline-block"></span>
                        ONLINE
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3.5 bg-neutral-50 border border-black">
                        <span
                          className="text-stats-number text-black font-extrabold block"
                          style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                        >
                          120+
                        </span>
                        <span className="font-label-mono text-[11px] text-neutral-600 uppercase tracking-wider font-semibold">
                          ACTIVE BUILDERS
                        </span>
                      </div>
                      <div className="p-3.5 bg-neutral-50 border border-black">
                        <span
                          className="text-stats-number text-black font-extrabold block"
                          style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                        >
                          04
                        </span>
                        <span className="font-label-mono text-[11px] text-neutral-600 uppercase tracking-wider font-semibold">
                          VISION PILLARS
                        </span>
                      </div>
                      <div className="p-3.5 bg-neutral-50 border border-black">
                        <span
                          className="text-stats-number text-black font-extrabold block"
                          style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                        >
                          100%
                        </span>
                        <span className="font-label-mono text-[11px] text-neutral-600 uppercase tracking-wider font-semibold">
                          OPEN SOURCE
                        </span>
                      </div>
                      <div className="p-3.5 bg-neutral-50 border border-black">
                        <span
                          className="text-stats-number text-black font-extrabold block"
                          style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                        >
                          99.8%
                        </span>
                        <span className="font-label-mono text-[11px] text-neutral-600 uppercase tracking-wider font-semibold">
                          SYSTEM RUNTIME
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full px-margin-mobile md:px-margin-desktop py-12 md:py-16 bg-white border-t border-black">
            <div className="max-w-container-max mx-auto flex flex-col">
              <div className="flex items-center justify-between pb-4 mb-8 border-b border-black font-label-mono text-label-mono">
                <div className="flex items-center gap-2 font-bold text-black uppercase tracking-wider">
                  <span className="w-2 h-2 bg-black inline-block"></span>
                  <span className="">
                    ■ OPERATIONAL RADAR &amp; TELEMETRY MATRIX
                  </span>
                </div>
                <div className="flex items-center gap-2 text-black font-semibold">
                  <span className="w-2 h-2 bg-[#f59e0b] inline-block"></span>
                  <span className="">CAMPUS STATUS: ACTIVE</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-md">
                <div className="bg-white p-6 border border-black flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-black font-label-mono text-label-mono text-neutral-600">
                      <span className="">MODULE: 01</span>
                      <span className="text-black font-semibold">
                        METRIC_CAP
                      </span>
                    </div>
                    <span className="font-label-mono text-xs uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                      MEMBER ROSTER
                    </span>
                    <h3
                      className="text-headline-md text-black font-bold tracking-tight mb-3"
                      style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                    >
                      120+ Builders
                    </h3>
                    <p className="font-body-md text-body-md text-neutral-700 leading-relaxed mb-6">
                      Cross-disciplinary engineers, UI/UX architects, ML
                      practitioners, and systems enthusiasts representing DIATM
                      batch cohorts.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center font-label-mono text-xs text-neutral-600 mb-1.5">
                      <span className="">Cohort Capacity</span>
                      <span className="font-bold text-black">82% Allotted</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 border border-black overflow-hidden">
                      <div className="h-full bg-black w-[82%]"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 border border-black flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-black font-label-mono text-label-mono text-neutral-600">
                      <span className="">MODULE: 02</span>
                      <span className="text-black font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#f59e0b] inline-block"></span>
                        ALL ONLINE
                      </span>
                    </div>
                    <span className="font-label-mono text-xs uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                      PRIMARY VECTORS
                    </span>
                    <h3
                      className="text-headline-md text-black font-bold tracking-tight mb-3"
                      style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                    >
                      5 Dedicated Tracks
                    </h3>
                    <p className="font-body-md text-body-md text-neutral-700 leading-relaxed mb-4">
                      Structured initiatives driving focused hackathon sprints,
                      product launches, and continuous technical peer
                      evaluations.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="px-2.5 py-1 bg-white border border-black font-label-mono text-[11px] font-bold text-black">
                      SYSTEMS
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-black font-label-mono text-[11px] font-bold text-black">
                      AI / ML
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-black font-label-mono text-[11px] font-bold text-black">
                      HARDWARE &amp; IOT
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-black font-label-mono text-[11px] font-bold text-black">
                      DESIGN &amp; UI
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-black font-label-mono text-[11px] font-bold text-black">
                      WEB3 &amp; DISTRIBUTED
                    </span>
                  </div>
                </div>
                <div className="bg-white p-6 border border-black flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-black font-label-mono text-label-mono text-neutral-600">
                      <span className="">MODULE: 03</span>
                      <span className="inline-block px-1.5 py-0.5 border border-black bg-[#f59e0b] text-black text-[10px] font-bold">
                        RECRUITING
                      </span>
                    </div>
                    <span className="font-label-mono text-xs uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                      ADMISSIONS TELEMETRY
                    </span>
                    <h3
                      className="text-headline-md text-black font-bold tracking-tight mb-3"
                      style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                    >
                      Cohort 2026 Active
                    </h3>
                    <p className="font-body-md text-body-md text-neutral-700 leading-relaxed mb-6">
                      Open calls for junior developers, researchers, and event
                      designers are undergoing review cycles.
                    </p>
                  </div>
                  <a
                    className="w-full py-2.5 px-4 bg-black hover:bg-neutral-800 text-white font-label-mono text-label-mono font-bold tracking-wider border border-black flex items-center justify-center gap-2 transition-colors"
                    data-path="membership"
                    href="#"
                  >
                    <span className="">ACCESS RECRUITMENT PORTAL</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_outward
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full px-margin-mobile md:px-margin-desktop py-12 md:py-16 bg-white border-t border-black">
            <div className="max-w-container-max mx-auto">
              <div className="w-full bg-[#0c111d] text-white p-8 sm:p-12 md:p-16 border-2 border-[#0c111d] relative overflow-hidden shadow-[8px_8px_0px_0px_#f59e0b]">
                <div className="relative z-10 flex flex-col items-start max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 border border-neutral-700 bg-neutral-900 font-label-mono text-label-mono uppercase tracking-widest text-[#f59e0b] mb-6">
                    <span className="w-1.5 h-1.5 bg-[#f59e0b] animate-pulse inline-block"></span>
                    <span className="">■ ■ ADMISSIONS OPEN // COHORT 2026</span>
                  </div>
                  <h2
                    className="text-display-hero-mobile md:text-headline-lg text-white font-bold tracking-tight leading-none uppercase mb-6"
                    style={{ fontFamily: "'Newsreader', 'Cormorant Garamond', Georgia, serif" }}
                  >
                    Ready to outshine the ordinary?
                  </h2>
                  <p className="font-body-lg text-body-lg text-neutral-300 leading-relaxed mb-8 max-w-2xl">
                    Join DIATM's premier tech society. Gain direct access to
                    hackathon teams, industry mentoring, research pipelines, and
                    high-velocity project collabs.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      className="px-6 py-3.5 bg-[#f59e0b] hover:bg-[#f59e0b] text-black font-label-mono text-label-mono font-bold tracking-wider transition-colors border border-black flex items-center gap-2"
                      data-path="membership"
                      href="#"
                    >
                      <span className="">REGISTER NOW</span>
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    </a>
                    <a
                      className="px-6 py-3.5 bg-black hover:bg-neutral-900 text-white font-label-mono text-label-mono font-bold tracking-wider border border-white transition-colors"
                      data-path="contact"
                      href="#"
                    >
                      CONTACT US
                    </a>
                  </div>
                  <div className="pt-10 mt-10 border-t border-neutral-800 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 font-label-mono text-label-mono text-neutral-400 text-xs">
                    <div>
                      <span className="block uppercase tracking-wider text-neutral-500 text-[10px]">
                        COHORT CYCLE
                      </span>
                      <span className="font-semibold text-white">
                        2026.01 // RAJBANDH
                      </span>
                    </div>
                    <div>
                      <span className="block uppercase tracking-wider text-neutral-500 text-[10px]">
                        LOCATION
                      </span>
                      <span className="font-semibold text-white">
                        DIATM CAMPUS, RAJBANDH
                      </span>
                    </div>
                    <div>
                      <span className="block uppercase tracking-wider text-neutral-500 text-[10px]">
                        STATUS
                      </span>
                      <span className="font-semibold text-[#f59e0b]">
                        ACCEPTING DOSSIERS
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
