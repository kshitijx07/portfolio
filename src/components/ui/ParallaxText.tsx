"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxTextProps {
    children: React.ReactNode;
    offset?: number;
    direction?: "up" | "down";
    className?: string;
}

export default function ParallaxText({ children, offset = 50, direction = "up", className = "" }: ParallaxTextProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yParams = direction === "up" ? [offset, -offset] : [-offset, offset];
    const y = useTransform(scrollYProgress, [0, 1], yParams);

    // Aesthetic 3D Parallax Additions
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], direction === "up" ? [10, 0, -10] : [-10, 0, 10]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    return (
        <motion.div ref={ref} style={{ y, rotateX, opacity, scale, transformPerspective: 1200, willChange: "transform, opacity" } as any} className={className}>
            {children}
        </motion.div>
    );
}
