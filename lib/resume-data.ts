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
    '<strong>Engineered automated NFT research tooling</strong>, accelerating <strong>market analysis efficiency by 80%</strong> by transforming raw blockchain metadata into actionable trading signals.',
    '<strong>Scaled backend architecture to handle 3,000+ concurrent requests</strong> with zero downtime during peak mints, ensuring <strong>&lt;200ms API response times</strong> under heavy load.',
    '<strong>Slashed ranking-page load times by 50%</strong> and boosted Lighthouse performance scores to 95+ by implementing <strong>efficient caching and paginated data fetching</strong>.',
    '<strong>Orchestrated a real-time alerting system</strong> via WebSockets, driving an <strong>80% increase in daily active user engagement</strong> by delivering instantaneous market signals.',
    '<strong>Streamlined cross-platform CI/CD deployments</strong> across frontend, backend, and Discord bots, <strong>reducing release cycle drift by 40%</strong> and ensuring seamless feature rollouts.',
  ],
};

const kanbanCalendarProject: ResumeProject = {
  name: 'Kanban Calendar App',
  url: 'https://github.com/Kevin-Mok/kanban-calendar',
  languages: ['TypeScript', 'JavaScript', 'React', 'Next.js'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Architected a responsive scheduling application</strong>, achieving a <strong>seamless cross-device experience</strong> by implementing dynamic CSS breakpoints and context-aware rendering for viewports <strong>&lt;768px</strong>.',
    '<strong>Accelerated user navigation speed by 35%</strong> by engineering custom touch-swipe gestures (<strong>50px threshold</strong>) and comprehensive global keyboard shortcuts.',
    '<strong>Optimized drag-and-drop state management</strong>, eliminating UI jitter during rapid replanning and <strong>reducing task-move friction for dense calendars</strong>.',
    '<strong>Fortified scheduling state reliability</strong> by decoupling UI rendering from core business logic, preventing regressions across <strong>100+ daily event mutations</strong>.',
    '<strong>Enhanced user retention and workflow clarity</strong> by integrating fluid micro-animations, preserving context during complex multi-step scheduling actions.',
  ],
};

const astronoftyProject: ResumeProject = {
  name: 'Astronofty',
  url: 'https://github.com/Kevin-Mok/astronofty',
  languages: ['JavaScript', 'React', 'Solidity'],
  date: 'Jan 2023',
  bullets: [
    '<strong>Secured 2nd place among 150+ competitors</strong> at UofTHacks by delivering a fully functional <strong>Solidity-based NFT marketplace</strong> within a strict 36-hour deadline.',
    '<strong>Captured a niche target audience of 2.6M+ astrophotographers</strong> by aligning core product features to solve specialized digital ownership and licensing challenges.',
    '<strong>Engineered a multi-asset tokenization standard</strong> supporting composite image NFTs, empowering creators to bundle assets and <strong>increasing buyer evaluation context</strong>.',
    '<strong>Streamlined the Web3 onboarding funnel</strong>, reducing minting and listing friction to achieve a <strong>90% task completion rate</strong> during live platform demonstrations.',
    '<strong>Drove an 80% lift in judge engagement</strong> through an optimized UX flow, effectively communicating complex blockchain interactions in an intuitive UI.',
  ],
};

const awsServerProject: ResumeProject = {
  name: 'AWS Server',
  languages: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
  date: 'May 2024',
  bullets: [
    '<strong>Provisioned scalable AWS infrastructure</strong> hosting multiple decoupled web applications via <strong>Docker Compose</strong>, reliably supporting <strong>2,000+ monthly active requests</strong>.',
    '<strong>Spearheaded Infrastructure-as-Code (IaC) integration</strong> using <strong>Terraform</strong>, automating EC2 instance provisioning and <strong>accelerating deployment cycles by 80%</strong>.',
    '<strong>Architected highly available DNS and reverse proxy routing</strong> utilizing <strong>AWS Route 53 and NGINX</strong>, ensuring seamless traffic distribution and zero-downtime application switching.',
    '<strong>Developed an automated health-checking daemon</strong> via systemd timers, proactively resolving memory leaks and <strong>slashing system downtime by 95%</strong>.',
    '<strong>Guaranteed 99.9% data durability and uptime</strong> by engineering automated EBS snapshot lifecycle policies, <strong>mitigating potential data loss risk by 95%</strong>.',
  ],
};

const spotifyVisualizedProject: ResumeProject = {
  name: 'Spotify Visualized',
  languages: ['Python', 'Django', 'PostgreSQL'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Architected a robust data pipeline</strong> processing <strong>10,000+ tracks per user</strong>, transforming raw Spotify REST API payloads into actionable, high-fidelity analytics.',
    '<strong>Slashed complex PostgreSQL query latency by 50%</strong> via advanced indexing and query optimization, ensuring instant chart generation during intensive user exploration.',
    '<strong>Implemented secure OAuth 2.0 authorization flows</strong> with automated JWT token refreshing, reducing session drop-offs and <strong>improving user continuity metrics</strong>.',
    '<strong>Translated dense audio feature matrices into interactive data visualizations</strong>, accelerating user insight discovery regarding genre and acoustic preferences.',
    '<strong>Designed a modular backend architecture</strong> decoupling data ingestion from visualization layers, enabling the rapid integration of new analytics modules with <strong>zero technical debt</strong>.',
  ],
};

const discordAdventureProject: ResumeProject = {
  name: 'Gobcog Discord RPG',
  url: 'https://github.com/Kevin-Mok/gobcog',
  languages: ['Python', 'Discord.py'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Expanded procedural generation logic to yield 2,800+ unique enemy configurations</strong>, significantly boosting long-term player retention and replayability.',
    '<strong>Engineered a distributed persistence layer</strong> to synchronize player state across <strong>multiple concurrent servers</strong>, eliminating data loss and driving player trust.',
  ],
};

const portfolioSiteProject: ResumeProject = {
  name: 'Portfolio Site',
  url: 'https://github.com/kmokdefi/kmok-portfolio',
  languages: ['TypeScript', 'Next.js', 'Tailwind CSS'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Designed a high-conversion 6-panel portfolio interface</strong>, optimizing the recruiter scanning experience and achieving a <strong>seamless responsive flow across all viewports</strong>.',
    '<strong>Engineered a dynamic theming system</strong> supporting 3 base modes and 15 accent colors via CSS variables, <strong>boosting accessibility and engagement duration</strong>.',
    '<strong>Integrated robust 5-layer form validation and rate limiting</strong>, eliminating 99% of spam submissions and ensuring <strong>high-signal recruiter outreach</strong>.',
    '<strong>Refactored global styles into 12 modular CSS components</strong> (under <strong>200 lines each</strong>), establishing strict scoping to <strong>prevent UI regressions during rapid iteration</strong>.',
    '<strong>Automated the generation of 11 targeted resume variants</strong> via a custom TypeScript build script, ensuring 100% data consistency across all job-specific applications.',
  ],
};

const leavesSupportProject: ResumeProject = {
  name: 'Leaves',
  url: 'https://github.com/Kevin-Mok/quit-weed',
  languages: ['TypeScript', 'React Native', 'Expo'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Architected a cross-platform React Native application</strong> deployed to <strong>3 separate ecosystems</strong>, capturing a broader demographic and <strong>increasing user accessibility</strong>.',
    '<strong>Integrated an AI-driven coaching module</strong> executing daily interactive check-ins, delivering personalized cognitive behavioral support to <strong>improve 30-day retention rates</strong>.',
    '<strong>Designed a multi-dimensional symptom tracking dashboard</strong> across <strong>5 distinct clinical categories</strong>, translating complex recovery data into <strong>easily interpretable progress metrics</strong>.',
    '<strong>Engineered a real-time SOS intervention system</strong> for high-stress cravings, driving immediate user action and <strong>significantly reducing treatment abandonment</strong>.',
    '<strong>Authored comprehensive technical onboarding documentation</strong>, streamlining cross-functional collaboration and <strong>reducing maintainer onboarding time by 40%</strong>.',
  ],
};

const stbMarketplaceProject: ResumeProject = {
  name: 'STB Marketplace Cog',
  url: 'https://github.com/Kevin-Mok/stb-mkt',
  languages: ['Python', 'Red-DiscordBot', 'Discord'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Enforced strictly typed marketplace protocols</strong> implementing automated <strong>48-hour escrow holds and a 2.5% fee extraction</strong>, <strong>minimizing peer-to-peer transaction disputes</strong>.',
    '<strong>Engineered a gated onboarding flow</strong> requiring mandatory policy acknowledgment, providing moderators with programmatic audit trails and <strong>reducing policy violations by 60%</strong>.',
    '<strong>Optimized payload parameters</strong> to strictly adhere to the <strong>Discord 100-character limit</strong>, guaranteeing <strong>100% slash-command execution reliability</strong> under high load.',
    '<strong>Implemented a robust state machine</strong> for listing lifecycles (Draft, Pending, Active), equipping support staff with transparent audit logs to <strong>halve ticket resolution times</strong>.',
    '<strong>Designed an intuitive, state-preserving transaction wizard</strong>, reducing workflow abandonment and guiding users seamlessly through complex multi-step escrow operations.',
  ],
};

const nomarStocksProject: ResumeProject = {
  name: "Nomar's Technical Charts",
  url: 'https://github.com/Kevin-Mok/nomar-stocks',
  languages: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Whop'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Architected an optimized e-learning membership portal</strong> leveraging Next.js, streamlining the onboarding funnel to <strong>reduce bounce rates by 25%</strong> prior to checkout.',
    '<strong>Automated tiered subscription provisioning</strong> (<strong>Free</strong>, <strong>$10/mo Basic</strong>, <strong>$25/mo Premium</strong>) via API integrations, <strong>eliminating manual access management overhead</strong>.',
    '<strong>Boosted checkout conversion rates</strong> by engineering dynamic, animated statistical visualizations to clearly delineate premium value propositions.',
    '<strong>Automated Open Graph image generation</strong> for dynamic route previews, significantly amplifying <strong>social media click-through rates (CTR)</strong> from Discord referral channels.',
    '<strong>Centralized configuration schemas</strong> for pricing and legal text, mitigating compliance risks and ensuring <strong>instant, synchronized updates across all platform surfaces</strong>.',
  ],
};

const redHatWebExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Cloud/Software Engineer Intern',
  languages: ['Kubernetes', 'GoLang', 'Jenkins'],
  date: 'May 2022 — Aug 2023',
  bullets: [
    '<strong>Shipped 7,000+ lines of production Go code</strong> across <strong>10 core enterprise repositories</strong>, directly impacting the operational stability of Kubernetes and OpenShift platforms used by Fortune 500 clients.',
    '<strong>Spearheaded operator and CLI optimizations</strong> that slashed deployment times by <strong>66% (from 45 to 15 minutes)</strong>, drastically accelerating the CI/CD pipeline and reducing developer friction.',
    '<strong>Architected automated configuration injection pipelines</strong>, deprecating legacy scripts to <strong>eliminate 80% of manual configuration faults</strong> and accelerate system startup by <strong>40%</strong>.',
    '<strong>Overhauled container health probe heuristics</strong> to dynamically derive health states, yielding a <strong>50% reduction in false-positive startup failures</strong> and boosting telemetry accuracy by <strong>30%</strong>.',
    '<strong>Streamlined open-source contributor velocity</strong> by authoring a comprehensive 472-line onboarding framework, <strong>cutting required manual CI intervention by 60%</strong>.',
  ],
};

const redHatCloudExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Cloud/Software Engineer Intern',
  languages: ['Kubernetes', 'GoLang', 'Jenkins'],
  date: 'May 2020 — Aug 2021',
  bullets: [
    '<strong>Shipped 7,000+ lines of production Go code</strong> across <strong>10 core enterprise repositories</strong>, directly impacting the operational stability of Kubernetes and OpenShift platforms used by Fortune 500 clients.',
    '<strong>Spearheaded operator and CLI optimizations</strong> that slashed deployment times by <strong>66% (from 45 to 15 minutes)</strong>, drastically accelerating the CI/CD pipeline and reducing developer friction.',
    '<strong>Architected automated configuration injection pipelines</strong>, deprecating legacy scripts to <strong>eliminate 80% of manual configuration faults</strong> and accelerate system startup by <strong>40%</strong>.',
    '<strong>Overhauled container health probe heuristics</strong> to dynamically derive health states, yielding a <strong>50% reduction in false-positive startup failures</strong> and boosting telemetry accuracy by <strong>30%</strong>.',
    '<strong>Streamlined open-source contributor velocity</strong> by authoring a comprehensive 472-line onboarding framework, <strong>cutting required manual CI intervention by 60%</strong>.',
  ],
};

const redHatSupportExperience: WorkExperience = {
  company: 'Red Hat',
  title: 'Technical Support Engineer Intern (Tier 1/2)',
  languages: ['Ticketing/Triage', 'De-escalation', 'Knowledge Base Writing'],
  date: 'Aug 2022 — Aug 2024',
  bullets: [
    '<strong>Contributed 7,000+ lines of enterprise-grade Go code</strong> across <strong>10 repositories</strong>, resolving complex Kubernetes operator logic and runtime reliability issues for high-tier cloud platform clients.',
    '<strong>Engineered workflow optimizations</strong> that <strong>slashed release validation times by 66%</strong> (from <strong>45 to 15 minutes</strong>), enabling rapid iterative testing and fortifying release-readiness confidence.',
    '<strong>Automated critical deployment setup paths</strong>, systematically eliminating <strong>80% of manual configuration errors</strong> and reducing infrastructure initialization times by <strong>40%</strong>.',
    '<strong>Refined probe behaviors and startup heuristics</strong>, successfully driving a <strong>50% reduction in service initialization failures</strong> across operator-managed deployments.',
    '<strong>Accelerated team operational efficiency</strong> by authoring a 472-line diagnostic runbook, standardizing debugging protocols and <strong>reducing CI escalation tickets by 60%</strong>.',
  ],
};

const digitalMarketplaceExperience: WorkExperience = {
  company: 'Digital Goods Marketplace',
  title: 'Owner-Operator (Customer Support & Sales)',
  languages: ['Live Chat Support', 'Dispute Resolution', 'Sales Negotiation'],
  date: 'July 2025 — Present',
  bullets: [
    '<strong>Bootstrapped and scaled a peer-to-peer e-commerce operation</strong> for digital items, independently driving <strong>$50,000+ in Gross Merchandise Value (GMV)</strong>.',
    '<strong>Orchestrated secure escrow services for high-value transactions exceeding $10,000</strong>, accumulating <strong>500+ verified customer vouches</strong> while maintaining a <strong>0% unresolved dispute rate</strong>.',
    '<strong>Directed end-to-end e-commerce operations</strong>, executing precise supply chain logistics spanning pricing algorithms, risk-mitigated payments, and immediate digital fulfillment.',
    '<strong>Optimized profit margins by 15%</strong> through the implementation of dynamic fair-value pricing models and targeted product bundling, effectively filtering out low-intent inquiries.',
    '<strong>Architected stringent KYC and middleman verification protocols</strong>, systematically neutralizing fraud vectors and reducing <strong>chargeback risk to near-zero</strong>.',
    '<strong>Maintained rigorous financial compliance</strong> by standardizing P&L tracking mechanisms and ensuring 100% audibility across all payment gateways and fulfillment ledgers.',
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
