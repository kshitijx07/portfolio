"use client";

import { m, useScroll, useTransform } from "framer-motion";
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
            <m.h1
                style={{ x: xTransform } as any}
                className="text-[10vw] font-black uppercase tracking-tighter leading-none"
            >
                {text} &nbsp; {text}
            </m.h1>
        </div>
    );
}
