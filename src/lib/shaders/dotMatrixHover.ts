export const dotMatrixHoverVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const dotMatrixHoverFragmentShader = `
  uniform sampler2D map;
  uniform sampler2D mapHover;
  uniform vec4 uRect; // xy origin, zw dimension (normalized 0 to 1)
  uniform float uHoverRevealProgress;
  uniform float uDotPixelSize;
  uniform vec2 uViewportPx;
  varying vec2 vUv;

  void main() {
    vec2 screenUv = vUv;
    
    // 1. Map screen UV into local card UV
    vec2 localUv = (screenUv - uRect.xy) / uRect.zw;
    
    // Discard fragments outside the target DOM card
    if (localUv.x < 0.0 || localUv.x > 1.0 || localUv.y < 0.0 || localUv.y > 1.0) {
      discard;
    }

    float rectWidthPx = max(uRect.z * uViewportPx.x, 1.0);
    float rectHeightPx = max(uRect.w * uViewportPx.y, 1.0);

    // 2. Divide screen space into fixed-size dot-matrix cells
    vec2 viewportPx = max(uViewportPx, vec2(1.0));
    vec2 cellSizeUv = vec2(max(2.0, uDotPixelSize)) / viewportPx;
    vec2 cellUv = fract(screenUv / cellSizeUv);
    float squareDist = max(abs(cellUv.x - 0.5), abs(cellUv.y - 0.5));

    // 3. Expand circular region from card center and grow anti-aliased squares
    float rectAspect = rectWidthPx / rectHeightPx;
    vec2 centered = localUv * 2.0 - 1.0;
    centered.x *= rectAspect;
    float distToCenter = length(centered);
    float maxRadius = length(vec2(rectAspect, 1.0));

    float progress = clamp(uHoverRevealProgress, 0.0, 1.0);
    float radius = progress * (maxRadius + 0.12);
    float grow = 1.0 - smoothstep(radius - 0.12, radius + 0.12, distToCenter);
    grow *= step(0.0001, progress);

    float squareExtent = mix(0.0, 0.5, grow);
    float squareAa = max(fwidth(squareDist), 0.0001);
    float squareMask = 1.0 - smoothstep(squareExtent - squareAa, squareExtent + squareAa, squareDist);

    vec4 baseColor = texture2D(map, clamp(localUv, 0.0, 1.0));
    vec4 hoverColor = texture2D(mapHover, clamp(localUv, 0.0, 1.0));
    vec4 color = mix(baseColor, hoverColor, squareMask);

    gl_FragColor = color;
  }
`;
