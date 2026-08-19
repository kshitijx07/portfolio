import type Lenis from "lenis";

export interface ScrollSnapshot {
  scrollTop: number;
  limit: number;
  progress: number;
  velocity: number;
  direction: number;
  viewportHeight: number;
}

let snapshot: ScrollSnapshot = {
  scrollTop: 0,
  limit: 0,
  progress: 0,
  velocity: 0,
  direction: 1,
  viewportHeight: typeof window !== "undefined" ? window.innerHeight : 1000,
};

const listeners = new Set<() => void>();
let unbind: (() => void) | null = null;

export const bindLenisScrollBus = (lenis: Lenis | null) => {
  unbind?.();
  unbind = null;

  if (!lenis) return;

  const onScroll = (e: {
    scroll: number;
    limit: number;
    progress: number;
    velocity: number;
    direction: number;
  }) => {
    snapshot = {
      scrollTop: e.scroll,
      limit: e.limit,
      progress: e.progress,
      velocity: e.velocity,
      direction: e.direction,
      viewportHeight: window.innerHeight,
    };
    for (const listener of listeners) {
      listener();
    }
  };

  lenis.on("scroll", onScroll);
  unbind = () => lenis.off("scroll", onScroll);

  snapshot = {
    scrollTop: lenis.scroll,
    limit: lenis.limit,
    progress: lenis.progress,
    velocity: lenis.velocity,
    direction: lenis.direction,
    viewportHeight: window.innerHeight,
  };
};

export const getLenisScrollSnapshot = (): ScrollSnapshot => snapshot;

export const subscribeLenisScroll = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const SERVER_SCROLL_SNAPSHOT: ScrollSnapshot = {
  scrollTop: 0,
  limit: 0,
  progress: 0,
  velocity: 0,
  direction: 1,
  viewportHeight: 1000,
};
