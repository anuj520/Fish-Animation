"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useCases = [
  {
    id: "ecommerce",
    title: "Ecommerce",
    description:
      "Launch high-performance interactive 3D product landing pages that boost engagement and conversions—no code required.",
    link: "#",
    offsetClass: "mt-0",
  },
  {
    id: "tech",
    title: "Tech",
    description:
      "Leverage WebGL visuals and high-performance, best-in-class 3D websites to elevate your online presence—no code required.",
    link: "#",
    offsetClass: "mt-12 md:mt-20",
  },
  {
    id: "creative",
    title: "Creative",
    description:
      "Craft creative, captivating 3D websites with drag-and-drop tools and keyframe animations to wow every visitor.",
    link: "#",
    offsetClass: "mt-20 md:mt-40",
  },
  {
    id: "storytelling",
    title: "Storytelling",
    description:
      "Bring your vision to life with scroll triggered 3D scenes and interactive animations that keep users engaged.",
    link: "#",
    offsetClass: "mt-28 md:mt-60",
  },
];

export default function UseCasesSection() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement>(null);

  // Helper: Text ko individual letters me break karke kinetic wave style me wrap karne ke liye
  const splitTextToKineticLetters = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="usecase-letter inline-block will-change-transform transform-gpu origin-bottom"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </span>
    ));
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".usecase-card");

      cards.forEach((card, i) => {
        const letters = card.querySelectorAll(".usecase-letter");
        const badge = card.querySelector(".usecase-badge");
        const desc = card.querySelector(".usecase-desc");
        const link = card.querySelector(".usecase-link");

        // Master timeline tied to each individual card's scroll position
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 40%",
            scrub: 1.2, // Smooth scroll sync
          },
        });

        // 1. Box Entrance (Dynamic 3D Perspective Lift)
        tl.fromTo(
          card,
          {
            y: 120 + i * 20,
            opacity: 0,
            scale: 0.88,
            rotateY: i % 2 === 0 ? -12 : 12, // Alternating 3D angle entry
            transformPerspective: 1000,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            ease: "power3.out",
          },
          0
        )
        // 2. Badge & Elements Reveal
        .fromTo(
          [badge, desc, link],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.1, ease: "power2.out" },
          0.1
        )
        // 3. Title Letter-by-Letter Elastic Wave Effect
        .fromTo(
          letters,
          {
            opacity: 0,
            y: 30,
            rotateZ: (index) => (index % 2 === 0 ? -18 : 18), // Fan-out angle
            scale: 0.5,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.04, // Stagger wave speed
            ease: "back.out(2)", // Bouncy overshoot effect
          },
          0.15
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="section-5"
      className="relative w-full bg-transparent py-24 px-4 md:px-8 font-sans text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {useCases.map((card) => (
          <div
            key={card.id}
            className={`usecase-card flex flex-col justify-between rounded-3xl bg-[#080518]/80 backdrop-blur-xl border border-white/10 p-7 min-h-[380px] shadow-2xl hover:border-cyan-500/40 transition-colors duration-500 will-change-transform transform-gpu ${card.offsetClass}`}
          >
            {/* Card Content */}
            <div className="space-y-4">
              {/* Cyan Tag Badge */}
              <div>
                <span className="usecase-badge inline-block text-[11px] font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full uppercase">
                  USE CASE
                </span>
              </div>

              {/* Title with Letter-by-Letter Wave Animation */}
              <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white pt-1 [perspective:800px]">
                {splitTextToKineticLetters(card.title)}
              </h3>

              {/* Description */}
              <p className="usecase-desc text-sm text-gray-300 font-normal leading-relaxed pt-1">
                {card.description}
              </p>
            </div>

            {/* Bottom Link Action */}
            <div className="pt-8">
              <Link
                href={card.link}
                className="usecase-link inline-flex items-center gap-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors group"
              >
                <span>Explore Now</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}