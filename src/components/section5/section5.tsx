"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const useCases = [
  {
    id: "ecommerce",
    title: "Ecommerce",
    description:
      "Launch high-performance interactive 3D product landing pages that boost engagement and conversions—no code required.",
    link: "#",
    // Top offset styling exact image ke staggered layout ke liye
    offsetClass: "mt-0",
  },
  {
    id: "tech",
    title: "Tech",
    description:
      "Leverage WebGL visuals and high-performance, best-in-class 3D websites to elevate your online presence—no code required.",
    link: "#",
    offsetClass: "mt-12 md:mt-24",
  },
  {
    id: "creative",
    title: "Creative",
    description:
      "Craft creative, captivating 3D websites with drag-and-drop tools and keyframe animations to wow every visitor.",
    link: "#",
    offsetClass: "mt-24 md:mt-48",
  },
  {
    id: "storytelling",
    title: "Storytelling",
    description:
      "Bring your vision to life with scroll triggered 3D scenes and interactive animations that keep users engaged.",
    link: "#",
    offsetClass: "mt-36 md:mt-72",
  },
];

export default function UseCasesSection() {
  return (
    <section id="section-5" className="relative w-full bg-transparent py-16 px-4 md:px-8 font-sans text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {useCases.map((card) => (
          <div
            key={card.id}
            className={`flex flex-col justify-between rounded-3xl bg-[#080518]/80 backdrop-blur-xl border border-white/10 p-7 min-h-[360px] shadow-2xl hover:border-white/25 transition-all duration-300 ${card.offsetClass}`}
          >
            {/* Card Content */}
            <div className="space-y-4">
              {/* Cyan Tag Badge */}
              <span className="inline-block text-[11px] font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full uppercase">
                USE CASE
              </span>

              {/* Title */}
              <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white pt-1">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-300 font-normal leading-relaxed pt-1">
                {card.description}
              </p>
            </div>

            {/* Bottom Link Action */}
            <div className="pt-8">
              <Link
                href={card.link}
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors"
              >
                <span>Explore Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}