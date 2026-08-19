"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEF0123456789_//<>{}*=";

export interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function ScrambleText({ text, className, speed = 40 }: ScrambleTextProps) {
  const [output, setOutput] = useState(text);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let iteration = 0;
          const interval = setInterval(() => {
            setOutput(
              text
                .split("")
                .map((char, idx) => {
                  if (char === " ") return " ";
                  if (idx < iteration) return text[idx];
                  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                })
                .join("")
            );

            if (iteration >= text.length) {
              clearInterval(interval);
            }
            iteration += 1 / 2;
          }, speed);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [text, speed]);

  return (
    <span ref={containerRef} className={cn("font-mono", className)}>
      {output}
    </span>
  );
}

export default ScrambleText;
