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
    '<strong>Developed a full-stack web application (TypeScript/JavaScript)</strong> to generate rarity rankings for NFTs, integrating with a <strong>leading marketplace API</strong> to help users identify rare NFTs and listing status, <strong>improving market research efficiency by 80%</strong>.',
    '<strong>Built a scalable Node.js backend</strong> with REST API endpoints and <strong>PostgreSQL</strong>-backed caching to support filters such as max rank, price, and rare traits. <strong>Optimized performance</strong> while handling <strong>3,000+ concurrent requests</strong>.',
    '<strong>Built a dynamic React frontend (TypeScript/JavaScript)</strong> to load and display NFTs in real-time with user-defined filters, <strong>reducing load times by 50%</strong>.',
    '<strong>Developed a Discord bot (TypeScript/JavaScript/Node.js)</strong> to notify users of profitable resale opportunities using historical sales data. This feature <strong>increased user engagement by 80%</strong>.',
  ],
};

const kanbanCalendarProject: ResumeProject = {
  name: 'Kanban Calendar',
  url: 'https://github.com/Kevin-Mok/astronofty',
  languages: ['TypeScript', 'JavaScript', 'React', 'Next.js'],
  date: 'Mar 2024',
  bullets: [
    '<strong>Developed a responsive calendar Kanban board using Next.js, TypeScript, and Tailwind CSS</strong>, featuring draggable events and smooth card-to-detail transitions across week/day views.',
    '<strong>Engineered intuitive navigation and cross-device interactivity</strong>, implementing swipe gestures, infinite horizontal scrolling (mobile), and arrow controls (desktop) while improving drag-and-drop consistency.',
  ],
};

const astronoftyProject: ResumeProject = {
  name: 'Astronofty',
  url: 'https://github.com/Kevin-Mok/astronofty',
  languages: ['JavaScript', 'React', 'Solidity'],
  date: 'Jan 2023',
  bullets: [
    '<strong>Secured 2nd place overall out of 150+ teams</strong> at UofTHacks X for developing a blockchain-based NFT marketplace app.',
    '<strong>Built and optimized React (JavaScript) components</strong> to synchronously upload images and metadata to IPFS, <strong>enhancing user engagement by 80%</strong> during the demo.',
  ],
};

const awsServerProject: ResumeProject = {
  name: 'AWS Server',
  languages: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
  date: 'May 2024',
  bullets: [
    '<strong>Deployed and maintained multiple web applications</strong> on <strong>AWS EC2 Debian/Linux servers</strong> using <strong>Docker Compose</strong>, supporting <strong>2,000+ monthly requests</strong>.',
    '<strong>Automated AWS infrastructure provisioning</strong> with <strong>Terraform</strong> for EC2 instances and Docker workloads, <strong>accelerating deployment times by 80%</strong>.',
    '<strong>Improved web application accessibility</strong> by configuring <strong>Route 53</strong> DNS and <strong>NGINX</strong> subdomain routing, <strong>enabling seamless navigation between apps</strong>.',
    '<strong>Built an uptime monitoring system</strong> with a JavaScript service and systemd timer, <strong>reducing downtime by 95%</strong>.',
    '<strong>Enhanced data resilience</strong> with automated EBS snapshot backups, ensuring <strong>99.9% uptime and data integrity</strong> while <strong>reducing potential data loss by 95%</strong>.',
  ],
};

const raritySurfPythonProject: ResumeProject = {
  name: 'Rarity Surf',
  languages: ['Python', 'Django', 'JavaScript', 'React'],
  date: 'Oct 2021',
  bullets: [
    '<strong>Developed a full-stack web application</strong> to generate NFT rarity rankings integrated with leading NFT marketplace APIs, enabling users to <strong>quickly identify rare NFTs</strong> and listing status, <strong>improving market research efficiency by 80%</strong>.',
    '<strong>Architected a robust Django (Python) backend</strong> to fetch and process NFT metadata from IPFS, store rankings in <strong>PostgreSQL</strong>, and expose data through GraphQL APIs, <strong>ensuring low-latency access and scaling to handle 2,000+ concurrent requests</strong>.',
    '<strong>Developed a dynamic React frontend</strong> using hooks and responsive UI patterns, <strong>improving user experience and reducing frontend load times by 70%</strong>.',
  ],
};

const spotifyVisualizedProject: ResumeProject = {
  name: 'Spotify Visualized',
  languages: ['Python', 'Django'],
  date: 'June 2019',
  bullets: [
    '<strong>Built a high-performance Django backend</strong> that processed <strong>10,000+ tracks per user library</strong> using the Spotify API.',
    '<strong>Engineered and optimized PostgreSQL data models</strong>, achieving a <strong>50% reduction in query latency</strong> for core workflows.',
  ],
};

const discordAdventureProject: ResumeProject = {
  name: 'Discord Adventure Game',
  languages: ['Python'],
  date: 'Jan 2020',
  bullets: [
    '<strong>Redesigned item generation system</strong> for an open-source <strong>Python</strong> Discord game, replacing 83k-line static JSON with dynamic generation and achieving a <strong>99% reduction</strong> in file size.',
    '<strong>Implemented modular item components</strong> that enabled <strong>152,000+ unique item combinations</strong> and improved game diversity.',
  ],
};

const raritySurfSupportProject: ResumeProject = {
  name: 'Rarity Surf',
  languages: ['TypeScript', 'JavaScript', 'Node.js', 'React'],
  date: 'March 2025',
  bullets: [
    '<strong>Provided direct user support</strong> for a live NFT analytics platform, resolving front-end filtering bugs and API integration issues in real-time.',
    '<strong>Developed a full-stack web application with PostgreSQL database</strong> to analyze NFT rarity rankings, improving market research efficiency by 80%.',
    '<strong>Translated user requests into technical features</strong>, implementing real-time PostgreSQL-powered filters that improved usability for non-technical traders.',
    '<strong>Debugged and optimized API performance</strong> under load, reducing latency by 50% while supporting <strong>3,000+ concurrent users</strong>.',
  ],
};

const astronoftySupportProject: ResumeProject = {
  name: 'Astronofty',
  languages: ['JavaScript', 'React', 'Solidity'],
  date: 'Jan 2023',
  bullets: [
    '<strong>Developed technical solutions in high-pressure environments</strong>, earning 2nd place at UofTHacks X for a decentralized NFT marketplace app.',
    '<strong>Handled real-time user testing feedback</strong> and adapted components quickly to resolve blocking demo issues.',
  ],
};

const kanbanSupportProject: ResumeProject = {
  name: 'Kanban Calendar',
  languages: ['TypeScript', 'JavaScript', 'React', 'Next.js'],
  date: 'Feb 2025',
  bullets: [
    '<strong>Resolved UI bugs and cross-device compatibility issues</strong> while documenting reproducible steps for team-wide fixes.',
    '<strong>Built and maintained a responsive calendar interface</strong> that improved user task management across devices.',
  ],
};

const raritySurfSalesProject: ResumeProject = {
  name: 'Rarity Surf',
  languages: ['User Support', 'Bug Reproduction'],
  date: 'March 2024 — Dec 2024',
  bullets: [
    'Reproduced user-reported issues and wrote <strong>concise repro steps</strong> with <strong>known-issue workarounds</strong> to reduce repeat questions.',
    'Partnered with developers to ship <strong>onboarding/troubleshooting snippets</strong> that improved <strong>first-contact resolution (FCR)</strong>.',
  ],
};

const redHatWebExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Cloud/Software Engineer Intern',
  languages: ['Kubernetes', 'GoLang', 'Jenkins'],
  date: 'May 2022 — Aug 2023',
  bullets: [
    '<strong>Eliminated 80% of manual configuration errors</strong> by enabling the Kubernetes operator to fetch service data and update configuration defaults automatically, <strong>deprecating legacy startup scripts and reducing overall startup time by 40%</strong> (<strong>Kubernetes/GoLang</strong> used for this and three below).',
    '<strong>Reduced deployment time by 66%</strong> by shipping a CLI workflow for locally-compiled binaries on Kubernetes/OpenShift, <strong>cutting average deployment times from 45 minutes to 15 minutes</strong>.',
    '<strong>Improved application stability</strong> with startup probes for legacy services, <strong>resulting in a 50% reduction in startup-related failures during production launches</strong>.',
    '<strong>Improved system reliability</strong> by refactoring probe defaults from YAML sources, <strong>increasing probe accuracy by 30%</strong> and preventing misconfigurations.',
    '<strong>Increased CI pipeline efficiency</strong> by rewriting a <strong>Jenkins (Groovy) nightly pipeline</strong> for GitHub PR environments, <strong>reducing manual intervention by 60%</strong>.',
  ],
};

const redHatCloudExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Cloud/Software Engineer Intern',
  languages: ['Kubernetes', 'GoLang', 'Jenkins'],
  date: 'May 2020 — Aug 2021',
  bullets: [
    '<strong>Reduced deployment time by 66%</strong> by implementing a local-binary deployment path on Kubernetes/OpenShift, <strong>cutting average deployment times from 45 minutes to 15 minutes</strong> (<strong>Kubernetes/GoLang</strong> used for this and three below).',
    '<strong>Eliminated 80% of manual configuration errors</strong> by automating operator-side data fetching and config updates, <strong>deprecating legacy startup scripts and reducing overall startup time by 40%</strong>.',
    '<strong>Improved application stability</strong> by introducing startup probes for legacy applications with longer boot times, <strong>resulting in a 50% reduction in startup-related failures during production launches</strong>.',
    '<strong>Enhanced system reliability</strong> by assigning probe defaults dynamically from deployed YAML and fixing reconciliation issues, <strong>increasing probe accuracy by 30%</strong> and preventing misconfigurations.',
    '<strong>Increased CI pipeline efficiency</strong> by rewriting a <strong>Jenkins (Groovy) nightly pipeline</strong> for GitHub PR environments, <strong>reducing manual intervention by 60%</strong>.',
    '<strong>Demonstrated leadership and collaboration</strong> in <strong>Agile sprint planning</strong> within a 12-member team, improving sprint velocity through better task delegation.',
    '<strong>Increased project reproducibility</strong> by creating a reusable GitHub parameters file, <strong>enabling 100% reusability</strong> across environments.',
    '<strong>Streamlined developer onboarding</strong> by authoring project documentation and mentoring an incoming intern, <strong>reducing onboarding time by 50%</strong>.',
  ],
};

const redHatSupportExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Technical Support Engineer Intern (Tier 1/2)',
  languages: ['Ticketing/Triage', 'De-escalation', 'Knowledge Base Writing'],
  date: 'Aug 2022 — Aug 2024',
  bullets: [
    'Delivered <strong>Tier 1/2 frontline support</strong> for CI/CD and Kubernetes issues through ticket triage and routing, improving <strong>first-response time by 40%</strong>.',
    'Performed <strong>incident troubleshooting and root-cause analysis</strong>, resolving <strong>80% of configuration errors</strong> and <strong>reducing downtime by 40%</strong>.',
    'Wrote <strong>clear, step-by-step knowledge-base articles</strong> and troubleshooting flows that enabled Tier 1 to resolve common probe issues, <strong>cutting escalations by 30%</strong>.',
    'Built a deployment <strong>runbook</strong> that reduced repeat contacts by 66% and <strong>shortened resolution time from 45 minutes to 15 minutes</strong>.',
    'Kept users informed with <strong>concise status updates</strong> and expectation-setting to <strong>de-escalate frustrated stakeholders</strong>.',
    'Partnered with QA/DevOps to capture <strong>root causes</strong> of startup failures and implement dynamic probes, <strong>cutting production launch issues by 50%</strong>.',
  ],
};

const digitalMarketplaceExperience: WorkExperience = {
  company: 'Digital Goods Marketplace',
  title: 'Owner-Operator (Customer Support & Sales)',
  languages: ['Live Chat Support', 'Dispute Resolution', 'Sales Negotiation'],
  date: 'July 2025 — Present',
  bullets: [
    'Built and managed a <strong>peer-to-peer e-commerce operation</strong> for digital items with <strong>$50,000+ gross merchandise value</strong>.',
    'Closed and middlemanned <strong>high-value trades over $5,000</strong> with <strong>250+ verified vouches</strong>, maintaining <strong>zero unresolved disputes</strong>.',
    'Handled <strong>end-to-end operations and escrow</strong> including sourcing, pricing, listings, secure payments, and fulfillment.',
    'Implemented <strong>fair-value pricing</strong> and <strong>bundle offers</strong> to improve margins and reduce low-value inquiry volume.',
    'Standardized <strong>ownership verification and middleman workflows</strong> to reduce <strong>fraud/chargeback risk</strong>.',
    'Tracked <strong>P&L and cash flow</strong> while maintaining auditable payment and fulfillment records.',
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
