import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "cyan" | "accent" | "mono";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "border border-white/10 bg-white/5 text-[#ededed]",
    secondary: "border border-white/8 bg-white/4 text-[#6b6b6b]",
    outline: "text-[#6b6b6b] border border-white/10",
    cyan: "border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-mono",
    accent: "border-[rgba(192,254,4,0.3)] bg-[rgba(192,254,4,0.08)] text-[#C0FE04] font-mono",
    mono: "border border-white/8 bg-transparent text-[#6b6b6b] font-mono",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors font-mono tracking-tight",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
