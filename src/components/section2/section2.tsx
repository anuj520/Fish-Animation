"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
          start: "top 67%",     // Scroll start hote hi overlay transition shuru hoga
          end: "top 50%",       // Lambe scroll distance par dhere-dhere black me convert hoga
          scrub: 1.5,           // Extra smooth scroll response
        },
      });

      // 1. Transparent to Pure Solid Black Smooth Transition
      tl.fromTo(
        overlayRef.current,
        {
          backgroundColor: "rgba(0, 0, 0, 0)", // Start: Completely Transparent
        },
        {
          backgroundColor: "rgba(0, 0, 0, 1)", // End: Pure Solid Black
          ease: "power1.inOut",
        },
        0
      );

      // 2. Card Elevation & Scale Up Effect
      tl.fromTo(
        cardRef.current,
        {
          scale: 0.85,
          y: 50,
          borderRadius: "2rem",
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
          { scale: 1.0, ease: "power1.out" },
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
      className="relative w-full h-screen overflow-hidden bg-transparent"
    >
      {/* Starting me fully Transparent Overlay, scroll par dhire-dhire Black convert hoga */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 w-full h-full pointer-events-none will-change-colors"
      />

      {/* Floating Center Card */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-6">
        <div
          ref={cardRef}
          className="relative h-[85vh] w-[90vw] max-w-6xl overflow-hidden border border-white/20 will-change-transform shadow-2xl"
        >
          <Image
            ref={imageRef}
            src="/images/herotexture.jpg.jpeg"
            alt="Hero Texture"
            fill
            priority
            className="object-cover object-center transform will-change-transform"
          />
          {/* Subtle Inner Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      </div>
    </main>
  );
}