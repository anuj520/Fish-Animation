"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ExpertSection() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Helper function to split text into animated letter spans
  const splitLetters = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="expert-letter inline-block will-change-transform origin-center"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </span>
    ));
  };

  useGSAP(
    () => {
      if (!containerRef.current || !headingRef.current) return;

      const letters = headingRef.current.querySelectorAll(".expert-letter");

      // 1. Kinetic Letter-by-Letter Wave (Scale, RotateX, Blur)
      gsap.fromTo(
        letters,
        {
          opacity: 0,
          y: 50,
          rotateX: -90,
          scale: 0.7,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.025,
          ease: "back.out(1.8)",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // 2. CTA Buttons Blur & Fade-Up
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 25, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              end: "top 65%",
              scrub: 0.8,
            },
          }
        );
      }

      // 3. Right Visual (Floating Parallax Zoom Effect)
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { scale: 0.8, y: 60, opacity: 0 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: visualRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 1.2,
            },
          }
        );
      }

      // 4. Bottom Cards Staggered 3D Elevation
      if (cardsRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(cardsRef.current.children);

        gsap.fromTo(
          cards,
          {
            y: 90,
            opacity: 0,
            rotateX: 15,
            transformPerspective: 800,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.18,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="section-7"
      className="relative min-h-screen w-full font-sans text-white bg-black/50 overflow-hidden py-12"
    >
      {/* Background Glow & Ambient Light Effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* MAIN HERO CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 mb-16">
          {/* Left Hero Typography */}
          <div className="space-y-6">
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] [perspective:1000px]"
            >
              <span className="block">{splitLetters("Get your 3D Website")}</span>
              <span className="block text-[#C27AFF]">
                {splitLetters("with our Experts.")}
              </span>
            </h1>

            <div ref={ctaRef} className="flex items-center gap-4 pt-2">
              <button className="rounded-full bg-white/10 px-6 py-3 text-sm font-medium border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
                Book a Call
              </button>
              <button className="rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-gray-200 transition">
                See Pricing
              </button>
            </div>
          </div>

          {/* Right 3D Visual */}
          <div
            ref={visualRef}
            className="relative h-[320px] sm:h-[400px] w-full flex items-center justify-center will-change-transform"
          >
            <Image
              src="/images/herotexture.jpg.jpeg"
              alt="3D Jellyfish Visual"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]"
              priority
            />
          </div>
        </div>

        {/* BOTTOM 3 STEPS CARDS */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6"
        >
          {/* Step 1 Card */}
          <div className="flex flex-col rounded-3xl bg-[#09051d]/70 backdrop-blur-xl border border-white/10 p-7 shadow-2xl hover:border-white/20 transition-colors will-change-transform">
            <span className="text-xs font-medium text-gray-400">Step 1</span>
            <h2 className="text-2xl font-semibold mt-1 mb-6">
              Tell us About Yourself
            </h2>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <Image
                  src="/images/herotexture.jpg.jpeg"
                  alt="Cube"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 15vw"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <Image
                  src="/images/herotexture.jpg.jpeg"
                  alt="Tree"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 15vw"
                />
              </div>
            </div>
          </div>

          {/* Step 2 Card */}
          <div className="flex flex-col rounded-3xl bg-[#09051d]/70 backdrop-blur-xl border border-white/10 p-7 shadow-2xl hover:border-white/20 transition-colors will-change-transform">
            <span className="text-xs font-medium text-gray-400">Step 2</span>
            <h2 className="text-2xl font-semibold mt-1 mb-6">
              Pick Your Theme
            </h2>

            <div className="flex flex-col gap-3 my-auto">
              <div className="rounded-xl bg-[#120a2e]/80 p-4 border border-white/10">
                <div className="h-1.5 w-16 bg-white/70 rounded-full mb-2" />
                <div className="h-1 w-28 bg-white/20 rounded-full" />
              </div>
              <div className="rounded-xl bg-[#1d1042]/90 p-4 border border-purple-500/30">
                <div className="h-1.5 w-16 bg-white/90 rounded-full mb-2" />
                <div className="h-1 w-32 bg-white/30 rounded-full" />
              </div>
            </div>
          </div>

          {/* Step 3 Card */}
          <div className="flex flex-col rounded-3xl bg-[#09051d]/70 backdrop-blur-xl border border-white/10 p-7 shadow-2xl hover:border-white/20 transition-colors will-change-transform">
            <span className="text-xs font-medium text-gray-400">Step 3</span>
            <h2 className="text-2xl font-semibold mt-1 mb-6">
              Edit & Launch
            </h2>

            <div className="relative w-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#030614] p-4 flex flex-col justify-between aspect-[16/10] mt-auto">
              <div className="flex items-center justify-between text-[9px] text-gray-300">
                <span className="font-bold text-white uppercase">VEXEL</span>
                <span className="px-1.5 py-0.5 rounded-full border border-white/20 text-[7px]">
                  GET STARTED ↗
                </span>
              </div>
              <div className="relative z-10 mt-auto">
                <h3 className="text-sm font-semibold text-white">
                  Design meets intelligence in 3D space.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}