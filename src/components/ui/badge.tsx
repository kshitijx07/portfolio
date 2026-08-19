import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "cyan";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "border-transparent bg-zinc-900 text-zinc-100 border border-zinc-800",
    secondary: "border-transparent bg-zinc-800 text-zinc-300",
    outline: "text-zinc-400 border border-zinc-800",
    cyan: "border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-mono",
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
