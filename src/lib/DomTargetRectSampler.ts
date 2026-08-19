import * as THREE from "three";

export type RectSnapshot = {
  top: number;
  left: number;
  width: number;
  height: number;
};

/**
 * Zero-allocation DOM Rect to WebGL Screen UV Sampler
 * Keeps Three.js shader uniforms perfectly synchronized with DOM layout
 */
export class DomTargetRectSampler {
  private rects = new Map<string, RectSnapshot>();
  private elements = new Map<string, HTMLElement>();
  private vectorPool = new Map<string, THREE.Vector4>();
  private lastScrollTop = 0;
  private frameCount = 0;

  public register(key: string, el: HTMLElement): void {
    this.elements.set(key, el);
    this.updateRect(key, el.getBoundingClientRect());
    if (!this.vectorPool.has(key)) {
      this.vectorPool.set(key, new THREE.Vector4());
    }
  }

  public unregister(key: string): void {
    this.elements.delete(key);
    this.rects.delete(key);
    this.vectorPool.delete(key);
  }

  public getRect(key: string): RectSnapshot | undefined {
    return this.rects.get(key);
  }

  private updateRect(key: string, domRect: DOMRect): void {
    let snapshot = this.rects.get(key);
    if (!snapshot) {
      snapshot = { top: 0, left: 0, width: 0, height: 0 };
      this.rects.set(key, snapshot);
    }
    snapshot.top = domRect.top;
    snapshot.left = domRect.left;
    snapshot.width = domRect.width;
    snapshot.height = domRect.height;
  }

  /**
   * Ticks the sampler on every animation frame
   * Applies CPU scroll delta projection and staggers getBoundingClientRect calls
   */
  public tick(
    scrollTop: number,
    windowHeight: number,
    windowWidth: number
  ): Map<string, THREE.Vector4> {
    const deltaY = scrollTop - this.lastScrollTop;
    this.lastScrollTop = scrollTop;

    let idx = 0;
    const w = Math.max(1, windowWidth);
    const h = Math.max(1, windowHeight);

    this.elements.forEach((el, key) => {
      const cached = this.rects.get(key);
      if (!cached) return;

      // Fast scroll CPU offset projection
      cached.top -= deltaY;

      const isNearViewport =
        cached.top + cached.height > -200 && cached.top < h + 200;
      const isStaggeredFrame = this.frameCount % 10 === idx % 10;

      if (isNearViewport || isStaggeredFrame) {
        this.updateRect(key, el.getBoundingClientRect());
      }

      // Convert DOM bounds (Top-Left Origin) to WebGL Screen UV (Bottom-Left Origin)
      let vec = this.vectorPool.get(key);
      if (!vec) {
        vec = new THREE.Vector4();
        this.vectorPool.set(key, vec);
      }

      vec.set(
        cached.left / w, // UV x
        1.0 - (cached.top + cached.height) / h, // UV y (flipped for GL coords)
        cached.width / w, // UV width
        cached.height / h // UV height
      );

      idx++;
    });

    this.frameCount++;
    return this.vectorPool;
  }

  public clear(): void {
    this.elements.clear();
    this.rects.clear();
    this.vectorPool.clear();
  }
}

export const globalRectSampler = new DomTargetRectSampler();
export default globalRectSampler;
