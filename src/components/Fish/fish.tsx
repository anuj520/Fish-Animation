import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, } from '@react-three/drei'
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
const Fish = () => {

  const { isScrolled, scrollY } = useScroll(); 

  return (
<main>    
<ScrollSmoother/>
<Canvas
  dpr={[1, 2]}
  shadows
  camera={{ near: 0.1, far: 1000, fov: 45 }}
  gl={{
    antialias: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    outputColorSpace: THREE.SRGBColorSpace,
    alpha: true, // important
  }}
  style={{
    width: "100vw",
  position:"fixed",
  top:0,
  left:0,
    height: "100vh",
  backgroundImage: !isScrolled
    ? "url('/images/herotexture.jpg.jpeg')"
    : "none",
    backgroundSize: "cover",
    backgroundPosition: "top",
  }}
>
  {/* 3D Objects */}

 <ambientLight intensity={.35} color="#4192CB" />   
<Environment preset="sunset"/>
<directionalLight intensity={3} color={"#4192CB"} />
     <Scene />
{/* <OrbitControls/> */}
    </Canvas>
   
<HeroSection/>  
<Section2/>  
<StepsSection/>
<ShowcaseSection/>
<UseCasesSection/>
<Section6/>
<ExpertSection/>
<CTASection/>
</main>
  )
}

export default Fish
