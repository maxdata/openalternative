"use client"

import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import type { ComponentProps } from "react"
import { H4 } from "~/components/common/heading"
import { Prose } from "~/components/web/ui/prose"
import { cx } from "~/utils/cva"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    className={cx(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
  />
)

const DialogContent = ({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cx(
          "fixed left-1/2 top-1/4 z-50 grid w-[95%] max-w-lg max-h-dvh -translate-x-1/2 gap-4 border bg-background p-4 rounded-md shadow-lg sm:p-6 sm:rounded-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:slide-out-to-bottom-4",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-ring disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

const DialogHeader = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cx("flex flex-col gap-2 text-start", className)} {...props} />
}

const DialogFooter = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cx(
        "flex flex-col-reverse gap-2 -m-4 mt-0 px-4 py-3 border-t md:flex-row md:justify-between sm:-m-6 sm:mt-0 sm:px-6 sm:py-4",
        className,
      )}
      {...props}
    />
  )
}

const DialogTitle = ({ children, ...props }: ComponentProps<typeof DialogPrimitive.Title>) => {
  return (
    <DialogPrimitive.Title asChild {...props}>
      <H4>{children}</H4>
    </DialogPrimitive.Title>
  )
}

const DialogDescription = ({
  children,
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) => {
  return (
    <DialogPrimitive.Description asChild className={cx("text-sm/normal", className)} {...props}>
      <Prose>{children}</Prose>
    </DialogPrimitive.Description>
  )
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
