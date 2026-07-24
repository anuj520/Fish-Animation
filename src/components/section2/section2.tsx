"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Section2() {
  gsap.registerPlugin(ScrollTrigger);

  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !overlayRef.current) return;

      // Starting glass-blue background se black (#000000) smooth scroll animation
      gsap.fromTo(
        overlayRef.current,
        {
          backgroundColor: "rgba(65, 146, 203, 0.45)", // Semi-transparent sky blue for glass effect
          backdropFilter: "blur(30px)",
        },
        {
          backgroundColor: "rgba(0, 0, 0, 1)", // Smooth black color
          backdropFilter: "blur(0px)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%", // Jab section scroll start ho
            end: "top 20%",   // Jab full black transition complete ho
            scrub: 1,         // Smooth lag-free scrub
          },
          ease: "power2.out",
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <main id="section-2" ref={sectionRef}>
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center ">
        {/* Background Overlay (Handles GSAP Blur 23px & Color Transition) */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 w-full h-full pointer-events-none"
          style={{
            backgroundColor: "rgba(65, 146, 203, 0.45)",
            backdropFilter: "blur(23px)",
            WebkitBackdropFilter: "blur(23px)",
          }}
        />

        {/* Center Floating Card / Texture */}
        <div className="relative z-20 h-[80%] w-[80%] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          <Image
            src="/images/herotexture.jpg.jpeg"
            alt="Hero Texture"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Soft Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    </main>
  );
}