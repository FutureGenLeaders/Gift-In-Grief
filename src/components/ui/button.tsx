
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground shadow-luxury hover:shadow-gold-glow font-medium",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-subtle",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-secondary hover:text-secondary-foreground shadow-subtle",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-muted hover:text-foreground shadow-subtle",
        ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-accent",
        luxury: "bg-gradient-luxury text-primary-foreground hover:shadow-gold-glow transform hover:scale-105 font-semibold shadow-luxury",
      },
      size: {
        default: "h-12 px-6 py-3 text-sm",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
