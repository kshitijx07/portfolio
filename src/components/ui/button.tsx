import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "accent" | "ghost-accent";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export function buttonVariants({
  variant = "default",
  size = "default",
  className = "",
}: {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "accent" | "ghost-accent";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
} = {}) {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0FE04]/60 disabled:pointer-events-none disabled:opacity-50";

  const variantStyles = {
    default: "bg-white/10 text-[#ededed] border border-white/12 hover:bg-white/16 hover:border-white/20",
    accent: "bg-[#C0FE04] text-[#0a0a0a] font-semibold hover:bg-[#d4ff1a] shadow-[0_0_20px_rgba(192,254,4,0.15)]",
    "ghost-accent": "border border-[rgba(192,254,4,0.25)] text-[#C0FE04] bg-transparent hover:bg-[rgba(192,254,4,0.06)]",
    outline: "border border-white/12 bg-transparent text-[#ededed] hover:bg-white/6 hover:border-white/20",
    secondary: "bg-white/6 text-[#ededed] border border-white/8 hover:bg-white/10",
    ghost: "hover:bg-white/6 text-[#6b6b6b] hover:text-[#ededed]",
    link: "text-[#C0FE04] underline-offset-4 hover:underline",
  };

  const sizeStyles = {
    default: "h-10 px-5 py-2",
    sm: "h-8 px-4 text-xs",
    lg: "h-12 px-7 text-base",
    icon: "h-10 w-10",
  };

  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    if (asChild && React.isValidElement<{ className?: string }>(children)) {
      return React.cloneElement(children, {
        className: cn(buttonVariants({ variant, size }), children.props.className, className),
        ...props,
      });
    }

    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
