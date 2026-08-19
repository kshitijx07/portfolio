import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "cyan"
    | "lime"
    | "orange"
    | "hud"
    | "glow";
  pulseDot?: boolean;
}

function Badge({
  className,
  variant = "default",
  pulseDot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "border-transparent bg-zinc-900 text-zinc-100 border border-zinc-800",
    secondary: "border-transparent bg-zinc-800 text-zinc-300",
    outline: "text-zinc-400 border border-zinc-800 hover:border-zinc-600",
    cyan: "border-[#4DEEEA]/30 bg-[#4DEEEA]/10 text-[#4DEEEA] hover:bg-[#4DEEEA]/20",
    lime: "border-[#B4F342]/40 bg-[#B4F342]/10 text-[#B4F342] hover:bg-[#B4F342]/20",
    orange:
      "border-[#FF3E1D]/40 bg-[#FF3E1D]/10 text-[#FF3E1D] hover:bg-[#FF3E1D]/20",
    hud: "border-white/15 bg-black/60 text-white/80 backdrop-blur-sm hover:border-[#4DEEEA]",
    glow: "border-[#B4F342] bg-[#B4F342] text-black font-bold shadow-[0_0_12px_rgba(180,243,66,0.5)]",
  };

  const dotColors = {
    default: "bg-white",
    secondary: "bg-zinc-400",
    outline: "bg-zinc-400",
    cyan: "bg-[#4DEEEA]",
    lime: "bg-[#B4F342]",
    orange: "bg-[#FF3E1D]",
    hud: "bg-[#4DEEEA]",
    glow: "bg-black",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs px-2.5 py-0.5 text-xs font-mono font-medium transition-all select-none tracking-tight",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {pulseDot && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              dotColors[variant]
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              dotColors[variant]
            )}
          />
        </span>
      )}
      {children}
    </div>
  );
}

export { Badge };
export default Badge;
