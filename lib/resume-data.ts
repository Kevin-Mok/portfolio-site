/**
 * Resume Data Structure
 * Single source of truth for all resume content
 * Content migrated from /home/kevin/coding/mf-site/content/resume/_index.md
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

export const resumeData: Resume = {
  contact: {
    phone: '647-685-2500',
    email: 'me@kevin-mok.com',
    linkedin: 'linkedin.com/in/Kev-Mok',
    github: 'github.com/Kevin-Mok',
  },
  projects: [
    {
      name: 'Rarity Surf',
      languages: ['TypeScript', 'JavaScript', 'Node.js', 'React'],
      date: 'March 2025',
      bullets: [
        'Developed a full-stack web application (TypeScript/JavaScript) to generate rarity rankings for NFTs, integrating with leading marketplace\'s API to enable users to quickly identify rare NFTs and check their listing status, improving market research efficiency by 80%.',
        'Built a scalable Node.js backend with REST API endpoints to return NFTs based on customizable filters such as max rank, price, and rarest traits. Optimized performance to handle 3,000+ concurrent requests by implementing efficient data fetching and caching mechanisms using PostgreSQL, ensuring low-latency access to NFT data.',
        'Built a dynamic React frontend (TypeScript/JavaScript) to load and display NFTs in real-time with user-defined filters. Styled using a mobile-responsive library, reducing load times by 50%.',
        'Developed a Discord bot (TypeScript/JavaScript/Node.js) to notify users of profitable resale opportunities by leveraging historical sales data to assess deal quality. This feature increased user engagement by 80% and provided a seamless way for users to stay updated on market opportunities.',
      ],
    },
    {
      name: 'Kanban Calendar',
      url: 'https://github.com/Kevin-Mok/astronofty',
      languages: ['TypeScript', 'JavaScript', 'React', 'Next.js'],
      date: 'Mar 2024',
      bullets: [
        'Developed a responsive calendar Kanban board using Next.js, TypeScript, and Tailwind CSS, featuring draggable events, smooth card-to-detail transitions week/day views optimized for both desktop and mobile.',
        'Engineered intuitive navigation and cross-device interactivity, implementing swipe gestures, infinite horizontal scrolling (mobile), and arrow controls (desktop) while resolving challenges like drag-and-drop consistency and responsive layout transitions.',
      ],
    },
    {
      name: 'Astronofty',
      url: 'https://github.com/Kevin-Mok/astronofty',
      languages: ['JavaScript', 'React', 'Solidity'],
      date: 'Jan 2023',
      bullets: [
        'Secured 2nd place overall out of 150+ teams at UofTHacks X, a 36-hour hackathon, for developing a blockchain-based NFT marketplace app.',
        'Built and optimized React (JavaScript) components to synchronously upload images and metadata to IPFS, enhancing user engagement by 80% during the demo.',
      ],
    },
  ],
  experience: [
    {
      company: 'Red Hat',
      title: 'Cloud/Software Engineer Intern',
      languages: ['Kubernetes', 'GoLang', 'Jenkins'],
      date: 'May 2022 — Aug 2023',
      bullets: [
        'Eliminated 80% of manual configuration errors by enabling the Kubernetes operator to automatically fetch data from deployed services and update configurations, deprecating legacy startup scripts and reducing overall startup time by 40% (Kubernetes/GoLang used for this and three below).',
        'Reduced deployment time by 66% by implementing a solution for deploying locally-compiled binaries onto Kubernetes/OpenShift via command-line, cutting average deployment times from 45 minutes to 15 minutes.',
        'Improved application stability by introducing startup probes for legacy applications with longer boot times, resulting in a 50% reduction in startup-related failures and downtime during production launches.',
        'Improved system reliability by refactoring probes to dynamically assign default values based on YAML files, increasing probe accuracy by 30% and preventing misconfigurations.',
        'Increased CI pipeline efficiency by rewriting the Jenkins (Groovy) nightly pipeline to run in a GitHub PR environment, allowing for automated testing of all team-submitted PRs prior to merging, reducing manual intervention by 60%.',
      ],
    },
  ],
  skills: [
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
  ],
  education: [
    {
      institution: 'University of Toronto (St. George)',
      degree: 'Computer Science Specialist',
      gpa: '3.84 GPA',
      date: '2019 — 2024',
    },
  ],
};
