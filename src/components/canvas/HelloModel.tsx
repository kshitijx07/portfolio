"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { pointerUv, pointerState } from "@/lib/bus";
import { GlassMaterialShader } from "./GlassMaterial";

export default function HelloModel() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const fbo = useFBO();
  const { size, gl, scene, camera } = useThree();
  const currentAngle = useRef(Math.atan2(9, 4));

  // Cursive continuous multi-loop curve resembling the "hello" centerpiece
  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(-3.2, 1.5, 0.0),
      new THREE.Vector3(-3.0, -1.0, 0.2),
      new THREE.Vector3(-2.4, 0.8, -0.1),
      new THREE.Vector3(-1.8, -0.4, 0.3),
      new THREE.Vector3(-1.2, 0.9, -0.2),
      new THREE.Vector3(-0.6, -0.8, 0.2),
      new THREE.Vector3(0.0, 1.8, -0.1),
      new THREE.Vector3(0.6, -1.0, 0.3),
      new THREE.Vector3(1.2, 1.8, -0.2),
      new THREE.Vector3(1.8, -0.9, 0.2),
      new THREE.Vector3(2.6, 0.5, 0.0),
      new THREE.Vector3(3.2, -0.2, 0.1),
    ];
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const uniforms = useMemo(
    () => THREE.UniformsUtils.clone(GlassMaterialShader.uniforms),
    []
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Pass 1: Render background elements into FBO texture
    meshRef.current.visible = false;
    gl.setRenderTarget(fbo);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    meshRef.current.visible = true;

    // Pass 2: Calculate smooth constrained ring light angle
    const targetAngle = pointerState.inside
      ? Math.atan2(pointerUv.y - 0.5, pointerUv.x - 0.5)
      : 1.15; // default rest position

    const shortest = Math.atan2(
      Math.sin(targetAngle - currentAngle.current),
      Math.cos(targetAngle - currentAngle.current)
    );
    currentAngle.current += shortest * (1 - Math.exp(-6 * delta));

    const radius = Math.min(size.width, size.height) * 0.42;
    const lightX = size.width * 0.5 + radius * Math.cos(currentAngle.current);
    const lightY = size.height * 0.5 + radius * Math.sin(currentAngle.current);

    uniforms.tScene.value = fbo.texture;
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uLightPos.value.set(lightX, lightY);
  });

  return (
    <mesh ref={meshRef} position={[0, -0.2, 0]}>
      <tubeGeometry args={[curve, 160, 0.28, 24, false]} />
      <shaderMaterial args={[GlassMaterialShader]} uniforms={uniforms} />
    </mesh>
  );
}
