"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function StepsAndFeatures() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement>(null);
  const stepsGridRef = useRef<HTMLDivElement>(null);
  const featuresGridRef = useRef<HTMLDivElement>(null);

  // Helper: Text ko individual letters me convert karne ke liye
  const splitTextToKineticLetters = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="kinetic-letter inline-block will-change-transform origin-bottom"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </span>
    ));
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // 1. Step Cards & Heading Letter Animations
      if (stepsGridRef.current) {
        const stepCards = gsap.utils.toArray<HTMLElement>(
          stepsGridRef.current.children
        );

        stepCards.forEach((card) => {
          const letters = card.querySelectorAll(".kinetic-letter");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 45%",
              scrub: 1.2,
            },
          });

          // Card Box Reveal
          tl.fromTo(
            card,
            {
              y: 80,
              opacity: 0,
              scale: 0.92,
              rotateX: 10,
              transformPerspective: 1000,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              ease: "power3.out",
            },
            0
          )
          // Text Letter-by-Letter Wave
          .fromTo(
            letters,
            {
              opacity: 0,
              y: 25,
              rotateX: -80,
              filter: "blur(8px)",
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: "blur(0px)",
              stagger: 0.02,
              ease: "back.out(1.7)",
            },
            0.1
          );
        });

        // Inner Mockup Parallax Shift
        gsap.to(".inner-parallax-item", {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: stepsGridRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // 2. Feature Cards Entrance & Text Reveal Animation
      if (featuresGridRef.current) {
        const featureCards = gsap.utils.toArray<HTMLElement>(
          featuresGridRef.current.children
        );

        featureCards.forEach((card) => {
          const letters = card.querySelectorAll(".kinetic-letter");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          });

          tl.fromTo(
            card,
            {
              y: 90,
              scale: 0.94,
              opacity: 0,
            },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              ease: "power2.out",
            },
            0
          ).fromTo(
            letters,
            {
              opacity: 0,
              y: 20,
              scale: 0.8,
              filter: "blur(6px)",
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              stagger: 0.02,
              ease: "power3.out",
            },
            0.1
          );
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="section-3"
      className="w-full bg-transparent py-8 md:py-20 px-4 md:px-8 font-sans text-white space-y-10 md:space-y-20 overflow-hidden"
    >
      {/* SECTION 1: 3-STEP PROCESS CARDS */}
      <section
        ref={stepsGridRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Step 1 */}
        <div className="flex flex-col rounded-3xl bg-[#09051d]/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-2xl hover:border-white/20 transition-colors duration-300 will-change-transform">
          <span className="text-sm font-medium text-gray-400">Step 1</span>
          {/* Responsive font size and tracking to prevent awkward word breaks */}
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold mt-1 mb-6 md:mb-8 tracking-tight [perspective:800px]">
            {splitTextToKineticLetters("Tell us About Yourself")}
          </h2>

          <div className="grid grid-cols-2 gap-3 mt-auto inner-parallax-item">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/5 bg-black/30">
              <Image
                src="/images/herotexture.jpg.jpeg"
                alt="3D Cube"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/5 bg-black/30">
              <Image
                src="/images/herotexture.jpg.jpeg"
                alt="3D Tree"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/5 bg-black/30">
              <Image
                src="/images/step1-3.jpg"
                alt="3D Shoe"
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/5 bg-black/30">
              <Image
                src="/images/herotexture.jpg.jpeg"
                alt="3D Ring"
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col rounded-3xl bg-[#09051d]/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-2xl hover:border-white/20 transition-colors duration-300 will-change-transform">
          <span className="text-sm font-medium text-gray-400">Step 2</span>
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold mt-1 mb-6 md:mb-8 tracking-tight [perspective:800px]">
            {splitTextToKineticLetters("Pick Your Theme")}
          </h2>

          <div className="flex flex-col gap-3 md:gap-4 my-auto inner-parallax-item">
            <div className="rounded-2xl bg-[#120a2e]/70 backdrop-blur-md p-4 md:p-5 border border-white/10 shadow-lg">
              <div className="h-1.5 w-16 bg-white/70 rounded-full mb-3" />
              <div className="h-1 w-28 bg-white/20 rounded-full" />
            </div>

            <div className="rounded-2xl bg-[#201548]/80 backdrop-blur-md p-4 md:p-5 border border-purple-500/30 shadow-xl scale-[1.02] transition-transform">
              <div className="h-1.5 w-16 bg-white/90 rounded-full mb-3" />
              <div className="h-1 w-32 bg-white/30 rounded-full" />
            </div>

            <div className="rounded-2xl bg-[#120a2e]/70 backdrop-blur-md p-4 md:p-5 border border-white/10 shadow-lg">
              <div className="h-1.5 w-16 bg-white/70 rounded-full mb-3" />
              <div className="h-1 w-24 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col rounded-3xl bg-[#09051d]/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-2xl hover:border-white/20 transition-colors duration-300 will-change-transform">
          <span className="text-sm font-medium text-gray-400">Step 3</span>
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold mt-1 mb-6 md:mb-8 tracking-tight [perspective:800px]">
            {splitTextToKineticLetters("Edit & Launch")}
          </h2>

          <div className="relative w-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#030614] p-4 flex flex-col justify-between aspect-[4/5] shadow-inner mt-auto inner-parallax-item">
            <div className="flex items-center justify-between text-[10px] text-gray-300 tracking-wider">
              <div className="flex items-center gap-2 opacity-80">
                <span>ABOUT</span>
                <span>FEATURES</span>
                <span>USE CASES</span>
              </div>
            </div>

            <div className="absolute inset-x-0 top-1/4 h-48 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/30 via-cyan-900/10 to-transparent blur-xl pointer-events-none" />

            <div className="relative z-10 mt-auto space-y-3">
              <span className="text-[9px] font-mono text-cyan-400 tracking-widest">
                // VEXEL AI
              </span>
              <h3 className="text-xl font-semibold leading-tight text-white">
                Design meets <br />
                intelligence in 3D space.
              </h3>
              <p className="text-[8px] text-gray-400 leading-normal max-w-[220px]">
                A MODERN FRAMEWORK BUILT FOR AI BRANDS — MINIMAL, DYNAMIC, AND
                DEEPLY INTERACTIVE. MAKE YOUR PRESENCE FEEL INTELLIGENT FROM
                THE VERY FIRST PIXEL.
              </p>
              <button className="bg-white text-black text-[9px] font-bold px-3 py-1.5 rounded uppercase tracking-wider hover:bg-gray-200 transition">
                EXPLORE VEXEL
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURE CARDS */}
      <section
        ref={featuresGridRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Feature Box 1 - Award Winning */}
        <div className="flex flex-col justify-between rounded-3xl bg-[#a08bfd]/90 backdrop-blur-xl p-6 md:p-8 text-white min-h-[280px] md:min-h-[320px] shadow-2xl hover:scale-[1.02] transition duration-300 will-change-transform">
          <div>
            <span className="text-xs font-medium text-white/80 uppercase tracking-wide">
              Award Winning
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-2 mb-3 md:mb-4 leading-tight [perspective:800px]">
              {splitTextToKineticLetters("4x No-Code Site of the Month")}
            </h3>
            <p className="text-sm text-white/80 font-normal">
              Beating Wix, Webflow and Wordpress.
            </p>
          </div>

          <div className="flex items-center justify-between mt-6 md:mt-8 pt-4">
            <Link
              href="#"
              className="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-1 text-white text-lg font-bold">
              <span>🍃 W. 🍃</span>
            </div>
          </div>
        </div>

        {/* Feature Box 2 - Trend Setting */}
        <div className="flex flex-col justify-between rounded-3xl bg-[#191338]/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 text-white min-h-[280px] md:min-h-[320px] shadow-2xl hover:scale-[1.02] transition duration-300 will-change-transform">
          <div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Trend Setting
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-2 mb-3 md:mb-4 leading-tight [perspective:800px]">
              {splitTextToKineticLetters("Top Web Design Trend 2025")}
            </h3>
            <p className="text-sm text-gray-300 font-normal">
              Muzli claims Interactive 3D elements are transforming web design.
            </p>
          </div>

          <div className="flex items-center justify-between mt-6 md:mt-8 pt-4">
            <Link
              href="#"
              className="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition"
            >
              Explore Now <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-1 text-white/90 text-lg font-bold italic">
              <span>🍃 M 🍃</span>
            </div>
          </div>
        </div>

        {/* Feature Box 3 - Scalable */}
        <div className="flex flex-col justify-between rounded-3xl bg-[#191338]/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 text-white min-h-[280px] md:min-h-[320px] shadow-2xl hover:scale-[1.02] transition duration-300 will-change-transform">
          <div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Scalable
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-2 mb-3 md:mb-4 leading-tight [perspective:800px]">
              {splitTextToKineticLetters("Trusted by the Best")}
            </h3>
            <p className="text-sm text-gray-300 font-normal">
              Join designers and agencies behind The Simpsons, Futurama and
              Humanity Protocol.
            </p>
          </div>

          <div className="flex items-center justify-between mt-6 md:mt-8 pt-4">
            <Link
              href="#"
              className="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition"
            >
              Explore Features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}