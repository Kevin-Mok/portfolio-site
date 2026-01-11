'use client';

import React, { useState } from 'react';
import { resumeData } from '@/lib/resume-data';
import { ResumeHeader } from './resume/ResumeHeader';
import { ResumeSection } from './resume/ResumeSection';
import { ProjectEntry } from './resume/ProjectEntry';
import { WorkEntry } from './resume/WorkEntry';
import { EducationEntry } from './resume/EducationEntry';

const pdfVariants = [
  { label: 'General Resume', value: 'kevin-mok-resume.pdf' },
  { label: 'Web Development', value: 'kevin-mok-resume-web-dev.pdf' },
  { label: 'AWS/Cloud', value: 'kevin-mok-resume-aws.pdf' },
  { label: 'Python', value: 'kevin-mok-resume-python.pdf' },
  { label: 'AWS + Web Dev', value: 'kevin-mok-resume-aws-web-dev.pdf' },
  { label: 'AWS + Python', value: 'kevin-mok-resume-aws-python.pdf' },
  { label: 'Python + Django', value: 'kevin-mok-resume-web-dev-django.pdf' },
  { label: 'IT Support', value: 'kevin-mok-resume-it-support.pdf' },
  { label: 'IT Support + AWS', value: 'kevin-mok-resume-it-support-aws.pdf' },
  { label: 'Sales', value: 'kevin-mok-resume-sales.pdf' },
  { label: 'Call Centre', value: 'kevin-mok-resume-call-centre.pdf' },
];

const ResumeContentComponent: React.FC = () => {
  const [selectedPDF, setSelectedPDF] = useState(pdfVariants[0].value);

  return (
    <div className="resume-latex">
      {/* Contact Header */}
      <ResumeHeader contact={resumeData.contact} />

      {/* PDF Download Section */}
      <div className="pdf-download-section">
        <a
          href={`/resume/${selectedPDF}`}
          download
          className="pdf-download-btn"
        >
          📄 Download PDF
        </a>

        <div className="pdf-variant-selector">
          <label htmlFor="pdf-variant">Resume variant:</label>
          <select
            id="pdf-variant"
            value={selectedPDF}
            onChange={(e) => setSelectedPDF(e.target.value)}
          >
            {pdfVariants.map((variant) => (
              <option key={variant.value} value={variant.value}>
                {variant.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Section */}
      <ResumeSection title="Web Dev Projects">
        {resumeData.projects.map((project) => (
          <ProjectEntry key={project.name} project={project} />
        ))}
      </ResumeSection>

      {/* Work Experience */}
      <ResumeSection title="Work Experience">
        {resumeData.experience.map((work) => (
          <WorkEntry key={work.company} work={work} />
        ))}
      </ResumeSection>

      {/* Skills */}
      <ResumeSection title="Skills">
        <p style={{ margin: 0 }}>
          {resumeData.skills.map((skill, index) => (
            <React.Fragment key={skill}>
              <strong>{skill}</strong>
              {index < resumeData.skills.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </p>
      </ResumeSection>

      {/* Education */}
      <ResumeSection title="Education">
        {resumeData.education.map((edu) => (
          <EducationEntry key={edu.institution} education={edu} />
        ))}
      </ResumeSection>
    </div>
  );
};

export const ResumeContent = React.memo(ResumeContentComponent);
