"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { bindLenisScrollBus } from "@/lib/motion/ScrollBus";
import { initPointerBus } from "@/lib/motion/PointerBus";

function LenisScrollEnvBridge() {
  const lenis = useLenis();

  useEffect(() => {
    bindLenisScrollBus(lenis ?? null);
    initPointerBus();

    return () => {
      bindLenisScrollBus(null);
    };
  }, [lenis]);

  return null;
}

interface ScrollShellProps {
  children: React.ReactNode;
}

export default function ScrollShell({ children }: ScrollShellProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.8,
      }}
    >
      <LenisScrollEnvBridge />
      {children}
    </ReactLenis>
  );
}
