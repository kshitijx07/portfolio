import * as THREE from "three";

export type PointerSnapshot = {
  x: number;
  y: number;
  inside: boolean;
};

export type ScrollSnapshot = {
  scrollTop: number;
  velocity: number;
};

let scrollSnapshot: ScrollSnapshot = { scrollTop: 0, velocity: 0 };
let lastScrollTop = 0;

export const pointerUv = new THREE.Vector2(0.5, 0.5);
export const pointerState = { inside: false, rawX: 0, rawY: 0 };
const pointerListeners = new Set<(state: PointerSnapshot) => void>();
const scrollListeners = new Set<(state: ScrollSnapshot) => void>();

if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointerState.rawX = e.clientX;
    pointerState.rawY = e.clientY;
    pointerState.inside = true;
    pointerUv.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
    pointerListeners.forEach((fn) =>
      fn({ x: pointerUv.x, y: pointerUv.y, inside: true })
    );
  });

  window.addEventListener("pointerleave", () => {
    pointerState.inside = false;
    pointerUv.set(0.5, 0.5);
    pointerListeners.forEach((fn) => fn({ x: 0.5, y: 0.5, inside: false }));
  });

  window.addEventListener(
    "scroll",
    () => {
      const current = window.scrollY || window.pageYOffset || 0;
      scrollSnapshot = {
        scrollTop: current,
        velocity: current - lastScrollTop,
      };
      lastScrollTop = current;
      scrollListeners.forEach((fn) => fn(scrollSnapshot));
    },
    { passive: true }
  );
}

export const getScrollSnapshot = (): ScrollSnapshot => {
  if (typeof window !== "undefined") {
    scrollSnapshot.scrollTop = window.scrollY || window.pageYOffset || 0;
  }
  return scrollSnapshot;
};

export const subscribePointer = (fn: (state: PointerSnapshot) => void): (() => void) => {
  pointerListeners.add(fn);
  return () => {
    pointerListeners.delete(fn);
  };
};

export const subscribeScroll = (fn: (state: ScrollSnapshot) => void): (() => void) => {
  scrollListeners.add(fn);
  return () => {
    scrollListeners.delete(fn);
  };
};
