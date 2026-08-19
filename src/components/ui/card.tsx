import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hudCorners?: boolean;
  glowOnHover?: boolean;
  accentColor?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hudCorners = false,
      glowOnHover = false,
      accentColor = "#B4F342",
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "relative rounded-sm border border-white/10 bg-[#0A0A0A]/90 text-zinc-100 backdrop-blur-md transition-all duration-300 shadow-xl overflow-hidden",
        glowOnHover && "hover:border-[#B4F342] hover:shadow-[0_0_20px_rgba(180,243,66,0.15)]",
        className
      )}
      {...props}
    >
      {hudCorners && (
        <>
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#B4F342] pointer-events-none" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#B4F342] pointer-events-none" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#B4F342] pointer-events-none" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#B4F342] pointer-events-none" />
        </>
      )}
      {children}
    </div>
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 border-b border-white/5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-mono text-lg font-bold leading-none tracking-tight text-white",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-zinc-400 leading-relaxed font-mono", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between p-6 border-t border-white/5 font-mono text-xs text-white/60",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
export default Card;
