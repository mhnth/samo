import { useCallback, useEffect, useState } from 'react';

export const useMediaQuery = (width: string, max?: boolean) => {
  const [targetReached, setTargetReached] = useState<null | boolean>(null);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    let media = window.matchMedia(`(min-width: ${width})`);

    if (max) {
      media = window.matchMedia(`(max-width: ${width})`);
    }
    media.addEventListener('change', (e) => updateTarget(e));

    // On component mount, we immediately check the media query's state
    if (media.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, [max, width, updateTarget]);

  return targetReached;
};
