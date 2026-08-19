/**
 * Professional DOM Manipulation & Coordinate Engine
 */

export interface ElementRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

/**
 * Returns accurate viewport-relative coordinates and center points for any element
 */
export function getElementRect(el: HTMLElement): ElementRect {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2,
  };
}

/**
 * Checks whether an element is currently visible inside the active viewport window
 */
export function isElementInViewport(el: HTMLElement, offset = 0): boolean {
  if (typeof window === "undefined") return false;
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.bottom >= -offset &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) + offset &&
    rect.right >= -offset
  );
}

/**
 * Calculates normalized mouse coordinates [-1..1] relative to the element center (ideal for 3D card tilt)
 */
export function getRelativePointer(
  e: MouseEvent | React.MouseEvent,
  el: HTMLElement
): { x: number; y: number; inside: boolean } {
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  return {
    x: (x - 0.5) * 2, // -1 (left) to 1 (right)
    y: (y - 0.5) * 2, // -1 (top) to 1 (bottom)
    inside: x >= 0 && x <= 1 && y >= 0 && y <= 1,
  };
}

/**
 * Smoothly scrolls the window or container to a target section by selector or element ID
 */
export function scrollToSection(
  sectionId: string,
  offset = 0,
  behavior: ScrollBehavior = "smooth"
): boolean {
  if (typeof window === "undefined") return false;
  const cleanId = sectionId.replace("#", "");
  const target = document.getElementById(cleanId);
  if (!target) return false;

  const y = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: y, behavior });
  return true;
}

/**
 * Registers an IntersectionObserver for clean scroll reveals
 */
export function observeIntersection(
  el: HTMLElement,
  callback: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = { threshold: 0.15 }
): () => void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return () => {};
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      callback(entry.isIntersecting, entry);
    });
  }, options);

  observer.observe(el);
  return () => observer.disconnect();
}

/**
 * Adds a keyboard shortcut handler with automatic cleanup
 */
export function bindKeyboardShortcut(
  keyCombo: string,
  handler: (e: KeyboardEvent) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const onKeyDown = (e: KeyboardEvent) => {
    const keys = keyCombo.toLowerCase().split("+");
    const matchesKey = keys.includes(e.key.toLowerCase());
    const matchesCtrl = keys.includes("ctrl") ? e.ctrlKey || e.metaKey : true;
    const matchesShift = keys.includes("shift") ? e.shiftKey : true;
    const matchesAlt = keys.includes("alt") ? e.altKey : true;

    if (matchesKey && matchesCtrl && matchesShift && matchesAlt) {
      e.preventDefault();
      handler(e);
    }
  };

  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
}
