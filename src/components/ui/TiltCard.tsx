"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const rotationX = useMotionValue(0);
    const rotationY = useMotionValue(0);

    const springX = useSpring(rotationX, { stiffness: 400, damping: 30, mass: 0.5 });
    const springY = useSpring(rotationY, { stiffness: 400, damping: 30, mass: 0.5 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation based on cursor position (-20 to 20 degrees)
        const xPct = (mouseX / width - 0.5);
        const yPct = (mouseY / height - 0.5);

        rotationX.set(-yPct * 20); // Invert Y axis tilt
        rotationY.set(xPct * 20);
    };

    const handleMouseLeave = () => {
        rotationX.set(0);
        rotationY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d" as any,
                perspective: 1000,
                rotateX: springX,
                rotateY: springY,
            }}
            className={`cursor-crosshair ${className}`}
        >
            <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full">
                {children}
            </div>
        </motion.div>
    );
}
