import * as THREE from "three";

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * STAR 6 OPTICAL FLARE POST-PROCESSING SHADER (StarFlareShader.ts)
 * ──────────────────────────────────────────────────────────────────────────────
 * Simulates an optical 6-point star filter from classic cinematography footage:
 * 1. Luminance threshold isolation of bright specular highlights.
 * 2. Multi-axial directional blur along 3 axes: 0 deg (vertical), +30 deg, -30 deg.
 * 3. Chromatic trail attenuation and compositing over base scene.
 * ══════════════════════════════════════════════════════════════════════════════
 */

export const Star6FlareShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uResolution: { value: new THREE.Vector2() },
    uThreshold: { value: 0.78 },
    uStreakScale: { value: 2.2 },
    uFlareIntensity: { value: 0.95 },
    uAberration: { value: 1.05 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uThreshold;
    uniform float uStreakScale;
    uniform float uFlareIntensity;
    uniform float uAberration;
    varying vec2 vUv;

    // Rec. 709 Luminance weights
    float luma(vec3 color) {
      return dot(color, vec3(0.2126, 0.7152, 0.0722));
    }

    // Isolate specular highlights above threshold
    float brightMask(float luminance) {
      float value = max(luminance - uThreshold, 0.0);
      value /= max(1.0 - uThreshold, 1e-5);
      return smoothstep(0.0, 1.0, clamp(value, 0.0, 1.0));
    }

    vec3 sampleBright(vec2 uv) {
      vec3 color = texture2D(tDiffuse, clamp(uv, 0.0, 1.0)).rgb;
      return color * brightMask(luma(color));
    }

    // Directional multi-tap streak sampler with gaussian decay
    vec3 streak(vec2 direction) {
      vec3 result = vec3(0.0);
      for (int i = 1; i <= 8; i++) {
        float distancePx = float(i) * 1.6;
        float weight = 1.0 / (1.0 + distancePx * 0.20);
        weight *= weight;

        vec2 offset = direction * distancePx;

        // Sample with chromatic aberration on rays
        vec3 colA = sampleBright(vUv + offset * uAberration);
        vec3 colB = sampleBright(vUv - offset * uAberration);

        result += (colA + colB) * weight;
      }
      return result;
    }

    void main() {
      vec3 base = texture2D(tDiffuse, vUv).rgb;
      float baseLuma = luma(base);
      vec3 coreFlare = base * brightMask(baseLuma) * 1.35;

      vec2 px = (1.0 / max(uResolution, vec2(1.0))) * uStreakScale;

      // 3 Axes produce 6 optical starburst rays
      vec3 rays = vec3(0.0);
      rays += streak(vec2(0.0, px.y));                               // Axis 1: 0 deg
      rays += streak(vec2(px.x * 0.8660254, px.y * 0.5));           // Axis 2: +30 deg
      rays += streak(vec2(px.x * 0.8660254, -px.y * 0.5));          // Axis 3: -30 deg

      vec3 totalFlare = (coreFlare + rays) * uFlareIntensity;
      gl_FragColor = vec4(base + totalFlare, 1.0);
    }
  `,
};
