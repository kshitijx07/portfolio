"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { addEffect } from "@react-three/fiber";
import { bindLenisScrollBus } from "@/lib/bus";

export default function ScrollShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis with manual RAF mode (autoRaf: false)
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // 2. Bind Lenis to the global single-source ScrollBus
    bindLenisScrollBus(lenis);

    // 3. Single-Frame Loop Bridge: R3F drives Lenis RAF via addEffect
    const unsubscribeEffect = addEffect((time: number) => {
      lenis.raf(time);
    });

    return () => {
      unsubscribeEffect();
      bindLenisScrollBus(null);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
