"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay * 0.04 },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 40,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", zIndex: 10 } as any}
            variants={container as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={`gap-x-2 gap-y-1 pb-4 md:pb-6 ${className}`}
        >
            {words.map((word, index) => (
                <motion.span variants={child as any} style={{ display: "inline-block" } as any} key={index}>
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
