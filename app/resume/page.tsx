import React from 'react';
import type { Metadata } from 'next';
import { FramedPageLayout } from '@/components/layout/FramedPageLayout';
import { ResumeContent } from '@/components/tiles/content/ResumeContent';

/**
 * Resume Full Page View
 * Displays resume in LaTeX-inspired styling with PDF download options
 *
 * Route: /resume
 * SEO optimized for recruiters and job search
 */

export const metadata: Metadata = {
  title: 'Resume - Kevin Mok | Software Engineer',
  description: 'Software Engineer specializing in TypeScript, React, Node.js, Python, and cloud infrastructure. Previously at Red Hat. University of Toronto CS graduate.',
  keywords: [
    'Kevin Mok',
    'Resume',
    'CV',
    'Software Engineer',
    'TypeScript Developer',
    'React Developer',
    'Node.js',
    'Python',
    'Cloud Engineer',
    'Full Stack Developer',
    'Red Hat',
    'University of Toronto',
  ],
  openGraph: {
    title: 'Kevin Mok - Software Engineer Resume',
    description: 'Full-stack engineer with expertise in TypeScript, React, Node.js, and cloud infrastructure',
    type: 'profile',
    url: 'https://kevin-mok.com/resume',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Kevin Mok - Software Engineer Resume',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kevin Mok - Software Engineer Resume',
    description: 'TypeScript, React, Node.js, Python | Ex-Red Hat | UofT CS',
    images: ['/opengraph-image.png'],
  },
};

export const revalidate = 3600; // ISR: 1 hour

export default function ResumePage() {
  return (
    <FramedPageLayout>
      <div className="py-8 sm:py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <ResumeContent />
        </div>
      </div>
    </FramedPageLayout>
  );
}
