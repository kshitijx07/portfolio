"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    // Use MotionValues instead of React State to avoid re-rendering the component 144 times a second!
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth out the motion using Framer Motion springs
    const springConfig = { damping: 25, stiffness: 700, mass: 0.1 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            // Offset by half the width/height depending on hover state
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
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
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999]"
            style={({
                x: cursorXSpring,
                y: cursorYSpring,
                // Center the cursor
                translateX: "-50%",
                translateY: "-50%",
                width: isHovering ? 48 : 16,
                height: isHovering ? 48 : 16,
                willChange: "transform, width, height"
            }) as any}
            animate={{
                scale: isHovering ? 1.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
    );
}
