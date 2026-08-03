"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Section8() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !imageWrapperRef.current) return;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Video Wrapper Expansion Animation
      mainTl.fromTo(
        imageWrapperRef.current,
        {
          width: "60vw",
          height: "60vh",
          borderRadius: "2.5rem",
        },
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0rem",
          ease: "power2.inOut",
        },
        0
      );

      // 2. Text Reveal Animation
      if (contentRef.current) {
        mainTl.fromTo(
          contentRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out" },
          0.4
        );
      }

      // 3. Footer Links Reveal
      if (footerRef.current) {
        mainTl.fromTo(
          footerRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "power2.out" },
          0.6
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      id="section-8"
      ref={containerRef}
      className=" -z-10 relative w-full h-screen overflow-hidden font-sans text-white"
    >
      {/* ======================================================== */}
      {/* INDEPENDENT PARENT 1: BACKGROUND VIDEO ONLY (-z-10)       */}
      {/* ======================================================== */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div
          ref={imageWrapperRef}
          className="relative w-full h-full overflow-hidden shadow-2xl will-change-transform"
        >
          <video
            src="/v1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center brightness-[1.15] contrast-[1.15] saturate-[1.25] filter drop-shadow-[0_0_25px_rgba(255,105,180,0.35)]"
          />

          {/* Dynamic Underwater Light Rays Overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-cyan-400/10 via-pink-500/10 to-black/60 mix-blend-screen pointer-events-none" />

          {/* Soft Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* INDEPENDENT PARENT 2: 3D FISH CANVAS SLOT (z-0)           */}
      {/* ======================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {/* Render your 3D Fish Canvas Component here */}
      </div>

      {/* ======================================================== */}
      {/* INDEPENDENT PARENT 3: TEXT & FOOTER (z-20 Top Layer)     */}
      {/* ======================================================== */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between pointer-events-auto">
        {/* CENTER HERO CONTENT */}
        <main
          ref={contentRef}
          className="mt-auto relative z-20 mb-8 flex flex-col items-center justify-end text-center px-6 pt-28 will-change-transform"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Academy X Logo"
                fill
                priority
                sizes="(max-width: 640px) 36px, 40px"
                style={{
                  filter:
                    "drop-shadow(0px 0px 6px rgba(255, 182, 193, 0.9)) drop-shadow(0px 0px 15px rgba(255, 105, 180, 0.8)) brightness(1.1)",
                }}
                className="object-contain transition-all duration-300"
              />
            </div>

            <span className="text-2xl sm:text-3xl font-bold tracking-wide text-white drop-shadow-md">
              Academy X
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
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

        {/* FOOTER SECTION */}
        <footer
          ref={footerRef}
          className="w-full max-w-7xl mx-auto px-8 pb-8 pt-4 flex flex-col md:flex-row items-end justify-between gap-8 text-xs text-gray-300 will-change-transform"
        >
          <div className="text-gray-400 font-medium"></div>

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
      </div>
    </div>
  );
}