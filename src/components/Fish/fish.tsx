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
          shadows
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
            height: "100vh",
            opacity: experienceReady ? 1 : 0,
            transition: "opacity 700ms ease",
            backgroundImage: !isScrolled ? "url('/images/herotexture.jpg.jpeg')" : "none",
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        >
          <ambientLight intensity={0.35} color="#4192CB" />
          <directionalLight intensity={3} color="#4192CB" />

          <Suspense fallback={null}>
            <Environment preset="sunset" />
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