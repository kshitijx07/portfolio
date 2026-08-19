import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export function buttonVariants({
  variant = "default",
  size = "default",
  className = "",
}: {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
} = {}) {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50";

  const variantStyles = {
    default: "bg-cyan-500 text-zinc-950 shadow hover:bg-cyan-400 font-semibold",
    outline: "border border-zinc-800 bg-transparent text-zinc-100 hover:bg-zinc-900 hover:border-zinc-700",
    secondary: "bg-zinc-900 text-zinc-100 shadow-sm hover:bg-zinc-800 border border-zinc-800",
    ghost: "hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100",
    link: "text-cyan-400 underline-offset-4 hover:underline",
  };

  const sizeStyles = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-11 rounded-md px-8 text-base",
    icon: "h-9 w-9",
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
