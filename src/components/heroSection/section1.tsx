"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Section1() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const secondBoxRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !heroContentRef.current ||
        !secondBoxRef.current ||
        !containerRef.current ||
        !darkOverlayRef.current
      )
        return;

      // Master Timeline linked to the trigger
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: secondBoxRef.current,
          start: "center center", // Trigger right before entering viewport
          end: "center 10%",   // Gives long room for buttery smooth transition
          scrub: 1.5,       // Smooth inertia lag
        },
      });

      // 1. Smooth Dark Overlay Fade-In
      mainTl.to(
        darkOverlayRef.current,
        {
          opacity: 1,
          ease: "power1.inOut",
        },
        0
      );

      // 2. Initial Hero Content Fade, Blur & Shift Up
      mainTl.to(
        heroContentRef.current,
        {
          filter: "blur(12px)",
          opacity: 0,
          y: -60,
          scale: 0.96,
          ease: "power2.out",
        },
        0
      );

      // 3. Second Box Entrance
      mainTl.fromTo(
        secondBoxRef.current,
        {
          opacity: 0,
          scale: 0.92,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "power2.out",
        },
        0.2
      );
    },
    { scope: containerRef }
  );

  return (
    <main
      id="section-1"
      ref={containerRef}
      className="relative w-full min-h-[160vh]"
    >
      {/* SMOOTH BLACK OVERLAY LAYER */}
      <div
        ref={darkOverlayRef}
        className="pointer-events-none absolute inset-0 z-0 bg-black opacity-0 will-change-opacity"
      />

      <div className="relative z-10 w-full font-sans text-white">
        {/* 1. FIXED HEADER */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 text-xl sm:text-2xl font-bold tracking-tight group"
          >
            <div className="relative w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Academy X Logo"
                fill
                priority
                sizes="(max-width: 640px) 28px, 36px"
                className="object-contain"
              />
            </div>
            <span className="text-white tracking-wide transition-opacity group-hover:opacity-90">
              Academy X
            </span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
            <Link
              href="/login"
              className="hover:text-gray-200 transition hidden sm:inline-block"
            >
              Login
            </Link>
            <button className="rounded-full bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
              Talk to Us
            </button>
            <Link
              href="/get-started"
              className="rounded-full bg-[#11052C] px-3.5 py-1.5 sm:px-5 sm:py-2 text-white hover:bg-black transition font-semibold"
            >
              Get Started
            </Link>
          </div>
        </header>

        {/* FLOATING WIDGET */}
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-bold text-xs shadow-lg hover:scale-105 transition cursor-pointer">
            N
          </div>
        </div>

        {/* HERO MAIN CONTENT */}
        <main
          ref={heroContentRef}
          className="relative z-10 min-h-screen max-w-7xl mx-auto px-4 sm:px-8 pb-12 pt-28 sm:pt-32 flex flex-col justify-end will-change-transform"
        >
          <div className="max-w-2xl space-y-4 sm:space-y-5 mb-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight font-bold">
              3D Websites <br />
              in Minutes
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-normal">
              No-Code Builder for WebGL 3D Websites
            </p>
            <div className="flex items-center gap-3 sm:gap-4 pt-2">
              <button className="rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium border border-white hover:bg-white/25 transition">
                Talk to Us
              </button>
              <Link
                href="/get-started"
                className="rounded-full bg-black px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-gray-900 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </main>

        {/* SECOND BOX */}
        <div
          ref={secondBoxRef}
          className="relative z-10 min-h-[50vh] sm:h-[60vh] flex items-center justify-center will-change-transform"
        >
          <div className="relative flex items-end justify-end w-full h-full overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-12 md:px-16 pb-12">
              <div className="max-w-xl space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                  No-code Builder for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                    WebGL 3D Websites
                  </span>
                </h1>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <button className="rounded-full bg-white/10 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-white border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
                    Talk to us
                  </button>
                  <Link
                    href="/get-started"
                    className="rounded-full bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-black hover:bg-gray-200 transition"
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