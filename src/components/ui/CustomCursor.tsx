"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    // Primary Cursor Dot (Fast)
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfigDot = { damping: 25, stiffness: 700, mass: 0.1 };
    const cursorXSpring = useSpring(cursorX, springConfigDot);
    const cursorYSpring = useSpring(cursorY, springConfigDot);

    // Secondary Aura Ring (Slower/Trailing)
    const auraX = useMotionValue(-100);
    const auraY = useMotionValue(-100);
    const springConfigAura = { damping: 20, stiffness: 300, mass: 0.5 };
    const auraXSpring = useSpring(auraX, springConfigAura);
    const auraYSpring = useSpring(auraY, springConfigAura);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            auraX.set(e.clientX);
            auraY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "button" ||
                target.tagName.toLowerCase() === "a" ||
                target.closest("button") ||
                target.closest("a") ||
                target.hasAttribute("data-magnetic")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, auraX, auraY]);

    return (
        <>
            {/* Trailing Aura Ring */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-white/30"
                style={{
                    x: auraXSpring,
                    y: auraYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: isHovering ? 64 : 32,
                    height: isHovering ? 64 : 32,
                    willChange: "transform, width, height",
                    opacity: isHovering ? 0 : 1
                } as any}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            {/* Fast Primary Dot */}
            <motion.div
                className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999]"
                style={({
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: isHovering ? 48 : 8,
                    height: isHovering ? 48 : 8,
                    willChange: "transform, width, height"
                }) as any}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,1)",
                    backdropFilter: isHovering ? "blur(4px)" : "blur(0px)"
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
        </>
    );
}
