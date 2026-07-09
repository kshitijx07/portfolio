"use client";

import { motion } from "framer-motion";

interface SlideTextProps {
    children: React.ReactNode;
    direction?: "left" | "right";
    offset?: number;
    className?: string;
}

export default function SlideText({ children, direction = "left", offset = 200, className = "" }: SlideTextProps) {
    const xStart = direction === "left" ? -offset : offset;

    return (
        <motion.div
            initial={{ opacity: 0, x: xStart }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className={`w-full relative ${className}`}
        >
            {children}
        </motion.div>
    );
}
