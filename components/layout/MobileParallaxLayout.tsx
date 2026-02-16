'use client';

import React, { useRef, useCallback } from 'react';
import { usePersonalInfo } from '@/lib/config';
import Background from '@/components/layout/Background';
import ScrollProgress from '@/components/ui/ScrollProgress';

// Import custom hooks
import { useParallaxScroll } from './parallax/hooks/useParallaxScroll';
import { useSectionNavigation } from './parallax/hooks/useSectionNavigation';
import { useParallaxKeyboard } from './parallax/hooks/useParallaxKeyboard';
import { useParallaxTheme } from './parallax/hooks/useParallaxTheme';

// Import components
import { ParallaxBorderFrame } from './parallax/components/ParallaxBorderFrame';
import { ParallaxScrollContainer } from './parallax/components/ParallaxScrollContainer';

// Import section components
import { ParallaxBioSection } from './parallax/sections/ParallaxBioSection';
import { ParallaxTechSection } from './parallax/sections/ParallaxTechSection';
import { ParallaxResumeCtaSection } from './parallax/sections/ParallaxResumeCtaSection';
import { ParallaxThemeSettingsSection } from './parallax/sections/ParallaxThemeSettingsSection';

/**
 * MobileParallaxLayout Component
 * Main orchestrator for the mobile parallax scrolling experience
 * Coordinates theme, scrolling, navigation and content sections
 *
 * Design inspired by Kyrre Gjerstad's portfolio (https://www.kyrre.dev/)
 */
const MobileParallaxLayout: React.FC = () => {
  const personal = usePersonalInfo();
  const scrollRef = useRef<HTMLDivElement>(null!);

  // Border padding for glass elevator effect (constant 16px for mobile-only parallax)
  // Future: When desktop parallax is added, use responsive logic (32px for ≥1024px)
  const borderPadding = 16;

  // Sections for scrolling - compact, high-impact mobile flow.
  const sections = [
    { id: 'bio', title: 'Bio' },
    { id: 'technologies', title: 'Technologies' },
    { id: 'resume', title: 'Resume' },
    { id: 'settings', title: 'Settings' }
  ];

  // Use custom hooks for theme enforcement
  useParallaxTheme();

  // Use custom hooks for scroll management
  const {
    activeSection,
    scrollPercent
  } = useParallaxScroll(scrollRef, sections);

  // Use custom hooks for navigation
  const {
    navigateToSection: baseNavigateToSection,
    navigateToNextSection: baseNavigateToNextSection
  } = useSectionNavigation(scrollRef, sections);

  // Wrap navigation functions
  const navigateToSection = useCallback((sectionId: string) => {
    baseNavigateToSection(sectionId);
  }, [baseNavigateToSection]);

  const navigateToNextSection = useCallback((reverse = false) => {
    baseNavigateToNextSection(activeSection, reverse);
  }, [activeSection, baseNavigateToNextSection]);

  // Use keyboard navigation hook
  useParallaxKeyboard(
    sections,
    activeSection,
    navigateToSection,
    navigateToNextSection,
    {
      onEscape: () => {},
      onPanelToggle: () => {}
    }
  );

  // Render content sections using extracted components
  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'bio':
        return <ParallaxBioSection personal={personal} />;

      case 'technologies':
        return <ParallaxTechSection />;

      case 'resume':
        return <ParallaxResumeCtaSection />;

      case 'settings':
        return <ParallaxThemeSettingsSection />;

      default:
        return null;
    }
  };

  return (
    <>
      <Background minimalOverlay />

      {/* Custom scrollbar positioned outside window frame */}
      <ScrollProgress scrollPercent={scrollPercent} />

      {/* Border frame without glass overlays (keeps mobile background truly transparent). */}
      <ParallaxBorderFrame borderPadding={borderPadding} showGlassEffects={false} />

      {/* Scrollable content container */}
      <ParallaxScrollContainer
        scrollRef={scrollRef}
        borderPadding={borderPadding}
        sections={sections}
        renderSection={renderSection}
      />
    </>
  );
};

export default MobileParallaxLayout;
