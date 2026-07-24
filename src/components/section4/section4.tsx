"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// 6 Cards Data Array
const showcases = [
  {
    id: 1,
    title: "Ascend Web3",
    image: "/images/herotexture.jpg.jpeg", // Replace with your image path
  },
  {
    id: 2,
    title: "Aspirinds AI",
    image: "/images/herotexture.jpg.jpeg",
  },
  {
    id: 3,
    title: "Curated Media",
    image: "/images/herotexture.jpg.jpeg",
  },
  {
    id: 4,
    title: "Cyber Interactive",
    image: "/images/herotexture.jpg.jpeg",
  },
  {
    id: 5,
    title: "WebGL Metaverse",
    image: "/images/herotexture.jpg.jpeg",
  },
  {
    id: 6,
    title: "3D Product Design",
    image: "/images/herotexture.jpg.jpeg",
  },
    {
    id: 7,
    title: "Cyber Interactive",
    image: "/images/herotexture.jpg.jpeg",
  },
  {
    id: 8,
    title: "WebGL Metaverse",
    image: "/images/herotexture.jpg.jpeg",
  },
  {
    id: 9,
    title: "3D Product Design",
    image: "/images/herotexture.jpg.jpeg",
  },
];

export default function ShowcaseSection() {
  return (
    <section id="section-4" className="relative w-full bg-black/50 text-white py-20 px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Heading & Action Buttons */}
        <div className="max-w-3xl space-y-6">
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.1]">
            Launch your Visually Stunning <br />
            Interactive 3D Website.
          </h2>

          <div className="flex items-center gap-4 pt-2">
            <button className="rounded-full bg-white/10 px-6 py-3 text-sm font-medium border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
              Talk to Us
            </button>
            <Link
              href="/browse"
              className="rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-gray-200 transition"
            >
              Browse 3D Websites
            </Link>
          </div>
        </div>

        {/* Showcase Grid (3 Columns x 2 Rows = 6 Boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {showcases.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0e0a1f]/60 backdrop-blur-md shadow-2xl hover:border-white/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              {/* Card Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                 sizes="100vw"
                priority={item.id <= 3}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Glassmorphic Inner Frame Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

              {/* Title Overlay on Hover */}
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