import * as THREE from "three";

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * GLASS MATERIAL SHADER (components/canvas/GlassMaterial.ts)
 * ──────────────────────────────────────────────────────────────────────────────
 * Luminous Spider-Man Crystal Glass Shader:
 * - Crystal clear refraction with zero dark/black muddy shadows.
 * - Luminous royal/electric Spidey blue body with glowing Crimson Red (#ED3C3F) Fresnel rims.
 * - Dynamic laser specular sweep and chromatic dispersion.
 * ══════════════════════════════════════════════════════════════════════════════
 */

export const GlassMaterialShader = {
  uniforms: {
    tScene: { value: null as THREE.Texture | null },
    uResolution: { value: new THREE.Vector2() },
    uLightPos: { value: new THREE.Vector2(4.0, 9.0) },
    uTintColor: { value: new THREE.Color("#ED3C3F") },
    uSecondaryColor: { value: new THREE.Color("#3B82F6") },
    uDark: { value: 0.0 },
    uThickness: { value: 1.0 },
    uDispersion: { value: 0.04 },
    uFresnelPower: { value: 2.2 },
    uRimIntensity: { value: 2.6 },
    uTime: { value: 0.0 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec4 vScreenPos;
    varying vec2 vUv;

    void main() {
      vUv = uv;
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
    uniform vec3 uSecondaryColor;
    uniform float uDispersion;
    uniform float uFresnelPower;
    uniform float uRimIntensity;
    uniform float uTime;

    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec4 vScreenPos;
    varying vec2 vUv;

    void main() {
      vec2 screenUv = (vScreenPos.xy / vScreenPos.w) * 0.5 + 0.5;
      vec3 viewDir = normalize(vViewPosition);
      vec3 normal = normalize(vNormal);

      // Fresnel Reflection Factor
      float NdotV = max(dot(viewDir, normal), 0.0);
      float fresnel = pow(1.0 - NdotV, uFresnelPower);

      // Multi-wavelength chromatic dispersion refraction
      vec2 offset = normal.xy * uDispersion;
      float r = texture2D(tScene, screenUv + offset * 1.2).r;
      float g = texture2D(tScene, screenUv + offset * 1.0).g;
      float b = texture2D(tScene, screenUv + offset * 0.8).b;
      vec3 refColor = vec3(r, g, b);

      // Luminous Crystal Body: Vibrant Electric Blue + Ambient Translucency (No dark/black shadow)
      vec3 crystalBase = mix(vec3(0.12, 0.28, 0.75), uSecondaryColor, 0.65);
      
      // Spider-Man Crimson Fresnel Edge
      vec3 edgeColor = uTintColor; // #ED3C3F

      // Radiant blend preserving high brightness
      vec3 glassColor = refColor * 0.65 + crystalBase * 0.55;
      glassColor = mix(glassColor, edgeColor, fresnel * 0.85);

      // Laser Rim Specular Tracking
      float lightDist = length(gl_FragCoord.xy - uLightPos);
      float rim = smoothstep(360.0, 0.0, lightDist) * fresnel * uRimIntensity;

      // Specular Core Highlight
      vec3 lightDir = normalize(vec3(uLightPos - gl_FragCoord.xy, 140.0));
      vec3 halfVector = normalize(lightDir + viewDir);
      float spec = pow(max(dot(normal, halfVector), 0.0), 32.0) * 0.95;
      float broadSpec = pow(max(dot(normal, halfVector), 0.0), 8.0) * 0.3;

      // Combine with vibrant highlights and silver gleam
      vec3 finalColor = glassColor + vec3(rim * 1.2, rim * 0.4, rim * 0.45) + vec3(spec + broadSpec);

      gl_FragColor = vec4(finalColor, 0.95);
    }
  `,
};
