/**
 * ══════════════════════════════════════════════════════════════════════════════
 * UNIFIED EVENT, SCROLL & POINTER BUS ENGINE (lib/bus.ts)
 * ──────────────────────────────────────────────────────────────────────────────
 * High-performance, single-frame event synchronization architecture designed for
 * seamless DOM + WebGL hybrid rendering. Eliminates frame desync, layout thrashing,
 * and input fragmentation by centralizing telemetry into discrete single-source buses.
 * ══════════════════════════════════════════════════════════════════════════════
 */

import * as THREE from "three";
import type Lenis from "lenis";

// ─────────────────────────────────────────────────────────────────────────────
// 1. TYPE DEFINITIONS & SNAPSHOT SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────

export interface ScrollSnapshot {
  scrollTop: number;
  scrollLeft: number;
  velocity: number;
  velocitySmoothed: number;
  direction: -1 | 0 | 1;
  progress: number;
  limit: number;
  viewportHeight: number;
  viewportWidth: number;
  isScrolling: boolean;
  timestamp: number;
}

export interface PointerSnapshot {
  /** Shader screen UV space (0.0 to 1.0, Origin: Bottom-Left) */
  x: number;
  y: number;
  /** Normalized Device Coordinates (-1.0 to 1.0, Origin: Screen Center) */
  ndcX: number;
  ndcY: number;
  /** Raw browser client coordinates in pixels */
  clientX: number;
  clientY: number;
  /** Frame delta displacement */
  deltaX: number;
  deltaY: number;
  /** Pointer movement speed in px/s */
  speed: number;
  /** Viewport containment state (false when pointer leaves or window blurs) */
  inside: boolean;
  /** Primary button pressed state */
  isDown: boolean;
  timestamp: number;
}

export interface ViewportSnapshot {
  width: number;
  height: number;
  dpr: number;
  aspect: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  prefersReducedMotion: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SCROLL BUS ENGINE
// ─────────────────────────────────────────────────────────────────────────────

const SERVER_SCROLL_SNAPSHOT: ScrollSnapshot = {
  scrollTop: 0,
  scrollLeft: 0,
  velocity: 0,
  velocitySmoothed: 0,
  direction: 0,
  progress: 0,
  limit: 0,
  viewportHeight: 1080,
  viewportWidth: 1920,
  isScrolling: false,
  timestamp: 0,
};

let scrollSnapshot: ScrollSnapshot = { ...SERVER_SCROLL_SNAPSHOT };
const scrollListeners = new Set<(state: ScrollSnapshot) => void>();
let lenisInstance: Lenis | null = null;
let unbindLenis: (() => void) | null = null;
let scrollStopTimer: ReturnType<typeof setTimeout> | null = null;

// Dual-time constant smoothing state for scroll velocity
let velocitySmooth = 0;
let lastScrollTime = 0;
let lastScrollY = 0;

function computeSmoothedVelocity(
  currentY: number,
  now: number,
  dt: number
): { velocity: number; smoothed: number; direction: -1 | 0 | 1 } {
  const deltaY = currentY - lastScrollY;
  const rawVelocity = dt > 0.0001 ? deltaY / dt : 0;
  const absVelocity = Math.abs(rawVelocity);
  const direction: -1 | 0 | 1 = deltaY > 0 ? 1 : deltaY < 0 ? -1 : 0;

  // Dual-time filter: fast attack (tau=0.025), slow release (tau=0.175)
  const tau = absVelocity > velocitySmooth ? 0.025 : 0.175;
  const alpha = 1.0 - Math.exp(-Math.max(dt, 0.004) / tau);
  velocitySmooth += (absVelocity - velocitySmooth) * alpha;

  lastScrollY = currentY;
  lastScrollTime = now;

  return { velocity: rawVelocity, smoothed: velocitySmooth, direction };
}

export const bindLenisScrollBus = (lenis: Lenis | null): void => {
  unbindLenis?.();
  unbindLenis = null;
  lenisInstance = lenis;

  if (!lenis) return;

  const onScroll = (e: {
    scroll: number;
    velocity: number;
    progress: number;
    limit: number;
  }) => {
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    const dt = lastScrollTime > 0 ? (now - lastScrollTime) / 1000 : 0.016;
    const { velocity, smoothed, direction } = computeSmoothedVelocity(e.scroll, now, dt);

    if (scrollStopTimer) clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
      scrollSnapshot.isScrolling = false;
      velocitySmooth = 0;
      notifyScrollListeners();
    }, 150);

    const vh = typeof window !== "undefined" ? window.innerHeight : 1080;
    const vw = typeof window !== "undefined" ? window.innerWidth : 1920;

    scrollSnapshot = {
      scrollTop: e.scroll,
      scrollLeft: 0,
      velocity: e.velocity || velocity,
      velocitySmoothed: smoothed,
      direction,
      progress: e.progress ?? (e.limit > 0 ? e.scroll / e.limit : 0),
      limit: e.limit ?? 0,
      viewportHeight: vh,
      viewportWidth: vw,
      isScrolling: true,
      timestamp: now,
    };

    notifyScrollListeners();
  };

  lenis.on("scroll", onScroll);
  unbindLenis = () => lenis.off("scroll", onScroll);

  const initialH = typeof window !== "undefined" ? window.innerHeight : 1080;
  const initialW = typeof window !== "undefined" ? window.innerWidth : 1920;

  scrollSnapshot = {
    scrollTop: lenis.scroll,
    scrollLeft: 0,
    velocity: lenis.velocity,
    velocitySmoothed: 0,
    direction: 0,
    progress: lenis.progress,
    limit: lenis.limit,
    viewportHeight: initialH,
    viewportWidth: initialW,
    isScrolling: false,
    timestamp: typeof performance !== "undefined" ? performance.now() : 0,
  };
};

function notifyScrollListeners(): void {
  scrollListeners.forEach((fn) => fn(scrollSnapshot));
}

// Fallback native scroll listener when Lenis is not active
if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      if (lenisInstance) return; // Lenis controls the scroll event
      const current = window.scrollY || window.pageYOffset || 0;
      const now = performance.now();
      const dt = lastScrollTime > 0 ? (now - lastScrollTime) / 1000 : 0.016;
      const { velocity, smoothed, direction } = computeSmoothedVelocity(current, now, dt);

      const maxLimit = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxLimit > 0 ? current / maxLimit : 0;

      if (scrollStopTimer) clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(() => {
        scrollSnapshot.isScrolling = false;
        velocitySmooth = 0;
        notifyScrollListeners();
      }, 150);

      scrollSnapshot = {
        scrollTop: current,
        scrollLeft: window.scrollX || 0,
        velocity,
        velocitySmoothed: smoothed,
        direction,
        progress,
        limit: maxLimit,
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
        isScrolling: true,
        timestamp: now,
      };

      notifyScrollListeners();
    },
    { passive: true }
  );
}

export const getScrollSnapshot = (): ScrollSnapshot => scrollSnapshot;
export const getLenisScrollSnapshot = (): ScrollSnapshot => scrollSnapshot;

export const subscribeScroll = (
  listener: (state: ScrollSnapshot) => void
): (() => void) => {
  scrollListeners.add(listener);
  return () => {
    scrollListeners.delete(listener);
  };
};

export const subscribeLenisScroll = subscribeScroll;

// ─────────────────────────────────────────────────────────────────────────────
// 3. POINTER BUS ENGINE
// ─────────────────────────────────────────────────────────────────────────────

const SERVER_POINTER_SNAPSHOT: PointerSnapshot = {
  x: 0.5,
  y: 0.5,
  ndcX: 0,
  ndcY: 0,
  clientX: 0,
  clientY: 0,
  deltaX: 0,
  deltaY: 0,
  speed: 0,
  inside: false,
  isDown: false,
  timestamp: 0,
};

/** Mutable Three.js Vector2 for zero-allocation WebGL frame consumption */
export const pointerUv = new THREE.Vector2(0.5, 0.5);
/** Normalized Device Coordinates (-1.0 to 1.0) */
export const pointerNdc = new THREE.Vector2(0, 0);
/** Smoothed pointer coordinates for inertial camera parallax */
export const pointerSmoothUv = new THREE.Vector2(0.5, 0.5);
/** Pointer state container */
export const pointerState = {
  inside: false,
  isDown: false,
  rawX: 0,
  rawY: 0,
  deltaX: 0,
  deltaY: 0,
  speed: 0,
};

let pointerSnapshot: PointerSnapshot = { ...SERVER_POINTER_SNAPSHOT };
const pointerListeners = new Set<(state: PointerSnapshot) => void>();
let lastPointerTime = 0;
let lastClientX = 0;
let lastClientY = 0;

export const updatePointer = (next: PointerSnapshot): void => {
  pointerSnapshot = next;
  pointerUv.set(next.x, next.y);
  pointerNdc.set(next.ndcX, next.ndcY);
  pointerState.inside = next.inside;
  pointerState.isDown = next.isDown;
  pointerState.rawX = next.clientX;
  pointerState.rawY = next.clientY;
  pointerState.deltaX = next.deltaX;
  pointerState.deltaY = next.deltaY;
  pointerState.speed = next.speed;

  pointerListeners.forEach((fn) => fn(next));
};

if (typeof window !== "undefined") {
  const handlePointerMove = (e: PointerEvent | MouseEvent) => {
    const now = performance.now();
    const dt = lastPointerTime > 0 ? (now - lastPointerTime) / 1000 : 0.016;

    const clientX = e.clientX;
    const clientY = e.clientY;
    const deltaX = clientX - lastClientX;
    const deltaY = clientY - lastClientY;
    const distance = Math.hypot(deltaX, deltaY);
    const speed = dt > 0 ? distance / dt : 0;

    lastClientX = clientX;
    lastClientY = clientY;
    lastPointerTime = now;

    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;

    const uvX = clientX / w;
    const uvY = 1.0 - clientY / h; // Bottom-left origin
    const ndcX = (clientX / w) * 2.0 - 1.0;
    const ndcY = -(clientY / h) * 2.0 + 1.0;

    updatePointer({
      x: uvX,
      y: uvY,
      ndcX,
      ndcY,
      clientX,
      clientY,
      deltaX,
      deltaY,
      speed,
      inside: true,
      isDown: (e.buttons & 1) === 1,
      timestamp: now,
    });
  };

  const handlePointerLeave = () => {
    updatePointer({
      x: 0.5,
      y: 0.5,
      ndcX: 0,
      ndcY: 0,
      clientX: lastClientX,
      clientY: lastClientY,
      deltaX: 0,
      deltaY: 0,
      speed: 0,
      inside: false,
      isDown: false,
      timestamp: performance.now(),
    });
  };

  const handlePointerDown = (e: PointerEvent | MouseEvent) => {
    pointerState.isDown = true;
    updatePointer({ ...pointerSnapshot, isDown: true });
  };

  const handlePointerUp = () => {
    pointerState.isDown = false;
    updatePointer({ ...pointerSnapshot, isDown: false });
  };

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
  window.addEventListener("pointerdown", handlePointerDown, { passive: true });
  window.addEventListener("pointerup", handlePointerUp, { passive: true });
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

// ─────────────────────────────────────────────────────────────────────────────
// 4. VIEWPORT & DEVICE DIMENSION BUS
// ─────────────────────────────────────────────────────────────────────────────

const SERVER_VIEWPORT_SNAPSHOT: ViewportSnapshot = {
  width: 1920,
  height: 1080,
  dpr: 1,
  aspect: 1920 / 1080,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  prefersReducedMotion: false,
};

let viewportSnapshot: ViewportSnapshot = { ...SERVER_VIEWPORT_SNAPSHOT };
const viewportListeners = new Set<(state: ViewportSnapshot) => void>();

function updateViewportSnapshot(): void {
  if (typeof window === "undefined") return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const aspect = w / Math.max(h, 1);
  const prefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  viewportSnapshot = {
    width: w,
    height: h,
    dpr,
    aspect,
    isMobile: w < 768,
    isTablet: w >= 768 && w < 1024,
    isDesktop: w >= 1024,
    prefersReducedMotion,
  };

  viewportListeners.forEach((fn) => fn(viewportSnapshot));
}

if (typeof window !== "undefined") {
  updateViewportSnapshot();
  window.addEventListener("resize", updateViewportSnapshot, { passive: true });
  window.addEventListener("orientationchange", updateViewportSnapshot, {
    passive: true,
  });
}

export const getViewportSnapshot = (): ViewportSnapshot => viewportSnapshot;

export const isLowPowerDevice = (): boolean => {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const isMobile = window.innerWidth < 768;
  const lowCores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
  const lowMem = (navigator as any).deviceMemory ? (navigator as any).deviceMemory <= 4 : false;
  return isMobile || lowCores || lowMem;
};

export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
};

export const subscribeViewport = (
  fn: (state: ViewportSnapshot) => void
): (() => void) => {
  viewportListeners.add(fn);
  return () => {
    viewportListeners.delete(fn);
  };
};
