"use client";

import { motion } from "framer-motion";

export default function PageTransition() {
    return (
        <>
            <motion.div
                initial={{ y: "0%" }}
                animate={{ y: "-100%", transitionEnd: { display: "none" } }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="fixed inset-0 z-[100] bg-[#151515] origin-top pointer-events-none"
            />
            <motion.div
                initial={{ y: "0%" }}
                animate={{ y: "-100%", transitionEnd: { display: "none" } }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                className="fixed inset-0 z-[99] bg-[#050505] origin-top pointer-events-none"
            />
        </>
    );
}
