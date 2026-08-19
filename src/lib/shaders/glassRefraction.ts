export const glassRefractionVertexShader = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const glassRefractionFragmentShader = `
  uniform sampler2D tBackground;
  uniform vec2 uResolution;
  uniform vec3 uTintColor;
  uniform float uThickness;
  uniform float uDark; // 0 = Light (Beer-Lambert), 1 = Dark (Hard Light)
  uniform vec3 uLightPos;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  vec3 hardLight(vec3 base, vec3 blend) {
    vec3 low = 2.0 * base * blend;
    vec3 high = 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
    return mix(low, high, step(vec3(0.5), blend));
  }

  void main() {
    vec2 screenUv = gl_FragCoord.xy / uResolution;
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);

    // Fresnel Reflection
    float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 3.0);

    // Chromatic Dispersion (RGB offset sampling)
    float dispersion = 0.025;
    vec2 offsetR = normal.xy * (0.04 + dispersion);
    vec2 offsetG = normal.xy * 0.04;
    vec2 offsetB = normal.xy * (0.04 - dispersion);

    float r = texture2D(tBackground, screenUv + offsetR).r;
    float g = texture2D(tBackground, screenUv + offsetG).g;
    float b = texture2D(tBackground, screenUv + offsetB).b;
    vec3 refColor = vec3(r, g, b);

    // Light Theme: Beer-Lambert Optical Absorption
    vec3 transmittance = pow(clamp(uTintColor, 0.01, 1.0), vec3(max(uThickness, 0.01)));
    vec3 beerColor = refColor * transmittance;

    // Dark Theme: Art-Directed Hard Light Blend
    vec3 hardColor = hardLight(refColor, uTintColor);
    vec3 finalTint = mix(beerColor, hardColor, clamp(uDark, 0.0, 1.0));

    // Specular Highlight from Ring Orbit Light
    vec3 lightDir = normalize(uLightPos - vWorldPosition);
    vec3 halfVector = normalize(lightDir + viewDir);
    float spec = pow(max(0.0, dot(normal, halfVector)), 64.0);
    vec3 highlight = vec3(1.0) * spec * 2.5;

    vec3 finalColor = mix(finalTint, vec3(1.0), fresnel * 0.4) + highlight;
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
