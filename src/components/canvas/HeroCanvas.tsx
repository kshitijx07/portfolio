"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { pointerUv, pointerState, getScrollSnapshot } from "@/lib/bus";
import { GlassMaterialShader } from "./GlassMaterial";

// ── 1. FALLING STICKER PARTICLES (Atlas InstancedMesh) ───────────
function BackgroundStickers() {
  const count = 18;
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 8.0,
      y: (Math.random() - 0.5) * 6.0,
      z: -0.6 - Math.random() * 0.8,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.3 - Math.random() * 0.4,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.8,
      scale: 0.22 + Math.random() * 0.28,
      color: [
        new THREE.Color("#4DEEEA"),
        new THREE.Color("#B4F342"),
        new THREE.Color("#FF3E1D"),
        new THREE.Color("#F547EB"),
      ][i % 4],
    }));
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      p.y += p.vy * delta;
      p.x += p.vx * delta;
      p.rot += p.vRot * delta;

      if (p.y < -3.5) {
        p.y = 3.5;
        p.x = (Math.random() - 0.5) * 8.0;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(0, 0, p.rot);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, p.color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      position={[0, 0, 0]}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial transparent opacity={0.7} />
    </instancedMesh>
  );
}

// ── 2. 3D GLASS TUBE TYPOGRAPHY CENTERPIECE ─────────────────────
function CursiveGlass() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const fbo = useFBO();
  const { size, gl, scene, camera } = useThree();
  const currentAngle = useRef(Math.atan2(9, 4));

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
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
    ]);
  }, []);

  const uniforms = useMemo(
    () => THREE.UniformsUtils.clone(GlassMaterialShader.uniforms),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // 1. Two-pass FBO offscreen capture excluding glass layer
    meshRef.current.visible = false;
    gl.setRenderTarget(fbo);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    meshRef.current.visible = true;

    // 2. Pointer tracking & angle constraint via atan2
    const targetAngle = pointerState.inside
      ? Math.atan2(pointerUv.y - 0.5, pointerUv.x - 0.5)
      : 1.15;

    // Shortest-arc angle dampening
    const shortest = Math.atan2(
      Math.sin(targetAngle - currentAngle.current),
      Math.cos(targetAngle - currentAngle.current)
    );
    currentAngle.current += shortest * (1.0 - Math.exp(-6.0 * delta));

    const radius = Math.min(size.width, size.height) * 0.42;
    const lightX = size.width * 0.5 + radius * Math.cos(currentAngle.current);
    const lightY = size.height * 0.5 + radius * Math.sin(currentAngle.current);

    // 3. Camera parallax and scroll depth push
    const scrollY = getScrollSnapshot().scrollTop;
    const depthPush = Math.min(scrollY * 0.003, 2.5);
    camera.position.z = 4.8 + depthPush;
    camera.position.x = (pointerUv.x - 0.5) * 0.4;
    camera.position.y = (pointerUv.y - 0.5) * 0.3;

    // 4. Update shader uniforms
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
      />
    </mesh>
  );
}

export default function HeroCanvas() {
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
        <BackgroundStickers />
        <CursiveGlass />
      </Canvas>
    </div>
  );
}
