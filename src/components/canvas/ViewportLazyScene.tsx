"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";

interface ViewportLazySceneProps {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
  placeholder?: ReactNode;
}

/**
 * ViewportLazyScene: Defers WebGL Canvas mounting until user scrolls near the section (400px margin).
 * Once mounted, it remains permanently resident in GPU memory with zero disappearing or shader re-compilation.
 * Prevents multiple WebGL contexts from firing gl.setSize() and layout thrashing simultaneously on page load.
 */
export default function ViewportLazyScene({
  children,
  rootMargin = "400px 0px",
  className = "absolute inset-0 pointer-events-none z-0",
  placeholder = null,
}: ViewportLazySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setHasMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasMounted(true);
            // Persistent: once mounted, unobserve and never destroy GPU context
            observer.unobserve(el);
          }
        });
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {hasMounted ? children : placeholder}
    </div>
  );
}
