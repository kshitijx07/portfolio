"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);

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

        setRotationX(-yPct * 20); // Invert Y axis tilt
        setRotationY(xPct * 20);
    };

    const handleMouseLeave = () => {
        setRotationX(0);
        setRotationY(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d" as any,
                perspective: 1000
            }}
            animate={{
                rotateX: rotationX,
                rotateY: rotationY,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.5 }}
            className={`cursor-crosshair ${className}`}
        >
            <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full">
                {children}
            </div>
        </motion.div>
    );
}
