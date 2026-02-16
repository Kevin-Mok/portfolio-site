import React from 'react';
import { useTechnologies } from '@/lib/config';
import { TechIcon } from '@/components/ui/TechIcon';

/**
 * Technologies section component for parallax layout
 * Displays technology logos in a clean, uniform grid
 */
export const ParallaxTechSection: React.FC = () => {
  const technologies = useTechnologies();

  // Fallback if no technologies configured
  if (!technologies || !technologies.items || technologies.items.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p style={{ color: 'var(--theme-text-dimmed)' }}>
          Technologies section not configured
        </p>
      </div>
    );
  }

  return (
    <div className="parallax-panel parallax-panel-spacious">
      <h2 className="parallax-section-title">Technologies</h2>
      <div className="parallax-tech-grid">
        {technologies.items.map((tech, idx) => (
          <div key={idx}>
            <TechIcon
              iconName={tech.icon}
              name={tech.name}
              size={48}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
