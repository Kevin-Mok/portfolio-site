'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  pdfVariants,
  resumeVariantById,
  resolveResumeVariantId,
  type ResumeVariantId,
} from '@/lib/resume-data';
import { ResumeHeader } from './resume/ResumeHeader';
import { ResumeSection } from './resume/ResumeSection';
import { ProjectEntry } from './resume/ProjectEntry';
import { WorkEntry } from './resume/WorkEntry';
import { EducationEntry } from './resume/EducationEntry';

interface ResumeContentProps {
  initialVariantId?: string;
  renderMode?: 'screen' | 'pdf';
}

const ResumeContentComponent: React.FC<ResumeContentProps> = ({
  initialVariantId,
  renderMode = 'screen',
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<ResumeVariantId>(() =>
    resolveResumeVariantId(initialVariantId)
  );

  useEffect(() => {
    setSelectedVariantId(resolveResumeVariantId(initialVariantId));
  }, [initialVariantId]);

  const selectedVariant = resumeVariantById[selectedVariantId];
  const sectionTitles = useMemo(
    () => ({
      projects: selectedVariant.sectionTitles?.projects ?? 'Web Dev Projects',
      experience: selectedVariant.sectionTitles?.experience ?? 'Work Experience',
      skills: selectedVariant.sectionTitles?.skills ?? 'Skills',
      education: selectedVariant.sectionTitles?.education ?? 'Education',
    }),
    [selectedVariant.sectionTitles]
  );

  const resume = selectedVariant.resume;

  return (
    <div className={`resume-latex ${renderMode === 'pdf' ? 'resume-latex--pdf' : 'resume-latex--screen'}`}>
      <ResumeHeader contact={resume.contact} />

      <div className="pdf-download-section">
        <a href={`/resume/${selectedVariant.fileName}`} download className="pdf-download-btn">
          Download PDF
        </a>

        <div className="pdf-variant-selector">
          <label htmlFor="pdf-variant">Resume variant:</label>
          <select
            id="pdf-variant"
            value={selectedVariantId}
            onChange={(e) => setSelectedVariantId(resolveResumeVariantId(e.target.value))}
          >
            {pdfVariants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedVariant.summary && (
        <ResumeSection title="Summary">
          <p className="resume-summary">{selectedVariant.summary}</p>
        </ResumeSection>
      )}

      <ResumeSection title={sectionTitles.projects}>
        {resume.projects.map((project) => (
          <ProjectEntry key={`${project.name}-${project.date}`} project={project} />
        ))}
      </ResumeSection>

      <ResumeSection title={sectionTitles.experience}>
        {resume.experience.map((work) => (
          <WorkEntry key={`${work.company}-${work.date}-${work.title}`} work={work} />
        ))}
      </ResumeSection>

      <ResumeSection title={sectionTitles.skills}>
        {selectedVariant.skillsLines && selectedVariant.skillsLines.length > 0 ? (
          <div className="resume-skills-lines">
            {selectedVariant.skillsLines.map((line) => (
              <p key={line} className="resume-skill-line">
                {line}
              </p>
            ))}
          </div>
        ) : (
          <p style={{ margin: 0 }}>
            {resume.skills.map((skill, index) => (
              <React.Fragment key={skill}>
                <strong>{skill}</strong>
                {index < resume.skills.length - 1 ? ', ' : ''}
              </React.Fragment>
            ))}
          </p>
        )}
      </ResumeSection>

      <ResumeSection title={sectionTitles.education}>
        {resume.education.map((edu) => (
          <EducationEntry key={`${edu.institution}-${edu.date}`} education={edu} />
        ))}
      </ResumeSection>

      {selectedVariant.references && (
        <ResumeSection title="References">
          <p className="resume-references">{selectedVariant.references}</p>
        </ResumeSection>
      )}
    </div>
  );
};

export const ResumeContent = React.memo(ResumeContentComponent);
