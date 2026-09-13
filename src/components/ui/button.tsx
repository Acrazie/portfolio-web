import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap outline-none select-none transition-[background-color,color,transform] duration-200 ease-out hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black active:translate-y-px disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-black text-white hover:bg-black/82 focus-visible:ring-black focus-visible:ring-offset-white',
        inverse: 'bg-white text-black hover:bg-white/86',
        outline: 'border-black bg-white text-black hover:bg-black hover:text-white focus-visible:ring-black focus-visible:ring-offset-white',
        ghost: 'bg-transparent text-current hover:bg-black/8 focus-visible:ring-black focus-visible:ring-offset-white',
        link: 'rounded-none bg-transparent text-current underline decoration-current/35 underline-offset-4 hover:translate-y-0 hover:decoration-current focus-visible:ring-black focus-visible:ring-offset-white',
      },
      size: {
        default: 'min-h-11 gap-2 px-4 py-2.5',
        sm: 'min-h-10 gap-2 px-3.5 py-2 text-xs',
        lg: 'min-h-12 gap-2.5 px-6 py-3 text-base',
        icon: 'size-11 p-0',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
