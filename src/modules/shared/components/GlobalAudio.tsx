'use client';

import { useEffect } from 'react';
import { useRetroUI } from '../hooks/useRetroUI';

/**
 * GlobalAudio Component
 * Mount this component once at the root level (e.g., in layout.tsx or page.tsx).
 * It uses event delegation to play UI sounds on ANY interactable element 
 * (buttons, links, or items with .rpg-menu-item) across the entire app.
 * This pattern keeps the React component tree completely clean of audio hooks.
 */
export function GlobalAudio() {
  const { playHover, playClick } = useRetroUI();

  useEffect(() => {
    // Avoid double-firing on nested elements by checking standard interactive tags
    const playHoverSafe = () => playHover();
    const playClickSafe = () => playClick();

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .rpg-menu-item, .win95-btn, [role="button"]')) {
        playHoverSafe();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .rpg-menu-item, .win95-btn, [role="button"]')) {
        playClickSafe();
      }
    };

    // Use capturing phase so it plays immediately before React state updates might unmount the node
    document.addEventListener('mouseover', handleMouseOver, { capture: true });
    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver, { capture: true });
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [playHover, playClick]);

  return null; // This component has no UI footprint
}
