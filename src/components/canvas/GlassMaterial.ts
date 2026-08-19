import * as THREE from "three";

export const GlassMaterialShader = {
  uniforms: {
    tScene: { value: null as THREE.Texture | null },
    uResolution: { value: new THREE.Vector2() },
    uLightPos: { value: new THREE.Vector2(4.0, 9.0) },
    uTintColor: { value: new THREE.Color("#4361EE") },
    uDark: { value: 1.0 },
    uThickness: { value: 1.8 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    varying vec4 vScreenPos;

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
    uniform float uDark;
    uniform float uThickness;

    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    varying vec4 vScreenPos;

    vec3 hardLight(vec3 base, vec3 blend) {
      vec3 low = 2.0 * base * blend;
      vec3 high = 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
      return mix(low, high, step(vec3(0.5), blend));
    }

    void main() {
      // Screen space coordinate
      vec2 screenUv = (vScreenPos.xy / vScreenPos.w) * 0.5 + 0.5;
      vec3 viewDir = normalize(vViewPosition);
      vec3 normal = normalize(vNormal);

      // Fresnel & Chromatic Aberration Dispersion
      float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
      vec2 refractOffset = normal.xy * 0.045;

      float r = texture2D(tScene, screenUv + refractOffset * 1.08).r;
      float g = texture2D(tScene, screenUv + refractOffset * 1.00).g;
      float b = texture2D(tScene, screenUv + refractOffset * 0.92).b;
      vec3 refractedColor = vec3(r, g, b);

      // Beer-Lambert vs Hard Light Color Blending
      vec3 transmittance = pow(uTintColor, vec3(max(uThickness, 0.01)));
      vec3 lightModeColor = mix(refractedColor, refractedColor * transmittance, 0.75);
      vec3 darkModeColor = mix(refractedColor, hardLight(refractedColor, uTintColor), 0.65);
      vec3 finalBase = mix(lightModeColor, darkModeColor, clamp(uDark, 0.0, 1.0));

      // Constrained Rim Specular
      vec2 pixelPos = gl_FragCoord.xy;
      float lightDist = length(pixelPos - uLightPos);
      float rim = smoothstep(180.0, 0.0, lightDist) * fresnel * 2.2;

      gl_FragColor = vec4(finalBase + vec3(rim), 1.0);
    }
  `,
};
