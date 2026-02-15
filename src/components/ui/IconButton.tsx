'use client'

import { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode
}

export const IconButton = ({ children, className, ...props }: IconButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center rounded-full p-3 cursor-pointer transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/20 disabled:opacity-50 disabled:pointer-events-none ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
