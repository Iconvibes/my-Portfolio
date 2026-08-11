// Reputation signals — Search Quality Evaluator Guidelines §3.3 (Reputation),
// §3.3.2 (Customer Reviews), §7.2 (Positive Reputation).
//
// IMPORTANT: only REAL quotes belong here. Every entry must come from a real
// client, colleague, or manager, with their explicit permission to publish
// their name and words. Fabricated or "sounds plausible" testimonials are
// deceptive content (guidelines §4.4, §5.6) and would HURT page quality far
// more than having no testimonials at all.
//
// The TestimonialsSection (src/components/sections/TestimonialsSection.jsx)
// and the Review structured data (src/seo/schemas.js) render ONLY when this
// array is non-empty, so an empty array ships nothing.
//
// Shape:
//   testimonials: [{
//     quote: string,          // their words, ideally with a concrete detail
//     name: string,           // full name
//     role: string,           // e.g. "Project Lead, Ogun State So-Safe Corps"
//     href?: string,          // optional link to their LinkedIn / company page
//     reviewRating?: number   // optional 1–5 (be honest — only if they rated)
//   }]

export const testimonials = [
  // Example shape (replace with real, consented quotes):
  // {
  //   quote:
  //     'Ferdinard delivered our platform on time and treated security like a first-class requirement. Working with him was clear and dependable.',
  //   name: 'Client Name',
  //   role: 'Role, Organization',
  //   href: 'https://www.linkedin.com/in/...',
  //   reviewRating: 5
  // }
];
