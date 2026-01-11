import React from 'react';

interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ title, children }) => {
  return (
    <section className="resume-section">
      <h2 className="resume-section-title">{title}</h2>
      {children}
    </section>
  );
};
