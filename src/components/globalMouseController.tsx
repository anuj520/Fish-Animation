import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GlobalMouseController({ isScrolled }: { isScrolled: boolean }) {
  // Mouse normalized coordinates (-1 to +1) hold karne ke liye refs
  const mouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Main HTML Body/Window se mouse calculate karna
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Canvas ke upar HTML elements hone par bhi listener globally work karega
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    // 1. Agar isScrolled === false hai tabhi rotation calculate hogi
    if (!isScrolled) {
      targetRotation.current.y = mouse.current.x * 0.15;  // Horizontal Tilt
      targetRotation.current.x = -mouse.current.y * 0.10; // Vertical Tilt
    } else {
      // Scroll hone par camera / scene smooth origin (0, 0) par reset ho jayega
      targetRotation.current.y = 0;
      targetRotation.current.x = 0;
    }

    // 2. Smooth Lerp Interpolation
    const lerpSpeed = delta * 3.5;

    state.camera.rotation.y = THREE.MathUtils.lerp(
      state.camera.rotation.y,
      targetRotation.current.y,
      lerpSpeed
    );

    state.camera.rotation.x = THREE.MathUtils.lerp(
      state.camera.rotation.x,
      targetRotation.current.x,
      lerpSpeed
    );
  });

  return null;
}