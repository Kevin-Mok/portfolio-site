import React from 'react';
import Link from 'next/link';

/**
 * Resume CTA section for mobile parallax layout.
 * Keeps homepage concise while routing to the full resume page.
 */
export const ParallaxResumeCtaSection: React.FC = () => {
  return (
    <div className="parallax-panel">
      <h2 className="parallax-section-title">Resume</h2>
      <p className="parallax-section-subtitle">
        See a complete one-page version of my experience, projects, and technical stack.
      </p>

      <div className="parallax-cta-row">
        <Link href="/resume" className="parallax-cta-button">
          Open Resume
        </Link>
        <a
          href="/resume/kevin-mok-resume-web-dev.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="parallax-cta-link"
        >
          PDF
        </a>
      </div>
    </div>
  );
};
