"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Section9() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });

      // Content Entrance Effect over fixed image
      if (heroContentRef.current) {
        tl.fromTo(
          heroContentRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, ease: "power2.out" },
          0
        );
      }

      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "power2.out" },
          0.2
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="section-9"
      ref={containerRef}
      className="relative z-20 w-full min-h-screen bg-transparent font-sans text-white flex flex-col justify-between pt-24 pb-8"
    >
      {/* 1. MAIN OVERLAY HERO CONTENT */}
      <main
        ref={heroContentRef}
        className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-400 shadow-lg">
            <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
          </span>
          <span className="text-2xl sm:text-3xl font-bold tracking-wide text-white drop-shadow-md">
            Academy X
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white mb-6 max-w-2xl leading-tight">
          Start building <span className="italic font-serif font-normal">magic</span> today.
        </h1>

        <div className="flex items-center gap-4">
          <button className="rounded-full bg-white/15 px-6 py-2.5 text-sm font-medium text-white border border-white/20 backdrop-blur-md hover:bg-white/25 transition shadow-lg">
            Talk to Us
          </button>
          <Link
            href="/get-started"
            className="rounded-full bg-white text-black px-7 py-2.5 text-sm font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </main>

      {/* 2. FOOTER NAVIGATION LINKS */}
      <footer
        ref={footerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-12 flex flex-col md:flex-row items-end justify-between gap-8 text-xs text-gray-300"
      >
        <div className="text-gray-400 font-medium">
          Peach Worlds Ltd © 2026
        </div>

        <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 text-left">
          <div className="flex flex-col space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Product
            </h4>
            <ul className="space-y-1 text-xs font-normal">
              <li><Link href="#" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Resources
            </h4>
            <ul className="space-y-1 text-xs font-normal">
              <li><Link href="#" className="hover:text-white transition-colors">Marketplace</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Tutorials</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Discord</Link></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Use Cases
            </h4>
            <ul className="space-y-1 text-xs font-normal">
              <li><Link href="#" className="hover:text-white transition-colors">Ecommerce</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Storytelling</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Portfolio</Link></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Plans
            </h4>
            <ul className="space-y-1 text-xs font-normal">
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </section>
  );
}