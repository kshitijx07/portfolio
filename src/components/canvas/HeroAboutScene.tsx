"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getScrollSnapshot, pointerUv, pointerState, subscribeScroll } from "@/lib/bus";

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
  uniform float uOpacity;
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

    gl_FragColor = vec4(color, uOpacity);
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

  useFrame((state) => {
    if (!webGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    const snap = getScrollSnapshot();
    const scrollP = Math.min(1.0, snap.scrollTop / (snap.viewportHeight || 900));

    // Web sway linked to scroll velocity and mouse
    const targetRotX = (pointerUv.y - 0.5) * 0.12 - scrollP * 0.2;
    const targetRotY = (pointerUv.x - 0.5) * 0.18 + Math.sin(t * 0.5) * 0.04;

    webGroupRef.current.rotation.x = THREE.MathUtils.lerp(webGroupRef.current.rotation.x, targetRotX, 0.06);
    webGroupRef.current.rotation.y = THREE.MathUtils.lerp(webGroupRef.current.rotation.y, targetRotY, 0.06);
    webGroupRef.current.position.y = THREE.MathUtils.lerp(webGroupRef.current.position.y, scrollP * 1.5, 0.08);
  });

  return (
    <group ref={webGroupRef} position={[0, 0, -0.5]}>
      {layerGeometries.map(({ geo, cfg }, i) => (
        <lineSegments key={i} geometry={geo} position={[0, 0, cfg.z]}>
          <lineBasicMaterial
            color={cfg.color}
            transparent
            opacity={cfg.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      ))}

      <points geometry={dewGeometry}>
        <pointsMaterial
          color={0xed3c3f}
          size={0.07}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. MATHEMATICAL PENDULUM WEB-SWING & 3D SKYLINE ENGINE
// ─────────────────────────────────────────────────────────────────────────────
function PendulumWebSwingRig() {
  const { camera } = useThree();
  const webMeshRef = useRef<THREE.Mesh>(null!);
  const cityGroupRef = useRef<THREE.Group>(null!);

  const L = 12.0; // Web line length
  const theta0 = Math.PI / 3.2; // Release angle (60 degrees)

  // Skyscraper backdrop boxes
  const buildingBoxes = useMemo(() => {
    const boxes: { pos: [number, number, number]; size: [number, number, number]; color: number }[] = [];
    for (let i = 0; i < 36; i++) {
      const x = ((i % 6) - 2.5) * 14 + (Math.sin(i * 3.7) * 4);
      const y = -14 + (Math.sin(i * 1.3) * 6);
      const z = -25 - (i * 2.2);
      const w = 4 + (Math.sin(i * 2.1) + 1) * 2;
      const h = 26 + (Math.cos(i * 1.7) + 1) * 12;
      const d = 4 + (Math.sin(i * 0.9) + 1) * 2;
      const color = i % 3 === 0 ? 0x00104a : i % 2 === 0 ? 0x121626 : 0x1a2238;
      boxes.push({ pos: [x, y, z], size: [w, h, d], color });
    }
    return boxes;
  }, []);

  // Procedural dynamic elastic web strand
  const webCurve = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 16, -12), // Sky anchor high on a skyscraper
      new THREE.Vector3(0, 6, -6),   // Dynamic sag control point
      new THREE.Vector3(0, 0, 0)     // Shooter attachment point
    );
  }, []);

  useFrame((state) => {
    const snap = getScrollSnapshot();
    const vh = snap.viewportHeight || 900;
    // Scroll progress p mapped across Hero to About transition (0.0 to 1.0)
    const p = Math.max(0, Math.min(1.0, snap.scrollTop / (vh * 1.3)));

    // 1. Angular displacement: θ(p) = θ₀ * cos(π * p)
    const theta = theta0 * Math.cos(Math.PI * p);

    // 2. Parametric pendulum camera coordinates:
    //    x(p) = L * sin(θ(p)), y(p) = -L * cos(θ(p)) + y0, z(p) = z_start - Δz * p
    const targetCamX = L * Math.sin(theta) * 0.45 + (pointerUv.x - 0.5) * 0.8;
    const targetCamY = -L * Math.cos(theta) * 0.35 + 3.8 + (pointerUv.y - 0.5) * 0.5;
    const targetCamZ = 5.0 - p * 8.0;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.08);

    // Dynamic banking roll: camera.rotation.z = -theta * 0.4
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, -theta * 0.28, 0.08);

    // 3. Elastic Web Tube Update
    if (webMeshRef.current) {
      const tensionSag = (Math.sin(p * Math.PI) + 0.1) * 3.5;
      webCurve.v1.set(targetCamX * 0.4, 8.0 - tensionSag, -8.0);
      webCurve.v2.set(targetCamX + 0.4, targetCamY - 0.3, targetCamZ - 1.2);

      webMeshRef.current.geometry.dispose();
      webMeshRef.current.geometry = new THREE.TubeGeometry(webCurve, 24, 0.025, 6, false);
    }

    // 4. Skyline Parallax & Vertical Wave
    if (cityGroupRef.current) {
      cityGroupRef.current.children.forEach((mesh, idx) => {
        mesh.position.y += Math.sin(p * Math.PI) * (idx % 3 === 0 ? 0.04 : 0.015);
      });
    }
  });

  return (
    <>
      {/* Dynamic 3D City Skyline Parallax */}
      <group ref={cityGroupRef}>
        {buildingBoxes.map((b, i) => (
          <mesh key={i} position={b.pos}>
            <boxGeometry args={b.size} />
            <meshStandardMaterial
              color={b.color}
              roughness={0.3}
              metalness={0.2}
              wireframe={i % 4 === 0}
            />
          </mesh>
        ))}
      </group>

      {/* Dynamic Elastic Web Tube */}
      <mesh ref={webMeshRef}>
        <tubeGeometry args={[webCurve, 24, 0.025, 6, false]} />
        <meshBasicMaterial
          color={0xedeae2}
          wireframe
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. 3D PROCEDURAL WALKING & SWINGING SPIDER MODEL
// ─────────────────────────────────────────────────────────────────────────────
interface WalkingSpiderModelProps {
  crawlProgress: number;
  isWalking: boolean;
}

function buildAnimatedLegCurve(
  side: number,
  hipAngle: number,
  index: number,
  stepPhase: number,
  isWalking: boolean
) {
  const hipX = side * (0.28 + index * 0.03);
  const hipY = 0.35 - index * 0.28;
  const hipZ = 0.0;

  const kneeReach = 0.85 + index * 0.05;
  const kneeSpread = hipAngle + (side === 1 ? 0.25 : -0.25);
  const lift = isWalking ? Math.max(0, Math.sin(stepPhase)) * 0.35 : Math.sin(stepPhase) * 0.08;
  const swing = isWalking ? Math.cos(stepPhase) * 0.4 : 0;

  const kneeX = hipX + Math.sin(kneeSpread) * kneeReach * side;
  const kneeY = hipY + Math.cos(kneeSpread) * kneeReach * 0.8 + swing * 0.3;
  const kneeZ = 0.35 + lift;

  const footX = kneeX + side * (0.45 + index * 0.06);
  const footY = kneeY + Math.cos(kneeSpread) * 0.5 + swing * 0.5;
  const footZ = -0.15;

  const hip = new THREE.Vector3(hipX, hipY, hipZ);
  const knee = new THREE.Vector3(kneeX, kneeY, kneeZ);
  const foot = new THREE.Vector3(footX, footY, footZ);

  return new THREE.CatmullRomCurve3([hip, knee, foot]);
}

function WalkingSpiderModel({ crawlProgress, isWalking }: WalkingSpiderModelProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const legMeshesRef = useRef<THREE.Mesh[]>([]);

  const cephalothoraxGeo = useMemo(() => new THREE.SphereGeometry(0.32, 24, 24), []);
  const abdomenGeo = useMemo(() => new THREE.SphereGeometry(0.52, 24, 24), []);

  const bodyMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: bodyVertex,
      fragmentShader: bodyFragment,
      uniforms: {
        uBaseColor: { value: new THREE.Color(0x0a1638) },
        uRimColor: { value: new THREE.Color(0x3b82f6) },
        uSheenColor: { value: new THREE.Color(0xed3c3f) },
        uOpacity: { value: 1.0 },
        uTime: { value: 0 },
      },
      transparent: true,
    });
  }, []);

  const outlineMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: outlineVertex,
      fragmentShader: outlineFragment,
      uniforms: {
        uOffset: { value: 0.04 },
        uColor: { value: new THREE.Color(0x3b82f6) },
        uOpacity: { value: 0.5 },
      },
      side: THREE.BackSide,
      transparent: true,
    });
  }, []);

  const hipAngles = [0.45, 0.15, -0.15, -0.45];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    bodyMat.uniforms.uTime.value = t;

    const snap = getScrollSnapshot();
    const windowH = snap.viewportHeight || 900;
    const exitProgress = Math.max(0, Math.min(1.0, (snap.scrollTop - windowH * 0.65) / (windowH * 0.65)));

    // Walking entrance from left (x: -5.2) to hero focal point (x: 2.2)
    const enterX = THREE.MathUtils.lerp(-5.2, 2.2, crawlProgress);
    const enterY = THREE.MathUtils.lerp(-1.8, 0.4, crawlProgress);
    const enterZ = THREE.MathUtils.lerp(-1.0, 1.2, crawlProgress);

    // Scroll exit: Spider climbs upward and swings forward into depth
    const currentX = enterX + exitProgress * 0.8;
    const currentY = enterY + exitProgress * 4.2;
    const currentZ = enterZ - exitProgress * 4.5;

    groupRef.current.position.set(currentX, currentY, currentZ);

    const opacity = 1.0 - exitProgress;
    bodyMat.uniforms.uOpacity.value = opacity;
    outlineMat.uniforms.uOpacity.value = opacity;

    const crawlSway = isWalking ? Math.sin(crawlProgress * 28.0) * 0.12 : Math.sin(t * 1.2) * 0.04;
    groupRef.current.rotation.z = Math.PI * 0.5 + crawlSway + exitProgress * 0.4;
    groupRef.current.rotation.x = isWalking ? 0.15 : -pointerUv.y * 0.15;
    groupRef.current.rotation.y = isWalking ? 0.1 : (pointerUv.x - 0.5) * 0.25;

    let legMeshIndex = 0;
    const crawlStepSpeed = crawlProgress * 32.0 + exitProgress * 15.0;
    const activeWalk = isWalking || exitProgress > 0.05;

    [-1, 1].forEach((side, sideIdx) => {
      hipAngles.forEach((angle, index) => {
        const phaseOffset = (sideIdx * Math.PI + index * (Math.PI * 0.5)) % (Math.PI * 2);
        const stepPhase = activeWalk ? crawlStepSpeed + phaseOffset : t * 2.0 + phaseOffset;

        const curve = buildAnimatedLegCurve(side, angle, index, stepPhase, activeWalk);
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
      <mesh geometry={cephalothoraxGeo} material={bodyMat} />

      <mesh geometry={abdomenGeo} position={[0, -0.7, 0]} material={outlineMat} />
      <mesh geometry={abdomenGeo} position={[0, -0.7, 0]} material={bodyMat} />

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
// 6. MASTER HERO SCENE ORCHESTRATOR
// ─────────────────────────────────────────────────────────────────────────────
function HeroSceneOrchestrator() {
  const mountTime = useRef<number | null>(null);
  const [crawlProgress, setCrawlProgress] = React.useState(0);
  const [isWalking, setIsWalking] = React.useState(true);

  useFrame((state) => {
    if (mountTime.current === null) {
      mountTime.current = state.clock.getElapsedTime();
    }
    const elapsed = state.clock.getElapsedTime() - mountTime.current;

    // Spider crawls across from left to right (0.0s to 1.4s)
    const crawlRaw = Math.min(1.0, elapsed / 1.4);
    const crawlEase = 1.0 - Math.pow(1.0 - crawlRaw, 2.5);

    setCrawlProgress(crawlEase);
    setIsWalking(crawlRaw < 1.0);
  });

  return (
    <>
      <LayeredSpiderWebBackground />
      <PendulumWebSwingRig />
      <WalkingSpiderModel
        crawlProgress={crawlProgress}
        isWalking={isWalking}
      />
    </>
  );
}

export default function HeroAboutScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = subscribeScroll((snap) => {
      if (!containerRef.current) return;
      const windowH = typeof window !== "undefined" ? window.innerHeight : 900;
      if (snap.scrollTop > windowH * 1.6) {
        containerRef.current.style.opacity = "0";
        containerRef.current.style.visibility = "hidden";
      } else if (snap.scrollTop > windowH * 0.9) {
        const opacity = 1.0 - (snap.scrollTop - windowH * 0.9) / (windowH * 0.7);
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
        camera={{ position: [0, 3.8, 5.0], fov: 45 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 15]} intensity={1.2} color={0xed3c3f} />
        <directionalLight position={[-10, -10, -10]} intensity={0.8} color={0x3b82f6} />
        <HeroSceneOrchestrator />
      </Canvas>
    </div>
  );
}
