import React from 'react';

/**
 * PixelIcon Component
 * A wrapper for pixel-art style icons. It enforces the 'pixelated' CSS utility
 * to prevent browsers from applying anti-aliasing (blurring) when scaling the icon.
 *
 * @param {string} className - Optional Tailwind classes (e.g., text-blue-500 w-8 h-8)
 * @param {React.ReactNode} children - The imported icon component (e.g., <Heart />)
 */

interface PixelIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function PixelIcon({ children, className = '', ...props }: PixelIconProps) {
  return (
    <span className={`inline-flex pixelated ${className}`} {...props}>
      {children}
    </span>
  );
}
