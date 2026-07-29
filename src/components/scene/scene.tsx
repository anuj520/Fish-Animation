import { useScroll } from '@/context/contextApi'
import { MeshReflectorMaterial, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
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

const Scene = () => {
  const { scene, animations } = useGLTF(FISH_MODEL_PATH, true)
  const butterflyGLTF = useGLTF(BUTTERFLY_MODEL_PATH, true)
  const [sourceNormalMap] = useTexture([WATER_TEXTURE_PATH])
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

    if (fly1) {
      fly1.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.5).play()
    }

    if (fly2) {
      fly2.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.5).play()
    }

    return () => {
      if (fly1) {
        fly1.fadeOut(0.5)
      }

      if (fly2) {
        fly2.fadeOut(0.5)
      }
    }
  }, [b1Actions, b2Actions])

  useFrame((_, delta) => {
    const texture = normalMapRef.current
    if (!texture) return

    texture.offset.x += delta * 0.09
    texture.offset.y += delta * 0.08
  })

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-8",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
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
      .to(scene.position, { x: "+=64", y: "+=5", ease: "power1.inOut" }, "step8")
      .to(scene.rotation, { x: 0, y: -Math.PI / 2, z: 0, duration: 0.3, ease: "power2.out" }, "step8")
  }, { dependencies: [scene], revertOnUpdate: true })

  return (
    <>
      <primitive object={scene} scale={150} position={[-7, 0, 27]} rotation={[0, Math.PI / 2, 0]} />

      {!isScrolled && (
        <>
          <primitive
            object={butterflyGLTF.scene}
            scale={2.3}
            position={[12, 3, 30]}
            rotation={[0, -Math.PI / 2, 0]}
          />

          <primitive
            object={butterfly2Scene}
            scale={2.4}
            position={[-20, -2, 30]}
            rotation={[0, -Math.PI / 2, 0]}
          />
        </>
      )}

      {!isScrolled && (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -5, 0]}
          receiveShadow
        >
          <planeGeometry args={[120, 120]} />
          <MeshReflectorMaterial
            normalMap={normalMap}
            normalScale={new THREE.Vector2(0.35, 0.35)}
            blur={[400, 150]}
            resolution={1024}
            mirror={0.85}
            mixBlur={0.7}
            mixStrength={3.5}
            roughness={0.1}
            depthScale={1.5}
            minDepthThreshold={0.2}
            maxDepthThreshold={1.2}
            depthToBlurRatioBias={0.25}
            color="#fff"
            metalness={0.15}
            distortion={0.4}
          />
        </mesh>
      )}
    </>
  )
}

export default Scene

useGLTF.preload(FISH_MODEL_PATH)
useGLTF.preload(BUTTERFLY_MODEL_PATH)
useTexture.preload(WATER_TEXTURE_PATH)