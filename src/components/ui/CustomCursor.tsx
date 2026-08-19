"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorMode, setCursorMode] = useState<"default" | "active" | "drag">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const label = cursorTarget.getAttribute("data-cursor") || "VIEW";
        setCursorLabel(label.toUpperCase());
        setCursorMode(label.toLowerCase().includes("drag") ? "drag" : "active");
      } else {
        setCursorMode("default");
        setCursorLabel("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center bg-[var(--accent-acid)] text-[#050505] font-mono text-[9px] uppercase font-extrabold tracking-wider shadow-[0_0_15px_rgba(183,255,0,0.45)] select-none"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: cursorMode !== "default" ? (cursorLabel.length > 6 ? 96 : 64) : 8,
        height: cursorMode !== "default" ? 28 : 8,
        borderRadius: cursorMode !== "default" ? "2px" : "1px",
        opacity: cursorMode !== "default" ? 0.95 : 0.75,
      }}
      transition={{ type: "spring", damping: 24, stiffness: 350 }}
    >
      {cursorMode !== "default" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          className="text-center leading-none px-2 whitespace-nowrap"
        >
          {cursorLabel}
        </motion.span>
      )}
    </motion.div>
  );
}
