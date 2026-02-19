import React from 'react';
import type { Education } from '@/lib/resume-data';

interface EducationEntryProps {
  education: Education;
}

export const EducationEntry: React.FC<EducationEntryProps> = ({ education }) => {
  return (
    <div className="resume-education">
      <div className="education-header">
        <h3 className="education-institution">{education.institution}</h3>
        <span className="entry-date">{education.date}</span>
      </div>
      <p className="education-details">
        {education.degree} — {education.gpa}
      </p>
    </div>
  );
};
