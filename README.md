# Codeferd Digital

## Summary
A high-end agency website for Codeferd Digital. Built with React, Tailwind CSS, GSAP, and Framer Motion to showcase services, pricing, case studies, and a streamlined contact flow.

## Tech Stack
- React (Vite)
- Tailwind CSS
- React Router
- GSAP
- Framer Motion

## Key Features
- Dark and light mode with a subdued light palette.
- Sticky, blurred-glass navigation with a theme toggle.
- Hero headline with GSAP text-mask reveal.
- Services and pricing sections with agency-grade copy.
- Dedicated training section with 3-month and 6-month programs.
- Pricing cards that deep-link to the contact form with package details pre-filled.
- Contact form that supports WhatsApp, email, and social channels.

## Local Development
1. Install dependencies:
   npm install
2. Start the dev server:
   npm run dev

## Configuration
- Pricing packages are defined in `src/data/pricing.js`.
- Contact details (email, phone, social links) live in `src/components/ContactHead.jsx` and `src/components/Form.jsx`.
- Package prefill uses the query param format:
  `/contact?package=custom-website`

## Notes
- Update pricing values and currency in `src/data/pricing.js`.
- The light theme is intentionally soft (not bright) for a premium look.
