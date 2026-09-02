// Reputation signals — Search Quality Evaluator Guidelines §3.3 (Reputation),
// §3.3.2 (Customer Reviews), §7.2 (Positive Reputation).
//
// IMPORTANT: only REAL quotes belong here. Every entry must come from a real
// client, colleague, or manager, with their explicit permission to publish
// their name and words. Fabricated or "sounds plausible" testimonials are
// deceptive content (guidelines §4.4, §5.6) and would HURT page quality far
// more than having no testimonials at all.
//
// Shape:
//   testimonials: [{
//     quote: string,
//     name: string,
//     role: string,
//     photo?: string,
//     href?: string,
//     reviewRating?: number
//   }]

export const testimonials = [
  {
    quote:
      'Ferdinard delivered our platform on time and treated security like a first-class requirement from day one. He works fast without cutting corners, integrated seamlessly with our team, and kept communication clear throughout the build and after launch. Working with him was straightforward and dependable.',
    name: 'Adegunwa Adewale Adegbuyi',
    role: 'DIPR, Ogun State So-Safe Corps',
    photo: '/dipr.jpg'
  }
];
