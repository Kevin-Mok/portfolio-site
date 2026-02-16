'use client';

import { useEffect } from 'react';

/**
 * useParallaxTheme Hook
 * Ensures parallax mode uses ThemeContext-driven classes without stale inline overrides.
 */
export const useParallaxTheme = () => {
  useEffect(() => {
    const clearInlineAccentOverrides = () => {
      document.documentElement.style.removeProperty('--accent-color');
      document.documentElement.style.removeProperty('--accent-color-rgb');
    };

    clearInlineAccentOverrides();

    window.addEventListener('resize', clearInlineAccentOverrides);

    return () => {
      window.removeEventListener('resize', clearInlineAccentOverrides);
    };
  }, []);
};
