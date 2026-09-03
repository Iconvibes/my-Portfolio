export const featuredCaseStudy = {
  client: 'Ogun State So-Safe Corps',
  liveUrl: 'https://sosafecorps.og.gov.ng',
  title: 'Rebuilding the digital front door of a state security institution',
  overview:
    'A secure, public-facing platform for Ogun State So-Safe Corps, a state security organization, designed to improve service access, strengthen public trust, and reflect institutional authority online.',
  challenge:
    'The organization needed a modern digital presence that could support public trust, streamline engagement, and stand as the authoritative online home of the institution.',
  research:
    'We studied how members of the public engage with state security institutions, reviewed the organization\'s operational goals, and defined a platform strategy aligned to public service standards.',
  planning:
    'The delivery plan centered on clarity, security, and a future-friendly architecture that could scale as more services came online.',
  design:
    'We shaped a premium interface system that felt authoritative, accessible, and easy to navigate across every device.',
  architecture:
    'A full-stack build: a React single-page application styled with Tailwind CSS, served by a Node.js and Express REST API, with MongoDB for persistence. Each layer engineered to a production standard and deployed as a live, public-facing system.',
  howItBuilt:
    'A request on this platform travels the full stack: the React SPA renders in the browser and calls the Express REST API over HTTPS. The API validates, secures, and serves data from MongoDB. The response flows back to the UI. Every layer runs in production today, serving the institution and the public.',
  architectureLayers: [
    {
      layer: 'Client',
      title: 'React SPA',
      detail: 'Tailwind CSS, REST client',
      note: 'The public-facing frontend: component system, responsive layout, and a clean data layer talking to the API.'
    },
    {
      layer: 'API',
      title: 'Express API',
      detail: 'Node.js, REST endpoints',
      note: 'The application layer: routes, validation, access control, and the business logic behind the public experience.'
    },
    {
      layer: 'Data',
      title: 'MongoDB',
      detail: 'Document store, data modeling',
      note: 'The persistence layer: modeled documents behind the API, structured for the institution\'s operational needs.'
    }
  ],
  development:
    'Implementation focused on performance, reliability, and a refined experience, from the first interaction to mission-critical workflows.',
  security:
    'Security review covered access control, platform hardening, and content handling aligned to public-sector expectations.',
  performance:
    'Performance targets were met through efficient delivery, responsive design, and lean implementation practices.',
  lessons:
    'The project reinforced how strategic clarity plus disciplined engineering creates platforms people can trust with important things.',
  outcome:
    'A modern digital platform that elevated the institution\'s presence while supporting better public engagement and operational confidence.',
  future:
    'Future phases can expand the system with additional services, internal workflows, and deeper digital capability.',
  techStack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
  timeline: ['Discovery', 'Planning', 'Design', 'Build', 'Launch'],
  atAGlance: [
    { label: 'Client', value: 'Ogun State So-Safe Corps' },
    { label: 'Sector', value: 'Government & Public Sector' },
    { label: 'Status', value: 'Live in production' },
    { label: 'Stack', value: 'React + Express + MongoDB' }
  ],
  outcomes: [
    {
      label: 'Status',
      value: 'Live in production',
      detail: 'Publicly accessible at sosafecorps.og.gov.ng, serving the institution and the public.',
      propertyID: 'status'
    },
    {
      label: 'HTTPS + HSTS',
      value: 'Verified active',
      detail: 'Strict-Transport-Security: max-age=31536000 confirmed on the live response headers (measured 15 Aug 2026).',
      propertyID: 'security'
    },
    {
      label: 'Page weight',
      value: '≈48 KB HTML',
      detail: 'Measured 15 Aug 2026 from 5 network probes (median): 1 script, 1 stylesheet, 5 images.',
      propertyID: 'performance'
    },
    {
      label: 'Time to first byte',
      value: '≈0.1 s',
      detail: 'Measured 15 Aug 2026 from 5 network probes (median). Varies with visitor location and server load.',
      propertyID: 'performance'
    }
  ]
};

export const verdantEstatesCaseStudy = {
  client: 'Verdant Estates',
  liveUrl: 'https://verdant-estates-alpha.vercel.app/',
  title: 'A modern real estate platform built to showcase properties and connect buyers',
  overview:
    'A comprehensive real estate platform designed to showcase properties, streamline listings, and connect buyers with their dream homes. Featuring intuitive search, detailed property views, and a clean, modern interface built for discovery.',
  challenge:
    'Real estate buyers expect fast, visual property discovery — not clunky directories or slow-loading galleries. The platform needed to feel effortless on every device, presenting properties in a way that encouraged exploration without overwhelming the user.',
  research:
    'We studied how buyers search for properties online: scanning listing grids, comparing details, and filtering by preferences. The patterns were clear — people want to see properties quickly, narrow results with minimal effort, and get to the details that matter without friction.',
  planning:
    'The delivery plan prioritized a search-first architecture: a fast, responsive frontend paired with a lightweight Node.js backend. Every decision was filtered through one question — does this make it easier for a buyer to find the right property?',
  design:
    'A clean, modern interface built around property imagery and structured listings. The design system emphasizes whitespace, clear typography, and responsive layouts that adapt from desktop browsing to mobile scrolling without compromise.',
  architecture:
    'A full-stack build: a React single-page application styled with Tailwind CSS, served by a Node.js backend. The frontend handles property rendering, search filtering, and responsive layouts. The backend serves property data through a clean API layer. Lightweight, fast, and built to scale.',
  howItBuilt:
    'A request on this platform travels from the React SPA to the Node.js backend and back. The frontend renders property listings, handles search and filtering, and presents detailed views. The backend serves property data through structured endpoints. Every layer runs in production today.',
  architectureLayers: [
    {
      layer: 'Client',
      title: 'React SPA',
      detail: 'Tailwind CSS, property grid, search filtering',
      note: 'The public-facing frontend: property cards, search interface, detailed views, and a responsive layout optimized for browsing properties across devices.'
    },
    {
      layer: 'API',
      title: 'Node.js Backend',
      detail: 'REST endpoints, property data',
      note: 'The application layer: serves property listings and details through clean, structured endpoints that the frontend consumes.'
    },
    {
      layer: 'Presentation',
      title: 'Property Display',
      detail: 'Responsive grid, image optimization',
      note: 'The rendering layer: optimized property cards, detail views, and filtering that adapts seamlessly from desktop to mobile.'
    }
  ],
  development:
    'Implementation focused on clean data flow, responsive property grids, and fast page loads. Every component was built to render property information clearly without unnecessary complexity.',
  security:
    'The platform prioritizes safe public browsing — no sensitive data exposure, clean API responses, and standard web security practices for a public-facing property showcase.',
  performance:
    'Performance was achieved through efficient component rendering, optimized property images, and a lean backend that serves data without unnecessary overhead.',
  lessons:
    'Real estate platforms succeed when they reduce friction in discovery. The key is making search feel effortless and property details feel immediate — not buried behind clicks or slow transitions.',
  outcome:
    'A clean, fast property platform that showcases listings effectively and makes it easy for buyers to discover and explore properties across any device.',
  future:
    'Future phases can expand the platform with saved searches, property alerts, map-based discovery, and deeper integration with real estate listing workflows.',
  techStack: ['React', 'Tailwind CSS', 'Node.js'],
  timeline: ['Discovery', 'Planning', 'Design', 'Build', 'Launch'],
  atAGlance: [
    { label: 'Client', value: 'Verdant Estates' },
    { label: 'Sector', value: 'Real Estate' },
    { label: 'Status', value: 'Live in production' },
    { label: 'Stack', value: 'React + Tailwind CSS + Node.js' }
  ],
  outcomes: [
    {
      label: 'Status',
      value: 'Live in production',
      detail: 'Publicly accessible at verdant-estates-alpha.vercel.app, showcasing properties to buyers.',
      propertyID: 'status'
    },
    {
      label: 'Responsive design',
      value: 'Mobile-first',
      detail: 'Fully responsive property grids and detail views across desktop, tablet, and mobile.',
      propertyID: 'design'
    },
    {
      label: 'Search-first interface',
      value: 'Optimized for discovery',
      detail: 'Property filtering and search designed to reduce friction in finding the right listing.',
      propertyID: 'ux'
    },
    {
      label: 'Clean architecture',
      value: 'Full-stack React + Node.js',
      detail: 'Lean, maintainable stack with clear separation between frontend rendering and backend data serving.',
      propertyID: 'architecture'
    }
  ]
};
