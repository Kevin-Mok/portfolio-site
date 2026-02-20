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

const raritySurfProject: ResumeProject = {
  name: 'Rarity Surf',
  languages: ['TypeScript', 'JavaScript', 'Node.js', 'React'],
  date: 'Mar 2025',
  bullets: [
    '<strong>Created NFT research tools</strong> that improved <strong>market research efficiency by 80%</strong>, helping users move from raw metadata to practical buy and sell decisions much faster.',
    '<strong>Supported 3,000+ concurrent requests</strong> during busy periods and kept lookups responsive, even when demand spikes made manual alternatives too slow.',
    '<strong>Cut ranking-page load time by 50%</strong> and accelerated repeat evaluation loops, improving confidence in daily usage across active traders.',
    '<strong>Added alert features</strong> that raised <strong>user engagement by 80%</strong>, giving traders timely signals they could act on instead of manually refreshing data.',
    '<strong>Coordinated backend, frontend, and bot updates</strong> and reduced release drift, so fixes reached users faster without breaking core workflows.',
  ],
};

const kanbanCalendarProject: ResumeProject = {
  name: 'Kanban Calendar App',
  url: 'https://github.com/Kevin-Mok/kanban-calendar',
  languages: ['TypeScript', 'JavaScript', 'React', 'Next.js'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Built a planning app</strong> with a <strong>7-day desktop view</strong> and automatic mobile switch at <strong>&lt;768px</strong>, so users got the right layout for their device without manual toggles.',
    '<strong>Added swipe controls</strong> (<strong>50px threshold</strong>) and keyboard shortcuts, giving both mobile and desktop users faster ways to move through dense schedules.',
    '<strong>Improved drag-and-drop interactions</strong> and reduced task-move friction, especially during rapid replanning sessions with many event changes.',
    '<strong>Kept scheduling logic reliable</strong> during UI changes and prevented planning regressions, so day-to-day workflows remained stable.',
    '<strong>Focused on clear transitions</strong> and context-preserving interactions, helping users understand what changed after each action and where to continue next.',
  ],
};

const astronoftyProject: ResumeProject = {
  name: 'Astronofty',
  url: 'https://github.com/Kevin-Mok/astronofty',
  languages: ['JavaScript', 'React', 'Solidity'],
  date: 'Jan 2023',
  bullets: [
    '<strong>Won 2nd place out of 150+ teams</strong> at UofTHacks and delivered a working NFT marketplace, showing strong execution under a tight hackathon timeline.',
    '<strong>Targeted a 2.6M+ astrophotography audience</strong> and aligned scope to a clear use case, making product positioning sharper from day one.',
    '<strong>Supported multiple images per NFT</strong> and improved listing quality for creators, helping buyers evaluate collections with more context.',
    '<strong>Simplified minting, listing, and pricing flows</strong> and reduced user friction, improving task completion during live demos.',
    '<strong>Drove an 80% engagement lift</strong> during judging and improved demo interaction flow, strengthening results under time pressure.',
  ],
};

const awsServerProject: ResumeProject = {
  name: 'AWS Server',
  languages: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
  date: 'May 2024',
  bullets: [
    '<strong>Deployed and maintained multiple web applications</strong> on <strong>AWS EC2 Debian/Linux servers</strong> using <strong>Docker Compose</strong>, supporting <strong>2,000+ monthly requests</strong>.',
    '<strong>Automated AWS infrastructure provisioning</strong> with <strong>Terraform</strong> for EC2 instances and Docker workloads, <strong>accelerating deployment times by 80%</strong>.',
    '<strong>Improved web application accessibility</strong> by configuring <strong>Route 53</strong> DNS and <strong>NGINX</strong> subdomain routing, enabling seamless navigation between apps.',
    '<strong>Built an uptime monitoring system</strong> with a JavaScript service and systemd timer, <strong>reducing downtime by 95%</strong>.',
    '<strong>Enhanced data resilience</strong> with automated EBS snapshot backups, ensuring <strong>99.9% uptime and data integrity</strong> while reducing potential data loss by 95%.',
  ],
};

const spotifyVisualizedProject: ResumeProject = {
  name: 'Spotify Visualized',
  languages: ['Python', 'Django', 'PostgreSQL'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Built a music analytics app</strong> that processed <strong>10,000+ tracks per user</strong>, turning raw Spotify data into practical insights users could act on.',
    '<strong>Reduced key query time by 50%</strong> and sped up chart refreshes, improving exploration flow during repeated analysis sessions.',
    '<strong>Added secure Spotify login</strong> with automatic token refresh, reducing sign-in interruptions and improving session continuity.',
    '<strong>Converted artist, genre, and audio data into readable charts</strong> and improved insight clarity, making listening patterns easier to interpret quickly.',
    '<strong>Kept data ingest and chart logic modular</strong> and lowered report-expansion risk, so new analytics could be added without destabilizing existing dashboards.',
  ],
};

const discordAdventureProject: ResumeProject = {
  name: 'Gobcog Discord RPG',
  url: 'https://github.com/Kevin-Mok/gobcog',
  languages: ['Python', 'Discord.py'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Expanded content to 2,800+ monster combinations</strong> and increased replay value, reducing content fatigue for long-term players.',
    '<strong>Kept player progress saved across multiple servers</strong> and reduced data-loss frustration, improving trust in long-term progression.',
  ],
};

const portfolioSiteProject: ResumeProject = {
  name: 'Portfolio Site',
  url: 'https://github.com/kmokdefi/kmok-portfolio',
  languages: ['TypeScript', 'Next.js', 'Tailwind CSS'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Designed a portfolio experience</strong> with a <strong>6-panel desktop layout</strong> and smooth mobile flow, so hiring managers could scan skills, projects, and resume links quickly without getting lost in navigation.',
    '<strong>Added 3 themes and 15 accent colors</strong> to keep content readable across preferences, improving first impressions for recruiters and reducing friction for returning visitors.',
    '<strong>Set up 5 spam checks on the contact form</strong> and cut low-quality submissions, so real recruiter outreach was easier to identify and respond to quickly.',
    '<strong>Split styles into 12 small CSS modules</strong> (under <strong>200 lines each</strong>), making edits safer and reducing accidental UI regressions during rapid updates.',
    '<strong>Auto-generated and validated 11 resume variants</strong> and kept role-specific links consistent, so resume content stayed accurate whenever project details changed.',
  ],
};

const leavesSupportProject: ResumeProject = {
  name: 'Leaves',
  url: 'https://github.com/Kevin-Mok/quit-weed',
  languages: ['TypeScript', 'React Native', 'Expo'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Built a supportive quit-cannabis app</strong> available on <strong>3 platforms</strong>, so users could get help wherever they were instead of waiting until they were back on one specific device.',
    '<strong>Added an AI coach and daily check-ins</strong> that kept encouragement consistent, making the experience feel more personal and reducing the number of users who stopped checking in.',
    '<strong>Tracked symptoms in 5 areas</strong> and made progress easier to explain, so users, support staff, and non-technical stakeholders could discuss updates with less confusion.',
    '<strong>Included streak tracking and SOS support</strong> for high-stress moments and reduced abandonment during cravings, helping users take immediate action instead of dropping out.',
    '<strong>Wrote clear setup and support notes</strong> for maintainers and reduced repeat questions across teams, making collaboration between support, product, and engineering much smoother.',
  ],
};

const stbMarketplaceProject: ResumeProject = {
  name: 'STB Marketplace Cog',
  url: 'https://github.com/Kevin-Mok/stb-mkt',
  languages: ['Python', 'Red-DiscordBot', 'Discord'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Set clear marketplace rules</strong> with a <strong>48-hour hold and 2.5% fee</strong>, so buyers and sellers knew expectations before transactions and disputes were easier to prevent.',
    '<strong>Required acceptance of 4 seller terms</strong> before listing and reduced repeat policy arguments, giving moderators a consistent baseline during high-volume periods.',
    '<strong>Kept command text within the Discord 100-character limit</strong> and prevented broken prompts, improving slash-command reliability in day-to-day server use.',
    '<strong>Added clear listing states</strong> (Draft, PendingCollection, Active) with audit-friendly logs, so staff could diagnose issues quickly and explain status changes without deep digging.',
    '<strong>Guided users through buy and sell steps</strong> while preserving previous inputs, reducing drop-off when people paused and returned mid-transaction.',
  ],
};

const nomarStocksProject: ResumeProject = {
  name: "Nomar's Technical Charts",
  url: 'https://github.com/Kevin-Mok/nomar-stocks',
  languages: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Whop'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Built a membership site for trading education</strong> with fast onboarding, so visitors could understand the offer and reach checkout without bouncing between disconnected pages.',
    '<strong>Implemented clear plan choices</strong> (<strong>Free</strong>, <strong>$10/mo Basic</strong>, <strong>$25/mo Premium</strong>) and automated checkout flows, making upgrades straightforward and reducing manual access handling.',
    '<strong>Used animated stats and a cleaner pricing layout</strong>, improving clarity exactly where purchase decisions happen and helping visitors compare plans quickly.',
    '<strong>Generated social preview images automatically</strong> and improved shared-link quality, strengthening click-through performance from Discord and other referral channels.',
    '<strong>Centralized pricing, links, and legal copy</strong> and kept updates consistent site-wide, lowering risk when content had to change quickly.',
  ],
};

const redHatWebExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Cloud/Software Engineer Intern',
  languages: ['Kubernetes', 'GoLang', 'Jenkins'],
  date: 'May 2022 — Aug 2023',
  bullets: [
    'Delivered <strong>50+ merged PRs across 10 repos</strong> with <strong>7,000+ lines of production code</strong>, spanning operator logic, runtime behavior, image pipelines, and deployment tooling that shipped to enterprise Kubernetes and OpenShift users.',
    'Implemented operator and CLI paths that <strong>cut deployment time by 66%</strong> (from <strong>45 to 15 minutes</strong>), reducing release bottlenecks and making PR validation and rollout loops substantially faster.',
    'Automated configuration fetch and default assignment in the operator, which <strong>eliminated 80% of manual config errors</strong> and <strong>reduced startup time by 40%</strong> by deprecating brittle legacy startup script paths.',
    'Introduced and refactored probe behavior so health defaults were derived more reliably, driving a <strong>50% drop in startup-related failures</strong> and a <strong>30% improvement in probe accuracy</strong> during production launch windows.',
    'Reworked nightly CI and contributor enablement, producing a <strong>60% reduction in manual intervention</strong> and a <strong>472-line onboarding guide</strong> that improved reproducibility and ramp-up quality for incoming contributors.',
  ],
};

const redHatCloudExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Cloud/Software Engineer Intern',
  languages: ['Kubernetes', 'GoLang', 'Jenkins'],
  date: 'May 2020 — Aug 2021',
  bullets: [
    'Delivered <strong>50+ merged PRs across 10 repos</strong> with <strong>7,000+ lines of production code</strong>, spanning operator logic, runtime behavior, image pipelines, and deployment tooling that shipped to enterprise Kubernetes and OpenShift users.',
    'Implemented operator and CLI paths that <strong>cut deployment time by 66%</strong> (from <strong>45 to 15 minutes</strong>), reducing release bottlenecks and making PR validation and rollout loops substantially faster.',
    'Automated configuration fetch and default assignment in the operator, which <strong>eliminated 80% of manual config errors</strong> and <strong>reduced startup time by 40%</strong> by deprecating brittle legacy startup script paths.',
    'Introduced and refactored probe behavior so health defaults were derived more reliably, driving a <strong>50% drop in startup-related failures</strong> and a <strong>30% improvement in probe accuracy</strong> during production launch windows.',
    'Reworked nightly CI and contributor enablement, producing a <strong>60% reduction in manual intervention</strong> and a <strong>472-line onboarding guide</strong> that improved reproducibility and ramp-up quality for incoming contributors.',
  ],
};

const redHatSupportExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Technical Support Engineer Intern (Tier 1/2)',
  languages: ['Ticketing/Triage', 'De-escalation', 'Knowledge Base Writing'],
  date: 'Aug 2022 — Aug 2024',
  bullets: [
    'Delivered <strong>50+ merged PRs across 10 repos</strong> with <strong>7,000+ lines of production code</strong>, including core work in Kubernetes operators, deployment scripts, runtime reliability, and related cloud platform tooling.',
    'Shipped deployment and workflow changes that <strong>reduced release time by 66%</strong> (from <strong>45 to 15 minutes</strong>) while improving confidence in iterative testing and release-readiness checks.',
    'Automated previously manual configuration paths to <strong>eliminate 80% of setup errors</strong> and <strong>reduce startup time by 40%</strong>, improving resilience in real deployment environments.',
    'Improved startup reliability and health-check behavior, resulting in a <strong>50% reduction in startup failures</strong> and a <strong>30% improvement in probe accuracy</strong> across operator-managed services.',
    'Strengthened team delivery by cutting CI handholding by <strong>60%</strong> and writing a <strong>472-line onboarding guide</strong> that standardized contributor setup, debugging, and PR workflow expectations.',
  ],
};

const digitalMarketplaceExperience: WorkExperience = {
  company: 'Digital Goods Marketplace',
  title: 'Owner-Operator (Customer Support & Sales)',
  languages: ['Live Chat Support', 'Dispute Resolution', 'Sales Negotiation'],
  date: 'July 2025 — Present',
  bullets: [
    'Built and managed a <strong>peer-to-peer e-commerce operation</strong> for digital items with <strong>$50,000+ gross merchandise value</strong>.',
    'Closed and middlemanned <strong>high-value trades over $10,000</strong> with <strong>500+ verified vouches</strong>, maintaining <strong>zero unresolved disputes</strong>.',
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
      projects: [
        {
          ...raritySurfProject,
          bullets: [raritySurfProject.bullets[0], raritySurfProject.bullets[1], raritySurfProject.bullets[2]],
        },
        {
          ...astronoftyProject,
          bullets: [astronoftyProject.bullets[0], astronoftyProject.bullets[4]],
        },
        {
          ...spotifyVisualizedProject,
          bullets: [spotifyVisualizedProject.bullets[0], spotifyVisualizedProject.bullets[1]],
        },
      ],
      experience: [
        {
          ...redHatCloudExperience,
          bullets: redHatCloudExperience.bullets.slice(0, 3),
        },
      ],
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
      projects: [
        {
          ...raritySurfProject,
          bullets: [
            raritySurfProject.bullets[0],
            raritySurfProject.bullets[1],
            raritySurfProject.bullets[2],
            raritySurfProject.bullets[3],
            raritySurfProject.bullets[4],
          ],
        },
        {
          ...portfolioSiteProject,
          bullets: [
            portfolioSiteProject.bullets[0],
            portfolioSiteProject.bullets[1],
            portfolioSiteProject.bullets[2],
            portfolioSiteProject.bullets[4],
          ],
        },
        {
          ...kanbanCalendarProject,
          bullets: [
            kanbanCalendarProject.bullets[0],
            kanbanCalendarProject.bullets[1],
            kanbanCalendarProject.bullets[2],
          ],
        },
      ],
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
      projects: [
        {
          ...awsServerProject,
          bullets: [
            awsServerProject.bullets[0],
            awsServerProject.bullets[1],
            awsServerProject.bullets[2],
            awsServerProject.bullets[3],
          ],
        },
        {
          ...raritySurfProject,
          bullets: [raritySurfProject.bullets[1], raritySurfProject.bullets[3], raritySurfProject.bullets[4]],
        },
        {
          ...stbMarketplaceProject,
          bullets: [stbMarketplaceProject.bullets[0], stbMarketplaceProject.bullets[3]],
        },
      ],
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
      projects: [
        {
          ...spotifyVisualizedProject,
          bullets: [
            spotifyVisualizedProject.bullets[0],
            spotifyVisualizedProject.bullets[1],
            spotifyVisualizedProject.bullets[2],
            spotifyVisualizedProject.bullets[3],
            spotifyVisualizedProject.bullets[4],
          ],
        },
        discordAdventureProject,
        {
          ...raritySurfProject,
          bullets: [raritySurfProject.bullets[0], raritySurfProject.bullets[1], raritySurfProject.bullets[2]],
        },
      ],
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
          bullets: [awsServerProject.bullets[0], awsServerProject.bullets[1], awsServerProject.bullets[2]],
        },
        {
          ...raritySurfProject,
          bullets: [
            raritySurfProject.bullets[0],
            raritySurfProject.bullets[1],
            raritySurfProject.bullets[2],
            raritySurfProject.bullets[3],
          ],
        },
        {
          ...portfolioSiteProject,
          bullets: [
            portfolioSiteProject.bullets[0],
            portfolioSiteProject.bullets[2],
            portfolioSiteProject.bullets[4],
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
      projects: [
        {
          ...awsServerProject,
          bullets: [awsServerProject.bullets[0], awsServerProject.bullets[1], awsServerProject.bullets[2]],
        },
        {
          ...spotifyVisualizedProject,
          bullets: [
            spotifyVisualizedProject.bullets[0],
            spotifyVisualizedProject.bullets[1],
            spotifyVisualizedProject.bullets[2],
            spotifyVisualizedProject.bullets[4],
          ],
        },
        {
          ...raritySurfProject,
          bullets: [raritySurfProject.bullets[0], raritySurfProject.bullets[1]],
        },
      ],
      experience: [redHatCloudExperience],
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
      projects: [
        {
          ...spotifyVisualizedProject,
          bullets: [
            spotifyVisualizedProject.bullets[0],
            spotifyVisualizedProject.bullets[1],
            spotifyVisualizedProject.bullets[2],
            spotifyVisualizedProject.bullets[3],
          ],
        },
        {
          ...raritySurfProject,
          bullets: [raritySurfProject.bullets[0], raritySurfProject.bullets[1], raritySurfProject.bullets[2]],
        },
        {
          ...portfolioSiteProject,
          bullets: [
            portfolioSiteProject.bullets[0],
            portfolioSiteProject.bullets[2],
            portfolioSiteProject.bullets[3],
          ],
        },
      ],
      experience: [redHatWebExperience],
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
      projects: [
        {
          ...leavesSupportProject,
          bullets: [leavesSupportProject.bullets[0], leavesSupportProject.bullets[2], leavesSupportProject.bullets[4]],
        },
        {
          ...stbMarketplaceProject,
          bullets: [stbMarketplaceProject.bullets[0], stbMarketplaceProject.bullets[2]],
        },
        {
          ...portfolioSiteProject,
          bullets: [portfolioSiteProject.bullets[2], portfolioSiteProject.bullets[3], portfolioSiteProject.bullets[4]],
        },
      ],
      experience: [redHatSupportExperience],
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
        {
          ...leavesSupportProject,
          bullets: [leavesSupportProject.bullets[0], leavesSupportProject.bullets[2], leavesSupportProject.bullets[4]],
        },
        {
          ...awsServerProject,
          bullets: [awsServerProject.bullets[0], awsServerProject.bullets[1]],
        },
        {
          ...raritySurfProject,
          bullets: [raritySurfProject.bullets[1], raritySurfProject.bullets[3], raritySurfProject.bullets[4]],
        },
      ],
      experience: [redHatSupportExperience],
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
      projects: [
        {
          ...nomarStocksProject,
          bullets: [nomarStocksProject.bullets[0], nomarStocksProject.bullets[1], nomarStocksProject.bullets[2]],
        },
        {
          ...stbMarketplaceProject,
          bullets: [stbMarketplaceProject.bullets[0], stbMarketplaceProject.bullets[1], stbMarketplaceProject.bullets[4]],
        },
      ],
      experience: [
        {
          ...digitalMarketplaceExperience,
          bullets: [
            digitalMarketplaceExperience.bullets[0],
            digitalMarketplaceExperience.bullets[1],
            digitalMarketplaceExperience.bullets[2],
            digitalMarketplaceExperience.bullets[3],
            digitalMarketplaceExperience.bullets[5],
          ],
        },
        {
          ...redHatSupportExperience,
          bullets: [
            redHatSupportExperience.bullets[0],
            redHatSupportExperience.bullets[3],
            redHatSupportExperience.bullets[4],
          ],
        },
      ],
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
      projects: [
        {
          ...leavesSupportProject,
          bullets: [leavesSupportProject.bullets[1], leavesSupportProject.bullets[3], leavesSupportProject.bullets[4]],
        },
        {
          ...stbMarketplaceProject,
          bullets: [stbMarketplaceProject.bullets[0], stbMarketplaceProject.bullets[2], stbMarketplaceProject.bullets[4]],
        },
      ],
      experience: [
        {
          ...digitalMarketplaceExperience,
          bullets: [
            digitalMarketplaceExperience.bullets[1],
            digitalMarketplaceExperience.bullets[2],
            digitalMarketplaceExperience.bullets[3],
            digitalMarketplaceExperience.bullets[4],
          ],
        },
        {
          ...redHatSupportExperience,
          bullets: [
            redHatSupportExperience.bullets[1],
            redHatSupportExperience.bullets[2],
            redHatSupportExperience.bullets[3],
            redHatSupportExperience.bullets[4],
          ],
        },
      ],
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
