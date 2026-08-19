"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getScrollSnapshot } from "@/lib/bus";

const DomSyncShader = {
  uniforms: {
    map: { value: null as THREE.Texture | null },
    mapHover: { value: null as THREE.Texture | null },
    uRect: { value: new THREE.Vector4(0, 0, 1, 1) }, // Normalized viewport x, y, width, height
    uHoverProgress: { value: 0.0 },
    uCurlStrength: { value: 0.0 },
    uResolution: { value: new THREE.Vector2() },
    uDotPixelSize: { value: 8.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D map;
    uniform sampler2D mapHover;
    uniform vec4 uRect;
    uniform float uHoverProgress;
    uniform float uCurlStrength;
    uniform vec2 uResolution;
    uniform float uDotPixelSize;

    varying vec2 vUv;

    // Apply horizontal velocity curl distortion
    vec2 applyCurl(vec2 screenUv) {
      float centeredY = 2.0 * screenUv.y - 1.0;
      float profile = 1.0 - sqrt(max(0.0, 1.0 - centeredY * centeredY));
      float uvScale = 1.0 - profile * uCurlStrength;
      float distortedX = (screenUv.x - 0.5) * uvScale + 0.5;
      return vec2(distortedX, screenUv.y);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / uResolution;
      screenUv = applyCurl(screenUv);

      // Map fullscreen screen UV into DOM card-local coordinates
      vec2 localUv = (screenUv - uRect.xy) / uRect.zw;

      // Card bounding bounds check
      if (localUv.x < 0.0 || localUv.x > 1.0 || localUv.y < 0.0 || localUv.y > 1.0) {
        discard;
      }

      // Step 2: Divide screen space into dot-matrix cells
      vec2 cellSizeUv = vec2(max(2.0, uDotPixelSize)) / uResolution;
      vec2 cellUv = fract(screenUv / cellSizeUv);
      float squareDist = max(abs(cellUv.x - 0.5), abs(cellUv.y - 0.5));

      // Step 3: Expand from center
      float rectAspect = (uRect.z * uResolution.x) / max(uRect.w * uResolution.y, 1.0);
      vec2 centered = localUv * 2.0 - 1.0;
      centered.x *= rectAspect;
      float distToCenter = length(centered);
      float maxRadius = length(vec2(rectAspect, 1.0));

      float radius = uHoverProgress * (maxRadius + 0.12);
      float grow = 1.0 - smoothstep(radius - 0.12, radius + 0.12, distToCenter);
      grow *= step(0.0001, uHoverProgress);

      float squareExtent = mix(0.0, 0.5, grow);
      float squareAa = max(fwidth(squareDist), 0.0001);
      float squareMask = 1.0 - smoothstep(squareExtent - squareAa, squareExtent + squareAa, squareDist);

      vec4 baseColor = texture2D(map, localUv);
      vec4 hoverColor = texture2D(mapHover, localUv);

      gl_FragColor = mix(baseColor, hoverColor, squareMask);
    }
  `,
};

export default function DomSyncProjectGrid() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { size } = useThree();
  const activity = useRef(0);
  const previousScrollY = useRef<number | null>(null);

  const uniforms = useMemo(() => THREE.UniformsUtils.clone(DomSyncShader.uniforms), []);

  useFrame((_, delta) => {
    const scrollY = getScrollSnapshot().scrollTop;
    const dt = THREE.MathUtils.clamp(delta, 1 / 240, 0.1);
    
    // Calculate scroll velocity
    const velocity = previousScrollY.current == null ? 0 : Math.abs(scrollY - previousScrollY.current) / dt;
    previousScrollY.current = scrollY;

    // Asymmetric smoothing: fast attack (0.025) and slow release (0.175)
    const target = THREE.MathUtils.clamp(velocity / 800, 0, 1);
    const tau = target > activity.current ? 0.025 : 0.175;
    const alpha = 1 - Math.exp(-dt / tau);
    activity.current += (target - activity.current) * alpha;

    uniforms.uCurlStrength.value = 0.06 * activity.current;
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial args={[DomSyncShader]} uniforms={uniforms} transparent depthWrite={false} />
    </mesh>
  );
}
