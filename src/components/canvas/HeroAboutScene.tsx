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
// 2. PROCEDURAL 3D SPIDER-WEB GENERATOR (Catenary Sagging Rings)
// ─────────────────────────────────────────────────────────────────────────────
interface WebLayerConfig {
  radius: number;
  spokes: number;
  rings: number;
  sag: number;
  z: number;
  opacity: number;
  color: number;
}

function buildWebGeometry(cfg: WebLayerConfig) {
  const { radius, spokes, rings, sag: sagAmount } = cfg;
  const spokePoints: THREE.Vector3[][] = [];
  const segments: THREE.Vector3[] = [];

  for (let i = 0; i < spokes; i++) {
    const angle = (i / spokes) * Math.PI * 2;
    const dir = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
    const pts: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0)];

    for (let r = 1; r <= rings; r++) {
      const t = r / rings;
      const rr = t * radius;
      const z = Math.sin(angle * 2.0 + r) * 0.06 * t;
      pts.push(new THREE.Vector3(dir.x * rr, dir.y * rr, z));
    }
    spokePoints.push(pts);

    for (let r = 0; r < pts.length - 1; r++) {
      segments.push(pts[r], pts[r + 1]);
    }
  }

  for (let r = 1; r <= rings; r++) {
    const sag = (1 - r / rings) * sagAmount;
    for (let i = 0; i < spokes; i++) {
      const a = spokePoints[i][r];
      const b = spokePoints[(i + 1) % spokes][r];
      const mid = a.clone().lerp(b, 0.5);
      mid.z -= sag;
      segments.push(a, mid, mid, b);
    }
  }

  return { segments, spokePoints };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. LAYERED 3D SPIDER-WEB WITH KINETIC SPIDEY-SENSE PULSES
// ─────────────────────────────────────────────────────────────────────────────
function LayeredSpiderWebBackground() {
  const webGroupRef = useRef<THREE.Group>(null!);
  const pulseMeshesRef = useRef<THREE.Mesh[]>([]);

  const layerConfigs: WebLayerConfig[] = useMemo(
    () => [
      { radius: 5.4, spokes: 14, rings: 7, sag: 0.22, z: -2.2, opacity: 0.18, color: 0xedeae2 },
      { radius: 3.8, spokes: 12, rings: 6, sag: 0.16, z: -0.8, opacity: 0.35, color: 0xed3c3f },
      { radius: 2.4, spokes: 10, rings: 5, sag: 0.11, z: 1.0, opacity: 0.65, color: 0xedeae2 },
    ],
    []
  );

  const { layerGeometries, frontLayerData } = useMemo(() => {
    const geometries = layerConfigs.map((cfg) => {
      const { segments, spokePoints } = buildWebGeometry(cfg);
      const geo = new THREE.BufferGeometry().setFromPoints(segments);
      return { geo, spokePoints, cfg };
    });
    return {
      layerGeometries: geometries,
      frontLayerData: geometries[geometries.length - 1],
    };
  }, [layerConfigs]);

  // Dew drops on outer front ring
  const dewGeometry = useMemo(() => {
    const dewPositions: number[] = [];
    const frontZ = frontLayerData.cfg.z;
    frontLayerData.spokePoints.forEach((pts) => {
      const p = pts[pts.length - 1];
      dewPositions.push(p.x, p.y, p.z + frontZ);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(dewPositions, 3));
    return geo;
  }, [frontLayerData]);

  // Pulse State
  const pulses = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      active: false,
      t: 0,
      spokeIndex: 0,
      speed: 1.4 + (i % 3) * 0.3,
    }));
  }, []);

  const pulseCooldown = useRef(0);
  const prevPointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!webGroupRef.current) return;
    const t = state.clock.getElapsedTime();

    pulseCooldown.current -= delta;

    const px = pointerUv?.x ?? 0;
    const py = pointerUv?.y ?? 0;

    // Detect movement to launch Spidey-Sense pulse
    const moveDelta = Math.hypot(px - prevPointer.current.x, py - prevPointer.current.y);
    if (moveDelta > 0.008 && pulseCooldown.current <= 0) {
      const angle = Math.atan2(-py, px);
      const spokeCount = frontLayerData.cfg.spokes;
      const idx =
        Math.round((((angle + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2)) * spokeCount) %
        spokeCount;

      const availablePulse = pulses.find((p) => !p.active);
      if (availablePulse) {
        availablePulse.active = true;
        availablePulse.t = 0;
        availablePulse.spokeIndex = idx;
      }
      pulseCooldown.current = 0.32;
    }
    prevPointer.current = { x: px, y: py };

    // Parallax rotation of the web
    webGroupRef.current.rotation.y += (px * 0.25 - webGroupRef.current.rotation.y) * Math.min(1, delta * 3.5);
    webGroupRef.current.rotation.x += (-py * 0.18 - webGroupRef.current.rotation.x) * Math.min(1, delta * 3.5);

    // Update pulses along spokes
    const spokePoints = frontLayerData.spokePoints;
    const frontZ = frontLayerData.cfg.z;

    pulses.forEach((p, idx) => {
      const mesh = pulseMeshesRef.current[idx];
      if (!mesh) return;

      if (!p.active) {
        mesh.visible = false;
        return;
      }

      mesh.visible = true;
      p.t += delta * p.speed;

      const pts = spokePoints[p.spokeIndex];
      const travel = Math.min(p.t, 1);
      const segCount = pts.length - 1;
      const segF = travel * segCount;
      const segI = Math.min(Math.floor(segF), segCount - 1);
      const localT = segF - segI;
      const a = pts[segI];
      const b = pts[segI + 1];
      const pos = a.clone().lerp(b, localT);

      mesh.position.set(pos.x, pos.y, pos.z + frontZ);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = travel < 0.08 ? travel / 0.08 : (1 - travel) * 0.92;

      if (p.t >= 1) {
        p.active = false;
        mesh.visible = false;
      }
    });
  });

  return (
    <group ref={webGroupRef}>
      {layerGeometries.map((layer, idx) => (
        <lineSegments key={idx} geometry={layer.geo} position={[0, 0, layer.cfg.z]}>
          <lineBasicMaterial
            color={layer.cfg.color}
            transparent
            opacity={layer.cfg.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      ))}

      {/* Dew drop nodes */}
      <points geometry={dewGeometry}>
        <pointsMaterial
          color={0xed3c3f}
          size={0.055}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Spidey-Sense Pulses */}
      {pulses.map((_, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            if (el) pulseMeshesRef.current[idx] = el;
          }}
          visible={false}
        >
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial
            color={0xed3c3f}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. PROCEDURAL 8-LEG KINEMATIC STEPPING & CRAWLING
// ─────────────────────────────────────────────────────────────────────────────
function buildAnimatedLegCurve(
  side: number,
  hipAngleDeg: number,
  index: number,
  stepPhase: number,
  isWalking: boolean
) {
  const hipRad = THREE.MathUtils.degToRad(hipAngleDeg);

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
// 5. 3D WALKING SPIDER CHARACTER COMPONENT
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

  const hipAngles = useMemo(() => [65, 30, -10, -48], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    bodyMat.uniforms.uTime.value = t;

    // Crawls across from x: -5.0 to x: 2.2 during entrance
    const entranceX = -5.0 + crawlProgress * 7.2;
    const targetX = entranceX;
    const targetY = 0.3 + Math.sin(t * 1.5) * 0.08;

    groupRef.current.position.x = targetX;
    groupRef.current.position.y = targetY;
    groupRef.current.position.z = -0.3;

    const crawlSway = isWalking ? Math.sin(crawlProgress * 28.0) * 0.12 : Math.sin(t * 1.2) * 0.04;
    groupRef.current.rotation.z = Math.PI * 0.5 + crawlSway;
    groupRef.current.rotation.x = isWalking ? 0.15 : -pointerUv.y * 0.15;
    groupRef.current.rotation.y = isWalking ? 0.1 : (pointerUv.x - 0.5) * 0.25;

    let legMeshIndex = 0;
    const crawlStepSpeed = crawlProgress * 32.0;

    [-1, 1].forEach((side, sideIdx) => {
      hipAngles.forEach((angle, index) => {
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
      <mesh geometry={cephalothoraxGeo} material={outlineMat} />
      <mesh geometry={cephalothoraxGeo} material={glowMat1} />
      <mesh geometry={cephalothoraxGeo} material={bodyMat} />

      <mesh geometry={abdomenGeo} material={outlineMat} />
      <mesh geometry={abdomenGeo} material={glowMat1} />
      <mesh geometry={abdomenGeo} material={bodyMat} />

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
// 6. 3D REFRACTIVE OPTICAL GLASS WAVE COMPONENT
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
// 7. MASTER HERO SCENE ORCHESTRATOR
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

    // Spider crawls across from left to right (0.0s to 1.4s)
    const crawlRaw = Math.min(1.0, elapsed / 1.4);
    const crawlEase = 1.0 - Math.pow(1.0 - crawlRaw, 2.5);

    // Wave weaves in smoothly (0.5s to 1.8s)
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
      <LayeredSpiderWebBackground />
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
        camera={{ position: [0, 0, 5.0], fov: 42 }}
      >
        <ambientLight intensity={0.65} />
        <HeroSceneOrchestrator />
      </Canvas>
    </div>
  );
}
