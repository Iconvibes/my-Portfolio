// Essays ("Insights") — original writing by Ferdinard Ashonibare, published on
// this site. Each article is a single source of truth rendered three ways:
//
//   1. The article page (src/pages/InsightArticle.jsx) via the body blocks
//   2. Article JSON-LD (src/seo/schemas.js) — headline, dates, category
//   3. llms-full.txt (scripts/generate-llms-full.mjs) as plain Markdown
//
// Body block model:
//   { type: 'p',     text: string }
//   { type: 'h2',    text: string }
//   { type: 'ul',    items: string[] }
//   { type: 'quote', text: string }
//
// These are honest, experience-based essays — opinions and habits, not
// fabricated claims. The only hard number quoted is a measured one (the
// So-Safe Corps home page weight, verified on 15 Aug 2026).

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Deterministic date formatting (no locale/timezone drift between the
// prerender and the browser, which would cause hydration mismatches).
export const insightDate = (iso) => {
  const [year, month, day] = iso.split('-').map(Number);
  return `${months[month - 1]} ${day}, ${year}`;
};

export const readingTime = (insight) => {
  const words = insight.body.reduce((total, block) => {
    if (block.type === 'p' || block.type === 'quote') {
      return total + block.text.split(/\s+/).length;
    }
    if (block.type === 'ul') {
      return total + block.items.reduce((sum, item) => sum + item.split(/\s+/).length, 0);
    }
    return total;
  }, 0);
  return Math.max(1, Math.round(words / 200));
};

export const insights = [
  {
    slug: 'government-platform-trust',
    title: 'What building a government platform taught me about trust',
    category: 'Engineering',
    summary:
      'Security, performance, and accessibility are not checklist features — they are the product when the public depends on your work.',
    published: '2026-07-20',
    body: [
      {
        type: 'p',
        text: 'When I started on the digital platform for Ogun State So-Safe Corps, I thought of it as a website project. Scope, design, stack, launch — the familiar shape of a build. By the end, I understood it as something else: a trust project. A citizen does not visit a public platform for fun. They visit because they need something — an enquiry answered, a process started, information they can rely on. Every single interaction either builds that trust or costs it, and once it is spent, it is very hard to win back.'
      },
      { type: 'h2', text: 'Security is not a feature — it is the baseline' },
      {
        type: 'p',
        text: 'On a commercial site, a breach is a bad day. On a public platform, it is a failure of duty. People hand over personal details because the institution asked them to, and the institution owes them protection in return. That shifts what security means in practice: it stops being a hardening pass at the end and becomes a set of defaults you build against from the first commit.'
      },
      {
        type: 'ul',
        items: [
          'Role-based access control designed before the first form, not bolted on after.',
          'No secrets in code or configuration — ever. Environment variables only, and only where they must live.',
          'HTTPS and strict transport security on everything, including the staging environment.',
          'Validate and sanitize at the API boundary, not deep inside the code where mistakes hide.',
          'Access logs that make it possible to answer the question "who changed what, and when?"'
        ]
      },
      {
        type: 'quote',
        text: 'People do not trust a government platform because it looks official. They trust it because it behaves responsibly with their data.'
      },
      { type: 'h2', text: 'Performance is respect' },
      {
        type: 'p',
        text: 'A slow public site is not a minor annoyance — it reads as an institution that does not care about the people it serves. Citizens are often on older phones on slower connections, and every extra second is a small tax on someone who already has to do bureaucratic business. So performance stopped being a nice-to-have and became part of the acceptance criteria. The platform keeps the front door lean: the home page ships roughly 48 KB of HTML with a single script and stylesheet — measured, not assumed, and re-measured when anything changes.'
      },
      { type: 'h2', text: 'Accessibility is obligation' },
      {
        type: 'p',
        text: 'Public services are for everyone, which means the website must be too. Keyboard navigation that actually works, sufficient contrast, semantic HTML that screen readers understand, and focus states you can see. None of this is polish. For a citizen with a visual impairment or a motor disability, these are the difference between being able to use the service and being locked out of it.'
      },
      { type: 'h2', text: 'Clarity is part of the product' },
      {
        type: 'p',
        text: 'Institutions cannot afford dark patterns or clever ambiguity. Plain language, honest labels, and forms that tell you what will happen next. If a page is going to take time or ask for sensitive data, say so before the visitor commits. Clarity is how a public organization shows it respects the people it exists to serve.'
      },
      { type: 'h2', text: 'What changed in how I build' },
      {
        type: 'ul',
        items: [
          'Security review is a phase in every plan, not an afterthought.',
          'Performance is benchmarked against real devices and real networks, not the developer machine.',
          'Accessibility is tested as I build — with keyboard, screen reader, and contrast checks — never saved for the end.',
          'Every project starts with the same question: who depends on this, and what do they need to trust it?'
        ]
      },
      {
        type: 'p',
        text: 'The platform went live, and it keeps running. But the real deliverable was never the pages — it was a public institution that could point its citizens at a digital front door and be confident it would not let them down. That is the standard I carry into every build now.'
      }
    ]
  },
  {
    slug: 'hotel-websites-that-book',
    title: 'Designing hotel websites that actually book rooms',
    category: 'Product',
    summary:
      'The difference between a pretty hotel site and one that converts: clarity of journey, speed, and an experience that sells the stay.',
    published: '2026-08-02',
    body: [
      {
        type: 'p',
        text: 'Most hotel websites are beautiful and useless. Gorgeous photography, endless scrolling, and a booking button buried three screens deep — or worse, no real booking flow at all, just a phone number. The hotelier paid for a site that sells rooms, and what they got is a brochure. A hotel website has one job: turn a looker into a booker. Everything else is decoration.'
      },
      { type: 'h2', text: 'The journey is the design' },
      {
        type: 'p',
        text: 'Think about the actual guest for a minute. They are comparing three hotels, they are on their phone, and they want a room for two nights. The site that wins is the one that gets them from "this looks nice" to "room booked" in the fewest, clearest steps. Every extra click is a chance for them to drift back to the comparison tab.'
      },
      {
        type: 'ul',
        items: [
          'A booking action visible above the fold on every page — not just the homepage.',
          'Dates and room selection close together, so the guest does not re-enter the same information twice.',
          'No dead ends: every room page ends in a booking action, and every "learn more" goes somewhere that moves the guest forward.',
          'Policies surfaced before the moment of commitment, not discovered at checkout.'
        ]
      },
      { type: 'h2', text: 'Speed sells stays' },
      {
        type: 'p',
        text: 'Hotel guests are impatient and often on mobile data. A site that takes five seconds to load feels like a hotel that does not care about their time. Keep the page lean — compressed images, no bloated plugins, no hero video autoplaying on every visit. Speed is not a performance metric here; it is a revenue metric.'
      },
      { type: 'h2', text: 'Sell the stay, not the building' },
      {
        type: 'p',
        text: 'People book feelings: a restful night, a memorable view, breakfast on a quiet terrace. The site should sell the experience, not just the square meters. That means photography that shows atmosphere, room and suite showcases that answer "what will it actually be like?", and copy that describes the stay rather than the architecture. One good story beats a page of amenities.'
      },
      { type: 'h2', text: 'Mobile is the front desk' },
      {
        type: 'ul',
        items: [
          'Most bookings happen on phones — design mobile-first, not as an afterthought.',
          'Tap targets big enough for a thumb, forms that request the minimum, no hover-only interactions.',
          'A single, obvious "Book now" path that survives on a 375px screen.'
        ]
      },
      { type: 'h2', text: 'Trust signals do the convincing' },
      {
        type: 'ul',
        items: [
          'Real reviews from real guests, displayed where the decision happens.',
          'A secure booking flow — HTTPS everywhere, and a payment experience that looks like a payment experience.',
          'Transparent pricing and honest availability. Surprises at checkout are how you lose the booking and the review.',
          'A fast, human contact channel. For many hotels, WhatsApp is the highest-converting button on the site.'
        ]
      },
      { type: 'h2', text: 'A simple test before launch' },
      {
        type: 'p',
        text: 'Before launch, sit someone down who has never seen the site and ask them to book a room. Do not help. Watch where they hesitate, where they hunt for the calendar, where they almost give up. Every hesitation is a design problem wearing a costume. Fix those, and the pretty site becomes the one that actually books rooms.'
      }
    ]
  },
  {
    slug: 'fast-web-app-checklist',
    title: 'A simple checklist for shipping fast web apps',
    category: 'Engineering',
    summary:
      'The habits I repeat on every build — from project setup to production — that keep quality high without slowing delivery.',
    published: '2026-08-12',
    body: [
      {
        type: 'p',
        text: 'Shipping fast is rarely about working faster. It is about not redoing things, not debugging things you could have prevented, and not discovering problems in production that a boring habit would have caught in week one. Over time I have collected the habits that actually move the needle, and they are all unglamorous.'
      },
      { type: 'h2', text: 'Before the first line of code' },
      {
        type: 'ul',
        items: [
          'Write down the goal and the measure of success in one sentence. If you cannot, you are not ready to build.',
          'Pick a boring, proven stack you already know cold. Novelty is a delivery tax.',
          'Set up linting, formatting, and types on day one — retrofitting them later never happens.',
          'Ship a live preview with the first commit. A URL that updates on every push changes how everyone reviews the work.'
        ]
      },
      { type: 'h2', text: 'While you build' },
      {
        type: 'ul',
        items: [
          'Components over copy-paste. When you paste the same markup a third time, extract it.',
          'Keep the bundle honest: self-host fonts, compress images, and treat a new dependency like a new employee — it needs a reason to be there.',
          'Security as a default: no secrets in the repo, validation at the boundary, security headers from the first deploy.',
          'Accessibility as you go — keyboard, contrast, screen reader — because fixing it at the end means rebuilding the end.'
        ]
      },
      {
        type: 'quote',
        text: 'A fast app is the side effect of boring infrastructure and disciplined habits, not heroic effort in the final week.'
      },
      { type: 'h2', text: 'Before you ship' },
      {
        type: 'ul',
        items: [
          'Test on real devices and real networks, not just the fastest laptop in the room.',
          'Measure: page weight, time to first byte, and one pass of Lighthouse. Write the numbers down; compare next time.',
          'Click every error state: the empty page, the failed request, the 404, the validation message. Errors are part of the design.',
          'Write the deployment runbook while you still remember how the deploy works.'
        ]
      },
      { type: 'h2', text: 'After launch' },
      {
        type: 'ul',
        items: [
          'Monitor uptime, errors, and real usage from day one — a launch nobody watches is a launch nobody knows failed.',
          'Keep a change log and make the next deploy as boring as this one.',
          'Schedule the follow-up: revisit the goal you wrote in week one and check whether the measure moved.'
        ]
      },
      { type: 'h2', text: 'The point' },
      {
        type: 'p',
        text: 'None of this is clever. That is the point. The teams that ship quickly are not the ones with the smartest architecture — they are the ones whose habits remove the rework. Setup checks, build checks, ship checks, post-launch checks. The checklist is the strategy.'
      }
    ]
  }
];

export const getInsightBySlug = (slug) => insights.find((insight) => insight.slug === slug);
