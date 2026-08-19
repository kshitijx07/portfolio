"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { getScrollSnapshot, pointerUv, pointerState } from "@/lib/bus";

const GlassMaterialShader = {
  uniforms: {
    tScene: { value: null as THREE.Texture | null },
    uResolution: { value: new THREE.Vector2() },
    uLightPos: { value: new THREE.Vector2(4.0, 9.0) },
    uTintColor: { value: new THREE.Color("#3B82F6") },
    uProgress: { value: 0.0 }, // 0 = Hero, 1 = About
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec4 vScreenPos;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
      vScreenPos = gl_Position;
    }
  `,
  fragmentShader: `
    uniform sampler2D tScene;
    uniform vec2 uResolution;
    uniform vec2 uLightPos;
    uniform vec3 uTintColor;
    uniform float uProgress;

    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec4 vScreenPos;

    vec3 hardLight(vec3 base, vec3 blend) {
      vec3 low = 2.0 * base * blend;
      vec3 high = 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
      return mix(low, high, step(vec3(0.5), blend));
    }

    void main() {
      vec2 screenUv = (vScreenPos.xy / vScreenPos.w) * 0.5 + 0.5;
      vec3 viewDir = normalize(vViewPosition);
      vec3 normal = normalize(vNormal);

      float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.5);
      vec2 refractOffset = normal.xy * (0.04 - uProgress * 0.02);

      float r = texture2D(tScene, screenUv + refractOffset * 1.05).r;
      float g = texture2D(tScene, screenUv + refractOffset * 1.00).g;
      float b = texture2D(tScene, screenUv + refractOffset * 0.95).b;
      vec3 sceneCol = vec3(r, g, b);

      vec3 tinted = mix(sceneCol, hardLight(sceneCol, uTintColor), 0.6);
      float rim = smoothstep(180.0, 0.0, length(gl_FragCoord.xy - uLightPos)) * fresnel * 2.0;

      // Smooth fade out as user scrolls down
      float alpha = 1.0 - smoothstep(0.4, 0.95, uProgress);
      gl_FragColor = vec4(tinted + vec3(rim), alpha);
    }
  `,
};

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

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const scrollY = getScrollSnapshot().scrollTop;
    const windowH = typeof window !== "undefined" ? window.innerHeight : 900;
    const scrollProgress = THREE.MathUtils.clamp(scrollY / windowH, 0, 1);

    // Dynamic scale and translation as scroll progresses
    meshRef.current.position.y = -0.2 + scrollProgress * 1.5;
    meshRef.current.position.z = -scrollProgress * 3.5;
    meshRef.current.rotation.x = scrollProgress * 0.4;

    // FBO render pass
    meshRef.current.visible = false;
    gl.setRenderTarget(fbo);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    meshRef.current.visible = true;

    // Ring light follower
    const targetAngle = pointerState.inside
      ? Math.atan2(pointerUv.y - 0.5, pointerUv.x - 0.5)
      : 1.15;

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
    uniforms.uProgress.value = scrollProgress;
  });

  return (
    <mesh ref={meshRef} position={[0, -0.2, 0]}>
      <tubeGeometry args={[curve, 180, 0.28, 24, false]} />
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
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 4.8], fov: 42 }}
      >
        <ambientLight intensity={0.6} />
        <HelloModelInteractive />
      </Canvas>
    </div>
  );
}
