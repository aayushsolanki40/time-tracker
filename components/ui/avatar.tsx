'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils'

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const AvatarGroup = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    images: string[]
    maxVisible?: number
  }
>(({ className, images, maxVisible = 3, ...props }, ref) => {
  const visibleImages = images.slice(0, maxVisible)
  const remainingCount = images.length - maxVisible

  return (
    <div className="flex -space-x-3 *:ring *:ring-background">
      {visibleImages.map((image, index) => (
        <AvatarPrimitive.Root
          key={index}
          ref={ref}
          className={cn(
            'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
            className,
          )}
          {...props}
        >
          <AvatarPrimitive.Image src={image} />
        </AvatarPrimitive.Root>
      ))}
      {remainingCount > 0 && (
        <AvatarPrimitive.Root
          ref={ref}
          className={cn(
            'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted',
            className,
          )}
          {...props}
        >
          <AvatarPrimitive.Fallback className="flex justify-center items-center w-full h-full text-sm font-bold">
            +{remainingCount}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
      )}
    </div>
  )
})
AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
