"use client";

import React, { useState, useEffect, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  trigger?: boolean;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@/\\<>";

export default function ScrambleText({
  text,
  className = "",
  delay = 0,
  trigger = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimated.current) return;

    let frame = 0;
    const totalFrames = text.length * 3;
    let timer: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;

        const scrambled = text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index / text.length < progress) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");

        setDisplayText(scrambled);

        if (frame >= totalFrames) {
          clearInterval(timer);
          setDisplayText(text);
          hasAnimated.current = true;
        }
      }, 35);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, [text, trigger, delay]);

  return (
    <span ref={elementRef} className={className}>
      {displayText}
    </span>
  );
}
