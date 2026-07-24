import { useScroll } from '@/context/contextApi'
import { MeshReflectorMaterial, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from "three"
import { Water, SkeletonUtils } from 'three-stdlib' // 👈 SkeletonUtils import kiya hai
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

extend({ Water })

const Scene = () => {
  const { scene, animations } = useGLTF("./clown-5-v1-sky-blue.glb", true)
  const butterflyGLTF = useGLTF("./butterfly.glb", true)
  
  const { isScrolled } = useScroll();   

  // 1. Properly Deep Clone Butterfly 2 Scene
  const butterfly2Scene = useMemo(() => {
    return SkeletonUtils.clone(butterflyGLTF.scene);
  }, [butterflyGLTF.scene]);

  // Fish Animations
  const { actions: fishActions } = useAnimations(animations, scene);
  
  // Butterfly Animations setup
  const { actions: b1Actions } = useAnimations(butterflyGLTF.animations, butterflyGLTF.scene);
  const { actions: b2Actions } = useAnimations(butterflyGLTF.animations, butterfly2Scene);

  const model = useRef(scene)
  const { camera, gl } = useThree()   
  
  gsap.registerPlugin(useGSAP())
  gsap.registerPlugin(ScrollTrigger);

  const { contextSafe } = useGSAP()

  const [normalMap] = useTexture([
    "/textures/water.jpeg",
  ]).map((texture) => {
    texture.flipY = false 
    texture.colorSpace = THREE.SRGBColorSpace 
    return texture  
  })

  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping

  useMemo(() => {
    if (normalMap) {
      normalMap.wrapS = THREE.RepeatWrapping;
      normalMap.wrapT = THREE.RepeatWrapping;
      normalMap.repeat.set(8, 8);
    }
  }, [normalMap]);

  useEffect(() => {
    camera.position.set(-4, 1, 0.4)
    camera.rotation.set(0, Math.PI, 0)
    gl.outputColorSpace = THREE.SRGBColorSpace
  }, [camera, gl])   

  // Fish Animation Play
  useEffect(() => {
    const action = fishActions["Fish|swim_B3"];
    if (!action) return;

    action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.5).play();
    return () => { action.fadeOut(0.5); };
  }, [fishActions]);

  // BOTH Butterflies Flying Animation Playback
  useEffect(() => {
    const fly1 = b1Actions["flying"] || b1Actions[Object.keys(b1Actions)[0]];
    const fly2 = b2Actions["flying"] || b2Actions[Object.keys(b2Actions)[0]];

    if (fly1) fly1.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.5).play();
    if (fly2) fly2.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.5).play();

    return () => {
      if (fly1) fly1.fadeOut(0.5);
      if (fly2) fly2.fadeOut(0.5);
    };
  }, [b1Actions, b2Actions]);

  useFrame((_, delta) => {
    if (normalMap) {
      normalMap.offset.x += delta * 0.09;
      normalMap.offset.y += delta * 0.08;
    }
  });

  const fish = model.current

  const addGsap = contextSafe(() => {
    if (!fish) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-8",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    tl.to(fish.position, { y: "-=20", ease: "power1.inOut" }, "step1")
      .to(fish.rotation, { x: -Math.PI * 1.5, y: -Math.PI * 1.5, ease: "power1.inOut" }, "step1")
      .to(fish.position, { y: "+=20", ease: "power1.inOut" }, "step2")
      .to(fish.rotation, { x: 0, y: 0, z: 0, duration: 0.3, ease: "power2.out" }, "step2")
      .to(fish.position, { x: "-=80", ease: "power1.inOut" }, "step3")
      .to(fish.rotation, { x: 0, y: Math.PI / 2, z: 0, duration: 0.3, ease: "power2.out" }, "step3")
      .to(fish.position, { x: "+=120", ease: "power1.inOut" }, "step4")
      .to(fish.rotation, { y: -Math.PI / 2, duration: 0.3, ease: "power2.out" }, "step4")
      .to(fish.position, { x: "-=100", ease: "power1.inOut" }, "step5")
      .to(fish.rotation, { x: 0, y: Math.PI / 2, z: 0, duration: 0.3, ease: "power2.out" }, "step5")
      .to(fish.position, { x: "+=100", ease: "power1.inOut" }, "step6")
      .to(fish.rotation, { y: -Math.PI / 2, z: 0, duration: 0.3, ease: "power2.out" }, "step6")
      .to(fish.position, { x: "-=100", ease: "power1.inOut" }, "step7")
      .to(fish.rotation, { y: Math.PI / 2, duration: 0.3, ease: "power2.out" }, "step7")
      .to(fish.position, { x: "+=64", y: "+=5", ease: "power1.inOut" }, "step8")
      .to(fish.rotation, { x: 0, y: -Math.PI / 2, z: 0, duration: 0.3, ease: "power2.out" }, "step8");
  });

  useGSAP(() => {
    addGsap()
  }, [])

  return (
    <>
      <primitive object={scene} scale={150} position={[-7, 0, 27]} rotation={[0, Math.PI / 2, 0]} />

      {/* BUTTERFLIES */}
      {!isScrolled && (
        <>
          {/* Butterfly 1 (Right & High) */}
          <primitive 
            object={butterflyGLTF.scene} 
            scale={2.3} 
            position={[12, 3, 30]} 
            rotation={[0, -Math.PI / 2, 0]} 
          />

          {/* Butterfly 2 (Left & Low) */}
          <primitive 
            object={butterfly2Scene} 
            scale={2.4} 
            position={[-20, -2, 30]} 
            rotation={[0, -Math.PI / 2, 0]} 
          />
        </>
      )}

      {/* WATER SURFACE */}
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