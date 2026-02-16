'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getImageUrl } from '@/lib/image-paths';

// Theme preset types - Final three-tier system
export type ThemePreset = 'solarized-light' | 'nord' | 'tokyo-night';

// Default accent colors for each theme preset (per spec)
const themeDefaultAccents: Record<ThemePreset, AccentColor> = {
  'solarized-light': 'pink',    // #d33682 maps closest to pink/magenta
  'nord': 'sky',                 // #0ea5e9 (sky blue accent for Nord)
  'tokyo-night': 'purple'        // #bb9af7 maps to purple
};

// Background images for each theme preset
export const themeBackgrounds: Record<ThemePreset, string[]> = {
  'tokyo-night': [
    getImageUrl('night-sky.webp'),
    getImageUrl('circuit-board-city.webp'),
    getImageUrl('motorcycle-night.webp'),
    getImageUrl('aurora-lights.webp'),
    getImageUrl('dashboard-futuristic.webp')
  ],
  'nord': [
    getImageUrl('night-sky.webp'),
    getImageUrl('circuit-board-city.webp'),
    getImageUrl('motorcycle-night.webp'),
    getImageUrl('aurora-lights.webp'),
    getImageUrl('dashboard-futuristic.webp')
  ],
  'solarized-light': [
    getImageUrl('night-sky.webp'),
    getImageUrl('circuit-board-city.webp'),
    getImageUrl('motorcycle-night.webp'),
    getImageUrl('aurora-lights.webp'),
    getImageUrl('dashboard-futuristic.webp')
  ]
};

// Accent color types
export type AccentColor =
  | 'rose' | 'pink' | 'fuchsia' | 'purple' | 'violet'
  | 'indigo' | 'blue' | 'sky' | 'cyan' | 'teal'
  | 'emerald' | 'green' | 'lime' | 'amber' | 'orange';

// Map accent colors to hex values
export const accentColorMap: Record<AccentColor, string> = {
  rose: '#f43f5e',
  pink: '#ec4899',
  fuchsia: '#d946ef',
  purple: '#a855f7',
  violet: '#8b5cf6',
  indigo: '#6366f1',
  blue: '#3b82f6',
  sky: '#0ea5e9',
  cyan: '#06b6d4',
  teal: '#14b8a6',
  emerald: '#10b981',
  green: '#22c55e',
  lime: '#84cc16',
  amber: '#f59e0b',
  orange: '#f97316'
};

// Theme state interface
interface ThemeState {
  preset: ThemePreset;
  accentColor: AccentColor;
  backgroundEffect: boolean;
  backgroundImage: string | null;  // null = no background, string = image path
}

// Theme context value interface
interface ThemeContextValue {
  theme: ThemeState;
  setThemePreset: (preset: ThemePreset) => void;
  setAccentColor: (color: AccentColor) => void;
  toggleBackgroundEffect: () => void;
  setBackgroundImage: (image: string | null) => void;
  getAccentHex: () => string;
}

// Create context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Local storage keys
const STORAGE_KEYS = {
  preset: 'theme-preset',
  accent: 'theme-accent',
  backgroundEffect: 'theme-background-effect',
  backgroundImagePrefix: 'theme-background-image-'  // Per-theme storage
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with defaults - start with Nord theme
  const [theme, setTheme] = useState<ThemeState>({
    preset: 'nord',
    accentColor: themeDefaultAccents['nord'],  // Use theme default (sky)
    backgroundEffect: true,
    backgroundImage: themeBackgrounds['nord'][0]  // Default to first bg of theme
  });

  // Load saved preferences on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load from localStorage
    const loadedPreset = (localStorage.getItem(STORAGE_KEYS.preset) as ThemePreset) || 'nord';
    const loadedBgEffect = localStorage.getItem(STORAGE_KEYS.backgroundEffect);
    const loadedBgImage = localStorage.getItem(`${STORAGE_KEYS.backgroundImagePrefix}${loadedPreset}`);

    // Don't load accent from storage - always use theme default
    const defaultAccent = themeDefaultAccents[loadedPreset];

    // Load background image for this theme, or use first in array
    const defaultBgImage = loadedBgImage || themeBackgrounds[loadedPreset][0];

    setTheme(prev => ({
      ...prev,
      preset: loadedPreset,
      accentColor: defaultAccent,  // Always use theme default
      backgroundEffect: loadedBgEffect === null ? prev.backgroundEffect : loadedBgEffect === 'true',
      backgroundImage: defaultBgImage
    }));
  }, []);

  // Apply theme preset and background-effect classes to root element.
  // Keep this separate from accent updates to avoid flicker to :root defaults.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const legacyThemeClasses = ['tokyo-night', 'nord', 'solarized-light'];
    legacyThemeClasses.forEach((cls) => root.classList.remove(cls));

    // Remove old theme classes using classList API
    const classesToRemove: string[] = [];
    root.classList.forEach((cls) => {
      if (cls.startsWith('theme-')) {
        classesToRemove.push(cls);
      }
    });
    classesToRemove.forEach((cls) => root.classList.remove(cls));

    // Add current theme class
    root.classList.add(`theme-${theme.preset}`);

    // Handle background effect
    if (theme.backgroundEffect) {
      root.classList.add('bg-effect-enabled');
    } else {
      root.classList.remove('bg-effect-enabled');
    }

  }, [theme.preset, theme.backgroundEffect]);

  // Apply accent class independently so accent changes do not touch theme classes.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const expectedThemeClass = `theme-${theme.preset}`;
    const hasThemeClass = Array.from(root.classList).some((cls) => cls.startsWith('theme-'));
    if (!hasThemeClass) {
      root.classList.add(expectedThemeClass);
    }
    const legacyThemeClasses = ['tokyo-night', 'nord', 'solarized-light'];
    legacyThemeClasses.forEach((cls) => root.classList.remove(cls));

    const classesToRemove: string[] = [];
    root.classList.forEach((cls) => {
      if (cls.startsWith('accent-')) {
        classesToRemove.push(cls);
      }
    });
    classesToRemove.forEach((cls) => root.classList.remove(cls));

    root.classList.add(`accent-${theme.accentColor}`);
  }, [theme.accentColor]);

  // Cleanup any stale inline accent overrides left by legacy mobile theme logic.
  useEffect(() => {
    const cleanupInlineAccentOverrides = () => {
      const root = document.documentElement;
      root.style.removeProperty('--accent-color');
      root.style.removeProperty('--accent-color-rgb');
    };

    cleanupInlineAccentOverrides();

    const handleResize = () => {
      if (typeof window === 'undefined') return;
      cleanupInlineAccentOverrides();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set theme preset - resets accent to theme default per spec
  const setThemePreset = useCallback((preset: ThemePreset) => {
    const defaultAccent = themeDefaultAccents[preset];

    // Load saved background for this theme, or use first as default
    const savedBgImage = localStorage.getItem(`${STORAGE_KEYS.backgroundImagePrefix}${preset}`);
    const defaultBgImage = savedBgImage || themeBackgrounds[preset][0];

    setTheme(prev => ({
      ...prev,
      preset,
      accentColor: defaultAccent,  // Reset to theme's default accent
      backgroundImage: defaultBgImage  // Load theme-specific background
    }));
    localStorage.setItem(STORAGE_KEYS.preset, preset);
    // Remove saved accent color to prevent persistence across themes
    localStorage.removeItem(STORAGE_KEYS.accent);
  }, []);

  // Set accent color
  const setAccentColor = useCallback((color: AccentColor) => {
    setTheme(prev => ({ ...prev, accentColor: color }));
    localStorage.setItem(STORAGE_KEYS.accent, color);
  }, []);

  // Toggle background effect
  const toggleBackgroundEffect = useCallback(() => {
    setTheme(prev => {
      const newValue = !prev.backgroundEffect;
      localStorage.setItem(STORAGE_KEYS.backgroundEffect, String(newValue));
      return { ...prev, backgroundEffect: newValue };
    });
  }, []);

  // Set background image - saves per-theme
  const setBackgroundImage = useCallback((image: string | null) => {
    setTheme(prev => ({ ...prev, backgroundImage: image }));
    const key = `${STORAGE_KEYS.backgroundImagePrefix}${theme.preset}`;
    if (image === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, image);
    }
  }, [theme.preset]);

  // Get current accent color hex value
  const getAccentHex = useCallback(() => {
    return accentColorMap[theme.accentColor];
  }, [theme.accentColor]);

  // Memoize context value to prevent unnecessary re-renders
  const value: ThemeContextValue = React.useMemo(() => ({
    theme,
    setThemePreset,
    setAccentColor,
    toggleBackgroundEffect,
    setBackgroundImage,
    getAccentHex
  }), [theme, setThemePreset, setAccentColor, toggleBackgroundEffect, setBackgroundImage, getAccentHex]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

// Optional: Export specific theme hooks
export const useThemePreset = () => {
  const { theme, setThemePreset } = useTheme();
  return { preset: theme.preset, setThemePreset };
};

export const useAccentColor = () => {
  const { theme, setAccentColor, getAccentHex } = useTheme();
  return {
    accentColor: theme.accentColor,
    setAccentColor,
    accentHex: getAccentHex()
  };
};

export const useBackgroundEffect = () => {
  const { theme, toggleBackgroundEffect } = useTheme();
  return {
    backgroundEffect: theme.backgroundEffect,
    toggleBackgroundEffect
  };
};
