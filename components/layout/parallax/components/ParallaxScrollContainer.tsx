'use client';

import React, { RefObject, ReactNode } from 'react';

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
 * Manages the scrollable content area for the mobile parallax layout
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
          {/* Top divider for first section */}
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
