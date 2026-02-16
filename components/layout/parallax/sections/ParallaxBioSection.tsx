import React from 'react';

interface PersonalInfo {
  name: string;
  greeting?: string;
  title: string;
  bio: {
    intro?: string;
    experience?: string;
    leadership?: string;
    tagline?: string;
    // Fallback fields
    short?: string;
    long?: string;
  };
}

interface ParallaxBioSectionProps {
  personal: PersonalInfo;
}

/**
 * Bio section component for parallax layout
 * Displays extended professional narrative with proper viewport fitting
 */
export const ParallaxBioSection: React.FC<ParallaxBioSectionProps> = ({
  personal
}) => {
  // Use structured bio fields with fallbacks to legacy fields
  const intro = personal.bio.intro || personal.bio.short || '';
  const experience = personal.bio.experience || '';
  const leadership = personal.bio.leadership || personal.bio.long || '';
  const tagline = personal.bio.tagline || '';

  return (
    <div className="parallax-panel parallax-panel-spacious">
      <h2 className="parallax-section-title">
        {personal.greeting || `Hi, I'm ${personal.name}`}
      </h2>

      <div className="parallax-copy-stack">
        {intro && <p className="parallax-copy-lead">{intro}</p>}
        {experience && <p className="parallax-copy-body">{experience}</p>}
        {leadership && <p className="parallax-copy-body parallax-copy-muted">{leadership}</p>}
        {tagline && <p className="parallax-copy-tagline">{tagline}</p>}
      </div>
    </div>
  );
};
