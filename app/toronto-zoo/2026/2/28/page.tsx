import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

const CANONICAL_URL = 'https://kevin-mok.com/toronto-zoo/2026/2/28';

interface PhotoItem {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

interface VideoItem {
  src: string;
  posterSrc: string;
  title: string;
  caption: string;
  durationLabel: string;
}

interface AnimalSection {
  id: string;
  title: string;
  paragraphs: [string, string];
  photos: [PhotoItem, PhotoItem];
  video: VideoItem;
  fullWidthVisual: boolean;
  forceTwoPhotoRow?: boolean;
}

const ANIMAL_SECTIONS: AnimalSection[] = [
  {
    id: 'snow-leopard',
    title: 'Snow Leopard Talk',
    paragraphs: [
      'The snow leopard recordings repeatedly frame planning around Pemba, Jita, and the two cubs, with staff noting that transfer dates can shift as cross-border paperwork changes. The conservation focus is less about a single timeline and more about matching social structure, genetics, and habitat readiness across accredited zoos.',
      'Behavior notes in the talk match the selected close-up media: long rest phases, short movement bursts, and strong camouflage against rock and snow. Staff commentary on feeding differences and enrichment turnover provides context for the stretch-and-reset patterns visible in the cropped highlight clip.',
    ],
    photos: [
      {
        src: '/images/blog/toronto-zoo-2026-02-28/snow-leopard-closeup-1.webp',
        alt: 'Snow leopard close portrait in winter habitat',
        caption: 'Snow leopard close-up highlight showing facial detail and coat pattern.',
        width: 3072,
        height: 4080,
      },
      {
        src: '/images/blog/toronto-zoo-2026-02-28/snow-leopard-closeup-2.webp',
        alt: 'Snow leopard resting in a tight frame near the enclosure fence',
        caption: 'Second snow leopard close-up highlight with resting posture and eye line.',
        width: 3072,
        height: 4080,
      },
    ],
    video: {
      src: '/videos/blog/toronto-zoo-2026-02-28/snow-leopard-highlight.mp4',
      posterSrc: '/images/blog/toronto-zoo-2026-02-28/snow-leopard-video-poster.webp',
      title: 'Snow Leopard Highlight Video',
      caption:
        'Square crop from original source video, centered on the animal, with compatibility-focused encode.',
      durationLabel: '14.9s',
    },
    fullWidthVisual: false,
  },
  {
    id: 'polar-bear',
    title: 'Polar Bear Talk',
    paragraphs: [
      'The polar bear audio emphasizes rotation through larger spaces, climate-controlled indoor access, and enrichment pacing throughout the day. That operational detail explains why behavior can look cyclical at the viewing window even when the animals have broader off-camera access.',
      'The strongest interpretation theme is welfare-by-design: pacing routes, object interaction, and temperature control are managed together rather than as isolated tasks. The two tight photos and square crop clip prioritize body language and enrichment contact over wide habitat coverage.',
    ],
    photos: [
      {
        src: '/images/blog/toronto-zoo-2026-02-28/polar-bear-closeup-1.webp',
        alt: 'Polar bear close to viewing glass in snow',
        caption: 'Polar bear close-up highlight at the viewing edge in winter conditions.',
        width: 3072,
        height: 4080,
      },
      {
        src: '/images/blog/toronto-zoo-2026-02-28/polar-bear-closeup-2.webp',
        alt: 'Polar bear standing near den opening in a tighter frame',
        caption: 'Second polar bear close-up highlight near den-side rock structures.',
        width: 1850,
        height: 2500,
      },
    ],
    video: {
      src: '/videos/blog/toronto-zoo-2026-02-28/polar-bear-highlight.mp4',
      posterSrc: '/images/blog/toronto-zoo-2026-02-28/polar-bear-video-poster.webp',
      title: 'Polar Bear Highlight Video',
      caption:
        'Square crop from original source video, focused on enrichment behavior, with compatibility-focused encode.',
      durationLabel: '18.3s',
    },
    fullWidthVisual: true,
    forceTwoPhotoRow: true,
  },
  {
    id: 'gibbon',
    title: 'Gibbon Talk',
    paragraphs: [
      'The gibbon segment in this format is observation-driven from media rather than keeper transcript. The selected highlights focus on elevated perch use, hand-and-foot balance control, and short repositioning movements around enrichment objects in a dense structural environment.',
      'Framing is intentionally tight to keep attention on posture, grip transitions, and interaction with nearby fixtures instead of background architecture. The same square crop style used for the other species is applied to preserve visual consistency across all animal sections.',
    ],
    photos: [
      {
        src: '/images/blog/toronto-zoo-2026-02-28/gibbon-closeup-1.webp',
        alt: 'Gibbon close-up screenshot with face and upper body detail',
        caption: 'Gibbon close-up highlight from on-site screenshot media.',
        width: 1050,
        height: 1080,
      },
      {
        src: '/images/blog/toronto-zoo-2026-02-28/gibbon-closeup-2.webp',
        alt: 'White-cheeked gibbon portrait reference image',
        caption: 'Second gibbon close-up highlight from stock/reference media.',
        width: 1536,
        height: 1024,
      },
    ],
    video: {
      src: '/videos/blog/toronto-zoo-2026-02-28/gibbon-highlight.mp4',
      posterSrc: '/images/blog/toronto-zoo-2026-02-28/gibbon-video-poster.webp',
      title: 'Gibbon Highlight Video',
      caption:
        'Square crop from original source video, focused on perch behavior, with compatibility-focused encode.',
      durationLabel: '32.8s',
    },
    fullWidthVisual: true,
    forceTwoPhotoRow: true,
  },
];

export const metadata: Metadata = {
  title: 'Toronto Zoo Field Notes (2026-02-28)',
  description:
    'Server-rendered Toronto Zoo field notes with separate animal talk sections and curated media: two close-up photos plus one cropped lossless video per animal.',
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'Toronto Zoo Field Notes (2026-02-28)',
    description:
      'White-and-green wildlife preservation themed field notes with per-animal highlights.',
    url: CANONICAL_URL,
    images: [
      {
        url: '/images/blog/toronto-zoo-2026-02-28/snow-leopard-closeup-1.webp',
        width: 3072,
        height: 4080,
        alt: 'Snow leopard close-up at Toronto Zoo',
      },
    ],
    type: 'article',
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function TorontoZooFieldNotesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Toronto Zoo Field Notes</p>
          <h1 className={styles.title}>Wildlife Preservation Through Observation</h1>
          <p className={styles.subtitle}>
            A server-rendered recap from February 28, 2026 with separate animal talk sections,
            transcript-grounded notes, and curated close-up media.
          </p>
          <div className={styles.metaRow}>
            <span>{formatDate('2026-02-28')}</span>
            <span aria-hidden="true">•</span>
            <span>2 photos + 1 cropped lossless video per animal</span>
            <span aria-hidden="true">•</span>
            <span>Mobile-optimized</span>
          </div>
        </header>

        {ANIMAL_SECTIONS.map((animal, sectionIndex) => (
          <section key={animal.id} className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>{animal.title}</h2>
            <p>{animal.paragraphs[0]}</p>
            <p>{animal.paragraphs[1]}</p>

            <div
              className={`${styles.photoGrid} ${
                animal.fullWidthVisual ? styles.photoGridLandscape : ''
              } ${animal.forceTwoPhotoRow ? styles.photoGridTwoUp : ''}`}
            >
              {animal.photos.map((photo, photoIndex) => (
                <figure key={photo.src} className={styles.mediaCard}>
                  <div className={styles.imageFrame}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      sizes={
                        animal.fullWidthVisual
                          ? '(max-width: 768px) 92vw, 100vw'
                          : '(max-width: 768px) 92vw, (max-width: 1100px) 48vw, 50vw'
                      }
                      priority={sectionIndex === 0 && photoIndex === 0}
                    />
                  </div>
                  <figcaption className={styles.caption}>
                    <span className={styles.captionLabel}>Photo highlight</span>
                    <span>{photo.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <figure className={`${styles.videoCard} ${styles.videoStandalone}`}>
              <video
                className={styles.video}
                controls
                preload="metadata"
                poster={animal.video.posterSrc}
                playsInline
                aria-label={animal.video.title}
              >
                <source src={animal.video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <figcaption className={styles.caption}>
                <span className={styles.captionLabel}>
                  {animal.video.title} ({animal.video.durationLabel})
                </span>
                <span>{animal.video.caption}</span>
              </figcaption>
            </figure>
          </section>
        ))}

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Preservation Lens</h2>
          <p>
            Wildlife preservation is not only about population counts. It is also about whether
            enclosure design, enrichment cadence, and observation practices support natural
            behavior with minimal stress over time.
          </p>
        </section>
      </div>
    </main>
  );
}
