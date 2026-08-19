"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";

interface ViewportLazySceneProps {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
  placeholder?: ReactNode;
  eager?: boolean;
}

/**
 * ViewportLazyScene: Pre-warms and mounts WebGL scenes persistently.
 * Once mounted, scenes stay compiled in GPU memory with zero disappearing,
 * zero shader recompilation lag, and instant responsiveness when scrolling.
 */
export default function ViewportLazyScene({
  children,
  rootMargin = "1200px 0px",
  className = "absolute inset-0 pointer-events-none z-0",
  placeholder = null,
  eager = true,
}: ViewportLazySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Default to mounted or mount immediately on client so all 3D backgrounds are warm and ready
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (eager) {
      // Pre-warm on next tick during system boot loader
      const timer = setTimeout(() => {
        setHasMounted(true);
      }, 50);
      return () => clearTimeout(timer);
    }

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
  }, [rootMargin, eager]);

  return (
    <div ref={containerRef} className={className}>
      {hasMounted ? children : placeholder}
    </div>
  );
}
