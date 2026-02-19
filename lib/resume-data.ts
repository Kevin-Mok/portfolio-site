/**
 * Resume Data Structure
 *
 * Multi-variant source of truth for on-screen rendering and PDF generation.
 */

export interface ResumeProject {
  name: string;
  url?: string;
  languages: string[];
  date: string;
  bullets: string[];
}

export interface WorkExperience {
  company: string;
  title: string;
  languages: string[];
  date: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  gpa: string;
  date: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Resume {
  projects: ResumeProject[];
  experience: WorkExperience[];
  skills: string[];
  education: Education[];
  contact: ContactInfo;
}

export interface ResumeSectionTitles {
  projects: string;
  experience: string;
  skills: string;
  education: string;
}

export type ResumeVariantId =
  | 'general'
  | 'web-dev'
  | 'aws'
  | 'python'
  | 'aws-web-dev'
  | 'aws-python'
  | 'web-dev-django'
  | 'it-support'
  | 'it-support-aws'
  | 'sales'
  | 'call-centre';

export interface ResumeVariantDefinition {
  id: ResumeVariantId;
  label: string;
  fileName: string;
  resume: Resume;
  sectionTitles?: Partial<ResumeSectionTitles>;
  summary?: string;
  skillsBold?: string[];
  skillsHtmlLines?: string[];
  skillsLines?: string[];
  references?: string;
}

const sharedContact: ContactInfo = {
  phone: '647-685-2500',
  email: 'me@kevin-mok.com',
  linkedin: 'linkedin.com/in/Kev-Mok',
  github: 'github.com/Kevin-Mok',
};

const educationDefault: Education = {
  institution: 'University of Toronto (St. George)',
  degree: 'Computer Science Specialist',
  gpa: '3.84 GPA',
  date: '2019 — 2024',
};

const educationGeneral: Education = {
  institution: 'University of Toronto',
  degree: 'Computer Science Specialist',
  gpa: '3.84 GPA (CS). Graduated with High Distinction.',
  date: '2019 — 2024',
};

const educationSupport: Education = {
  institution: 'University of Toronto (St. George)',
  degree: 'Computer Science Specialist',
  gpa: '3.84 GPA (CS). Graduated with High Distinction.',
  date: '2019 — 2024',
};

const educationCustomerSupport: Education = {
  institution: 'University of Toronto (St. George)',
  degree: 'Computer Science Specialist',
  gpa: '3.84 GPA. Graduated with High Distinction.',
  date: '2020 — 2025',
};

const raritySurfWebProject: ResumeProject = {
  name: 'Rarity Surf',
  languages: ['TypeScript', 'JavaScript', 'Node.js', 'React'],
  date: 'March 2025',
  bullets: [
    'Developed a full-stack web application (TypeScript/JavaScript) to generate rarity rankings for NFTs, integrating with a leading marketplace API to help users identify rare NFTs and listing status, improving market research efficiency by 80%.',
    'Built a scalable Node.js backend with REST API endpoints and PostgreSQL-backed caching to support filters such as max rank, price, and rare traits while handling 3,000+ concurrent requests.',
    'Built a dynamic React frontend (TypeScript/JavaScript) to load and display NFTs in real-time with user-defined filters, reducing load times by 50%.',
    'Developed a Discord bot (TypeScript/JavaScript/Node.js) to notify users of profitable resale opportunities using historical sales data, increasing user engagement by 80%.',
  ],
};

const kanbanCalendarProject: ResumeProject = {
  name: 'Kanban Calendar',
  url: 'https://github.com/Kevin-Mok/astronofty',
  languages: ['TypeScript', 'JavaScript', 'React', 'Next.js'],
  date: 'Mar 2024',
  bullets: [
    'Developed a responsive calendar Kanban board using Next.js, TypeScript, and Tailwind CSS, featuring draggable events and smooth card-to-detail transitions across week/day views.',
    'Engineered cross-device interactions including swipe gestures, infinite horizontal scrolling (mobile), and arrow controls (desktop) while improving drag-and-drop consistency.',
  ],
};

const astronoftyProject: ResumeProject = {
  name: 'Astronofty',
  url: 'https://github.com/Kevin-Mok/astronofty',
  languages: ['JavaScript', 'React', 'Solidity'],
  date: 'Jan 2023',
  bullets: [
    'Secured 2nd place overall out of 150+ teams at UofTHacks X for developing a blockchain-based NFT marketplace app.',
    'Built and optimized React components to synchronously upload images and metadata to IPFS, enhancing user engagement by 80% during the demo.',
  ],
};

const awsServerProject: ResumeProject = {
  name: 'AWS Server',
  languages: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
  date: 'May 2024',
  bullets: [
    'Deployed and maintained multiple web applications on AWS EC2 Debian/Linux servers using Docker Compose, supporting 2,000+ monthly requests.',
    'Automated infrastructure provisioning with Terraform for EC2 instances and Docker workloads, reducing deployment time by 80%.',
    'Configured Route 53 DNS and NGINX subdomain routing to improve discoverability and navigation across hosted applications.',
    'Implemented uptime monitoring with a JavaScript service and systemd timer, reducing downtime by 95%.',
    'Automated EBS snapshot backups to improve disaster recovery readiness and reduce potential data loss by 95%.',
  ],
};

const raritySurfPythonProject: ResumeProject = {
  name: 'Rarity Surf',
  languages: ['Python', 'Django', 'JavaScript', 'React'],
  date: 'Oct 2021',
  bullets: [
    'Developed a full-stack web application to generate NFT rarity rankings integrated with OpenSea APIs, improving market research efficiency by 80%.',
    'Architected a Django (Python) backend to fetch and process NFT metadata from IPFS, store rankings in PostgreSQL, and expose data through GraphQL APIs at low latency.',
    'Developed a dynamic React frontend using hooks and responsive UI patterns, reducing frontend load times by 70%.',
  ],
};

const spotifyVisualizedProject: ResumeProject = {
  name: 'Spotify Visualized',
  languages: ['Python', 'Django'],
  date: 'June 2019',
  bullets: [
    'Built a high-performance Django backend that processed 10,000+ tracks per user library using the Spotify API.',
    'Optimized PostgreSQL data modeling and query paths to reduce latency by 50% for core workflows.',
  ],
};

const discordAdventureProject: ResumeProject = {
  name: 'Discord Adventure Game',
  languages: ['Python'],
  date: 'Jan 2020',
  bullets: [
    'Redesigned item generation for an open source Python Discord game, replacing 83k-line static JSON with dynamic generation and reducing file size by 99%.',
    'Implemented modular item components that enabled 152,000+ unique item combinations and improved game diversity.',
  ],
};

const raritySurfSupportProject: ResumeProject = {
  name: 'Rarity Surf',
  languages: ['TypeScript', 'JavaScript', 'Node.js', 'React'],
  date: 'March 2025',
  bullets: [
    'Provided direct user support for a live NFT analytics platform, resolving front-end filtering bugs and API integration issues in real-time.',
    'Developed a PostgreSQL-backed full-stack analytics workflow that improved market research efficiency by 80%.',
    'Translated user requests into features, implementing real-time filtering that improved usability for non-technical traders.',
    'Debugged API performance under load, reducing latency by 50% while supporting 3,000+ concurrent users.',
  ],
};

const astronoftySupportProject: ResumeProject = {
  name: 'Astronofty',
  languages: ['JavaScript', 'React', 'Solidity'],
  date: 'Jan 2023',
  bullets: [
    'Developed technical solutions in a high-pressure environment, earning 2nd place at UofTHacks X.',
    'Handled real-time user testing feedback and adapted components quickly to resolve blocking demo issues.',
  ],
};

const kanbanSupportProject: ResumeProject = {
  name: 'Kanban Calendar',
  languages: ['TypeScript', 'JavaScript', 'React', 'Next.js'],
  date: 'Feb 2025',
  bullets: [
    'Resolved UI bugs and cross-device compatibility issues while documenting reproducible steps for team-wide fixes.',
    'Built and maintained a responsive calendar interface that improved user task management across devices.',
  ],
};

const raritySurfSalesProject: ResumeProject = {
  name: 'Rarity Surf',
  languages: ['User Support', 'Bug Reproduction'],
  date: 'March 2024 — Dec 2024',
  bullets: [
    'Reproduced user-reported issues and wrote concise repro steps with known-issue workarounds to reduce repeat questions.',
    'Partnered with developers to prioritize high-impact fixes and shipped onboarding/troubleshooting snippets that improved first-contact resolution.',
  ],
};

const redHatWebExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Cloud/Software Engineer Intern',
  languages: ['Kubernetes', 'GoLang', 'Jenkins'],
  date: 'May 2022 — Aug 2023',
  bullets: [
    'Eliminated 80% of manual configuration errors by enabling the Kubernetes operator to fetch service data and update configuration defaults automatically, reducing startup time by 40%.',
    'Reduced deployment time by 66% by shipping a CLI workflow for locally-compiled binaries on Kubernetes/OpenShift, cutting release time from 45 minutes to 15 minutes.',
    'Improved stability with startup probes for legacy services, reducing startup-related failures during production launches by 50%.',
    'Improved system reliability by refactoring probe defaults from YAML sources, increasing probe accuracy by 30% and preventing misconfigurations.',
    'Increased CI efficiency by rewriting a Jenkins nightly pipeline for GitHub PR environments, reducing manual intervention by 60%.',
  ],
};

const redHatCloudExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Cloud/Software Engineer Intern',
  languages: ['Kubernetes', 'GoLang', 'Jenkins'],
  date: 'May 2020 — Aug 2021',
  bullets: [
    'Reduced deployment time by 66% by implementing a local-binary deployment path on Kubernetes/OpenShift, cutting release cycles from 45 minutes to 15 minutes.',
    'Eliminated 80% of manual configuration errors by automating operator-side data fetching and config updates, reducing startup time by 40%.',
    'Improved application stability by introducing startup probes for legacy applications with longer boot times, reducing startup failures by 50%.',
    'Enhanced reliability by assigning probe defaults dynamically from deployed YAML and fixing reconciliation issues, increasing probe accuracy by 30%.',
    'Increased CI pipeline efficiency by rewriting a Jenkins nightly pipeline for GitHub PR environments, reducing manual intervention by 60%.',
    'Demonstrated leadership in Agile sprint planning within a 12-member team, improving sprint velocity through better task delegation.',
    'Increased reproducibility by creating a reusable GitHub parameters file for the pipeline, enabling consistent setup across environments.',
    'Streamlined onboarding by authoring project documentation and mentoring an incoming intern, reducing onboarding time by 50%.',
  ],
};

const redHatSupportExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Technical Support Engineer Intern (Tier 1/2)',
  languages: ['Ticketing/Triage', 'De-escalation', 'Knowledge Base Writing'],
  date: 'Aug 2022 — Aug 2024',
  bullets: [
    'Delivered Tier 1/2 frontline support for CI/CD and Kubernetes issues through ticket triage and routing, improving first-response time by 40%.',
    'Performed incident troubleshooting and root-cause analysis, resolving 80% of configuration errors and reducing downtime by 40%.',
    'Wrote clear knowledge-base articles and troubleshooting flows that enabled Tier 1 to resolve common probe issues, cutting escalations by 30%.',
    'Built a deployment runbook that reduced repeat contacts and shortened resolution time from 45 minutes to 15 minutes.',
    'Kept users informed with concise status updates and expectation-setting to de-escalate stakeholder friction.',
    'Partnered with QA/DevOps to capture startup failure root causes and implement dynamic probes, reducing launch issues by 50%.',
  ],
};

const digitalMarketplaceExperience: WorkExperience = {
  company: 'Digital Goods Marketplace',
  title: 'Owner-Operator (Customer Support & Sales)',
  languages: ['Live Chat Support', 'Dispute Resolution', 'Sales Negotiation'],
  date: 'July 2025 — Present',
  bullets: [
    'Built and managed a peer-to-peer e-commerce operation for digital items with $50,000+ gross merchandise value.',
    'Closed and middlemanned high-value trades over $5,000 with 250+ verified vouches and zero unresolved disputes.',
    'Handled end-to-end escrow operations including sourcing, pricing, listings, secure payments, and fulfillment.',
    'Implemented fair-value pricing and bundle strategies to improve margins and reduce low-value inquiry volume.',
    'Standardized ownership verification and middleman workflows to reduce fraud and chargeback risk.',
    'Tracked P&L and cash flow while maintaining auditable payment and fulfillment records.',
  ],
};

const webSkills = [
  'TypeScript',
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'Django',
  'PostgreSQL',
  'MongoDB',
  'Bash',
  'Git',
  'Linux',
  'Command Line',
  'Go(Lang)',
  'AWS',
  'Kubernetes',
  'Terraform',
  'Docker',
  'Compose',
  'Jenkins',
  'Groovy',
  'Solidity',
  'C',
];

const awsSkills = [
  'AWS',
  'Kubernetes',
  'Terraform',
  'Docker',
  'Compose',
  'Jenkins',
  'Groovy',
  'Go(Lang)',
  'Bash',
  'Linux',
  'JavaScript',
  'React',
  'Python',
  'Django',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'Solidity',
  'C',
  'Git',
  'Command Line',
];

const pythonSkills = [
  'Python',
  'Django',
  'JavaScript',
  'React',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'Bash',
  'Git',
  'Linux',
  'Command Line',
  'Go(Lang)',
  'AWS',
  'Kubernetes',
  'Terraform',
  'Docker',
  'Compose',
  'Jenkins',
  'Groovy',
  'Solidity',
  'C',
];

const generalBoldSkills = [
  'JavaScript',
  'React',
  'Python',
  'Django',
  'Git',
  'Linux',
  'Command Line',
];

const webDevBoldSkills = [
  'TypeScript',
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'Django',
  'Git',
  'Linux',
  'Command Line',
];

const awsBoldSkills = ['Linux', 'JavaScript', 'React', 'Python', 'Django', 'Git', 'Command Line'];

const pythonBoldSkills = ['Python', 'Django', 'JavaScript', 'React', 'Git', 'Linux', 'Command Line'];

const defaultSectionTitles: ResumeSectionTitles = {
  projects: 'Web Dev Projects',
  experience: 'Work Experience',
  skills: 'Skills',
  education: 'Education',
};

export const DEFAULT_RESUME_VARIANT_ID: ResumeVariantId = 'web-dev';

export const resumeVariants: ResumeVariantDefinition[] = [
  {
    id: 'general',
    label: 'General Resume',
    fileName: 'kevin-mok-resume.pdf',
    sectionTitles: {
      ...defaultSectionTitles,
      projects: 'Projects',
    },
    references:
      'See my LinkedIn for references from my Red Hat managers/mentee, a startup client, and a graduate student mentor.',
    skillsBold: generalBoldSkills,
    resume: {
      contact: sharedContact,
      projects: [raritySurfPythonProject],
      experience: [redHatCloudExperience],
      skills: [
        'JavaScript',
        'React',
        'Python',
        'Django',
        'Node.js',
        'PostgreSQL',
        'MongoDB',
        'Bash',
        'Git',
        'Linux',
        'Command Line',
        'Go(Lang)',
        'AWS',
        'Kubernetes',
        'Terraform',
        'Docker',
        'Compose',
        'Jenkins',
        'Groovy',
        'Solidity',
        'C',
      ],
      education: [educationGeneral],
    },
  },
  {
    id: 'web-dev',
    label: 'Web Development',
    fileName: 'kevin-mok-resume-web-dev.pdf',
    sectionTitles: defaultSectionTitles,
    skillsBold: webDevBoldSkills,
    resume: {
      contact: sharedContact,
      projects: [raritySurfWebProject, kanbanCalendarProject, astronoftyProject],
      experience: [redHatWebExperience],
      skills: webSkills,
      education: [
        {
          ...educationDefault,
          gpa: '3.84 GPA (CS). Graduated with High Distinction.',
        },
      ],
    },
  },
  {
    id: 'aws',
    label: 'AWS/Cloud',
    fileName: 'kevin-mok-resume-aws.pdf',
    sectionTitles: {
      ...defaultSectionTitles,
      projects: 'Projects',
    },
    references:
      'See my LinkedIn for references from my Red Hat managers/mentee, a startup client, and a graduate student mentor.',
    skillsBold: awsBoldSkills,
    resume: {
      contact: sharedContact,
      projects: [awsServerProject],
      experience: [redHatCloudExperience],
      skills: awsSkills,
      education: [educationDefault],
    },
  },
  {
    id: 'python',
    label: 'Python',
    fileName: 'kevin-mok-resume-python.pdf',
    sectionTitles: {
      ...defaultSectionTitles,
      projects: 'Projects',
    },
    references:
      'See my LinkedIn for references from my Red Hat managers/mentee, a startup client, and a graduate student mentor.',
    skillsBold: pythonBoldSkills,
    resume: {
      contact: sharedContact,
      projects: [raritySurfPythonProject, discordAdventureProject, spotifyVisualizedProject],
      experience: [redHatCloudExperience],
      skills: pythonSkills,
      education: [educationDefault],
    },
  },
  {
    id: 'aws-web-dev',
    label: 'AWS + Web Dev',
    fileName: 'kevin-mok-resume-aws-web-dev.pdf',
    sectionTitles: {
      ...defaultSectionTitles,
      projects: 'Projects',
    },
    references:
      'See my LinkedIn for references from my Red Hat managers/mentee, a startup client, and a graduate student mentor.',
    skillsBold: awsBoldSkills,
    resume: {
      contact: sharedContact,
      projects: [
        {
          ...awsServerProject,
          bullets: awsServerProject.bullets.slice(0, 4),
        },
        {
          ...raritySurfPythonProject,
          bullets: [
            raritySurfPythonProject.bullets[1],
            raritySurfPythonProject.bullets[2],
          ],
        },
      ],
      experience: [redHatCloudExperience],
      skills: awsSkills,
      education: [educationGeneral],
    },
  },
  {
    id: 'aws-python',
    label: 'AWS + Python',
    fileName: 'kevin-mok-resume-aws-python.pdf',
    sectionTitles: {
      ...defaultSectionTitles,
      projects: 'Projects',
    },
    references:
      'See my LinkedIn for references from my Red Hat managers/mentee, a startup client, and a graduate student mentor.',
    skillsBold: pythonBoldSkills,
    resume: {
      contact: sharedContact,
      projects: [awsServerProject, raritySurfPythonProject],
      experience: [
        {
          ...redHatCloudExperience,
          bullets: redHatCloudExperience.bullets.slice(0, 7),
        },
      ],
      skills: pythonSkills,
      education: [educationDefault],
    },
  },
  {
    id: 'web-dev-django',
    label: 'Python + Django',
    fileName: 'kevin-mok-resume-web-dev-django.pdf',
    sectionTitles: {
      ...defaultSectionTitles,
      projects: 'Projects',
    },
    skillsBold: pythonBoldSkills,
    resume: {
      contact: sharedContact,
      projects: [raritySurfPythonProject, spotifyVisualizedProject, astronoftyProject],
      experience: [
        {
          ...redHatCloudExperience,
          bullets: redHatCloudExperience.bullets.slice(0, 7),
        },
      ],
      skills: pythonSkills,
      education: [educationDefault],
    },
  },
  {
    id: 'it-support',
    label: 'IT Support',
    fileName: 'kevin-mok-resume-it-support.pdf',
    sectionTitles: defaultSectionTitles,
    skillsHtmlLines: [
      '<strong>IT Support Skills:</strong> Tier 1/2 Troubleshooting, Incident Response, Jira, Microsoft 365, VPN, Log Analysis, Knowledge Base Writing, Root Cause Investigation',
      '<strong>Customer Support:</strong> Cross-team Collaboration, Communication, User Training, Documentation',
      '<strong>Programming Languages:</strong> Python, Go, JavaScript, TypeScript',
      '<strong>Web Development:</strong> PostgreSQL, Linux, React, Django',
    ],
    skillsLines: [
      'IT Support Skills: Tier 1/2 Troubleshooting, Incident Response, Jira, Microsoft 365, VPN, Log Analysis, Knowledge Base Writing, Root Cause Investigation',
      'Customer Support: Cross-team Collaboration, Communication, User Training, Documentation',
      'Programming Languages: Python, Go, JavaScript, TypeScript',
      'Web Development: PostgreSQL, Linux, React, Django',
    ],
    resume: {
      contact: sharedContact,
      projects: [raritySurfSupportProject, astronoftySupportProject, kanbanSupportProject],
      experience: [
        {
          ...redHatSupportExperience,
          title: 'Cloud/Software Engineer Intern',
          date: 'May 2022 — Aug 2023',
          languages: ['Kubernetes', 'GoLang', 'Jenkins'],
        },
      ],
      skills: [],
      education: [educationSupport],
    },
  },
  {
    id: 'it-support-aws',
    label: 'IT Support + AWS',
    fileName: 'kevin-mok-resume-it-support-aws.pdf',
    sectionTitles: defaultSectionTitles,
    skillsHtmlLines: [
      '<strong>IT Support Skills:</strong> Tier 1/2 Troubleshooting, Incident Response, Jira, Microsoft 365, VPN, Log Analysis, Knowledge Base Writing, Root Cause Investigation',
      '<strong>Customer Support:</strong> Cross-team Collaboration, Communication, User Training, Documentation',
      '<strong>Programming Languages:</strong> Python, Go, JavaScript, TypeScript',
      '<strong>Web Development:</strong> PostgreSQL, Linux, React, Django',
    ],
    skillsLines: [
      'IT Support Skills: Tier 1/2 Troubleshooting, Incident Response, Jira, Microsoft 365, VPN, Log Analysis, Knowledge Base Writing, Root Cause Investigation',
      'Customer Support: Cross-team Collaboration, Communication, User Training, Documentation',
      'Programming Languages: Python, Go, JavaScript, TypeScript',
      'Cloud + Web: AWS, Kubernetes, Terraform, PostgreSQL, Linux, React, Django',
    ],
    resume: {
      contact: sharedContact,
      projects: [
        raritySurfSupportProject,
        astronoftySupportProject,
        {
          ...awsServerProject,
          bullets: awsServerProject.bullets.slice(0, 2),
        },
      ],
      experience: [
        {
          ...redHatSupportExperience,
          title: 'Cloud/Software Engineer Intern',
          date: 'May 2022 — Aug 2023',
          languages: ['Kubernetes', 'GoLang', 'Jenkins'],
        },
      ],
      skills: [],
      education: [educationSupport],
    },
  },
  {
    id: 'sales',
    label: 'Sales',
    fileName: 'kevin-mok-resume-sales.pdf',
    sectionTitles: {
      ...defaultSectionTitles,
      projects: 'Web Dev Projects',
    },
    summary:
      'Customer-focused call centre professional with Tier 1/2 support experience, de-escalation, and clear communication. Improves first-response, reduces escalations, and shortens resolution times across high-volume phone/chat/email queues.',
    skillsHtmlLines: [
      '<strong>Customer Support &amp; Call Centre:</strong> Active listening, empathy, de-escalation, clear written/verbal communication, ticket triage/prioritization, SLA awareness, call/chat/email etiquette, documentation and KB writing',
      '<strong>Technical:</strong> Microsoft 365, VPN/log basics, Linux basics',
      '<strong>Languages:</strong> English; <strong>Cantonese (fluent)</strong>',
    ],
    skillsLines: [
      'Customer Support & Call Centre: Active listening, empathy, de-escalation, clear written/verbal communication, ticket triage/prioritization, SLA awareness, call/chat/email etiquette, documentation and KB writing',
      'Technical: Microsoft 365, VPN/log basics, Linux basics',
      'Languages: English; Cantonese (fluent)',
    ],
    resume: {
      contact: sharedContact,
      projects: [raritySurfSalesProject],
      experience: [digitalMarketplaceExperience, redHatSupportExperience],
      skills: [],
      education: [educationCustomerSupport],
    },
  },
  {
    id: 'call-centre',
    label: 'Call Centre',
    fileName: 'kevin-mok-resume-call-centre.pdf',
    sectionTitles: {
      ...defaultSectionTitles,
      projects: 'Dev Projects',
    },
    summary:
      'Customer-focused call centre professional with Tier 1/2 support experience, de-escalation, and clear communication. Improves first-response, reduces escalations, and shortens resolution times across high-volume phone/chat/email queues.',
    skillsHtmlLines: [
      '<strong>Customer Support &amp; Call Centre:</strong> Active listening, empathy, de-escalation, written/verbal communication, ticket triage/prioritization, <strong>SLA awareness</strong>, call/chat/email etiquette, documentation and <strong>KB</strong> writing',
      '<strong>Technical:</strong> <strong>Microsoft 365</strong>, <strong>VPN/log basics</strong>, <strong>Linux</strong>',
      '<strong>Languages:</strong> <strong>English</strong>, <strong>Cantonese (fluent)</strong>',
    ],
    skillsLines: [
      'Customer Support & Call Centre: Active listening, empathy, de-escalation, written/verbal communication, ticket triage/prioritization, SLA awareness, call/chat/email etiquette, documentation and KB writing',
      'Technical: Microsoft 365, VPN/log basics, Linux',
      'Languages: English, Cantonese (fluent)',
    ],
    resume: {
      contact: sharedContact,
      projects: [raritySurfSalesProject],
      experience: [redHatSupportExperience, digitalMarketplaceExperience],
      skills: [],
      education: [educationCustomerSupport],
    },
  },
];

export const resumeVariantById: Record<ResumeVariantId, ResumeVariantDefinition> =
  resumeVariants.reduce((acc, variant) => {
    acc[variant.id] = variant;
    return acc;
  }, {} as Record<ResumeVariantId, ResumeVariantDefinition>);

export const resumeVariantByFileName: Record<string, ResumeVariantDefinition> =
  resumeVariants.reduce((acc, variant) => {
    acc[variant.fileName] = variant;
    return acc;
  }, {} as Record<string, ResumeVariantDefinition>);

export const pdfVariants = resumeVariants.map((variant) => ({
  id: variant.id,
  label: variant.label,
  value: variant.fileName,
}));

export function isResumeVariantId(value: string): value is ResumeVariantId {
  return value in resumeVariantById;
}

export function resolveResumeVariantId(value: string | undefined): ResumeVariantId {
  if (!value) {
    return DEFAULT_RESUME_VARIANT_ID;
  }

  if (isResumeVariantId(value)) {
    return value;
  }

  return resumeVariantByFileName[value]?.id ?? DEFAULT_RESUME_VARIANT_ID;
}

/**
 * Backward-compatible single variant alias.
 */
export const resumeData: Resume = resumeVariantById[DEFAULT_RESUME_VARIANT_ID].resume;
