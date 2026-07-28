"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface TiltCardWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltCardWrapper({ children, className = "", maxTilt = 4 }: TiltCardWrapperProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-1000 w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovered ? tilt.x : 0,
          rotateY: isHovered ? tilt.y : 0,
          scale: isHovered ? 1.01 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative transition-shadow duration-300 [transform-style:preserve-3d] ${className}`}
      >
        {children}
        {/* Soft specular highlight overlay */}
        {isHovered && (
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60 mix-blend-overlay" />
        )}
      </motion.div>
    </div>
  );
}
