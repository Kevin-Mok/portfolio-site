import React from 'react';
import type { WorkExperience } from '@/lib/resume-data';

interface WorkEntryProps {
  work: WorkExperience;
}

export const WorkEntry: React.FC<WorkEntryProps> = ({ work }) => {
  return (
    <div className="resume-entry">
      <div className="resume-entry-header">
        <h3 className="entry-company">{work.company}</h3>
        <span className="entry-date">{work.date}</span>
      </div>

      <div className="entry-subtitle">
        <span className="entry-position">{work.title}</span>
        <span className="entry-tech-inline">&lt;{work.languages.join(', ')}&gt;</span>
        {work.evidenceUrl ? (
          <a
            href={work.evidenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="entry-evidence-link"
          >
            {work.evidenceLabel ?? 'Evidence'}
          </a>
        ) : null}
      </div>

      <ul className="resume-bullets">
        {work.bullets.map((bullet, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: bullet }} />
        ))}
      </ul>
    </div>
  );
};
