"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedThreadLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="absolute top-4 bottom-4 left-3 md:left-4 w-6 pointer-events-none z-0">
      <svg className="w-full h-full" overflow="visible">
        <motion.path
          d="M 12 0 Q 6 100, 12 200 T 12 400 T 12 600"
          fill="none"
          stroke="#C86D51"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}
