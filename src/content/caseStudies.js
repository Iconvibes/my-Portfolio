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
