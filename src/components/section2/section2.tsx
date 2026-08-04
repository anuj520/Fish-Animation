"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../navbar/navbar";

export default function Section2() {
  gsap.registerPlugin(ScrollTrigger);

  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !overlayRef.current || !cardRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",    
          end: "top 30%",      
          scrub: 1.5,          
        },
      });

      // 1. Transparent to Pure Solid Black Smooth Transition
      tl.fromTo(
        overlayRef.current,
        {
          backgroundColor: "rgba(0, 0, 0, 0)",
        },
        {
          backgroundColor: "rgba(0, 0, 0, 1)",
          ease: "power1.inOut",
        },
        0
      );

      // 2. Card Elevation & Scale Up Effect
      tl.fromTo(
        cardRef.current,
        {
          scale: 0.85,
          y: 20,
          borderRadius: "1.2rem",
        },
        {
          scale: 1,
          y: 0,
          borderRadius: "1rem",
          ease: "power2.out",
        },
        0
      );

      // 3. Inner Image Zoom
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.2 },
          { scale: 1.0, ease: "power1.out"},
          0
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <main
      id="section-2"
      ref={sectionRef}
      // Mobile aur tablet ke liye height ko aur 30% kam kar diya gaya hai (h-[42svh] for mobile, sm:h-[48svh] for tablet)
      className="relative w-full h-[42svh] sm:h-[48svh] lg:h-screen overflow-hidden bg-transparent  flex flex-col justify-center items-center"
    >
      <Navbar />
      
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-colors z-10"
      />

      {/* Floating Center Card */}
      <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-5 z-20">
        <div
          ref={cardRef}
          className="relative h-full w-[94vw] sm:w-[90vw] max-w-6xl overflow-hidden border border-white/20 will-change-transform shadow-2xl"
        >
          <Image
            ref={imageRef}
            src="/images/herotexture.jpg.jpeg"
            alt="Hero Texture"
            fill
            priority
            className="object-cover object-center transform will-change-transform"
          />
        </div>
      </div>
    </main>
  );
}