import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: cn([
          'bg-brand-violet',
          'rounded-15',
          'text-brand-white uppercase text-lg font-bold '
        ]),
        primary: cn([
          'bg-brand-red',
          'rounded-15',
          'text-brand-white uppercase text-lg font-bold '
        ]),
        outline: cn([
          'border border-brand-violet',
          'bg-gradient-darkblue',
          'rounded-15',
          'text-center text-brand-pink uppercase',
        ]),
        secondary: cn([
          'border border-brand-orange',
          'bg-brand-orange',
          'rounded-15',
          'text-center text-brand-white uppercase',
        ]),
        plain: cn(['text-brand-skyblue text-base uppercase font-noto-sans']),
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        controls: cn([
          'rounded-full',
          'bg-gradient-icon',
          'border border-brand-grayAccent',
          'flex items-center justify-center',
        ]),
        image: '',
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        outline: 'min-w-[362px] min-h-[64px]',
        controls: 'h-[109px] w-[109px] ',
        image: 'w-full h-full'
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
