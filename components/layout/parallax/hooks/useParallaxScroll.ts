import { useEffect, useState, RefObject } from 'react';
import { useScroll, MotionValue } from 'framer-motion';

interface Section {
  id: string;
  title: string;
}

interface UseParallaxScrollReturn {
  activeSection: string;
  scrollPercent: number;
  scrollYProgress: MotionValue<number>;
}

/**
 * Custom hook for managing parallax scroll behavior
 * Handles scroll tracking, active section detection, and scroll-based animations
 */
export function useParallaxScroll(
  scrollRef: RefObject<HTMLDivElement>,
  sections: Section[]
): UseParallaxScrollReturn {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? 'neofetch');
  const [scrollPercent, setScrollPercent] = useState(0);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    container: scrollRef
  });

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const container = scrollRef.current;
      if (!container) return;

      const scrollPosition = container.scrollTop;
      const maxScrollable = Math.max(container.scrollHeight - container.clientHeight, 1);
      const viewportCenter = window.innerHeight / 2;

      // Calculate scroll percentage for smooth tracking
      const percent = Math.round((scrollPosition / maxScrollable) * 100);
      setScrollPercent(percent);

      // Check if we're at the top (Neofetch section)
      if (scrollPosition < window.innerHeight * 0.4) {
        setActiveSection('neofetch');  // Special case for top
        return;
      }

      // Determine active section by closest section center to viewport center.
      let closestSection = sections[0]?.id ?? 'neofetch';
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const sectionElement = document.getElementById(`section-${section.id}`);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          const sectionCenter = rect.top + (rect.height / 2);
          const distanceToCenter = Math.abs(sectionCenter - viewportCenter);
          if (distanceToCenter < closestDistance) {
            closestDistance = distanceToCenter;
            closestSection = section.id;
          }
        }
      });

      setActiveSection(closestSection);
    };

    const container = scrollRef.current;
    container?.addEventListener('scroll', handleScroll, { passive: true });

    // Initial call to set state
    handleScroll();

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef, sections]);

  return {
    activeSection,
    scrollPercent,
    scrollYProgress
  };
}
