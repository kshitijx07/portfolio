"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";

interface ViewportLazySceneProps {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
  placeholder?: ReactNode;
}

/**
 * ViewportLazyScene: Defers WebGL Canvas mounting until section approaches viewport.
 * Eliminates simultaneous WebGL context creation, initial-load forced reflows, and setSize layout thrashing.
 */
export default function ViewportLazyScene({
  children,
  rootMargin = "300px 0px",
  className = "absolute inset-0 pointer-events-none z-0",
  placeholder = null,
}: ViewportLazySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
          } else {
            // Unmount when far offscreen to conserve WebGL contexts and GPU memory
            setIsInViewport(false);
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
      {isInViewport ? children : placeholder}
    </div>
  );
}
