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
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xs font-mono font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4F342] disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98] cursor-pointer touch-manipulation";

  const variantStyles = {
    default:
      "bg-white text-black shadow-md hover:bg-white/95 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]",
    neon: "bg-[#B4F342] text-black shadow-md hover:bg-white hover:shadow-[0_0_20px_#B4F342]",
    cyber:
      "bg-[#4DEEEA] text-black shadow-md hover:bg-white hover:shadow-[0_0_20px_#4DEEEA]",
    outline:
      "border border-white/20 bg-black/40 text-white hover:bg-white/10 hover:border-white/40",
    hud: "border border-white/20 bg-black/70 text-white hover:border-[#B4F342] hover:text-[#B4F342] backdrop-blur-md",
    secondary:
      "bg-zinc-900 text-zinc-100 shadow-sm hover:bg-zinc-800 border border-zinc-700",
    glass:
      "bg-white/10 border border-white/20 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40",
    ghost: "hover:bg-white/10 text-white/90 hover:text-white",
    link: "text-[#4DEEEA] underline-offset-4 hover:underline",
  };

  const sizeStyles = {
    xs: "min-h-[38px] px-3 py-1.5 text-xs",
    sm: "min-h-[42px] px-4 py-2 text-xs",
    default: "min-h-[46px] px-5 py-2.5 text-sm",
    lg: "min-h-[50px] px-7 py-3 text-base",
    icon: "min-h-[44px] min-w-[44px] p-2.5",
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
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
export default Button;
