import * as THREE from "three";

export const Star6FlareShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uResolution: { value: new THREE.Vector2() },
    uThreshold: { value: 0.8 },
    uStreakScale: { value: 2.0 },
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
    varying vec2 vUv;

    float luma(vec3 color) {
      return dot(color, vec3(0.2126, 0.7152, 0.0722));
    }

    float brightMask(float luminance) {
      float value = max(luminance - uThreshold, 0.0);
      value /= max(1.0 - uThreshold, 1e-5);
      return smoothstep(0.0, 1.0, clamp(value, 0.0, 1.0));
    }

    vec3 sampleBright(vec2 uv) {
      vec3 color = texture2D(tDiffuse, uv).rgb;
      return color * brightMask(luma(color));
    }

    vec3 streak(vec2 direction) {
      vec3 result = vec3(0.0);
      for (int i = 1; i <= 8; i++) {
        float distancePx = float(i) * 1.5;
        float weight = 1.0 / (1.0 + distancePx * 0.22);
        weight *= weight;
        vec2 offset = direction * distancePx;
        result += sampleBright(vUv + offset) * weight;
        result += sampleBright(vUv - offset) * weight;
      }
      return result;
    }

    void main() {
      vec3 base = texture2D(tDiffuse, vUv).rgb;
      vec3 flare = base * brightMask(luma(base)) * 1.2;
      vec2 px = (1.0 / uResolution) * uStreakScale;

      flare += streak(vec2(0.0, px.y));
      flare += streak(vec2(px.x * 0.8660254, px.y * 0.5));
      flare += streak(vec2(px.x * 0.8660254, -px.y * 0.5));

      gl_FragColor = vec4(base + flare * 0.8, 1.0);
    }
  `,
};

export default Star6FlareShader;
