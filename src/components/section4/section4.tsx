"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const showcases = [
  { id: 1, title: "Ascend Web3", image: "/images/herotexture.jpg.jpeg" },
  { id: 2, title: "Aspirinds AI", image: "/images/herotexture.jpg.jpeg" },
  { id: 3, title: "Curated Media", image: "/images/herotexture.jpg.jpeg" },
  { id: 4, title: "Cyber Interactive", image: "/images/herotexture.jpg.jpeg" },
  { id: 5, title: "WebGL Metaverse", image: "/images/herotexture.jpg.jpeg" },
  { id: 6, title: "3D Product Design", image: "/images/herotexture.jpg.jpeg" },
  { id: 7, title: "Cyber Interactive", image: "/images/herotexture.jpg.jpeg" },
  { id: 8, title: "WebGL Metaverse", image: "/images/herotexture.jpg.jpeg" },
  { id: 9, title: "3D Product Design", image: "/images/herotexture.jpg.jpeg" },
];

export default function ShowcaseSection() {
  gsap.registerPlugin(ScrollTrigger);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonGroupRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Helper function: Text ko individual letter <span> tags me break karne ke liye
  const splitTextToLetters = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="letter inline-block will-change-transform"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </span>
    ));
  };

  useGSAP(
    () => {
      if (!sectionRef.current || !headingRef.current) return;

      const letters = headingRef.current.querySelectorAll(".letter");

      // 1. Premium Letter-by-Letter Scroll Animation
      gsap.fromTo(
        letters,
        {
          opacity: 0,
          y: 40,
          rotateX: -90,
          scale: 0.8,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.03,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );

      // 2. Buttons Fade-In
      if (buttonGroupRef.current) {
        gsap.fromTo(
          buttonGroupRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: buttonGroupRef.current,
              start: "top 90%",
              end: "top 60%",
              scrub: 0.8,
            },
          }
        );
      }

      // 3. Grid Cards Smooth Scroll Reveal
      if (gridRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(gridRef.current.children);

        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
 <section
      ref={sectionRef}
      id="section-4"
      className="relative w-full bg-black/50 text-white pt-6 pb-12 md:py-24 px-4 md:px-12 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">
        {/* Main Heading & Action Buttons */}
        <div className="max-w-4xl space-y-6 md:space-y-8">
          {/* Letter Animation Heading */}
          <h2
            ref={headingRef}
            className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.15] [perspective:1000px]"
          >
            <span className="block">
              {splitTextToLetters("Launch your Visually")}
            </span>
            <span className="block text-purple-400">
              {splitTextToLetters("Stunning Interactive")}
            </span>
            <span className="block">
              {splitTextToLetters("3D Website.")}
            </span>
          </h2>

          <div ref={buttonGroupRef} className="flex flex-wrap items-center gap-3 md:gap-4 pt-2">
            <button className="rounded-full bg-white/10 px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-medium border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
              Talk to Us
            </button>
            <Link
              href="/browse"
              className="rounded-full bg-white text-black px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-semibold hover:bg-gray-200 transition"
            >
              Browse 3D Websites
            </Link>
          </div>
        </div>

        {/* Showcase Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-4 md:pt-6"
        >
          {showcases.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0e0a1f]/60 backdrop-blur-md shadow-2xl hover:border-white/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer will-change-transform"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={item.id <= 3}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

              <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white">
                  {item.title} ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}