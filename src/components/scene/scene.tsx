"use client";

import { useScroll } from '@/context/contextApi'
import { MeshReflectorMaterial, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import React, { useEffect, useMemo, useRef } from 'react'
import { ScrollTrigger } from "gsap/all"
import * as THREE from "three"
import { SkeletonUtils, Water } from 'three-stdlib'

extend({ Water })
gsap.registerPlugin(useGSAP, ScrollTrigger)

const FISH_MODEL_PATH = "/clown-5-v1-sky-blue.glb"
const BUTTERFLY_MODEL_PATH = "/butterfly.glb"
const WATER_TEXTURE_PATH = "/textures/water.jpeg"
const wallpaper = "/images/herotexture.jpg.jpeg"

const Scene = () => {
  const { scene, animations } = useGLTF(FISH_MODEL_PATH, true)
  const butterflyGLTF = useGLTF(BUTTERFLY_MODEL_PATH, true)
  const [sourceNormalMap] = useTexture([WATER_TEXTURE_PATH])
  const { size } = useThree();
  const [wallpaperMap] = useTexture([wallpaper])
  const { isScrolled } = useScroll()

  const butterfly2Scene = useMemo(() => {
    return SkeletonUtils.clone(butterflyGLTF.scene)
  }, [butterflyGLTF.scene])
  
  const normalMapRef = useRef<THREE.Texture | null>(null)

  const normalMap = useMemo(() => {
    const texture = sourceNormalMap.clone()

    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(8, 8)
    texture.needsUpdate = true

    return texture
  }, [sourceNormalMap])

  // Configured Wallpaper Texture Map
  const textureWallpaper = useMemo(() => {
    const tex = wallpaperMap.clone()
    tex.flipY = true
    tex.colorSpace = THREE.SRGBColorSpace
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.needsUpdate = true
    return tex
  }, [wallpaperMap])

  const { actions: fishActions } = useAnimations(animations, scene)
  const { actions: b1Actions } = useAnimations(butterflyGLTF.animations, butterflyGLTF.scene)
  const { actions: b2Actions } = useAnimations(butterflyGLTF.animations, butterfly2Scene)

  useEffect(() => {
    normalMapRef.current = normalMap

    return () => {
      normalMapRef.current = null
      normalMap.dispose()
    }
  }, [normalMap])

  useEffect(() => {
    const action = fishActions["Fish|swim_B3"]
    if (!action) return

    action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.5).play()
    return () => {
      action.fadeOut(0.5)
    }
  }, [fishActions])

  useEffect(() => {
    const fly1 = b1Actions["flying"] || b1Actions[Object.keys(b1Actions)[0]]
    const fly2 = b2Actions["flying"] || b2Actions[Object.keys(b2Actions)[0]]

    if (fly1) fly1.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.5).play()
    if (fly2) fly2.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.5).play()

    return () => {
      if (fly1) fly1.fadeOut(0.5)
      if (fly2) fly2.fadeOut(0.5)
    }
  }, [b1Actions, b2Actions])

  useFrame((_, delta) => {
    const texture = normalMapRef.current
    if (!texture) return

    texture.offset.x += delta * 0.09
    texture.offset.y += delta * 0.08
  })

    const width = size.width;

  // Responsive breakpoints
  const isMobile = width <= 600;
  const isTablet = width > 600 && width <= 1024;

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-9",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    })

    timeline
      .to(scene.position, { y: "-=20", ease: "power1.inOut" }, "step1")
      .to(scene.rotation, { x: -Math.PI * 1.5, y: -Math.PI * 1.5, ease: "power1.inOut" }, "step1")
      .to(scene.position, { y: "+=20", ease: "power1.inOut" }, "step2")
      .to(scene.rotation, { x: 0, y: 0, z: 0, duration: 0.3, ease: "power2.out" }, "step2")
      .to(scene.position, { x: "-=80", ease: "power1.inOut" }, "step3")
      .to(scene.rotation, { x: 0, y: Math.PI / 2, z: 0, duration: 0.3, ease: "power2.out" }, "step3")
      .to(scene.position, { x: "+=120", ease: "power1.inOut" }, "step4")
      .to(scene.rotation, { y: -Math.PI / 2, duration: 0.3, ease: "power2.out" }, "step4")
      .to(scene.position, { x: "-=100", ease: "power1.inOut" }, "step5")
      .to(scene.rotation, { x: 0, y: Math.PI / 2, z: 0, duration: 0.3, ease: "power2.out" }, "step5")
      .to(scene.position, { x: "+=100", ease: "power1.inOut" }, "step6")
      .to(scene.rotation, { y: -Math.PI / 2, z: 0, duration: 0.3, ease: "power2.out" }, "step6")
      .to(scene.position, { x: "-=100", ease: "power1.inOut" }, "step7")
      .to(scene.rotation, { y: Math.PI / 2, duration: 0.3, ease: "power2.out" }, "step7")
      // Fixed Step 8 & 9: Cleaned relative calculations to direct landing alignment
      .to(scene.position, { x: -4, y: 5, ease: "power1.inOut" }, "step8")
      .to(scene.rotation, { x: 0, y: Math.PI, z: 0, duration: 0.3, ease: "power2.out" }, "step8")
      .to(scene.rotation, { x: 0, y: Math.PI / 2, z: 0, duration: 0.3, ease: "power2.out" }, "step9")
  }, { dependencies: [scene], revertOnUpdate: true })


  const sceneScale = isMobile ? 90 : isTablet ? 120 : 150;
  const scenePosition = isMobile ? [-4, 0, 22] : isTablet ? [-6, 0, 25] : [-7, 0, 27];

  const butterfly1Scale = isMobile ? 1.3 : isTablet ? 1.8 : 2.3;
  const butterfly1Position = isMobile ? [-1, 5, 24] : isTablet ? [5, 5, 27] : [12, 3, 30];

  const butterfly2Scale = isMobile ? 1.4 : isTablet ? 1.9 : 2.4;
  const butterfly2Position = isMobile ? [-7, -4.5, 24] : isTablet ? [-14, -4, 27] : [-20, -2, 30];

  const waterSize = isMobile ? 70 : isTablet ? 100 : 120;
  const waterResolution = isMobile ? 512 : isTablet ? 768 : 1024;
  const waterBlur = isMobile ? [150, 80] : isTablet ? [250, 100] : [400, 150];

  return (
    <>
      <primitive
        object={scene}
        scale={sceneScale}
        position={scenePosition}
        rotation={[0, Math.PI / 2, 0]}
      />

      {!isScrolled && (
        <>
          <primitive
            object={butterflyGLTF.scene}
            scale={butterfly1Scale}
            position={butterfly1Position}
            rotation={[0, -Math.PI / 2, 0]}
          />

          <primitive
            object={butterfly2Scene}
            scale={butterfly2Scale}
            position={butterfly2Position}
            rotation={[0, -Math.PI / 2, 0]}
          />
        </>
      )}

      {!isScrolled && (
        <group>
          <mesh
            position={[0, 8, 30]}          
            rotation={[0, 0, 0]}          
            receiveShadow
          >
            <planeGeometry args={[65, 28]} />
            <meshBasicMaterial 
              map={textureWallpaper} 
              side={THREE.DoubleSide} 
              transparent={true}
            />  
          </mesh>  
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -5, 0]}
            receiveShadow
          >
            <planeGeometry
              args={[waterSize, waterSize]}
            />

            <MeshReflectorMaterial
              normalMap={normalMap}
              normalScale={new THREE.Vector2(0.35, 0.35)}
              resolution={waterResolution}
              mirror={0.85}
              mixBlur={0.7}
              mixStrength={3.5}
              roughness={0.1}
              depthScale={1.5}
              minDepthThreshold={0.2}
              maxDepthThreshold={1.2}
              depthToBlurRatioBias={0.25}
              color="#79B8D6"
              metalness={0.15}
              distortion={0.4}
            />
          </mesh>
        </group> 
      )}
    </>
  );
}

export default Scene

useGLTF.preload(FISH_MODEL_PATH)
useGLTF.preload(BUTTERFLY_MODEL_PATH)
useTexture.preload(WATER_TEXTURE_PATH)
useTexture.preload(wallpaper)