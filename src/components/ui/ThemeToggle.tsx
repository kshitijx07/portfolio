"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem("editorial_theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("editorial_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#FFFDF9] dark:bg-[#1C1B19] border border-[#E8E3DA] dark:border-[#2E2C29] shadow-lg text-[#1A1918] dark:text-[#FAF9F7] hover:border-[#C86D51] dark:hover:border-[#E07A5F] transition-all flex items-center gap-2 group cursor-pointer"
      title={`Switch to ${theme === "light" ? "Luxury Dark Charcoal" : "Warm Off-White"} Mode`}
      data-cursor="Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === "light" ? (
          <Moon size={18} className="text-[#1A1918] group-hover:text-[#C86D51] transition-colors" />
        ) : (
          <Sun size={18} className="text-[#E07A5F] transition-colors" />
        )}
      </div>

      <span className="text-xs font-mono font-medium hidden md:inline-block pr-1">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
    </motion.button>
  );
}
