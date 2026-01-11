import React from 'react';
import type { WorkExperience } from '@/lib/resume-data';

interface WorkEntryProps {
  work: WorkExperience;
}

export const WorkEntry: React.FC<WorkEntryProps> = ({ work }) => {
  return (
    <div className="resume-entry">
      <h3 className="entry-company">{work.company}</h3>

      <div className="entry-subtitle">
        <span className="entry-position">{work.title}</span>
        <span className="entry-date">{work.date}</span>
      </div>

      <div className="entry-tech">{work.languages.join(', ')}</div>

      <ul className="resume-bullets">
        {work.bullets.map((bullet, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: bullet }} />
        ))}
      </ul>
    </div>
  );
};
