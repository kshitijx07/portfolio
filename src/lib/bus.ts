import * as THREE from "three";

export type PointerSnapshot = {
  x: number;
  y: number;
  inside: boolean;
};

export const pointerUv = new THREE.Vector2(0.5, 0.5);
export const pointerState = { inside: false, rawX: 0, rawY: 0 };
const listeners = new Set<(state: PointerSnapshot) => void>();

if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointerState.rawX = e.clientX;
    pointerState.rawY = e.clientY;
    pointerState.inside = true;
    pointerUv.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
    listeners.forEach((fn) =>
      fn({ x: pointerUv.x, y: pointerUv.y, inside: true })
    );
  });

  window.addEventListener("pointerleave", () => {
    pointerState.inside = false;
    pointerUv.set(0.5, 0.5);
    listeners.forEach((fn) => fn({ x: 0.5, y: 0.5, inside: false }));
  });
}

export const subscribePointer = (fn: (state: PointerSnapshot) => void): (() => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};
