"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, MessageSquare } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const secondBoxRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroContentRef.current || !secondBoxRef.current || !containerRef.current) return;

      // Single Master Timeline: Triggered Jab Scroll Bottom Box Par Aaye
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: secondBoxRef.current,
          start: "top 80%", // Jab bottom box viewport me 80% par aaye
          end: "top 20%",   // Full completion point
          scrub: 1,         // Smooth scroll-synced animation
        },
      });

      // 1. Parent Container Theme / Background Change
      mainTl.to(
        containerRef.current,
        {
          backgroundColor: "#000000",
          ease: "power2.out",
        },
        0
      );

      // 2. Initial Hero Content Fade, Blur & Scale Out
      mainTl.to(
        heroContentRef.current,
        {
          filter: "blur(16px)",
          opacity: 0,
          y: -50,
          scale: 0.95,
          ease: "power2.out",
        },
        0
      );

      // 3. Second Box Entrance (Scale up, Blur & Fade In)
      mainTl.fromTo(
        secondBoxRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 30,
          backdropFilter: "blur(0px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          backdropFilter: "blur(24px)",
          ease: "power2.out",
        },
        0
      );
    },
    { scope: containerRef }
  );

  return (
    <main id="section-1" ref={containerRef} className="bg-[#4192CB] transition-colors duration-300" >
      <div className="relative min-h-[150vh] w-full font-sans text-white">
        {/* 1. FIXED HEADER */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-tight"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-400">
              <span className="h-2 w-2 rounded-full bg-white/80" />
            </span>
            <span className="text-white tracking-wide">Academy X</span>
          </Link>

          {/* Center Pill Nav */}
          <nav className="hidden md:flex items-center gap-6 rounded-full bg-white/10 px-6 py-2.5 backdrop-blur-md border border-white/15 text-sm font-medium shadow-lg">
            <button className="flex items-center gap-1 hover:text-gray-200 transition">
              Product <ChevronDown className="w-4 h-4 opacity-70" />
            </button>
            <button className="flex items-center gap-1 hover:text-gray-200 transition">
              Use Cases <ChevronDown className="w-4 h-4 opacity-70" />
            </button>
            <button className="flex items-center gap-1 hover:text-gray-200 transition">
              Resources <ChevronDown className="w-4 h-4 opacity-70" />
            </button>
            <Link href="#pricing" className="hover:text-gray-200 transition">
              Pricing
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link
              href="/login"
              className="hover:text-gray-200 transition hidden sm:inline-block"
            >
              Login
            </Link>
            <button className="rounded-full bg-white/10 px-4 py-2 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
              Talk to Us
            </button>
            <Link
              href="/get-started"
              className="rounded-full bg-[#11052C] px-5 py-2 text-white hover:bg-black transition font-semibold"
            >
              Get Started
            </Link>
          </div>
        </header>

        {/* 3. FIXED BOTTOM-LEFT FLOATING WIDGET */}
        <div className="fixed bottom-6 left-6 z-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-bold text-xs shadow-lg hover:scale-105 transition cursor-pointer">
            N
          </div>
        </div>

        {/* 4. FIXED BOTTOM-RIGHT FLOATING WIDGET */}
        <div className="fixed bottom-6 right-8 flex flex-col items-end gap-4 z-50">
          <button className="flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-medium shadow-xl hover:bg-gray-900 transition border border-white/10">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500">
              <MessageSquare className="w-3.5 h-3.5 text-black fill-current" />
            </span>
            Need help?
          </button>
        </div>

        {/* 5. MAIN HERO CONTENT AREA */}
        <main
          ref={heroContentRef}
          className="relative z-10 h-screen max-w-7xl mx-auto  pb-5 flex flex-col justify-end"
        >
          <div className="max-w-2xl space-y-5 mb-8">
            <h1 className="text-6xl sm:text-7xl  leading-[1.1] tracking-tight">
              3D Websites <br />
              in Minutes
            </h1>
            <p className="text-lg text-gray-200 font-normal">
              No-Code Builder for WebGL 3D Websites
            </p>
            <div className="flex items-center gap-4 pt-2">
              <button className="rounded-full px-6 py-3 text-sm font-medium border border-white  hover:bg-white/25 transition">
                Talk to Us
              </button>
              <Link
                href="/get-started"
                className="rounded-full bg-black px-7 py-3 text-sm font-semibold hover:bg-gray-900 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </main>

        {/* 6. SECOND BOX */}
        <div className="relative z-10 h-[50vh] flex items-center justify-center">
          <div
            ref={secondBoxRef}
            className="relative flex items-end justify-end w-full h-full overflow-hidden"
          >
            <div className="relative z-10 max-w-7xl mx-auto w-full px-8 sm:px-12 md:px-16 pb-12">
              <div className="max-w-xl space-y-6">
                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                  No-code Builder for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                    WebGL 3D Websites
                  </span>
                </h1>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button className="rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
                    Talk to us
                  </button>
                  <Link
                    href="/get-started"
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-gray-200 transition"
                  >
                    Get started - it's free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}