"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";

interface ViewportLazySceneProps {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
  placeholder?: ReactNode;
  idleTimeout?: number;
}

/**
 * ViewportLazyScene: Staggered Idle Pre-Warming Architecture.
 *
 * 1. Frame 0 (First Paint): Lets critical DOM (Hero, H1, LCP text) paint with 0ms render delay.
 * 2. Idle Phase (~150ms): Fires during browser idle time (requestIdleCallback) to pre-warm
 *    and compile WebGL shaders in GPU memory BEFORE the user scrolls down.
 * 3. Scroll Phase: When user reaches Section 3+ (Experience, Projects, Skills, Education, Contact),
 *    the scene is ALREADY 100% compiled with ZERO delay, zero popping, and zero stutter.
 */
export default function ViewportLazyScene({
  children,
  rootMargin = "600px 0px",
  className = "absolute inset-0 pointer-events-none z-0",
  placeholder = null,
  idleTimeout = 300,
}: ViewportLazySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // 1. Scroll-triggered fast mount
    const el = containerRef.current;
    let observer: IntersectionObserver | null = null;

    if (el && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setHasMounted(true);
              observer?.unobserve(el);
            }
          });
        },
        { rootMargin }
      );
      observer.observe(el);
    }

    // 2. Idle Pre-Warming: Pre-compile in background during browser idle time
    let idleId: any;
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        idleId = (window as any).requestIdleCallback(
          () => {
            setHasMounted(true);
          },
          { timeout: idleTimeout }
        );
      } else {
        idleId = setTimeout(() => {
          setHasMounted(true);
        }, 150);
      }
    }

    return () => {
      observer?.disconnect();
      if (typeof window !== "undefined") {
        if ("cancelIdleCallback" in window && typeof idleId === "number") {
          (window as any).cancelIdleCallback(idleId);
        } else {
          clearTimeout(idleId);
        }
      }
    };
  }, [rootMargin, idleTimeout]);

  return (
    <div ref={containerRef} className={className}>
      {hasMounted ? children : placeholder}
    </div>
  );
}
