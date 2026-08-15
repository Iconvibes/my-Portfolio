// Quotable key facts about the person behind the site, written as complete
// sentences so AI engines can cite them directly (GEO) and visitors get a
// fast, verified summary.
//
// Every statement is DERIVED from the other content modules — no new claims
// live here. If a project ships, the FAQ changes, or a credential is added,
// these facts update automatically, so the site can never tell an AI engine
// something the rest of the site doesn't say.
//
// Rendered on the home page by src/components/sections/FactSheet.jsx and
// mirrored into the Home section of dist/llms-full.txt (scripts/
// generate-llms-full.mjs).
//
// Shape:
//   facts: [{ label: string, statement: string }]

import { siteConfig } from './site.js';
import { projects } from './projects.js';
import { industries } from './industries.js';
import { techMarquee } from './capabilities.js';
import { credentials } from './credentials.js';
import { faqItems } from './faq.js';

const liveProjects = projects.filter((project) => project.status === 'live');
const inProgressProjects = projects.filter((project) => project.status !== 'live');
const latestEducation = credentials.education[0];
const availabilityAnswer = faqItems.find((item) =>
  item.question.toLowerCase().includes('full-time')
)?.answer;

const joinParts = (parts) => parts.filter(Boolean).join(' ');

const plural = (count, singular) => `${count} ${singular}${count === 1 ? '' : 's'}`;

export const facts = [
  {
    label: 'Who',
    statement: joinParts([
      `${siteConfig.siteName} is a full-stack web developer in ${siteConfig.location},`, 
      'working remotely worldwide — designing and building fast, secure web platforms for government, hospitality, education, and beyond — from idea to launch, end to end.'
    ])
  },
  {
    label: 'Availability',
    statement: availabilityAnswer
      ? `Open to ${availabilityAnswer.replace(/^yes\s*[—–-]\s*i\s*am\s*open\s*to\s*/i, '')}`
      : 'Open to remote full-time roles, long-term contracts, and one-off project work.'
  },
  {
    label: 'Stats',
    statement: joinParts([
      `${plural(liveProjects.length, 'live platform')} in production,`,
      `${plural(inProgressProjects.length, 'product')} in the making, and ${plural(industries.length, 'focus sector')}.`
    ])
  },
  {
    label: 'Shipped',
    statement:
      liveProjects.length > 0
        ? `${liveProjects.map((project) => `${project.name} (${project.domain})`).join(', ')} — ${liveProjects.length === 1 ? 'a live production platform' : 'live in production'}.`
        : 'No live production project yet — the current builds are listed under Building.'
  },
  {
    label: 'Building',
    statement:
      inProgressProjects.length > 0
        ? `${plural(inProgressProjects.length, 'product')} in the making: ${inProgressProjects.map((project) => project.name).join(', ')}.`
        : 'No projects currently in development.'
  },
  {
    label: 'Sectors',
    statement: `Focus sectors: ${industries.map((industry) => industry.title).join(', ')}.`
  },
  {
    label: 'Stack',
    statement: `Primary stack: ${techMarquee.slice(0, 5).join(', ')}.`
  },
  {
    label: 'Education',
    statement: latestEducation
      ? `${latestEducation.degree} from ${latestEducation.institution}${latestEducation.location ? `, ${latestEducation.location}` : ''} (${latestEducation.year}).`
      : ''
  }
];
