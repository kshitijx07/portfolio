import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "neon"
    | "cyber"
    | "glass"
    | "hud";
  size?: "default" | "sm" | "lg" | "icon" | "xs";
  loading?: boolean;
  asChild?: boolean;
}

export function buttonVariants({
  variant = "default",
  size = "default",
  className = "",
}: {
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "neon"
    | "cyber"
    | "glass"
    | "hud";
  size?: "default" | "sm" | "lg" | "icon" | "xs";
  className?: string;
} = {}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xs text-xs font-mono font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B4F342] disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98] cursor-pointer";

  const variantStyles = {
    default:
      "bg-white text-black shadow hover:bg-white/90 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]",
    neon: "bg-[#B4F342] text-black shadow hover:bg-white hover:shadow-[0_0_15px_#B4F342]",
    cyber:
      "bg-[#4DEEEA] text-black shadow hover:bg-white hover:shadow-[0_0_15px_#4DEEEA]",
    outline:
      "border border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40",
    hud: "border border-white/15 bg-black/60 text-white hover:border-[#B4F342] hover:text-[#B4F342] backdrop-blur-md",
    secondary:
      "bg-zinc-900 text-zinc-100 shadow-sm hover:bg-zinc-800 border border-zinc-800",
    glass:
      "bg-white/10 border border-white/20 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40",
    ghost: "hover:bg-white/10 text-white/80 hover:text-white",
    link: "text-[#4DEEEA] underline-offset-4 hover:underline",
  };

  const sizeStyles = {
    xs: "h-7 px-2.5 text-[10px]",
    sm: "h-8 px-3 text-xs",
    default: "h-9 px-4 py-2",
    lg: "h-11 px-6 text-sm",
    icon: "h-9 w-9 p-0",
  };

  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      loading = false,
      disabled,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    if (asChild && React.isValidElement<{ className?: string }>(children)) {
      return React.cloneElement(children, {
        className: cn(
          buttonVariants({ variant, size }),
          children.props.className,
          className
        ),
        ...props,
      });
    }

    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
export default Button;
