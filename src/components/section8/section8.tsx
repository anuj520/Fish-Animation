"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CTASection() {
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
          start: "top 85%",
          end: "top 10%",
          scrub: 1,
        },
      });

      // Background Image Expansion
      mainTl.fromTo(
        imageWrapperRef.current,
        {
          width: "50%",
          y: "30%",
          borderRadius: "2rem",
          opacity: 0.4,
        },
        {
          width: "100%",
          y: "0%",
          borderRadius: "0rem",
          opacity: 1,
          ease: "power2.out",
        },
        0
      );

      // Center Content Fade Up
      if (contentRef.current) {
        mainTl.fromTo(
          contentRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out" },
          0.2
        );
      }

      // Footer Links Stagger Fade In
      if (footerRef.current) {
        mainTl.fromTo(
          footerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: "power2.out" },
          0.3
        );
      }
    },
    { scope: containerRef }
  );

 return (
  <div
    id="section-8"
    ref={containerRef}
    className="relative -z-10 min-h-screen w-full overflow-hidden font-sans text-white flex flex-col justify-between bg-black"
  >
    {/* 1. ANIMATED BACKGROUND IMAGE WRAPPER */}
    <div className="absolute inset-0 z-0 flex items-center justify-center">
      <div
        ref={imageWrapperRef}
        className="relative h-full overflow-hidden shadow-2xl transition-all"
      >
        <Image
          src="/images/herotexture3.webp"
          alt="Underwater Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none" />
      </div>
    </div>

    {/* 2. 3D FISH / R3F CANVAS CONTAINER SLOT (Centered for the Fish) */}
    <div className="absolute inset-0 z-5 pointer-events-none flex items-center justify-center pb-24">
      {/* Yahan Aapki 3D Fish R3F Canvas Render Hogi */}
    </div>

    {/* 3. CENTER HERO CONTENT (Aligned Lower down to give space for 3D Fish above) */}
    <main
      ref={contentRef}
      className="relative z-10 mt-auto mb-10 flex flex-col items-center justify-end text-center px-6 pt-36"
    >
      {/* Logo Icon + Title */}
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-400 shadow-lg">
          <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
        </span>
        <span className="text-2xl sm:text-3xl font-bold tracking-wide text-white drop-shadow-md">
          Academy X
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
        Start building <span className="italic font-serif font-normal">magic</span> today.
      </h1>

      {/* Action Buttons */}
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

    {/* 4. FOOTER SECTION */}
    <footer
      ref={footerRef}
      className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-8 pt-6 flex flex-col md:flex-row items-end justify-between gap-8 text-xs text-gray-300"
    >
      {/* Left Copyright */}
      <div className="text-gray-400 font-medium">
        Peach Worlds Ltd © 2026
      </div>

      {/* Center Footer Navigation Links */}
      <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 text-left">
        {/* Column 1: PRODUCT */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Product
          </h4>
          <ul className="space-y-1 text-xs font-normal">
            <li>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: RESOURCES */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Resources
          </h4>
          <ul className="space-y-1 text-xs font-normal">
            <li>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                Marketplace
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                Tutorials
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                Discord
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                Contact Sales
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: USE CASES */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Use Cases
          </h4>
          <ul className="space-y-1 text-xs font-normal">
            <li>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                Ecommerce
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                Storytelling
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                Creative and Tech
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                Portfolio
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: PLANS */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Plans
          </h4>
          <ul className="space-y-1 text-xs font-normal">
            <li>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
);
}