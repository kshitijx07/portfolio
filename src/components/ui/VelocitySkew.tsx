"use client";

import { useRef } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

export default function VelocitySkew({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smooth out the velocity reading
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Map the smoothed velocity to a slight skew angle (-3deg to 3deg max)
    const skewY = useTransform(smoothVelocity, [-1000, 1000], [-3, 3], { clamp: true });

    return (
        <motion.div ref={ref} style={{ skewY }} className={className}>
            {children}
        </motion.div>
    );
}
