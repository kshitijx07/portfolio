"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SlideTextProps {
    children: React.ReactNode;
    direction?: "left" | "right";
    offset?: number;
    className?: string;
}

export default function SlideText({ children, direction = "left", offset = 200, className = "" }: SlideTextProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Map scroll progress to horizontal translation
    const xParams = direction === "left" ? [-offset, offset] : [offset, -offset];
    const x = useTransform(scrollYProgress, [0, 1], xParams);

    // Aesthetic 3D Slide Additions
    const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], direction === "left" ? [15, 0, -15] : [-15, 0, 15]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    return (
        <motion.div
            ref={ref}
            style={{ x, rotateY, opacity, scale, transformPerspective: 1500, willChange: "transform, opacity" } as any}
            className={`w-full ${className}`}
        >
            {children}
        </motion.div>
    );
}
