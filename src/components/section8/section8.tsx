"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaDiscord, FaYoutube, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Section8() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !videoWrapperRef.current) return;

      const isMobileOrTablet = window.innerWidth < 1024;

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

      // 1. Video Wrapper Expansion Animation (Tablet & Mobile optimized width/height)
      mainTl.fromTo(
        videoWrapperRef.current,
        {
          width: isMobileOrTablet ? "90vw" : "85vw",
          height: isMobileOrTablet ? "60vh" : "55vh",
          borderRadius: "2rem",
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
          { opacity: 0, y: isMobileOrTablet ? 15 : 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out" },
          0.4
        );
      }

      // 3. Footer Links Reveal
      if (footerRef.current) {
        mainTl.fromTo(
          footerRef.current,
          { opacity: 0, y: isMobileOrTablet ? 10 : 30 },
          { opacity: 1, y: 0, ease: "power2.out" },
          0.6
        );
      }
    },
    { scope: containerRef }
  );

  return (  
    <>
    <div
      id="section-8"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden font-sans text-white -z-10"
    >
      {/* ======================================================== */}
      {/* 1. FISH VIDEO CONTAINER (Background)                     */}
      {/* ======================================================== */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          ref={videoWrapperRef}
          className="relative overflow-hidden shadow-2xl will-change-transform flex items-center justify-center"
        >
          <video
            src="/v1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center brightness-[1.15] contrast-[1.15] saturate-[1.25]"
          />

          {/* Dynamic Underwater Light Rays Overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-cyan-400/10 via-pink-500/10 to-black/60 mix-blend-screen pointer-events-none" />

          {/* Soft Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />
        </div>
      </div>
    </div>

    {/* ======================================================== */}
    {/* 2. TEXT & CONTENT CONTAINER (On top via z-20)            */}
    {/* ======================================================== */}
    <div 
      className="absolute inset-0 w-full h-full flex flex-col justify-between pointer-events-auto z-20 "
    >
      {/* CENTER HERO CONTENT */}
      <main
        ref={contentRef}
        className="mt-auto mb-2 md:mb-6 flex flex-col items-center justify-end text-center px-4 md:px-6 pt-8 md:pt-28 will-change-transform"
      >
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="relative w-7 h-7 md:w-12 md:h-12 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Academy X Logo"
              fill
              priority
              sizes="(max-width: 768px) 28px, 40px"
              style={{
                filter:
                  "drop-shadow(0px 0px 6px rgba(255, 182, 193, 0.9)) drop-shadow(0px 0px 15px rgba(255, 105, 180, 0.8)) brightness(1.1)",
              }}
              className="object-contain transition-all duration-300"
            />
          </div>

          <span className="text-lg md:text-3xl font-bold tracking-wide text-white drop-shadow-md">
            Academy X
          </span>
        </div>

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-3 md:mb-6">
          Start building <span className="italic font-serif font-normal">magic</span> today.
        </h1>

        <div className="flex items-center gap-3 md:gap-4">
          <button className="rounded-full bg-white/15 px-5 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white border border-white/20 backdrop-blur-md hover:bg-white/25 transition shadow-lg">
            Talk to Us
          </button>
          <Link
            href="/get-started"
            className="rounded-full bg-white text-black px-6 md:px-7 py-2 md:py-2.5 text-xs md:text-sm font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </main>

      {/* FOOTER SECTION with Social Icons */}
      <footer
        ref={footerRef}
        className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-3 md:pb-8 pt-2 md:pt-4 flex flex-col gap-4 md:gap-6 text-xs text-gray-300 will-change-transform"
      >
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-3 md:gap-y-6 text-left">
          <div className="flex flex-col space-y-1 md:space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Product
            </h4>
            <ul className="space-y-1 text-xs font-normal">
              <li><Link href="#" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-1 md:space-y-2">
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

          <div className="flex flex-col space-y-1 md:space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Use Cases
            </h4>
            <ul className="space-y-1 text-xs font-normal">
              <li><Link href="#" className="hover:text-white transition-colors">Ecommerce</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Storytelling</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Portfolio</Link></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-1 md:space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Plans
            </h4>
            <ul className="space-y-1 text-xs font-normal">
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Social Icons Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-3 md:pt-4 border-t border-white/10 w-full gap-3">
          <p className="text-[11px] text-gray-400">© 2026 Academy X. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link href="https://discord.com" target="_blank" className="p-2 md:p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white">
              <FaDiscord className="w-4 h-4" />
            </Link>
            <Link href="https://youtube.com" target="_blank" className="p-2 md:p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white">
              <FaYoutube className="w-4 h-4" />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="p-2 md:p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white">
              <FaTwitter className="w-4 h-4" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="p-2 md:p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white">
              <FaLinkedinIn className="w-4 h-4" />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="p-2 md:p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white">
              <FaInstagram className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  </>   
  );
}