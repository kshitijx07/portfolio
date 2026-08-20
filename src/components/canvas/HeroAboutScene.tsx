"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { getScrollSnapshot, pointerUv, pointerState, subscribeScroll } from "@/lib/bus";
import { GlassMaterialShader } from "./GlassMaterial";

// ─────────────────────────────────────────────────────────────────────────────
// 1. 3D SPIDER SHADERS (All-Blue & Holographic Rim Sheen)
// ─────────────────────────────────────────────────────────────────────────────
const bodyVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const bodyFragment = /* glsl */ `
  uniform vec3 uBaseColor;
  uniform vec3 uRimColor;
  uniform vec3 uSheenColor;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.4);

    vec3 lightDir = normalize(vec3(sin(uTime * 0.6) * 1.2, cos(uTime * 0.4) * 0.8, 1.0));
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 46.0);

    vec3 color = uBaseColor;
    color += uRimColor * fresnel * 0.95;
    color += uSheenColor * spec * 1.2;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const outlineVertex = /* glsl */ `
  uniform float uOffset;
  void main() {
    vec3 newPosition = position + normal * uOffset;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const outlineFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  void main() {
    gl_FragColor = vec4(uColor, uOpacity);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// 2. PROCEDURAL 8-LEG KINEMATIC STEPPING & CRAWLING
// ─────────────────────────────────────────────────────────────────────────────
function buildAnimatedLegCurve(
  side: number,
  hipAngleDeg: number,
  index: number,
  stepPhase: number,
  isWalking: boolean
) {
  const hipRad = THREE.MathUtils.degToRad(hipAngleDeg);
  
  // Leg crawling step offsets
  const stepLift = isWalking ? Math.max(0, Math.sin(stepPhase)) * 0.35 : Math.sin(stepPhase * 0.5) * 0.06;
  const stepForward = isWalking ? Math.cos(stepPhase) * 0.4 : Math.cos(stepPhase * 0.5) * 0.08;

  const hip = new THREE.Vector3(
    side * 0.5,
    hipAngleDeg > 0 ? 0.25 : -0.15,
    0.05 * index
  );

  const dir1 = new THREE.Vector3(
    side * Math.cos(hipRad),
    Math.sin(hipRad) + stepForward * 0.2,
    stepLift * 0.5
  );
  const knee = hip.clone().add(dir1.multiplyScalar(1.55 - index * 0.06));

  const footAngleRad = THREE.MathUtils.degToRad(hipAngleDeg * 0.3 - 30);
  const dir2 = new THREE.Vector3(
    side * Math.cos(footAngleRad),
    Math.sin(footAngleRad) + stepForward * 0.4,
    -0.2 + stepLift * 0.2
  );
  const foot = knee.clone().add(dir2.multiplyScalar(1.25 - index * 0.05));

  return new THREE.CatmullRomCurve3([hip, knee, foot], false, "catmullrom", 0.3);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. 3D WALKING SPIDER CHARACTER COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function WalkingSpiderModel({
  crawlProgress,
  isWalking,
}: {
  crawlProgress: number;
  isWalking: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const legMeshesRef = useRef<THREE.Mesh[]>([]);

  const outlineMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: outlineVertex,
        fragmentShader: outlineFragment,
        uniforms: {
          uOffset: { value: 0.06 },
          uColor: { value: new THREE.Color(0x2f57ad) },
          uOpacity: { value: 1.0 },
        },
        side: THREE.BackSide,
      }),
    []
  );

  const glowMat1 = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: outlineVertex,
        fragmentShader: outlineFragment,
        uniforms: {
          uOffset: { value: 0.12 },
          uColor: { value: new THREE.Color(0x3f7dff) },
          uOpacity: { value: 0.18 },
        },
        side: THREE.FrontSide,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  const bodyMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: bodyVertex,
        fragmentShader: bodyFragment,
        uniforms: {
          uBaseColor: { value: new THREE.Color(0x101d47) },
          uRimColor: { value: new THREE.Color(0x2f6fff) },
          uSheenColor: { value: new THREE.Color(0xcfe4ff) },
          uTime: { value: 0 },
        },
      }),
    []
  );

  // Cephalothorax and Abdomen Geometries
  const cephalothoraxGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.72, 24, 20);
    geo.scale(1.0, 0.78, 0.82);
    geo.translate(0.4, 0, 0.1);
    return geo;
  }, []);

  const abdomenGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.85, 24, 20);
    geo.scale(1.45, 1.05, 1.05);
    geo.translate(-0.85, 0, 0.05);
    return geo;
  }, []);

  // 8 Leg Hip Angles
  const hipAngles = useMemo(() => [65, 30, -10, -48], []);

  // Pulse along legs
  const pulseMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xeaf3ff,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  const pulseMeshesRef = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    bodyMat.uniforms.uTime.value = t;

    // ── Spider Walk Left to Right Position ────────────────────────────────
    // Crawls from x: -5.0 across to x: 2.2 during entrance, then stays anchored in right quadrant
    const entranceX = -5.0 + crawlProgress * 7.2;
    const targetX = entranceX;
    const targetY = 0.3 + Math.sin(t * 1.5) * 0.08;

    groupRef.current.position.x = targetX;
    groupRef.current.position.y = targetY;
    groupRef.current.position.z = -0.4;

    // Spider body tilt and crawling sway
    const crawlSway = isWalking ? Math.sin(crawlProgress * 28.0) * 0.12 : Math.sin(t * 1.2) * 0.04;
    groupRef.current.rotation.z = Math.PI * 0.5 + crawlSway;
    groupRef.current.rotation.x = isWalking ? 0.15 : -pointerUv.y * 0.15;
    groupRef.current.rotation.y = isWalking ? 0.1 : (pointerUv.x - 0.5) * 0.25;

    // ── Dynamic 8-Leg Step Regeneration ──────────────────────────────────
    let legMeshIndex = 0;
    const crawlStepSpeed = crawlProgress * 32.0;

    [-1, 1].forEach((side, sideIdx) => {
      hipAngles.forEach((angle, index) => {
        // Alternating gait between left & right sides and diagonal pairs
        const phaseOffset = (sideIdx * Math.PI + index * (Math.PI * 0.5)) % (Math.PI * 2);
        const stepPhase = isWalking ? crawlStepSpeed + phaseOffset : t * 2.0 + phaseOffset;

        const curve = buildAnimatedLegCurve(side, angle, index, stepPhase, isWalking);
        const radius = 0.13 - index * 0.01;
        const newGeo = new THREE.TubeGeometry(curve, 20, radius, 8, false);

        const mesh = legMeshesRef.current[legMeshIndex];
        if (mesh) {
          mesh.geometry.dispose();
          mesh.geometry = newGeo;
        }
        legMeshIndex++;
      });
    });
  });

  return (
    <group ref={groupRef} scale={0.42}>
      {/* Cephalothorax */}
      <mesh geometry={cephalothoraxGeo} material={outlineMat} />
      <mesh geometry={cephalothoraxGeo} material={glowMat1} />
      <mesh geometry={cephalothoraxGeo} material={bodyMat} />

      {/* Abdomen */}
      <mesh geometry={abdomenGeo} material={outlineMat} />
      <mesh geometry={abdomenGeo} material={glowMat1} />
      <mesh geometry={abdomenGeo} material={bodyMat} />

      {/* 8 Legs Container */}
      {Array.from({ length: 8 }).map((_, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            if (el) legMeshesRef.current[idx] = el;
          }}
          material={bodyMat}
        />
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. 3D REFRACTIVE OPTICAL GLASS WAVE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function HelloModelInteractive({ waveProgress }: { waveProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const fbo = useFBO();
  const { size, gl, scene, camera } = useThree();
  const currentAngle = useRef(Math.atan2(9, 4) + Math.PI);

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

    if (scrollY > windowH * 1.7) {
      if (meshRef.current.visible) {
        meshRef.current.visible = false;
      }
      return;
    }

    meshRef.current.visible = true;

    const scrollProgress = THREE.MathUtils.clamp(scrollY / windowH, 0, 1);
    const fadeOutProgress = THREE.MathUtils.clamp(
      (scrollY - windowH * 1.0) / (windowH * 0.6),
      0,
      1
    );

    // Initial entrance push + dynamic scroll scale & depth push
    const baseZ = -0.8 * (1.0 - waveProgress);
    const entranceScale = 0.88 + 0.12 * waveProgress;

    meshRef.current.position.y = -0.2 + scrollProgress * 1.5 - fadeOutProgress * 2.5;
    meshRef.current.position.z = baseZ - scrollProgress * 3.5 - fadeOutProgress * 6.0;
    meshRef.current.rotation.x = (1.0 - waveProgress) * 0.15 + scrollProgress * 0.4;
    meshRef.current.rotation.y = (1.0 - waveProgress) * 0.1;

    const scale = Math.max(0.001, entranceScale * (1.0 - fadeOutProgress * 0.95) * waveProgress);
    meshRef.current.scale.set(scale, scale, scale);

    // Two-pass FBO scene render
    meshRef.current.visible = false;
    gl.setRenderTarget(fbo);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    meshRef.current.visible = true;

    // Specular highlight rim sweep choreography
    let targetAngle = 1.15;
    if (pointerState.inside) {
      targetAngle = Math.atan2(pointerUv.y - 0.5, pointerUv.x - 0.5);
    } else if (waveProgress < 1.0) {
      targetAngle = 1.15 + (1.0 - waveProgress) * Math.PI;
    }

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
    uniforms.uDispersion.value = 0.02 + 0.025 * waveProgress;
  });

  return (
    <mesh ref={meshRef} position={[0, -0.2, 0]}>
      <tubeGeometry args={[curve, 260, 0.28, 32, false]} />
      <shaderMaterial
        args={[GlassMaterialShader]}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. MASTER HERO SCENE ORCHESTRATION (Spider Crawls L-to-R -> Wave Weaves In)
// ─────────────────────────────────────────────────────────────────────────────
function HeroSceneOrchestrator() {
  const mountTime = useRef<number | null>(null);
  const [timeline, setTimeline] = React.useState({
    crawlProgress: 0,
    waveProgress: 0,
    isWalking: true,
  });

  useFrame((state) => {
    if (mountTime.current === null) {
      mountTime.current = state.clock.getElapsedTime();
    }
    const elapsed = state.clock.getElapsedTime() - mountTime.current;

    // ── Phase 1 (0.0s – 1.4s): Spider walks across from left to right ───
    const crawlRaw = Math.min(1.0, elapsed / 1.4);
    const crawlEase = 1.0 - Math.pow(1.0 - crawlRaw, 2.5);

    // ── Phase 2 (0.6s – 1.8s): 3D Wave weaves in smoothly ────────────────
    const waveRaw = Math.max(0.0, Math.min(1.0, (elapsed - 0.5) / 1.2));
    const waveEase = 1.0 - Math.pow(1.0 - waveRaw, 3.0);

    setTimeline({
      crawlProgress: crawlEase,
      waveProgress: waveEase,
      isWalking: crawlRaw < 1.0,
    });
  });

  return (
    <>
      <WalkingSpiderModel
        crawlProgress={timeline.crawlProgress}
        isWalking={timeline.isWalking}
      />
      <HelloModelInteractive waveProgress={timeline.waveProgress} />
    </>
  );
}

export default function HeroAboutScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = subscribeScroll((snap) => {
      if (!containerRef.current) return;
      const windowH = typeof window !== "undefined" ? window.innerHeight : 900;
      if (snap.scrollTop > windowH * 1.7) {
        containerRef.current.style.opacity = "0";
        containerRef.current.style.visibility = "hidden";
      } else if (snap.scrollTop > windowH * 1.0) {
        const opacity = 1.0 - (snap.scrollTop - windowH * 1.0) / (windowH * 0.7);
        containerRef.current.style.opacity = Math.max(0, Math.min(1, opacity)).toString();
        containerRef.current.style.visibility = "visible";
      } else {
        containerRef.current.style.opacity = "1";
        containerRef.current.style.visibility = "visible";
      }
    });

    return unsub;
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 4.8], fov: 42 }}
      >
        <ambientLight intensity={0.65} />
        <HeroSceneOrchestrator />
      </Canvas>
    </div>
  );
}
