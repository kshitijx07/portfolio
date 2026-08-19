"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [cursorLabel, setCursorLabel] = useState("");
  const [isHovered, setIsHovered] = useState(false);
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
        const label = cursorTarget.getAttribute("data-cursor") || "View";
        setCursorLabel(label);
        setIsHovered(true);
      } else {
        setIsHovered(false);
        setCursorLabel("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center bg-[var(--accent-acid)] text-[#050505] font-mono text-[9px] uppercase font-extrabold tracking-wider shadow-[0_0_12px_rgba(183,255,0,0.5)]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovered ? 56 : 8,
        height: isHovered ? 56 : 8,
        borderRadius: isHovered ? "4px" : "1px",
        opacity: isHovered ? 0.95 : 0.75,
      }}
      transition={{ type: "spring", damping: 24, stiffness: 350 }}
    >
      {isHovered && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="text-center leading-none"
        >
          {cursorLabel}
        </motion.span>
      )}
    </motion.div>
  );
}
