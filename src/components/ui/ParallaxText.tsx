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

    return (
        <motion.div ref={ref} style={{ y, willChange: "transform" } as any} className={className}>
            {children}
        </motion.div>
    );
}
