"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function ExpertSection() {
  return (
    <div id="section-7" className="relative min-h-screen w-full font-sans text-white bg-black/50 overflow-hidden">
      {/* Background Glow & Ambient Light Effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />



      {/* MAIN HERO CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 mb-16">
          {/* Left Hero Typography */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1]">
              Get your 3D Website <br />
              with our Experts.
            </h1>
            <div className="flex items-center gap-4 pt-2">
              <button className="rounded-full bg-white/10 px-6 py-3 text-sm font-medium border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
                Book a Call
              </button>
              <button className="rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-gray-200 transition">
                See Pricing
              </button>
            </div>
          </div>

          {/* Right 3D Jellyfish Visual */}
          <div className="relative h-[320px] sm:h-[400px] w-full flex items-center justify-center">
            {/* Replace with your 3D canvas / R3F Canvas or Jellyfish Image */}
            <Image
              src="/images/herotexture.jpg.jpeg" 
              alt="3D Jellyfish Visual"
              fill
               sizes="100vw"
              className="object-contain object-center drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]"
              priority
            />
          </div>
        </div>

        {/* BOTTOM 3 STEPS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          
          {/* Step 1 Card */}
          <div className="flex flex-col rounded-3xl bg-[#09051d]/70 backdrop-blur-xl border border-white/10 p-7 shadow-2xl">
            <span className="text-xs font-medium text-gray-400">Step 1</span>
            <h2 className="text-2xl font-semibold mt-1 mb-6">Tell us About Yourself</h2>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <Image src="/images/herotexture.jpg.jpeg" alt="Cube" fill className="object-cover"  sizes="100vw"/>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <Image src="/images/herotexture.jpg.jpeg" alt="Tree" fill className="object-cover"  sizes="100vw" />
              </div>
            </div>
          </div>

          {/* Step 2 Card */}
          <div className="flex flex-col rounded-3xl bg-[#09051d]/70 backdrop-blur-xl border border-white/10 p-7 shadow-2xl">
            <span className="text-xs font-medium text-gray-400">Step 2</span>
            <h2 className="text-2xl font-semibold mt-1 mb-6">Pick Your Theme</h2>

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
          <div className="flex flex-col rounded-3xl bg-[#09051d]/70 backdrop-blur-xl border border-white/10 p-7 shadow-2xl">
            <span className="text-xs font-medium text-gray-400">Step 3</span>
            <h2 className="text-2xl font-semibold mt-1 mb-6">Edit & Launch</h2>

            <div className="relative w-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#030614] p-4 flex flex-col justify-between aspect-[16/10] mt-auto">
              <div className="flex items-center justify-between text-[9px] text-gray-300">
                <span className="font-bold text-white uppercase">VEXEL</span>
                <span className="px-1.5 py-0.5 rounded-full border border-white/20 text-[7px]">
                  GET STARTED ↗
                </span>
              </div>
              <div className="relative z-10 mt-auto">
                <h3 className="text-sm font-semibold text-white">Design meets intelligence in 3D space.</h3>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}