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
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ x, opacity } as any}
            className={`w-full relative ${className}`}
        >
            {children}
        </motion.div>
    );
}
