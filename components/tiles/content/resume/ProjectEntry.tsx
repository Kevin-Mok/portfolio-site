import React from 'react';
import type { ResumeProject } from '@/lib/resume-data';

interface ProjectEntryProps {
  project: ResumeProject;
}

export const ProjectEntry: React.FC<ProjectEntryProps> = ({ project }) => {
  const isNtchartsLink = project.url?.includes('ntcharts.com');

  return (
    <div className="resume-entry">
      <div className="resume-entry-header">
        <div className="entry-headline">
          {project.url ? (
            <h3 className="entry-title">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`entry-title-link${isNtchartsLink ? ' entry-link-ntcharts' : ''}`}
              >
                {project.name}
              </a>
            </h3>
          ) : (
            <h3 className="entry-title">{project.name}</h3>
          )}
          <span className="entry-tech-inline">&lt;{project.languages.join(', ')}&gt;</span>
        </div>
        <span className="entry-date">{project.date}</span>
      </div>

      <ul className="resume-bullets">
        {project.bullets.map((bullet, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: bullet }} />
        ))}
      </ul>
    </div>
  );
};
