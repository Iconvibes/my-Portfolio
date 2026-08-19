// Primary navigation — pure domain data.
//
// The route table (src/utils/routeMeta.js) is plumbing (sitemap priority,
// changefreq, SEO), so this file deliberately does NOT derive from it.
// Paths must stay in sync with that table — the parity test in
// src/utils/routeMeta.test.js enforces the invariant.

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/work' },
  { label: 'Contact', href: '/contact' }
];
