import * as THREE from "three";
import type Lenis from "lenis";

export type PointerSnapshot = {
  x: number;
  y: number;
  inside: boolean;
};

export type ScrollSnapshot = {
  scrollTop: number;
  velocity: number;
  progress?: number;
  limit?: number;
};

// ── 1. GLOBAL POINTER BUS ──────────────────────────────────────
export const pointerUv = new THREE.Vector2(0.5, 0.5);
export const pointerState = { inside: false, rawX: 0, rawY: 0 };
let pointerSnapshot: PointerSnapshot = { x: 0.5, y: 0.5, inside: false };
const pointerListeners = new Set<(state: PointerSnapshot) => void>();

export const updatePointer = (next: PointerSnapshot) => {
  pointerSnapshot = next;
  pointerUv.set(next.x, next.y);
  pointerState.inside = next.inside;
  pointerListeners.forEach((fn) => fn(next));
};

if (typeof window !== "undefined") {
  const handlePointerMove = (e: PointerEvent | MouseEvent) => {
    pointerState.rawX = e.clientX;
    pointerState.rawY = e.clientY;
    const x = e.clientX / window.innerWidth;
    const y = 1.0 - e.clientY / window.innerHeight; // Shader UV bottom-left
    updatePointer({ x, y, inside: true });
  };

  const handlePointerLeave = () => {
    updatePointer({ x: 0.5, y: 0.5, inside: false });
  };

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
  window.addEventListener("blur", handlePointerLeave, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) handlePointerLeave();
  });
}

export const getPointerSnapshot = (): PointerSnapshot => pointerSnapshot;

export const subscribePointer = (
  fn: (state: PointerSnapshot) => void
): (() => void) => {
  pointerListeners.add(fn);
  return () => {
    pointerListeners.delete(fn);
  };
};

// ── 2. GLOBAL LENIS / DOM SCROLL BUS ────────────────────────────
let scrollSnapshot: ScrollSnapshot = { scrollTop: 0, velocity: 0 };
const scrollListeners = new Set<(state: ScrollSnapshot) => void>();
let lenisInstance: Lenis | null = null;
let unbindLenis: (() => void) | null = null;

export const bindLenisScrollBus = (lenis: Lenis | null) => {
  unbindLenis?.();
  unbindLenis = null;
  lenisInstance = lenis;

  if (!lenis) return;

  const onScroll = (e: { scroll: number; velocity: number; progress: number; limit: number }) => {
    scrollSnapshot = {
      scrollTop: e.scroll,
      velocity: e.velocity,
      progress: e.progress,
      limit: e.limit,
    };
    scrollListeners.forEach((fn) => fn(scrollSnapshot));
  };

  lenis.on("scroll", onScroll);
  unbindLenis = () => lenis.off("scroll", onScroll);

  scrollSnapshot = {
    scrollTop: lenis.scroll,
    velocity: lenis.velocity,
    progress: lenis.progress,
    limit: lenis.limit,
  };
};

// Fallback native scroll listener for resilience
if (typeof window !== "undefined") {
  let lastNativeScrollTop = 0;
  window.addEventListener(
    "scroll",
    () => {
      if (lenisInstance) return; // Managed by Lenis
      const current = window.scrollY || window.pageYOffset || 0;
      scrollSnapshot = {
        scrollTop: current,
        velocity: current - lastNativeScrollTop,
      };
      lastNativeScrollTop = current;
      scrollListeners.forEach((fn) => fn(scrollSnapshot));
    },
    { passive: true }
  );
}

export const getScrollSnapshot = (): ScrollSnapshot => {
  if (lenisInstance) {
    scrollSnapshot.scrollTop = lenisInstance.scroll;
    scrollSnapshot.velocity = lenisInstance.velocity;
  } else if (typeof window !== "undefined") {
    scrollSnapshot.scrollTop = window.scrollY || window.pageYOffset || 0;
  }
  return scrollSnapshot;
};

export const getLenisScrollSnapshot = (): ScrollSnapshot => getScrollSnapshot();

export const subscribeScroll = (
  fn: (state: ScrollSnapshot) => void
): (() => void) => {
  scrollListeners.add(fn);
  return () => {
    scrollListeners.delete(fn);
  };
};

export const subscribeLenisScroll = (
  listener: (state: ScrollSnapshot) => void
): (() => void) => subscribeScroll(listener);
