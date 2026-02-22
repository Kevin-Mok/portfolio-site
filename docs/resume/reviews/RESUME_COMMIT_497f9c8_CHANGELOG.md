# Resume Changes for Review (`497f9c8`)

Date: February 22, 2026  
Commit: `497f9c8daadf4423b3b9ada2743267a200be6eda`  
Scope: `app/styles/13-resume-latex.css`, `lib/resume-data.ts`

This document captures the exact resume text/layout changes introduced in commit `497f9c8`.

## `web-dev` (`kevin-mok-resume-web-dev.pdf`)

- Reordered `nomarStocksProject` bullets (same text, order changed):
- Before:
  - `<strong>Architected</strong> a tiered membership system supporting <strong>3 distinct subscription levels</strong> using <strong>Next.js</strong>, reducing client-side navigation latency by <strong>50%</strong> through optimized route handling.`
  - `<strong>Engineered an end-to-end automated onboarding pipeline</strong> via Whop API integration, achieving a <strong>100% reduction</strong> in manual administration while ensuring <strong>instant fulfillment</strong> for 16+ community channels.`
- After:
  - `<strong>Engineered an end-to-end automated onboarding pipeline</strong> via Whop API integration, achieving a <strong>100% reduction</strong> in manual administration while ensuring <strong>instant fulfillment</strong> for 16+ community channels.`
  - `<strong>Architected</strong> a tiered membership system supporting <strong>3 distinct subscription levels</strong> using <strong>Next.js</strong>, reducing client-side navigation latency by <strong>50%</strong> through optimized route handling.`
- Replaced one `kanbanCalendarProject` bullet:
  - Removed: `<strong>Architected</strong> a mobile-first navigation system featuring <strong>Custom React Hooks</strong> and swipe gestures, increasing mobile user engagement by <strong>22%</strong>.`
  - Added: `<strong>Refined</strong> component performance using <strong>React 19&apos;s</strong> memoization patterns, reducing unnecessary re-renders by <strong>40%</strong> during intensive drag operations.`

## `aws` (`kevin-mok-resume-aws.pdf`)

- `raritySurfProject` additions/removal:
  - Removed: `<strong>Engineered</strong> a high-performance RESTful API via <strong>Express</strong>, maintaining sub-second response times for complex trait-based queries and reducing loading latency by <strong>35%</strong>.`
  - Added: `<strong>Implemented</strong> batch-processing transaction logic with <strong>Prisma</strong>, reducing database contention and overhead by <strong>35%</strong> during large-scale NFT metadata updates.`
  - Added: `<strong>Optimized</strong> relational data schemas using <strong>PostgreSQL</strong> and <strong>Prisma</strong>, accelerating query execution for price-floor calculations by <strong>40%</strong> through strategic indexing.`
- `redHatCloudExperience` was narrowed to bullets `[0,1,2,5]`; removed:
  - `<strong>Authored</strong> a comprehensive 472-line developer onboarding guide, reducing contributor ramp-up time by <strong>60%</strong> and improving overall team productivity.`
  - `<strong>Contributed</strong> high-impact bug fixes to the <strong>Prometheus Operator</strong> (CNCF), enhancing monitoring reliability for 8,800+ production clusters worldwide.`
  - `<strong>Automated</strong> configuration fetch logic in <strong>Go</strong>, eliminating <strong>80%</strong> of manual setup errors and reducing system startup time by <strong>40%</strong>.`
  - `<strong>Orchestrated</strong> a 587-line refactor to isolate <strong>Quarkus</strong> and <strong>Spring Boot</strong> environment properties, significantly reducing framework-specific deployment friction.`
  - `<strong>Integrated</strong> PostgreSQL and Kafka persistence layers into <strong>Helm</strong> templates, enabling <strong>100%</strong> support for scalable, event-driven enterprise architectures.`
  - `<strong>Centralized</strong> cross-platform CLI builds to include <strong>Windows</strong>, achieving <strong>100%</strong> compatibility across all major developer operating systems.`

## `python` (`kevin-mok-resume-python.pdf`)

- `spotifyVisualizedProject`:
  - Removed: `<strong>Architected</strong> interactive data visualizations using <strong>D3.js</strong>, increasing user engagement by <strong>22%</strong> through intuitive circle packing and stacked bar chart representations of artist distribution.`
  - Added: `<strong>Centralized</strong> track and genre data processing within <strong>Django</strong> utility modules, reducing server-side latency by <strong>35%</strong> during the batch ingestion of large-scale user datasets.`
- `discordAdventureProject` was narrowed to bullets `[0,4,5]`; removed:
  - `<strong>Architected</strong> a dedicated session analytics class, <code>AdventureResults</code>, providing <strong>100%</strong> data visibility into real-time gameplay trends and automated session auditing.`
  - `<strong>Optimized</strong> dynamic difficulty scaling algorithms using damage-per-second (DPS) tracking, improving user win-rate consistency and UX satisfaction by <strong>30%</strong>.`
  - `<strong>Recalibrated</strong> end-game progression logic for high-tier "ascended" users, boosting long-term retention by <strong>25%</strong> through refined reward distribution.`
  - `<strong>Developed</strong> a modular character state-management system using <strong>JSON</strong> serialization, improving data retrieval speeds and reducing database overhead by <strong>15%</strong>.`
  - `<strong>Automated</strong> complex reward and loss calculations based on group participation, resulting in a <strong>20%</strong> more balanced virtual economy and preventing currency inflation.`
  - `<strong>Refactored</strong> legacy code for high-tier "rebirth" mechanics, resolving <strong>100%</strong> of reported progression blockers for veteran players.`
  - `<strong>Designed</strong> data-rich, responsive UI components using <strong>Discord Embeds</strong>, increasing user engagement with leaderboard and statistics data by <strong>35%</strong>.`
- `redHatCloudExperience` swap:
  - Removed: `<strong>Founded</strong> the entire <strong>Helm</strong> charts repository from the ground up, providing a GitOps-ready deployment alternative that simplified infrastructure management for global users.`
  - Removed: `<strong>Authored</strong> a comprehensive 472-line developer onboarding guide, reducing contributor ramp-up time by <strong>60%</strong> and improving overall team productivity.`
  - Added: `<strong>Automated</strong> configuration fetch logic in <strong>Go</strong>, eliminating <strong>80%</strong> of manual setup errors and reducing system startup time by <strong>40%</strong>.`
  - Added: `<strong>Streamlined</strong> deployment workflows and CLI tools, cutting release cycle times by <strong>66%</strong> and accelerating time-to-market for enterprise automation features.`
- Print layout changes in `app/styles/13-resume-latex.css`:
  - `--resume-print-scale: 1.098 -> 1.064`
  - `--resume-print-top-offset: 13.747pt -> 22.734pt`
  - `--resume-print-leading: 1.043 -> 1.029`

## `aws-web-dev` (`kevin-mok-resume-aws-web-dev.pdf`)

- Reordered `nomarStocksProject` first two bullets (same two strings as `web-dev`, swapped order).
- `redHatCloudExperience` swap:
  - Removed: `<strong>Authored</strong> a comprehensive 472-line developer onboarding guide, reducing contributor ramp-up time by <strong>60%</strong> and improving overall team productivity.`
  - Added: `<strong>Streamlined</strong> deployment workflows and CLI tools, cutting release cycle times by <strong>66%</strong> and accelerating time-to-market for enterprise automation features.`

## `aws-python` (`kevin-mok-resume-aws-python.pdf`)

- `spotifyVisualizedProject`:
  - Removed: `<strong>Architected</strong> interactive data visualizations using <strong>D3.js</strong>, increasing user engagement by <strong>22%</strong> through intuitive circle packing and stacked bar chart representations of artist distribution.`
- `discordAdventureProject` was narrowed to bullets `[0,4,5]`; removed:
  - `<strong>Architected</strong> a dedicated session analytics class, <code>AdventureResults</code>, providing <strong>100%</strong> data visibility into real-time gameplay trends and automated session auditing.`
  - `<strong>Optimized</strong> dynamic difficulty scaling algorithms using damage-per-second (DPS) tracking, improving user win-rate consistency and UX satisfaction by <strong>30%</strong>.`
  - `<strong>Recalibrated</strong> end-game progression logic for high-tier "ascended" users, boosting long-term retention by <strong>25%</strong> through refined reward distribution.`
  - `<strong>Developed</strong> a modular character state-management system using <strong>JSON</strong> serialization, improving data retrieval speeds and reducing database overhead by <strong>15%</strong>.`
  - `<strong>Automated</strong> complex reward and loss calculations based on group participation, resulting in a <strong>20%</strong> more balanced virtual economy and preventing currency inflation.`
  - `<strong>Refactored</strong> legacy code for high-tier "rebirth" mechanics, resolving <strong>100%</strong> of reported progression blockers for veteran players.`
  - `<strong>Designed</strong> data-rich, responsive UI components using <strong>Discord Embeds</strong>, increasing user engagement with leaderboard and statistics data by <strong>35%</strong>.`
- `redHatCloudExperience` swap:
  - Removed: `<strong>Founded</strong> the entire <strong>Helm</strong> charts repository from the ground up, providing a GitOps-ready deployment alternative that simplified infrastructure management for global users.`
  - Removed: `<strong>Authored</strong> a comprehensive 472-line developer onboarding guide, reducing contributor ramp-up time by <strong>60%</strong> and improving overall team productivity.`
  - Added: `<strong>Automated</strong> configuration fetch logic in <strong>Go</strong>, eliminating <strong>80%</strong> of manual setup errors and reducing system startup time by <strong>40%</strong>.`
  - Added: `<strong>Streamlined</strong> deployment workflows and CLI tools, cutting release cycle times by <strong>66%</strong> and accelerating time-to-market for enterprise automation features.`

## `web-dev-django` (`kevin-mok-resume-web-dev-django.pdf`)

- `spotifyVisualizedProject` swaps:
  - Removed: `<strong>Architected</strong> interactive data visualizations using <strong>D3.js</strong>, increasing user engagement by <strong>22%</strong> through intuitive circle packing and stacked bar chart representations of artist distribution.`
  - Removed: `<strong>Implemented</strong> a secure, automated token refresh mechanism using <strong>Python</strong>, reducing session-related account interruptions by <strong>40%</strong> and improving daily access stability.`
  - Added: `<strong>Engineered</strong> a robust <strong>PostgreSQL</strong> schema to maintain persistent listening histories, ensuring <strong>100%</strong> data integrity across complex many-to-many relationships between artists and genres.`
  - Added: `<strong>Centralized</strong> track and genre data processing within <strong>Django</strong> utility modules, reducing server-side latency by <strong>35%</strong> during the batch ingestion of large-scale user datasets.`
- Print layout changes in `app/styles/13-resume-latex.css`:
  - `--resume-print-scale: 1.134 -> 1.132`
  - `--resume-print-leading: 1.05 -> 1.049`
  - `--resume-print-top-offset: 25.7pt -> 24.25pt`
