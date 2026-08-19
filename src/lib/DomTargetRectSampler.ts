import * as THREE from "three";

export type RectSnapshot = {
  top: number;
  left: number;
  width: number;
  height: number;
  documentTop: number; // Absolute page offset
  documentLeft: number;
};

/**
 * High-Performance, Zero-Forced-Reflow DOM Target to WebGL Screen UV Sampler.
 * Batches DOM reads to eliminate layout thrashing and forced reflows during initial load and scroll.
 */
export class DomTargetRectSampler {
  private rects = new Map<string, RectSnapshot>();
  private elements = new Map<string, HTMLElement>();
  private vectorPool = new Map<string, THREE.Vector4>();
  private pendingRegistration = false;
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.initResizeObserver();
    }
  }

  private initResizeObserver(): void {
    if (typeof ResizeObserver === "undefined") return;
    this.resizeObserver = new ResizeObserver((entries) => {
      // Batched measurement without layout thrashing
      requestAnimationFrame(() => {
        entries.forEach((entry) => {
          for (const [key, el] of this.elements.entries()) {
            if (el === entry.target) {
              this.measureElement(key, el);
            }
          }
        });
      });
    });
  }

  public register(key: string, el: HTMLElement): void {
    this.elements.set(key, el);
    if (!this.vectorPool.has(key)) {
      this.vectorPool.set(key, new THREE.Vector4(0, 0, 0, 0));
    }

    if (this.resizeObserver) {
      this.resizeObserver.observe(el);
    }

    // Schedule batched initial measurement in requestAnimationFrame
    if (!this.pendingRegistration) {
      this.pendingRegistration = true;
      if (typeof window !== "undefined") {
        requestAnimationFrame(() => {
          this.pendingRegistration = false;
          this.measureAll();
        });
      }
    }
  }

  public unregister(key: string): void {
    const el = this.elements.get(key);
    if (el && this.resizeObserver) {
      this.resizeObserver.unobserve(el);
    }
    this.elements.delete(key);
    this.rects.delete(key);
    this.vectorPool.delete(key);
  }

  public getRect(key: string): RectSnapshot | undefined {
    return this.rects.get(key);
  }

  private measureElement(key: string, el: HTMLElement): void {
    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const scrollX = window.scrollX || window.pageXOffset || 0;

    let snapshot = this.rects.get(key);
    if (!snapshot) {
      snapshot = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        documentTop: rect.top + scrollY,
        documentLeft: rect.left + scrollX,
      };
      this.rects.set(key, snapshot);
    } else {
      snapshot.top = rect.top;
      snapshot.left = rect.left;
      snapshot.width = rect.width;
      snapshot.height = rect.height;
      snapshot.documentTop = rect.top + scrollY;
      snapshot.documentLeft = rect.left + scrollX;
    }
  }

  public measureAll(): void {
    if (typeof window === "undefined") return;
    this.elements.forEach((el, key) => {
      this.measureElement(key, el);
    });
  }

  /**
   * Fast pure-math frame projection without calling getBoundingClientRect
   */
  public tick(
    scrollTop: number,
    windowHeight: number,
    windowWidth: number
  ): Map<string, THREE.Vector4> {
    const w = Math.max(1, windowWidth);
    const h = Math.max(1, windowHeight);

    this.rects.forEach((cached, key) => {
      // Calculate current screen top from cached document offset and current scroll position
      const screenTop = cached.documentTop - scrollTop;
      cached.top = screenTop;

      let vec = this.vectorPool.get(key);
      if (!vec) {
        vec = new THREE.Vector4();
        this.vectorPool.set(key, vec);
      }

      // Convert DOM coordinates to WebGL Screen UV (0 to 1, origin bottom-left)
      vec.set(
        cached.left / w,
        1.0 - (screenTop + cached.height) / h,
        cached.width / w,
        cached.height / h
      );
    });

    return this.vectorPool;
  }

  public clear(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.elements.clear();
    this.rects.clear();
    this.vectorPool.clear();
  }
}

export const globalRectSampler = new DomTargetRectSampler();
export default globalRectSampler;
