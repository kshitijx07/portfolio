"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface KineticTextProps {
    text: string;
    direction?: "left" | "right";
    speed?: number;
    className?: string;
    yOffset?: number;
}

export default function KineticText({ text, direction = "left", speed = 1, className = "", yOffset = 0 }: KineticTextProps) {
    const container = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    const xTransform = useTransform(
        scrollYProgress,
        [0, 1],
        direction === "left" ? [0, -400 * speed] : [0, 400 * speed]
    );

    return (
        <div ref={container} className={`absolute w-full overflow-hidden pointer-events-none opacity-[0.03] select-none flex whitespace-nowrap ${className}`} style={{ top: yOffset }}>
            <motion.h1
                style={{ x: xTransform, willChange: "transform" } as any}
                className="text-[15vw] font-black uppercase tracking-tighter leading-none"
            >
                {text} &nbsp; {text} &nbsp; {text} &nbsp; {text}
            </motion.h1>
        </div>
    );
}
