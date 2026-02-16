'use client';

import React, { RefObject, ReactNode } from 'react';
import NeofetchTile from '@/components/tiles/NeofetchTile';

interface Section {
  id: string;
  title: string;
}

interface ParallaxScrollContainerProps {
  scrollRef: RefObject<HTMLDivElement>;
  borderPadding: number;
  sections: Section[];
  renderSection: (sectionId: string) => ReactNode;
}

/**
 * ParallaxScrollContainer Component
 * Manages the scrollable content area with fixed Neofetch background
 * Handles section rendering with separators and transitions
 *
 * Section divider design inspired by Kyrre Gjerstad's portfolio (https://www.kyrre.dev/)
 * Clean thin lines with gradient dots for minimal, elegant separation between content sections
 */
export const ParallaxScrollContainer: React.FC<ParallaxScrollContainerProps> = ({
  scrollRef,
  borderPadding,
  sections,
  renderSection
}) => {
  return (
    <div
      ref={scrollRef}
      className="fixed overflow-y-auto hide-scrollbar"
      style={{
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        padding: `${borderPadding}px`,
        zIndex: 2,
        scrollBehavior: 'smooth',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling']
      }}
      role="main"
      aria-label="Main content"
    >
      {/* Top Neofetch hero section (scrolls away with content) */}
      <section
        className="relative flex items-center justify-center"
        style={{
          minHeight: '65vh',
          paddingTop: '24px',
          paddingBottom: '20px',
          paddingLeft: '16px',
          paddingRight: '16px',
          zIndex: 2
        }}
        role="region"
        aria-label="Neofetch section"
      >
        <div className="w-full max-w-4xl mx-auto">
          <div
            style={{
              border: '1px solid rgba(var(--accent-color-rgb), 0.25)',
              background: 'transparent',
              padding: '20px'
            }}
          >
            <NeofetchTile isBlurred={false} layout="parallax" />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={`section-${section.id}`}
          className={`relative flex flex-col`}
          style={{
            paddingTop: index === 0 ? '24px' : '32px',
            paddingBottom: '32px',
            paddingLeft: '16px',
            paddingRight: '16px',
            backgroundColor: 'transparent',
            zIndex: 2,
            scrollMarginTop: '0px'
          }}
          role="region"
          aria-label={`${section.title} section`}
        >
          {/* Divider transition from Neofetch to content */}
          {index === 0 && (
            <>
              {/* Line after gradient transition */}
              <div
                className="absolute max-w-3xl mx-auto w-full"
                style={{
                  top: '0',
                  left: '0',
                  right: '0',
                  paddingLeft: '24px',
                  paddingRight: '24px'
                }}
              >
                <div
                  style={{
                    height: '1px',
                    backgroundColor: 'rgba(var(--accent-color-rgb), 0.2)'
                  }}
                />
              </div>
            </>
          )}

          <div
            className="flex-1 flex flex-col justify-start max-w-4xl mx-auto w-full"
            style={{
              paddingLeft: `${borderPadding}px`,
              paddingRight: `${borderPadding}px`
            }}
          >
            {renderSection(section.id)}
          </div>

          {/* Section divider */}
          {index < sections.length - 1 && (
            <div
              className="absolute max-w-3xl mx-auto w-full"
              style={{
                bottom: '0',
                left: '0',
                right: '0',
                paddingLeft: '24px',
                paddingRight: '24px'
              }}
            >
              <div
                style={{
                  height: '1px',
                  backgroundColor: 'rgba(var(--accent-color-rgb), 0.2)'
                }}
              />
            </div>
          )}
        </section>
      ))}
    </div>
  );
};
