"use client";

import { motion } from "framer-motion";

interface ParallaxTextProps {
    children: React.ReactNode;
    offset?: number;
    direction?: "up" | "down";
    className?: string;
}

export default function ParallaxText({ children, offset = 50, direction = "up", className = "" }: ParallaxTextProps) {
    const yStart = direction === "up" ? offset : -offset;

    return (
        <motion.div
            initial={{ opacity: 0, y: yStart }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className={`relative ${className}`}
        >
            {children}
        </motion.div>
    );
}
