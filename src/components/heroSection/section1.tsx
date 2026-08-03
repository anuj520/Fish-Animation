"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/navbar/navbar"; // Update import path if needed based on your folder structure

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

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: secondBoxRef.current,
          start: "center center", 
          end: "center 10%",   
          scrub: 1.5,      
        },
      });

      mainTl.to(
        darkOverlayRef.current,
        {
          opacity: 1,
          ease: "power1.inOut",
        },
        0
      );

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
      className="relative w-full min-h-[160vh] overflow-x-hidden overflow-y-hidden"
    >
      {/* SMOOTH BLACK OVERLAY LAYER */}
      <div
        ref={darkOverlayRef}
        className="pointer-events-none absolute inset-0 z-0 bg-black opacity-0 will-change-opacity"
      />

      <div className="relative z-10 w-full font-sans text-white">
        {/* NAVBAR COMPONENT */}
        {/* <Navbar /> */}

        {/* FLOATING WIDGET */}
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
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
            <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight font-bold">
              3D Websites <br />
              in Minutes
            </h1>
            <p className="text-sm sm:text-lg text-gray-400 font-normal">
              No-Code Builder for WebGL 3D Websites
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button className="bg-black/20 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium border border-white hover:bg-white/25 transition">
                Talk to Us
              </button>
              <Link
                href="/get-started"
                className="rounded-full bg-white text-black px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-gray-200 transition"
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
                <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                  No-code Builder for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                    WebGL 3D Websites
                  </span>
                </h2>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <button className="rounded-full bg-white/10 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-white border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
                    Talk to us
                  </button>
                  <Link
                    href="/get-started"
                    className="rounded-full bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-black hover:bg-gray-200 transition"
                  >
                    Get started - it&apos;s free
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