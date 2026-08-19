import * as THREE from "three";

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * SYNCHRONIZED DOM GRID QUAD SHADER (components/canvas/DomSyncShader.ts)
 * ──────────────────────────────────────────────────────────────────────────────
 * Renders DOM-mirrored project card textures with:
 * 1. Semicircular velocity UV curl deformation driven by instantaneous scroll speed.
 * 2. Aspect-corrected dot-matrix circular expansion hover mask with fwidth AA.
 * 3. Film polarity developing entrance animation (negative-to-positive transition).
 * ══════════════════════════════════════════════════════════════════════════════
 */

export const DomSyncShader = {
  uniforms: {
    map: { value: null as THREE.Texture | null },
    mapHover: { value: null as THREE.Texture | null },
    uRect: { value: new THREE.Vector4(0, 0, 1, 1) },
    uHoverRevealProgress: { value: 0.0 },
    uDotPixelSize: { value: 8.0 },
    uViewportPx: { value: new THREE.Vector2(1920, 1080) },
    uCurlStrength: { value: 0.0 },
    uPolarityPositive: { value: 1.0 },
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
    uniform float uHoverRevealProgress;
    uniform float uDotPixelSize;
    uniform vec2 uViewportPx;
    uniform float uCurlStrength;
    uniform float uPolarityPositive;

    varying vec2 vUv;

    // Semicircular horizontal UV compression based on instantaneous scroll velocity
    vec2 applyCurl(vec2 screenUv) {
      float centered = 2.0 * screenUv.y - 1.0;
      float profile = 1.0 - sqrt(max(0.0, 1.0 - centered * centered));
      float uvScale = 1.0 - profile * uCurlStrength;
      float distortedX = (screenUv.x - 0.5) * uvScale + 0.5;
      return vec2(distortedX, screenUv.y);
    }

    // Negative-to-positive film polarity development
    vec3 applyPolarity(vec3 rgb) {
      float t = clamp(uPolarityPositive, 0.0, 1.0);
      return mix(1.0 - rgb, rgb, t);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / max(uViewportPx, vec2(1.0));
      screenUv = applyCurl(screenUv);

      // Map fullscreen coordinates into card bounding box
      vec2 localUv = (screenUv - uRect.xy) / max(uRect.zw, vec2(0.0001));
      float rectWidthPx = max(uRect.z * uViewportPx.x, 1.0);
      float rectHeightPx = max(uRect.w * uViewportPx.y, 1.0);

      // Dot-matrix cellular screen grid
      vec2 cellSizeUv = vec2(max(2.0, uDotPixelSize)) / uViewportPx;
      vec2 cellUv = fract(screenUv / cellSizeUv);
      float squareDist = max(abs(cellUv.x - 0.5), abs(cellUv.y - 0.5));

      // Circular expansion reveal mask from card center
      float rectAspect = rectWidthPx / rectHeightPx;
      vec2 centered = localUv * 2.0 - 1.0;
      centered.x *= rectAspect;
      float distToCenter = length(centered);
      float maxRadius = length(vec2(rectAspect, 1.0));

      float progress = clamp(uHoverRevealProgress, 0.0, 1.0);
      float radius = progress * (maxRadius + 0.12);
      float grow = 1.0 - smoothstep(radius - 0.12, radius + 0.12, distToCenter);
      grow *= step(0.0001, progress);

      // Cellular square growth with analytical antialiasing
      float squareExtent = mix(0.0, 0.5, grow);
      float squareAa = max(fwidth(squareDist), 0.0001);
      float squareMask = 1.0 - smoothstep(
        squareExtent - squareAa,
        squareExtent + squareAa,
        squareDist
      );

      // Texture sampling
      vec4 baseColor = texture2D(map, clamp(localUv, 0.0, 1.0));
      vec4 hoverColor = texture2D(mapHover, clamp(localUv, 0.0, 1.0));
      vec4 color = mix(baseColor, hoverColor, squareMask);

      // Edge clipping
      vec2 edge = min(localUv, 1.0 - localUv);
      float inside = step(0.0, edge.x) * step(0.0, edge.y);

      color.rgb = applyPolarity(color.rgb);
      color.a *= inside;

      if (color.a < 0.001) discard;
      gl_FragColor = color;
    }
  `,
};
