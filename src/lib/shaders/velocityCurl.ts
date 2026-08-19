export const velocityCurlFragmentShader = `
  uniform sampler2D map;
  uniform float uCurlStrength;
  uniform vec4 uRect;
  varying vec2 vUv;

  vec2 applyCurl(vec2 localUv) {
    float centered = 2.0 * localUv.y - 1.0;
    float profile = 1.0 - sqrt(max(0.0, 1.0 - centered * centered));
    float uvScale = 1.0 - profile * uCurlStrength;
    float distortedX = (localUv.x - 0.5) * uvScale + 0.5;
    return vec2(distortedX, localUv.y);
  }

  void main() {
    vec2 localUv = (vUv - uRect.xy) / uRect.zw;
    if (localUv.x < 0.0 || localUv.x > 1.0 || localUv.y < 0.0 || localUv.y > 1.0) {
      discard;
    }

    vec2 distortedUv = applyCurl(localUv);
    vec4 tex = texture2D(map, clamp(distortedUv, 0.0, 1.0));
    gl_FragColor = tex;
  }
`;
