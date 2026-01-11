import React from 'react';
import type { Education } from '@/lib/resume-data';

interface EducationEntryProps {
  education: Education;
}

export const EducationEntry: React.FC<EducationEntryProps> = ({ education }) => {
  return (
    <div className="resume-education">
      <h3 className="education-institution">{education.institution}</h3>
      <div className="education-details">
        <span>{education.degree}</span>
        <span>{education.gpa}</span>
        <span>{education.date}</span>
      </div>
    </div>
  );
};
