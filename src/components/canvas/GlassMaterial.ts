import * as THREE from "three";

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * GLASS MATERIAL SHADER (components/canvas/GlassMaterial.ts)
 * ──────────────────────────────────────────────────────────────────────────────
 * Spider-Man Dual-Chromatic Optical Shader implementing:
 * 1. Two-pass FBO background texture sampling with chromatic RGB dispersion.
 * 2. Spidey Crimson (#ED3C3F) & Deep Spidey Blue (#00104A) dual-chroma refraction.
 * 3. Laser Rim Specular Follower with Spider-Sense gleam.
 * ══════════════════════════════════════════════════════════════════════════════
 */

export const GlassMaterialShader = {
  uniforms: {
    tScene: { value: null as THREE.Texture | null },
    uResolution: { value: new THREE.Vector2() },
    uLightPos: { value: new THREE.Vector2(4.0, 9.0) },
    uTintColor: { value: new THREE.Color("#ED3C3F") },
    uSecondaryColor: { value: new THREE.Color("#3B82F6") },
    uDark: { value: 1.0 },
    uThickness: { value: 1.8 },
    uDispersion: { value: 0.045 },
    uFresnelPower: { value: 2.8 },
    uRimIntensity: { value: 2.4 },
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
    uniform float uDark;
    uniform float uThickness;
    uniform float uDispersion;
    uniform float uFresnelPower;
    uniform float uRimIntensity;
    uniform float uTime;

    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec4 vScreenPos;
    varying vec2 vUv;

    // Hard Light blend for dark mode contrast preservation
    vec3 hardLight(vec3 base, vec3 blend) {
      vec3 low = 2.0 * base * blend;
      vec3 high = 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
      return mix(low, high, step(vec3(0.5), blend));
    }

    void main() {
      vec2 screenUv = (vScreenPos.xy / vScreenPos.w) * 0.5 + 0.5;
      vec3 viewDir = normalize(vViewPosition);
      vec3 normal = normalize(vNormal);

      // Fresnel Reflection Factor
      float NdotV = max(dot(viewDir, normal), 0.0);
      float fresnel = pow(1.0 - NdotV, uFresnelPower);

      // Multi-wavelength chromatic dispersion offset
      vec2 offset = normal.xy * uDispersion;
      float r = texture2D(tScene, screenUv + offset * 1.15).r;
      float g = texture2D(tScene, screenUv + offset * 1.00).g;
      float b = texture2D(tScene, screenUv + offset * 0.85).b;
      vec3 refColor = vec3(r, g, b);

      // Dual-chromatic Spider-Man color blend (Crimson Red + Electric Blue)
      vec3 spideyChroma = mix(uSecondaryColor, uTintColor, fresnel * 0.85 + 0.15);

      // Beer-Lambert Transmittance Absorption
      vec3 transmittance = pow(clamp(spideyChroma, 0.001, 1.0), vec3(max(uThickness, 0.01)));
      vec3 lightColor = mix(refColor, refColor * transmittance, 0.75);

      // Art-Directed Hard Light Blend
      vec3 darkColor = mix(refColor, hardLight(clamp(refColor, 0.0, 1.0), spideyChroma), 0.70);

      // Blend between light and dark models
      vec3 base = mix(lightColor, darkColor, clamp(uDark, 0.0, 1.0));

      // Rim Specular Highlight Tracking
      float lightDist = length(gl_FragCoord.xy - uLightPos);
      float rim = smoothstep(240.0, 0.0, lightDist) * fresnel * uRimIntensity;

      // Spider-Sense Specular Gleam
      vec3 lightDir = normalize(vec3(uLightPos - gl_FragCoord.xy, 100.0));
      vec3 halfVector = normalize(lightDir + viewDir);
      float spec = pow(max(dot(normal, halfVector), 0.0), 32.0) * 0.5;

      vec3 finalColor = base + vec3(rim * 1.1, rim * 0.3, rim * 0.35) + vec3(spec);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};
