export interface PointerSnapshot {
  x: number; // 0 to 1 UV
  y: number; // 0 to 1 UV
  screenX: number; // Pixel X
  screenY: number; // Pixel Y
  inside: boolean;
}

let pointerSnapshot: PointerSnapshot = {
  x: 0.5,
  y: 0.5,
  screenX: 0,
  screenY: 0,
  inside: false,
};

const listeners = new Set<() => void>();
let initialized = false;

export const initPointerBus = () => {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const handleMouseMove = (e: MouseEvent) => {
    const nx = e.clientX / window.innerWidth;
    const ny = e.clientY / window.innerHeight;

    pointerSnapshot = {
      x: Math.max(0, Math.min(1, nx)),
      y: Math.max(0, Math.min(1, ny)),
      screenX: e.clientX,
      screenY: e.clientY,
      inside: true,
    };

    for (const listener of listeners) {
      listener();
    }
  };

  const handleMouseLeave = () => {
    pointerSnapshot = {
      ...pointerSnapshot,
      x: 0.5,
      y: 0.5,
      inside: false,
    };
    for (const listener of listeners) {
      listener();
    }
  };

  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("mouseleave", handleMouseLeave);
  window.addEventListener("blur", handleMouseLeave);
};

export const getPointerSnapshot = (): PointerSnapshot => pointerSnapshot;

export const subscribePointer = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const SERVER_POINTER_SNAPSHOT: PointerSnapshot = {
  x: 0.5,
  y: 0.5,
  screenX: 0,
  screenY: 0,
  inside: false,
};
