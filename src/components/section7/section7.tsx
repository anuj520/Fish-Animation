"use client";

import React, { useRef, Suspense, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, Float } from "@react-three/drei";

// 3D Model Component with Embedded Animation
function JellyfishModel() {
  const group = useRef(null);
  const { scene, animations } = useGLTF(
    "/dff62667-7a94-4084-bc4d-2667d81b8cf2-jelly-v2.glb"
  );
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && actions["jellyfish|move_1"]) {
      actions["jellyfish|move_1"].reset().fadeIn(0.5).play();
    } else if (actions) {
      const firstAction = Object.keys(actions)[0];
      if (firstAction) actions[firstAction]?.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  return (
    <group ref={group} dispose={null}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <primitive object={scene} scale={0.05} position={[0, -0.2, 0]} />
      </Float>
    </group>
  );
}

useGLTF.preload("/dff62667-7a94-4084-bc4d-2667d81b8cf2-jelly-v2.glb");

export default function ExpertSection() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const splitLetters = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="expert-letter inline-block will-change-transform origin-center"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </span>
    ));
  };

  useGSAP(
    () => {
      if (!containerRef.current || !headingRef.current) return;

      const letters = headingRef.current.querySelectorAll(".expert-letter");

      // 1. Kinetic Letter-by-Letter Wave
      gsap.fromTo(
        letters,
        {
          opacity: 0,
          y: 40,
          rotateX: -90,
          scale: 0.8,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.02,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // 2. CTA Buttons
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              end: "top 70%",
              scrub: 0.8,
            },
          }
        );
      }

      // 3. Right Visual (Canvas Reveal)
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { scale: 0.85, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: visualRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }

      // 4. Bottom Cards (Fixed trigger bounds so -mt-14 works)
      if (cardsRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(
          cardsRef.current.children
        );

        gsap.fromTo(
          cards,
          {
            y: 60,
            opacity: 0,
            rotateX: 10,
            transformPerspective: 1000,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 95%", // Adjusted start so negative margin doesn't break trigger bounds
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="section-7"
      className="relative min-h-screen w-full font-sans text-white bg-black/50 overflow-hidden py-8 sm:py-12"
    >
      {/* Glow effect */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-8 mb-8 sm:mb-16">
          {/* Left Hero Typography */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            <h1
              ref={headingRef}
              className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] [perspective:1000px]"
            >
              <span className="block">{splitLetters("Get your 3D Website")}</span>
              <span className="block text-[#C27AFF]">
                {splitLetters("with our Experts.")}
              </span>
            </h1>

            <div
              ref={ctaRef}
              className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
            >
              <button className="rounded-full bg-white/10 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
                Book a Call
              </button>
              <button className="rounded-full bg-white text-black px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-gray-200 transition">
                See Pricing
              </button>
            </div>
          </div>

          {/* Right 3D Model Canvas */}
          <div
            ref={visualRef}
            className="relative h-[320px] sm:h-[450px] lg:h-[550px] w-full flex items-center justify-center will-change-transform pointer-events-none z-10"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 5]} intensity={2} />
              <pointLight position={[-10, -10, -5]} color="#C27AFF" intensity={3} />

              <Suspense fallback={null}>
                <JellyfishModel />
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* BOTTOM 3 STEPS CARDS */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-0 lg:-mt-14 relative z-20"
        >
          {/* Step 1 Card */}
          <div className="flex flex-col rounded-3xl bg-[#09051d]/70 backdrop-blur-xl border border-white/10 p-5 sm:p-7 shadow-2xl hover:border-white/20 transition-colors will-change-transform">
            <span className="text-xs font-medium text-gray-400">Step 1</span>
            <h2 className="text-xl sm:text-2xl font-semibold mt-1 mb-4 sm:mb-6">
              Tell us About Yourself
            </h2>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <Image
                  src="/images/herotexture.jpg.jpeg"
                  alt="Cube"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 15vw"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <Image
                  src="/images/herotexture.jpg.jpeg"
                  alt="Tree"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 15vw"
                />
              </div>
            </div>
          </div>

          {/* Step 2 Card */}
          <div className="flex flex-col rounded-3xl bg-[#09051d]/70 backdrop-blur-xl border border-white/10 p-5 sm:p-7 shadow-2xl hover:border-white/20 transition-colors will-change-transform">
            <span className="text-xs font-medium text-gray-400">Step 2</span>
            <h2 className="text-xl sm:text-2xl font-semibold mt-1 mb-4 sm:mb-6">
              Pick Your Theme
            </h2>

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
          <div className="flex flex-col rounded-3xl bg-[#09051d]/70 backdrop-blur-xl border border-white/10 p-5 sm:p-7 shadow-2xl hover:border-white/20 transition-colors will-change-transform">
            <span className="text-xs font-medium text-gray-400">Step 3</span>
            <h2 className="text-xl sm:text-2xl font-semibold mt-1 mb-4 sm:mb-6">
              Edit & Launch
            </h2>

            <div className="relative w-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#030614] p-4 flex flex-col justify-between aspect-[16/10] mt-auto">
              <div className="flex items-center justify-between text-[9px] text-gray-300">
                <span className="font-bold text-white uppercase">VEXEL</span>
                <span className="px-1.5 py-0.5 rounded-full border border-white/20 text-[7px]">
                  GET STARTED ↗
                </span>
              </div>
              <div className="relative z-10 mt-auto">
                <h3 className="text-xs sm:text-sm font-semibold text-white">
                  Design meets intelligence in 3D space.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}