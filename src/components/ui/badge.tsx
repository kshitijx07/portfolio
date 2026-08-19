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
      "border-transparent bg-zinc-900 text-zinc-100 border border-zinc-700",
    secondary: "border-transparent bg-zinc-800 text-zinc-200",
    outline: "text-zinc-300 border border-white/20 hover:border-white/40 bg-black/40",
    cyan: "border-[#4DEEEA]/40 bg-[#4DEEEA]/15 text-[#4DEEEA] hover:bg-[#4DEEEA]/25",
    lime: "border-[#B4F342]/50 bg-[#B4F342]/15 text-[#B4F342] hover:bg-[#B4F342]/25",
    orange:
      "border-[#FF3E1D]/50 bg-[#FF3E1D]/15 text-[#FF3E1D] hover:bg-[#FF3E1D]/25",
    hud: "border-white/20 bg-black/70 text-white/90 backdrop-blur-sm hover:border-[#4DEEEA]",
    glow: "border-[#B4F342] bg-[#B4F342] text-black font-bold shadow-[0_0_15px_rgba(180,243,66,0.5)]",
  };

  const dotColors = {
    default: "bg-white",
    secondary: "bg-zinc-300",
    outline: "bg-zinc-300",
    cyan: "bg-[#4DEEEA]",
    lime: "bg-[#B4F342]",
    orange: "bg-[#FF3E1D]",
    hud: "bg-[#4DEEEA]",
    glow: "bg-black",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-xs px-3 py-1 text-xs font-mono font-medium transition-all select-none tracking-normal leading-normal",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {pulseDot && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              dotColors[variant]
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-2 w-2 rounded-full",
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
