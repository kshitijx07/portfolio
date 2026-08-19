"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const GLYPH_SETS = {
  cyber: "ABCDEF0123456789_//<>{}*=",
  matrix: "01アイウエオカキクケコサシスセソタチツテトナニヌネノ",
  binary: "0101011001",
  ascii: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
  trigger?: "inView" | "hover" | "always";
  glyphSet?: keyof typeof GLYPH_SETS;
  scrambleOnHover?: boolean;
}

export function ScrambleText({
  text,
  className,
  speed = 35,
  trigger = "inView",
  glyphSet = "cyber",
  scrambleOnHover = true,
}: ScrambleTextProps) {
  const [output, setOutput] = useState(text);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isAnimating = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const glyphs = GLYPH_SETS[glyphSet] || GLYPH_SETS.cyber;

  const runScramble = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    intervalRef.current = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < iteration) return text[idx];
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setOutput(text);
        isAnimating.current = false;
      }
      iteration += 0.5;
    }, speed);
  }, [text, speed, glyphs]);

  useEffect(() => {
    if (trigger === "always") {
      runScramble();
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          runScramble();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trigger, runScramble]);

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      runScramble();
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={cn("font-mono inline-block select-none", className)}
    >
      {output}
    </span>
  );
}

export default ScrambleText;
