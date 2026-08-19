import * as React from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  label?: string;
  gradient?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      label,
      gradient = false,
      ...props
    },
    ref
  ) => {
    if (label && orientation === "horizontal") {
      return (
        <div
          ref={ref}
          role={decorative ? "none" : "separator"}
          className={cn("relative flex items-center w-full my-4", className)}
          {...props}
        >
          <div
            className={cn(
              "flex-grow h-[1px]",
              gradient
                ? "bg-gradient-to-r from-transparent via-white/15 to-white/15"
                : "bg-white/10"
            )}
          />
          <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-widest text-white/40 bg-[#050505] border border-white/10 rounded-xs">
            {label}
          </span>
          <div
            className={cn(
              "flex-grow h-[1px]",
              gradient
                ? "bg-gradient-to-l from-transparent via-white/15 to-white/15"
                : "bg-white/10"
            )}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(
          "shrink-0",
          gradient
            ? orientation === "horizontal"
              ? "h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              : "h-full w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"
            : orientation === "horizontal"
            ? "h-[1px] w-full bg-white/10"
            : "h-full w-[1px] bg-white/10",
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

export { Separator };
export default Separator;
