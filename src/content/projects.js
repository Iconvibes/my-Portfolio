/**
 * Portfolio projects.
 *
 * Images are optimized for web delivery:
 *   - image: desktop-optimized JPG (~159-532KB)
 *   - imageSm: mobile-optimized JPG at 800px wide (~41-63KB)
 *   - imageWebp: WebP variant for modern browsers (~64-96KB)
 *   - width/height: intrinsic dimensions for CLS prevention
 */
export const projects = [
  {
    slug: 'so-safe-corps',
    name: 'Ogun State So-Safe Corps',
    tagline: 'The official digital platform of a state security institution',
    sector: 'Government & Public Sector',
    description:
      'A secure, public-facing platform for Ogun State So-Safe Corps, a state security organization, built to strengthen public trust, streamline engagement, and reflect institutional authority online.',
    highlights: [
      'Public-facing government platform, live in production',
      'Security-first architecture with access control',
      'Responsive, accessible, and performance-tuned'
    ],
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    status: 'live',
    href: 'https://sosafecorps.og.gov.ng',
    caseStudyUrl: '/case-study/so-safe-corps',
    domain: 'sosafecorps.og.gov.ng',
    image: '/projects/so-safe-corps.jpg',
    imageSm: '/projects/so-safe-corps-sm.jpg',
    imageWebp: '/projects/so-safe-corps.webp',
    imageWidth: 1600,
    imageHeight: 734,
    featured: true,
    accent: 'emerald'
  },
  {
    slug: 'wura-grand-hotel',
    name: 'De Wura Hotel',
    tagline: 'A premium digital experience for a distinguished hotel',
    sector: 'Hospitality',
    description:
      'A refined hotel website for De Wura Hotel. Elegant brand-led design, room and suite showcases, and booking journeys built to turn first impressions into reservations.',
    highlights: [
      'Premium, brand-led design system',
      'Rooms, suites, and gallery showcases',
      'Booking-focused user journeys'
    ],
    tech: ['React', 'Tailwind CSS', 'Node.js'],
    status: 'live',
    href: 'https://wura-xi.vercel.app/',
    caseStudyUrl: '/case-study/wura-grand-hotel',
    domain: 'wura-xi.vercel.app',
    image: '/projects/wura.jpg',
    imageSm: '/projects/wura-sm.jpg',
    imageWebp: '/projects/wura.webp',
    imageWidth: 1600,
    imageHeight: 814,
    featured: false,
    accent: 'amber'
  },
  {
    slug: 'tpc-logistics',
    name: 'TPC Logistics',
    tagline: 'A logistics landing page built to turn inquiries into WhatsApp leads',
    sector: 'Logistics',
    description:
      'A focused logistics landing page for TPC Logistics. Clear service highlights and a WhatsApp lead capture flow that makes it easy to request a pickup or quote on any device.',
    highlights: [
      'WhatsApp lead capture flow',
      'Clear service sections and CTAs',
      'Mobile-first inquiry funnel'
    ],
    tech: ['HTML', 'Tailwind CSS', 'JavaScript'],
    status: 'live',
    href: 'https://tpc-client.vercel.app/',
    caseStudyUrl: '/case-study/tpc-logistics',
    domain: 'tpc-client.vercel.app',
    image: '/projects/tpc.jpg',
    imageSm: '/projects/tpc-sm.jpg',
    imageWidth: 1200,
    imageHeight: 656,
    featured: false,
    accent: 'cyan'
  },
  {
    slug: 'edutrack',
    name: 'EduTrack',
    tagline: 'A web app that keeps learning on track',
    sector: 'Education',
    description:
      'An education web application that helps educators and institutions manage and track student progress. Assignments, performance, and insights in one clean, fast interface.',
    highlights: [
      'Student progress and assignment tracking',
      'Clean, fast, classroom-first interface',
      'Built for real educators, not jargon'
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    status: 'production',
    href: '',
    caseStudyUrl: '',
    domain: 'In Production',
    image: '/projects/edutrack.svg',
    imageWidth: 600,
    imageHeight: 375,
    featured: false,
    accent: 'violet'
  },
  {
    slug: 'ecommerce-store',
    name: 'NaijaMart',
    tagline: 'A multi-vendor storefront built to turn browsers into buyers',
    sector: 'Business & Startups',
    description:
      'A fully responsive multi-vendor e-commerce site designed to improve digital presence and drive conversions for businesses. From the storefront UI to product and vendor flows, built for a seamless experience across desktop and mobile.',
    highlights: [
      'Multi-vendor storefront with product and vendor flows',
      'Mobile-first, conversion-focused design',
      'Seamless experience across desktop and mobile'
    ],
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS'],
    status: 'soon',
    href: '',
    caseStudyUrl: '',
    domain: 'Launching soon',
    image: '/projects/naijamart.jpg',
    imageSm: '/projects/naijamart-sm.jpg',
    imageWidth: 1200,
    imageHeight: 656,
    featured: false,
    accent: 'rose'
  },
  {
    slug: 'verdant-estates',
    name: 'Verdant Estates',
    tagline: 'A modern real estate platform built to showcase and connect properties with buyers',
    sector: 'Real Estate',
    description:
      'A comprehensive real estate platform designed to showcase properties, streamline listings, and connect buyers with their dream homes. Featuring intuitive search, detailed property views, and a clean, modern interface.',
    highlights: [
      'Property listings with detailed views and filtering',
      'Modern, search-first interface optimized for discovery',
      'Clean, responsive design for seamless browsing across devices'
    ],
    tech: ['React', 'Tailwind CSS', 'Node.js'],
    status: 'live',
    href: 'https://verdant-estates-alpha.vercel.app/',
    caseStudyUrl: '',
    domain: 'verdant-estates-alpha.vercel.app',
    image: '/projects/verdant-estates.jpg',
    imageSm: '/projects/verdant-estates-sm.jpg',
    imageWidth: 1200,
    imageHeight: 738,
    featured: false,
    accent: 'cyan'
  }
];

export const featuredProject = projects.find((project) => project.featured) ?? projects[0];

export const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug) ?? null;
