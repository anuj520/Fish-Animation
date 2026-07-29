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

      // Master ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",      // Pin starts when section hits top of viewport
          end: "+=120%",         // Scroll length for the pinned animation
          scrub: 1.5,            // Smooth, luxurious inertia on scroll
          pin: true,             // Pins the section for full control
          anticipatePin: 1,
        },
      });

      // 1. Smooth background transition (Glass Blue -> Solid Black)
      tl.to(
        overlayRef.current,
        {
          backgroundColor: "rgba(0, 0, 0, 1)",
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
          ease: "power2.inOut",
        },
        0
      )
      // 2. Central Card Zoom & Elevation
      .fromTo(
        cardRef.current,
        {
          scale: 0.82,
          borderRadius: "2rem",
          boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.3)",
        },
        {
          scale: 1,
          borderRadius: "1rem",
          boxShadow: "0px 40px 100px rgba(0, 0, 0, 0.8)",
          ease: "power2.out",
        },
        0
      );

      // 3. Parallax / Subtle Zoom on inner image for high-end depth
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.25 },
          { scale: 1.0, ease: "power1.out" },
          0
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <main id="section-2" ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-slate-900">
      {/* Background Overlay (Glass-blue to solid black transition) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
        style={{
          backgroundColor: "rgba(65, 146, 203, 0.9)",
          backdropFilter: "blur(23px)",
          WebkitBackdropFilter: "blur(23px)",
        }}
      />

      {/* Floating Center Content Container */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-6">
        <div
          ref={cardRef}
          className="relative h-[85vh] w-[90vw] max-w-6xl overflow-hidden border border-white/20 will-change-transform"
        >
          <Image
            ref={imageRef}
            src="/images/herotexture.jpg.jpeg"
            alt="Hero Texture"
            fill
            priority
            className="object-cover object-center transform will-change-transform"
          />
          {/* Subtle vignette/overlay for cinematic tone */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      </div>
    </main>
  );
}