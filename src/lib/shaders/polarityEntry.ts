export const polarityFragmentShader = `
  uniform sampler2D map;
  uniform float uPolarityPositive; // 0 = negative, 1 = positive color
  uniform vec4 uRect;
  varying vec2 vUv;

  void main() {
    vec2 localUv = (vUv - uRect.xy) / uRect.zw;
    if (localUv.x < 0.0 || localUv.x > 1.0 || localUv.y < 0.0 || localUv.y > 1.0) {
      discard;
    }

    vec4 tex = texture2D(map, localUv);
    float t = clamp(uPolarityPositive, 0.0, 1.0);
    vec3 developed = mix(1.0 - tex.rgb, tex.rgb, t);

    gl_FragColor = vec4(developed, tex.a);
  }
`;
