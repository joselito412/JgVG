'use client';

// Note: To make this hook work properly, you will need to add three files
// into your /public/sounds/ directory:
// 1. hover.mp3 (A soft retro UI click or tick)
// 2. click.mp3 (A solid retro button press)
// 3. text-blip.wav (A very short >0.05s blip from jsfxr for RPG typewriter effects)

import useSound from 'use-sound';

export function useRetroUI() {
  // Configuración de los sonidos. Asegurar volumen bajo para evitar estridencias.
  // El archivo DEBE existir en la carpeta /public/sounds/
  const [playHoverOriginal] = useSound('/sounds/hover.mp3', { volume: 0.15 });
  const [playClickOriginal] = useSound('/sounds/click.mp3', { volume: 0.3 });
  
  // interrupt: true corta el sonido anterior si se invoca rápidamente (ideal para tipeo rápido).
  const [playBlipOriginal] = useSound('/sounds/text-blip.wav', { volume: 0.1, interrupt: true });

  // Wrappers seguros para evitar errores si la librería decide fallar o el audio no carga
  const playHover = () => {
    try { playHoverOriginal(); } catch (e) { /* ignore */ }
  };
  
  const playClick = () => {
    try { playClickOriginal(); } catch (e) { /* ignore */ }
  };

  const playBlip = () => {
    try { playBlipOriginal(); } catch (e) { /* ignore */ }
  };

  return { playHover, playClick, playBlip };
}
