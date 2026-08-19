"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { getScrollSnapshot, pointerUv, pointerState } from "@/lib/bus";
import { GlassMaterialShader } from "./GlassMaterial";

function HelloModelInteractive() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const fbo = useFBO();
  const { size, gl, scene, camera } = useThree();
  const currentAngle = useRef(Math.atan2(9, 4));

  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(-3.2, 1.4, 0.0),
      new THREE.Vector3(-2.8, -1.0, 0.2),
      new THREE.Vector3(-2.2, 0.8, -0.1),
      new THREE.Vector3(-1.6, -0.4, 0.3),
      new THREE.Vector3(-1.0, 0.9, -0.2),
      new THREE.Vector3(-0.4, -0.8, 0.2),
      new THREE.Vector3(0.2, 1.8, -0.1),
      new THREE.Vector3(0.8, -1.0, 0.3),
      new THREE.Vector3(1.4, 1.8, -0.2),
      new THREE.Vector3(2.0, -0.9, 0.2),
      new THREE.Vector3(2.8, 0.5, 0.0),
      new THREE.Vector3(3.4, -0.2, 0.1),
    ];
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const uniforms = useMemo(
    () => THREE.UniformsUtils.clone(GlassMaterialShader.uniforms),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const scrollY = getScrollSnapshot().scrollTop;
    const windowH = typeof window !== "undefined" ? window.innerHeight : 900;
    const scrollProgress = THREE.MathUtils.clamp(scrollY / windowH, 0, 1);

    // Dynamic scale, depth push, and parallax as scroll progresses
    meshRef.current.position.y = -0.2 + scrollProgress * 1.5;
    meshRef.current.position.z = -scrollProgress * 3.5;
    meshRef.current.rotation.x = scrollProgress * 0.4;

    // Two-pass FBO scene render
    meshRef.current.visible = false;
    gl.setRenderTarget(fbo);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    meshRef.current.visible = true;

    // Specular highlight rim follower
    const targetAngle = pointerState.inside
      ? Math.atan2(pointerUv.y - 0.5, pointerUv.x - 0.5)
      : 1.15;

    const shortest = Math.atan2(
      Math.sin(targetAngle - currentAngle.current),
      Math.cos(targetAngle - currentAngle.current)
    );
    currentAngle.current += shortest * (1.0 - Math.exp(-6.0 * delta));

    const radius = Math.min(size.width, size.height) * 0.42;
    const lightX = size.width * 0.5 + radius * Math.cos(currentAngle.current);
    const lightY = size.height * 0.5 + radius * Math.sin(currentAngle.current);

    uniforms.tScene.value = fbo.texture;
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uLightPos.value.set(lightX, lightY);
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={[0, -0.2, 0]}>
      <tubeGeometry args={[curve, 220, 0.28, 24, false]} />
      <shaderMaterial
        args={[GlassMaterialShader]}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroAboutScene() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 4.8], fov: 42 }}
      >
        <ambientLight intensity={0.6} />
        <HelloModelInteractive />
      </Canvas>
    </div>
  );
}
