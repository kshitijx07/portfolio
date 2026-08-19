import * as THREE from "three";

export type RectSnapshot = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export class DomTargetRectSampler {
  private rects = new Map<string, RectSnapshot>();
  private elements = new Map<string, HTMLElement>();
  private lastScrollTop = 0;
  private frameCount = 0;

  public register(key: string, el: HTMLElement) {
    this.elements.set(key, el);
    this.updateRect(key, el.getBoundingClientRect());
  }

  public unregister(key: string) {
    this.elements.delete(key);
    this.rects.delete(key);
  }

  private updateRect(key: string, domRect: DOMRect) {
    this.rects.set(key, {
      top: domRect.top,
      left: domRect.left,
      width: domRect.width,
      height: domRect.height,
    });
  }

  public tick(
    scrollTop: number,
    windowHeight: number,
    windowWidth: number
  ): Map<string, THREE.Vector4> {
    const deltaY = scrollTop - this.lastScrollTop;
    this.lastScrollTop = scrollTop;

    const uRectUniforms = new Map<string, THREE.Vector4>();
    let idx = 0;

    this.elements.forEach((el, key) => {
      const cached = this.rects.get(key);
      if (!cached) return;

      // Fast scroll CPU offset
      cached.top -= deltaY;

      const isNearViewport =
        cached.top + cached.height > -150 && cached.top < windowHeight + 150;
      const isStaggeredFrame = this.frameCount % 12 === idx % 12;

      if (isNearViewport || isStaggeredFrame) {
        this.updateRect(key, el.getBoundingClientRect());
      }

      // Convert DOM bounds (Top-Left Origin) to WebGL Screen UV (Bottom-Left Origin)
      const current = this.rects.get(key)!;
      const uRect = new THREE.Vector4(
        current.left / windowWidth, // x
        1.0 - (current.top + current.height) / windowHeight, // y (flipped)
        current.width / windowWidth, // zw.x (width)
        current.height / windowHeight // zw.y (height)
      );
      uRectUniforms.set(key, uRect);
      idx++;
    });

    this.frameCount++;
    return uRectUniforms;
  }
}

export const globalRectSampler = new DomTargetRectSampler();
