import { useCallback, RefObject } from 'react';

interface Section {
  id: string;
  title: string;
}

interface UseSectionNavigationReturn {
  navigateToSection: (sectionId: string, callbacks?: NavigationCallbacks) => void;
  navigateToNextSection: (activeSection: string, reverse?: boolean) => void;
}

interface NavigationCallbacks {
  onNavigate?: (sectionId: string) => void;
  onProjectsLeave?: () => void;
  onBlogLeave?: () => void;
}

/**
 * Custom hook for managing section navigation in parallax layout
 * Handles programmatic scrolling to sections and wraparound navigation
 */
export function useSectionNavigation(
  scrollRef: RefObject<HTMLDivElement>,
  sections: Section[]
): UseSectionNavigationReturn {

  const navigateToSection = useCallback((
    sectionId: string,
    callbacks?: NavigationCallbacks
  ) => {
    // Call navigation callback if provided
    callbacks?.onNavigate?.(sectionId);

    // Reset selections when navigating away from their sections
    if (sectionId !== 'projects') callbacks?.onProjectsLeave?.();
    if (sectionId !== 'blog') callbacks?.onBlogLeave?.();

    const element = document.getElementById(`section-${sectionId}`);
    const container = scrollRef.current;

    if (element && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const targetScroll = container.scrollTop + (elementRect.top - containerRect.top);

      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    } else {
      console.error('[useSectionNavigation] Failed to find element or container');
    }
  }, [scrollRef]);

  const navigateToNextSection = useCallback((
    activeSection: string,
    reverse = false
  ) => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    const normalizedIndex = currentIndex >= 0 ? currentIndex : 0;
    const direction = reverse ? -1 : 1;
    let nextIndex = normalizedIndex + direction;

    // Wrap around navigation.
    if (nextIndex >= sections.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = sections.length - 1;

    navigateToSection(sections[nextIndex].id);
  }, [sections, navigateToSection]);

  return {
    navigateToSection,
    navigateToNextSection
  };
}
