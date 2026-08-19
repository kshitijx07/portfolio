import * as THREE from "three";

export const Star6FlareShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uResolution: { value: new THREE.Vector2(1920, 1080) },
    uThreshold: { value: 0.78 },
    uStreakScale: { value: 2.2 },
    uGlowIntensity: { value: 1.4 },
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
    uniform float uGlowIntensity;
    uniform float uAberration;

    varying vec2 vUv;

    // Rec. 709 Luminance
    float luma(vec3 color) {
      return dot(color, vec3(0.2126, 0.7152, 0.0722));
    }

    float brightMask(float luminance) {
      float val = max(luminance - uThreshold, 0.0);
      val /= max(1.0 - uThreshold, 1e-5);
      return smoothstep(0.0, 1.0, clamp(val, 0.0, 1.0));
    }

    vec3 sampleBright(vec2 uv) {
      vec3 col = texture2D(tDiffuse, clamp(uv, 0.0, 1.0)).rgb;
      return col * brightMask(luma(col));
    }

    vec3 streak(vec2 direction) {
      vec3 result = vec3(0.0);
      for (int i = 1; i <= 8; i++) {
        float distPx = float(i) * 1.6;
        float weight = 1.0 / (1.0 + distPx * 0.20);
        weight *= weight;
        vec2 offset = direction * distPx;

        vec3 colA = sampleBright(vUv + offset * uAberration);
        vec3 colB = sampleBright(vUv - offset * uAberration);
        result += (colA + colB) * weight;
      }
      return result;
    }

    void main() {
      vec3 base = texture2D(tDiffuse, vUv).rgb;
      float brightness = brightMask(luma(base));
      vec3 coreFlare = base * brightness * uGlowIntensity;

      vec2 px = (1.0 / max(uResolution, vec2(1.0))) * uStreakScale;

      // 3 Axes produce 6 distinct optical starburst rays
      vec3 rays = vec3(0.0);
      rays += streak(vec2(0.0, px.y));
      rays += streak(vec2(px.x * 0.8660254, px.y * 0.5));
      rays += streak(vec2(px.x * 0.8660254, -px.y * 0.5));

      vec3 totalFlare = (coreFlare + rays) * 0.85;
      gl_FragColor = vec4(base + totalFlare, 1.0);
    }
  `,
};
