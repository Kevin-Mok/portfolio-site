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
    '<strong>Built automated NFT research tools</strong> that turned blockchain data into trading signals and <strong>cut market analysis time by 80%</strong>.',
    '<strong>Scaled backend services for 3,000+ concurrent requests</strong> with zero downtime during peak mints and <strong>kept API response times under 200ms</strong>.',
    '<strong>Cut ranking-page load time by 50%</strong> by adding caching and paginated fetching, raising <strong>Lighthouse performance to 95+</strong>.',
    '<strong>Launched real-time WebSocket alerts</strong> that delivered instant market updates and drove an <strong>80% increase in daily active users</strong>.',
    '<strong>Standardized CI/CD across frontend, backend, and Discord bots</strong>, <strong>reducing release drift by 40%</strong> and making rollouts more reliable.',
  ],
};

const kanbanCalendarProject: ResumeProject = {
  name: 'Kanban Calendar App',
  url: 'https://github.com/Kevin-Mok/kanban-calendar',
  languages: ['TypeScript', 'JavaScript', 'React', 'Next.js'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Built a responsive scheduling app</strong> with breakpoint-aware layouts and context-aware rendering, creating a <strong>smooth desktop and mobile experience (&lt;768px)</strong>.',
    '<strong>Improved navigation speed by 35%</strong> by adding touch-swipe gestures (<strong>50px threshold</strong>) and global keyboard shortcuts.',
    '<strong>Stabilized drag-and-drop interactions</strong>, removing UI jitter during rapid replanning and <strong>making dense calendars easier to manage</strong>.',
    '<strong>Separated scheduling logic from UI rendering</strong> to prevent regressions across <strong>100+ daily event updates</strong>.',
    '<strong>Added motion cues for multi-step edits</strong> so users kept context during complex scheduling workflows, improving clarity and retention.',
  ],
};

const awsServerProject: ResumeProject = {
  name: 'AWS Server',
  languages: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
  date: 'May 2024',
  bullets: [
    '<strong>Set up scalable AWS infrastructure</strong> for multiple decoupled web apps with <strong>Docker Compose</strong>, reliably handling <strong>2,000+ monthly requests</strong>.',
    '<strong>Implemented Infrastructure as Code with Terraform</strong> to automate EC2 provisioning and <strong>speed up deployments by 80%</strong>.',
    '<strong>Built highly available DNS and reverse-proxy routing</strong> using <strong>AWS Route 53 and NGINX</strong>, enabling seamless traffic shifts with no downtime.',
    '<strong>Created automated health checks</strong> with systemd timers that caught and recovered from memory leaks, <strong>reducing downtime by 95%</strong>.',
    '<strong>Automated EBS snapshot lifecycle policies</strong> to maintain <strong>99.9% uptime and data durability</strong> while <strong>cutting data-loss risk by 95%</strong>.',
  ],
};

const spotifyVisualizedProject: ResumeProject = {
  name: 'Spotify Visualized',
  languages: ['Python', 'Django', 'PostgreSQL'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Built a data pipeline for 10,000+ tracks per user</strong>, turning Spotify API data into clear analytics users could act on.',
    '<strong>Reduced PostgreSQL query time by 50%</strong> through indexing and query tuning, enabling near-instant chart generation.',
    '<strong>Implemented OAuth 2.0 with automatic JWT refresh</strong>, reducing session drop-offs and improving user continuity.',
    '<strong>Turned complex audio-feature data into interactive visuals</strong>, helping users quickly understand genre and listening patterns.',
    '<strong>Designed a modular backend</strong> that separated ingestion from visualization, making new analytics modules fast to add with <strong>no added technical debt</strong>.',
  ],
};

const discordAdventureProject: ResumeProject = {
  name: 'Gobcog Discord RPG',
  url: 'https://github.com/Kevin-Mok/gobcog',
  languages: ['Python', 'Discord.py'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Expanded procedural generation to 2,800+ enemy combinations</strong>, improving replayability and long-term player retention.',
    '<strong>Built distributed persistence</strong> to sync player progress across <strong>multiple concurrent servers</strong>, preventing data loss and increasing player trust.',
  ],
};

const portfolioSiteProject: ResumeProject = {
  name: 'Portfolio Site',
  url: 'https://github.com/kmokdefi/kmok-portfolio',
  languages: ['TypeScript', 'Next.js', 'Tailwind CSS'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Built a 6-panel portfolio layout</strong> optimized for recruiter scanning, with a <strong>smooth responsive experience across all screen sizes</strong>.',
    '<strong>Implemented a theming system</strong> with 3 base modes and 15 accent colors using CSS variables, improving accessibility and session engagement.',
    '<strong>Added 5-layer form validation and rate limiting</strong>, removing <strong>99% of spam submissions</strong> and keeping recruiter inquiries high quality.',
    '<strong>Split global styles into 12 modular CSS files</strong> (each under <strong>200 lines</strong>) to prevent regressions during fast iteration.',
    '<strong>Automated generation of 11 role-targeted resume variants</strong> with a TypeScript build script, maintaining 100% data consistency across applications.',
  ],
};

const leavesSupportProject: ResumeProject = {
  name: 'Leaves',
  url: 'https://github.com/Kevin-Mok/quit-weed',
  languages: ['TypeScript', 'React Native', 'Expo'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Built a cross-platform React Native app</strong> released across <strong>3 ecosystems</strong>, increasing user access.',
    '<strong>Integrated an AI coaching module</strong> with daily check-ins that delivered personalized cognitive behavioral support to <strong>improve 30-day retention rates</strong>.',
    '<strong>Created a symptom tracking dashboard across 5 clinical categories</strong>, turning recovery data into clear progress metrics.',
    '<strong>Implemented a real-time SOS support flow</strong> for high-stress cravings, prompting immediate action and <strong>reducing treatment abandonment</strong>.',
    '<strong>Wrote technical onboarding docs</strong> that improved cross-team handoffs and <strong>reduced maintainer ramp-up time by 40%</strong>.',
  ],
};

const stbMarketplaceProject: ResumeProject = {
  name: 'STB Marketplace Cog',
  url: 'https://github.com/Kevin-Mok/stb-mkt',
  languages: ['Python', 'Red-DiscordBot', 'Discord'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Built typed marketplace workflows</strong> with <strong>48-hour escrow holds and a 2.5% fee</strong>, reducing peer-to-peer disputes.',
    '<strong>Added a gated onboarding flow</strong> requiring policy acknowledgment, giving moderators audit trails and <strong>cutting policy violations by 60%</strong>.',
    '<strong>Adjusted payload design for Discord&apos;s 100-character limit</strong>, maintaining <strong>100% slash-command reliability</strong> under load.',
    '<strong>Implemented a listing lifecycle state machine</strong> (Draft, Pending, Active) with audit logs that <strong>cut support ticket resolution time by 50%</strong>.',
    '<strong>Designed a state-preserving transaction wizard</strong> that reduced drop-off in multi-step escrow workflows.',
  ],
};

const nomarStocksProject: ResumeProject = {
  name: "Nomar's Technical Charts",
  url: 'https://github.com/Kevin-Mok/nomar-stocks',
  languages: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Whop'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Built a Next.js membership portal</strong> that simplified onboarding and <strong>reduced pre-checkout bounce rate by 25%</strong>.',
    '<strong>Automated subscription provisioning</strong> for <strong>Free, $10/mo Basic, and $25/mo Premium</strong> tiers, eliminating manual access work.',
    '<strong>Improved checkout conversion</strong> with animated statistics that clearly communicated premium value.',
    '<strong>Automated Open Graph image generation</strong> for dynamic routes, increasing Discord referral click-through rates.',
    '<strong>Centralized pricing and legal configuration</strong>, reducing compliance risk and keeping updates synchronized across the platform.',
  ],
};

const redHatWebExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Cloud/Software Engineer Intern',
  languages: ['Kubernetes', 'GoLang', 'Jenkins'],
  date: 'May 2022 — Aug 2023',
  bullets: [
    '<strong>Delivered 7,000+ lines of production Go code</strong> across <strong>10 enterprise repositories</strong>, improving Kubernetes and OpenShift reliability for Fortune 500 customers.',
    '<strong>Optimized operators and CLI workflows</strong>, cutting deployment time by <strong>66% (45 to 15 minutes)</strong> and speeding up CI/CD.',
    '<strong>Automated configuration injection pipelines</strong>, removing <strong>80% of manual config errors</strong> and speeding startup by <strong>40%</strong>.',
    '<strong>Improved container health-probe logic</strong>, reducing false-positive startup failures by <strong>50%</strong> and increasing telemetry accuracy by <strong>30%</strong>.',
    '<strong>Wrote a 472-line onboarding guide for open-source contributors</strong>, <strong>reducing manual CI intervention by 60%</strong>.',
  ],
};

const redHatCloudExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Cloud/Software Engineer Intern',
  languages: ['Kubernetes', 'GoLang', 'Jenkins'],
  date: 'May 2020 — Aug 2021',
  bullets: [
    '<strong>Delivered 7,000+ lines of production Go code</strong> across <strong>10 enterprise repositories</strong>, improving Kubernetes and OpenShift reliability for Fortune 500 customers.',
    '<strong>Optimized operators and CLI workflows</strong>, cutting deployment time by <strong>66% (45 to 15 minutes)</strong> and speeding up CI/CD.',
    '<strong>Automated configuration injection pipelines</strong>, removing <strong>80% of manual config errors</strong> and speeding startup by <strong>40%</strong>.',
    '<strong>Improved container health-probe logic</strong>, reducing false-positive startup failures by <strong>50%</strong> and increasing telemetry accuracy by <strong>30%</strong>.',
    '<strong>Wrote a 472-line onboarding guide for open-source contributors</strong>, <strong>reducing manual CI intervention by 60%</strong>.',
  ],
};

const redHatSupportExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Technical Support Engineer Intern (Tier 1/2)',
  languages: ['Ticketing/Triage', 'De-escalation', 'Knowledge Base Writing'],
  date: 'Aug 2022 — Aug 2024',
  bullets: [
    '<strong>Delivered 7,000+ lines of Go code across 10 repositories</strong> to resolve Kubernetes operator and runtime reliability issues for enterprise cloud customers.',
    '<strong>Improved release workflows</strong>, cutting validation time by <strong>66% (45 to 15 minutes)</strong> and enabling faster test cycles.',
    '<strong>Automated deployment setup steps</strong>, removing <strong>80% of manual configuration errors</strong> and reducing initialization time by <strong>40%</strong>.',
    '<strong>Refined startup probe behavior</strong>, lowering service initialization failures by <strong>50%</strong> in operator-managed environments.',
    '<strong>Authored a 472-line diagnostic runbook</strong> that standardized troubleshooting and <strong>reduced CI escalation tickets by 60%</strong>.',
  ],
};

const digitalMarketplaceExperience: WorkExperience = {
  company: 'Digital Goods Marketplace',
  title: 'Owner-Operator (Customer Support & Sales)',
  languages: ['Live Chat Support', 'Dispute Resolution', 'Sales Negotiation'],
  date: 'July 2025 — Present',
  bullets: [
    '<strong>Built and scaled a peer-to-peer digital goods business</strong>, generating <strong>$50,000+ in gross merchandise value (GMV)</strong>.',
    '<strong>Managed escrow for transactions over $10,000</strong>, earning <strong>500+ verified customer vouches</strong> with a <strong>0% unresolved dispute rate</strong>.',
    '<strong>Ran end-to-end marketplace operations</strong>, including pricing, payment risk controls, and rapid digital fulfillment.',
    '<strong>Increased profit margins by 15%</strong> through fair-value pricing and product bundles that filtered low-intent leads.',
    '<strong>Implemented KYC and middleman verification checks</strong>, reducing fraud exposure and bringing <strong>chargeback risk close to zero</strong>.',
    '<strong>Standardized P&amp;L tracking and payment records</strong>, keeping operations fully auditable across gateways and fulfillment logs.',
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
          ...portfolioSiteProject,
          bullets: [
            portfolioSiteProject.bullets[0],
            portfolioSiteProject.bullets[2],
            portfolioSiteProject.bullets[4],
          ],
        },
        {
          ...spotifyVisualizedProject,
          bullets: [
            spotifyVisualizedProject.bullets[0],
            spotifyVisualizedProject.bullets[1],
            spotifyVisualizedProject.bullets[4],
          ],
        },
        {
          ...awsServerProject,
          bullets: [awsServerProject.bullets[1], awsServerProject.bullets[2], awsServerProject.bullets[3]],
        },
      ],
      experience: [
        {
          ...redHatCloudExperience,
          bullets: [
            redHatCloudExperience.bullets[0],
            redHatCloudExperience.bullets[1],
            redHatCloudExperience.bullets[2],
            redHatCloudExperience.bullets[3],
          ],
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
            raritySurfProject.bullets[4],
          ],
        },
        {
          ...portfolioSiteProject,
          bullets: [
            portfolioSiteProject.bullets[0],
            portfolioSiteProject.bullets[1],
            portfolioSiteProject.bullets[2],
            portfolioSiteProject.bullets[3],
          ],
        },
        {
          ...kanbanCalendarProject,
          bullets: [
            kanbanCalendarProject.bullets[0],
            kanbanCalendarProject.bullets[1],
            kanbanCalendarProject.bullets[2],
            kanbanCalendarProject.bullets[3],
          ],
        },
      ],
      experience: [
        {
          ...redHatWebExperience,
          bullets: [
            redHatWebExperience.bullets[0],
            redHatWebExperience.bullets[1],
            redHatWebExperience.bullets[2],
            redHatWebExperience.bullets[3],
          ],
        },
      ],
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
            awsServerProject.bullets[4],
          ],
        },
        {
          ...raritySurfProject,
          bullets: [raritySurfProject.bullets[1], raritySurfProject.bullets[4]],
        },
        {
          ...portfolioSiteProject,
          bullets: [portfolioSiteProject.bullets[4]],
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
          ...stbMarketplaceProject,
          bullets: [
            stbMarketplaceProject.bullets[0],
            stbMarketplaceProject.bullets[2],
            stbMarketplaceProject.bullets[3],
          ],
        },
      ],
      experience: [
        {
          ...redHatCloudExperience,
          bullets: [
            redHatCloudExperience.bullets[0],
            redHatCloudExperience.bullets[1],
            redHatCloudExperience.bullets[2],
            redHatCloudExperience.bullets[3],
          ],
        },
      ],
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
          bullets: [
            awsServerProject.bullets[0],
            awsServerProject.bullets[1],
            awsServerProject.bullets[2],
            awsServerProject.bullets[3],
          ],
        },
        {
          ...raritySurfProject,
          bullets: [raritySurfProject.bullets[0], raritySurfProject.bullets[1], raritySurfProject.bullets[4]],
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
      experience: [
        {
          ...redHatCloudExperience,
          bullets: [
            redHatCloudExperience.bullets[0],
            redHatCloudExperience.bullets[1],
            redHatCloudExperience.bullets[2],
            redHatCloudExperience.bullets[3],
          ],
        },
      ],
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
          bullets: [awsServerProject.bullets[1], awsServerProject.bullets[2], awsServerProject.bullets[3]],
        },
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
      ],
      experience: [
        {
          ...redHatCloudExperience,
          bullets: [
            redHatCloudExperience.bullets[0],
            redHatCloudExperience.bullets[1],
            redHatCloudExperience.bullets[2],
            redHatCloudExperience.bullets[3],
          ],
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
          ...kanbanCalendarProject,
          bullets: [
            kanbanCalendarProject.bullets[0],
            kanbanCalendarProject.bullets[1],
            kanbanCalendarProject.bullets[3],
          ],
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
      experience: [
        {
          ...redHatWebExperience,
          bullets: [
            redHatWebExperience.bullets[0],
            redHatWebExperience.bullets[1],
            redHatWebExperience.bullets[2],
            redHatWebExperience.bullets[3],
          ],
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
      projects: [
        {
          ...leavesSupportProject,
          bullets: [leavesSupportProject.bullets[2], leavesSupportProject.bullets[3], leavesSupportProject.bullets[4]],
        },
        {
          ...stbMarketplaceProject,
          bullets: [
            stbMarketplaceProject.bullets[1],
            stbMarketplaceProject.bullets[3],
            stbMarketplaceProject.bullets[4],
          ],
        },
        {
          ...portfolioSiteProject,
          bullets: [portfolioSiteProject.bullets[2], portfolioSiteProject.bullets[3]],
        },
      ],
      experience: [
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
          ...awsServerProject,
          bullets: [awsServerProject.bullets[0], awsServerProject.bullets[1], awsServerProject.bullets[3]],
        },
        {
          ...leavesSupportProject,
          bullets: [leavesSupportProject.bullets[3], leavesSupportProject.bullets[4]],
        },
        {
          ...stbMarketplaceProject,
          bullets: [stbMarketplaceProject.bullets[1], stbMarketplaceProject.bullets[3]],
        },
      ],
      experience: [
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
      'Revenue-focused customer operations professional with high-value transaction support, negotiation, and dispute prevention experience, consistently improving GMV outcomes and customer trust.',
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
            digitalMarketplaceExperience.bullets[3],
            digitalMarketplaceExperience.bullets[5],
          ],
        },
        {
          ...redHatSupportExperience,
          bullets: [redHatSupportExperience.bullets[4]],
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
      'High-volume customer support professional with Tier 1/2 troubleshooting, de-escalation, and documentation discipline, improving response quality and reducing escalation friction across phone/chat/email queues.',
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
          bullets: [stbMarketplaceProject.bullets[1], stbMarketplaceProject.bullets[3], stbMarketplaceProject.bullets[4]],
        },
      ],
      experience: [
        {
          ...digitalMarketplaceExperience,
          bullets: [
            digitalMarketplaceExperience.bullets[1],
            digitalMarketplaceExperience.bullets[2],
            digitalMarketplaceExperience.bullets[3],
          ],
        },
        {
          ...redHatSupportExperience,
          bullets: [redHatSupportExperience.bullets[3], redHatSupportExperience.bullets[4]],
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
