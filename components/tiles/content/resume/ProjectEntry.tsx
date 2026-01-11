import React from 'react';
import type { ResumeProject } from '@/lib/resume-data';

interface ProjectEntryProps {
  project: ResumeProject;
}

export const ProjectEntry: React.FC<ProjectEntryProps> = ({ project }) => {
  return (
    <div className="resume-entry">
      <div className="resume-entry-header">
        {project.url ? (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="entry-title">
            {project.name}
          </a>
        ) : (
          <h3 className="entry-title">{project.name}</h3>
        )}
        <span className="entry-date">{project.date}</span>
      </div>

      <div className="entry-subtitle">
        <span className="entry-tech">{project.languages.join(', ')}</span>
      </div>

      <ul className="resume-bullets">
        {project.bullets.map((bullet, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: bullet }} />
        ))}
      </ul>
    </div>
  );
};
