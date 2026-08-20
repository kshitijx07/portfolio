"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { pointerUv, pointerState } from "@/lib/bus";
import { GlassMaterialShader } from "./GlassMaterial";
import ViewportLazyScene from "./ViewportLazyScene";

function FloatingStickers() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, index) => {
      child.position.y += Math.sin(t * 1.6 + index * 1.3) * 0.003;
      child.position.x += Math.cos(t * 1.2 + index * 0.9) * 0.002;
      child.rotation.z += Math.cos(t * 1.1 + index) * 0.002;
    });
  });

  return (
    <group ref={groupRef}>
      {/* 1. Spider-Man Crimson Badge */}
      <mesh position={[-2.4, 1.6, -0.8]} scale={0.75}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#ED3C3F" transparent opacity={0.85} />
      </mesh>

      {/* 2. Electric Spidey Blue Disc */}
      <mesh position={[2.5, -1.8, -0.9]} scale={0.8}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.85} />
      </mesh>

      {/* 3. Glossy Carbon Tag */}
      <mesh position={[2.8, 1.2, -0.7]} rotation={[0, 0, 0.15]} scale={0.7}>
        <planeGeometry args={[1.4, 0.7]} />
        <meshBasicMaterial color="#252324" transparent opacity={0.9} />
      </mesh>

      {/* 4. Spider-Web Silver Reticle */}
      <mesh position={[-2.6, -1.4, -0.6]} rotation={[0, 0, -0.2]} scale={0.6}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial color="#ED3C3F" transparent opacity={0.75} />
      </mesh>
    </group>
  );
}

function StackedGlassText() {
  const topMeshRef = useRef<THREE.Mesh>(null!);
  const botMeshRef = useRef<THREE.Mesh>(null!);
  const fbo = useFBO();
  const { size, gl, scene, camera } = useThree();
  const currentAngle = useRef(Math.atan2(9, 4));

  // Top Loop geometry: "CRAFT"
  const topCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.0, 1.8, 0.0),
      new THREE.Vector3(-1.5, 2.5, 0.3),
      new THREE.Vector3(0.0, 1.2, -0.2),
      new THREE.Vector3(1.5, 2.6, 0.2),
      new THREE.Vector3(3.0, 1.6, 0.0),
    ]);
  }, []);

  // Bottom Loop geometry: "TASTE"
  const botCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.8, -0.4, 0.0),
      new THREE.Vector3(-1.4, -1.8, 0.3),
      new THREE.Vector3(0.2, 0.1, -0.2),
      new THREE.Vector3(1.6, -1.9, 0.2),
      new THREE.Vector3(2.9, -0.6, 0.0),
    ]);
  }, []);

  const uniforms = useMemo(
    () => THREE.UniformsUtils.clone(GlassMaterialShader.uniforms),
    []
  );

  useFrame((_, delta) => {
    if (!topMeshRef.current || !botMeshRef.current) return;

    // 1. Offscreen FBO Capture for Refraction Pass
    topMeshRef.current.visible = false;
    botMeshRef.current.visible = false;
    gl.setRenderTarget(fbo);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    topMeshRef.current.visible = true;
    botMeshRef.current.visible = true;

    // 2. Polar Constrained Light Angle calculation (atan2)
    const targetAngle = pointerState.inside
      ? Math.atan2(pointerUv.y - 0.5, pointerUv.x - 0.5)
      : 1.15;

    const shortest = Math.atan2(
      Math.sin(targetAngle - currentAngle.current),
      Math.cos(targetAngle - currentAngle.current)
    );
    currentAngle.current += shortest * (1.0 - Math.exp(-6.0 * delta));

    const radius = Math.min(size.width, size.height) * 0.44;
    const lightX = size.width * 0.5 + radius * Math.cos(currentAngle.current);
    const lightY = size.height * 0.5 + radius * Math.sin(currentAngle.current);

    uniforms.tScene.value = fbo.texture;
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uLightPos.value.set(lightX, lightY);
  });

  return (
    <>
      <mesh ref={topMeshRef}>
        <tubeGeometry args={[topCurve, 140, 0.32, 24, false]} />
        <shaderMaterial args={[GlassMaterialShader]} uniforms={uniforms} />
      </mesh>
      <mesh ref={botMeshRef}>
        <tubeGeometry args={[botCurve, 140, 0.32, 24, false]} />
        <shaderMaterial args={[GlassMaterialShader]} uniforms={uniforms} />
      </mesh>
    </>
  );
}

export default function ContactGlassScene() {
  return (
    <ViewportLazyScene
      className="absolute inset-0 pointer-events-none z-0"
      rootMargin="1200px 0px"
      idleTimeout={200}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.0], fov: 42 }}
      >
        <ambientLight intensity={0.65} />
        <FloatingStickers />
        <StackedGlassText />
      </Canvas>
    </ViewportLazyScene>
  );
}
