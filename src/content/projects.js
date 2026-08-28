/**
 * Portfolio projects.
 *
 * Images: each project ships with an on-brand SVG visual in public/projects/.
 * To use real screenshots once a project is hosted:
 *   1. set `href` to the deployed URL and `status` to 'live'
 *   2. save a screenshot at public/projects/{slug}.jpg and set `image: '/projects/{slug}.jpg'`
 * The UI renders a "Launching soon" badge and no link while href is empty.
 */
export const projects = [
  {
    slug: 'so-safe-corps',
    name: 'Ogun State So-Safe Corps',
    tagline: 'The official digital platform of a state security institution',
    sector: 'Government & Public Sector',
    description:
      'A secure, public-facing platform for Ogun State So-Safe Corps — a state security organization — built to strengthen public trust, streamline engagement, and reflect institutional authority online.',
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
    featured: true,
    accent: 'emerald'
  },
  {
    slug: 'wura-grand-hotel',
    name: 'De Wura Hotel',
    tagline: 'A premium digital experience for a distinguished hotel',
    sector: 'Hospitality',
    description:
      'A refined hotel website for De Wura Hotel — elegant brand-led design, room and suite showcases, and booking journeys built to turn first impressions into reservations.',
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
    featured: false,
    accent: 'amber'
  },
  {
    slug: 'tpc-logistics',
    name: 'TPC Logistics',
    tagline: 'A logistics landing page built to turn inquiries into WhatsApp leads',
    sector: 'Logistics',
    description:
      'A focused logistics landing page for TPC Logistics — clear service highlights and a WhatsApp lead capture flow that makes it easy to request a pickup or quote on any device.',
    highlights: [
      'WhatsApp lead capture flow',
      'Clear service sections and CTAs',
      'Mobile-first inquiry funnel'
    ],
    tech: ['HTML', 'Tailwind CSS', 'JavaScript'],
    status: 'live',
    href: 'https://tpc-logistics-test.onrender.com',
    caseStudyUrl: '/case-study/tpc-logistics',
    domain: 'tpc-logistics-test.onrender.com',
    image: '/projects/tpc.png',
    featured: false,
    accent: 'cyan'
  },
  {
    slug: 'edutrack',
    name: 'EduTrack',
    tagline: 'A web app that keeps learning on track',
    sector: 'Education',
    description:
      'An education web application that helps educators and institutions manage and track student progress — assignments, performance, and insights in one clean, fast interface.',
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
    featured: false,
    accent: 'violet'
  },
  {
    slug: 'ecommerce-store',
    name: 'NaijaMart',
    tagline: 'A multi-vendor storefront built to turn browsers into buyers',
    sector: 'Business & Startups',
    description:
      'A fully responsive multi-vendor e-commerce site designed to improve digital presence and drive conversions for businesses — from the storefront UI to product and vendor flows, built for a seamless experience across desktop and mobile.',
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
    image: '/projects/naijamart.png',
    featured: false,
    accent: 'rose'
  },
  {
    slug: 'real-estate',
    name: 'Real Estate Platform',
    tagline: 'A modern real estate platform built to showcase and connect properties with buyers',
    sector: 'Real Estate',
    description:
      'A comprehensive real estate platform designed to showcase properties, streamline listings, and connect buyers with their dream homes — featuring intuitive search, detailed property views, and a clean, modern interface.',
    highlights: [
      'Property listings with detailed views and filtering',
      'Modern, search-first interface optimized for discovery',
      'Clean, responsive design for seamless browsing across devices'
    ],
    tech: ['React', 'Tailwind CSS', 'Node.js'],
    status: 'soon',
    href: '',
    caseStudyUrl: '',
    domain: 'Launching soon',
    image: '/projects/estate.png',
    featured: false,
    accent: 'cyan'
  }
];

export const featuredProject = projects.find((project) => project.featured) ?? projects[0];

export const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug) ?? null;
