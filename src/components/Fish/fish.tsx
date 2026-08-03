import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from "three"
import Scene from '../scene/scene'
import HeroSection from '../heroSection/section1'
import Section2 from '../section2/section2'
import StepsSection from '../section3/section3'
import ShowcaseSection from '../section4/section4'
import UseCasesSection from '../section5/section5'
import Section6 from '../section6/section6'
import CTASection from '../section8/section8'
import ExpertSection from '../section7/section7'
import { useScroll } from '@/context/contextApi'
import ScrollSmoother from '@/components/scrollSmooth'
import SitePreloader from '@/components/preloader/sitePreloader'
import Section9 from './Section9/Section9'

const Fish = () => {
  const [experienceReady, setExperienceReady] = useState(false);
  const { isScrolled } = useScroll();

  return (
    <main className="relative">
      <SitePreloader onReadyChange={setExperienceReady} />
      {experienceReady ? <ScrollSmoother /> : null}

      <div className={`transition-opacity duration-700 ${experienceReady ? "opacity-100" : "opacity-0"}`}>
<Canvas
  dpr={[1, 2]}
  camera={{ near: 0.1, far: 1000, fov: 45, position: [-4, 1, 0.4], rotation: [0, Math.PI, 0] }}
  gl={{
    antialias: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    outputColorSpace: THREE.SRGBColorSpace,
    alpha: true,
  }}
  style={{
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    // zIndex: 1,
    height: "100vh",
    opacity: experienceReady ? 1 : 0,
    transition: "opacity 700ms ease",
  }}
>
 {/* 1. ATMOSPHERIC REALISTIC FOG */}
<fogExp2 attach="fog" args={["#4192CB", 0.015]} />

  {/* 2. BALANCED AMBIENT & DIRECTIONAL LIGHTING */}
  <ambientLight intensity={1.2} color="#8bc3fe" />
  
  {/* Main Sunlight / Top Down Key Light */}
  <directionalLight
    position={[5, 12, 8]}
    intensity={2.8}
    color="#ffffff"
    castShadow
    shadow-mapSize={[2048, 2048]}
  />

  {/* Fill Light for Aquatic Blue Softness */}
  <directionalLight
    position={[-5, -5, -5]}
    intensity={1.5}
    color="#3282b8"
  />

  {/* 3. FISH SPECULAR HIGHLIGHT (Point Light near Fish Model) */}
  <pointLight
    position={[0, 2, 25]}
    intensity={12}
    distance={35}
    color="#ffffff"
    decay={2}
  />

  <Suspense fallback={null}>
    <Environment preset="city" environmentIntensity={0.8} />
    <Scene />
  </Suspense>
</Canvas>

        <HeroSection />
        <Section2 />
        <StepsSection />
        <ShowcaseSection />
        <UseCasesSection />
        <Section6 />
        <ExpertSection />
        <CTASection />
  
      </div>
    </main>
  );
}

export default Fish