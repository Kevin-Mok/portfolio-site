'use client';

import { useEffect } from 'react';

/**
 * useEnforceMobileTheme Hook
 * Legacy compatibility hook that clears stale inline accent overrides.
 * Theme selection is now fully managed by ThemeContext on all breakpoints.
 */
export const useEnforceMobileTheme = () => {
  useEffect(() => {
    const cleanupLegacyInlineOverrides = () => {
      const root = document.documentElement;
      root.style.removeProperty('--accent-color');
      root.style.removeProperty('--accent-color-rgb');
    };

    cleanupLegacyInlineOverrides();

    window.addEventListener('resize', cleanupLegacyInlineOverrides);
    window.addEventListener('focus', cleanupLegacyInlineOverrides);

    return () => {
      window.removeEventListener('resize', cleanupLegacyInlineOverrides);
      window.removeEventListener('focus', cleanupLegacyInlineOverrides);
    };
  }, []);
};
