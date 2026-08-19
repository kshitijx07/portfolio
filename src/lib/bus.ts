import * as THREE from "three";
import type Lenis from "lenis";

export type ScrollSnapshot = {
  scrollTop: number;
  velocity: number;
};

export type PointerSnapshot = {
  x: number;
  y: number;
  inside: boolean;
};

let scrollSnapshot: ScrollSnapshot = { scrollTop: 0, velocity: 0 };
const scrollListeners = new Set<() => void>();
let unbindLenis: (() => void) | null = null;

export const bindLenisScrollBus = (lenis: Lenis | null) => {
  unbindLenis?.();
  unbindLenis = null;
  if (!lenis) return;

  const onScroll = ({ scroll, velocity }: { scroll: number; velocity: number }) => {
    scrollSnapshot = { scrollTop: scroll, velocity };
    for (const listener of scrollListeners) listener();
  };

  lenis.on("scroll", onScroll);
  unbindLenis = () => lenis.off("scroll", onScroll);
  scrollSnapshot = { scrollTop: lenis.scroll, velocity: lenis.velocity };
};

export const getScrollSnapshot = () => scrollSnapshot;
export const getLenisScrollSnapshot = () => scrollSnapshot;

export const subscribeScroll = (listener: () => void) => {
  scrollListeners.add(listener);
  return () => {
    scrollListeners.delete(listener);
  };
};
export const subscribeLenisScroll = subscribeScroll;

export const pointerUv = new THREE.Vector2(0.5, 0.5);
export const pointerState = { inside: false, rawX: 0, rawY: 0 };
const pointerListeners = new Set<(state: PointerSnapshot) => void>();

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

  window.addEventListener("blur", () => {
    pointerState.inside = false;
    pointerUv.set(0.5, 0.5);
    pointerListeners.forEach((fn) => fn({ x: 0.5, y: 0.5, inside: false }));
  });
}

export const subscribePointer = (fn: (state: PointerSnapshot) => void) => {
  pointerListeners.add(fn);
  return () => {
    pointerListeners.delete(fn);
  };
};
