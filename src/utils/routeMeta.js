import { insights } from '../content/insights.js';
import { industries } from '../content/industries.js';
import { projects } from '../content/projects.js';

const liveCount = projects.filter((p) => p.status === 'live').length;
const buildingCount = projects.filter((p) => p.status !== 'live').length;

export const routeMeta = [
  {
    path: '/',
    label: 'Home',
    nav: true,
    priority: '1.0',
    changefreq: 'weekly',
    seo: {
      title: 'Ferdinard Ashonibare | Full-Stack Web Developer',
      description:
        'Ferdinard Ashonibare is a full-stack web developer in Lagos, Nigeria — building fast, secure web platforms for government, hospitality, education, and beyond.',
      socialDescription:
        `$ whoami → ferdinand ashonibare · $ cat status.json → { role: "full-stack developer" } · { live: "${liveCount} platforms" } · { building: "${buildingCount} products" } · { sectors: "${industries.length} focus" } · { status: "open to work" }`,
      keywords: [
        'Ferdinard Ashonibare',
        'full-stack web developer',
        'React developer Nigeria',
        'web developer Lagos'
      ]
    }
  },
  {
    path: '/about',
    label: 'About',
    nav: true,
    priority: '0.8',
    changefreq: 'monthly',
    seo: {
      title: 'About | Ferdinard Ashonibare',
      description:
        'Learn about Ferdinard Ashonibare — a full-stack web developer from Lagos, Nigeria, building secure platforms for government, hospitality, education, and beyond.',
      keywords: ['about Ferdinard Ashonibare', 'full-stack developer', 'Lagos developer']
    }
  },
  {
    path: '/work',
    label: 'Projects',
    nav: true,
    priority: '0.9',
    changefreq: 'monthly',
    seo: {
      title: 'Work | Ferdinard Ashonibare',
      description:
        'Selected projects by Ferdinard Ashonibare — Ogun State So-Safe Corps government platform, De Wura Hotel, NaijaMart, and more.',
      keywords: ['portfolio', 'Ogun State So-Safe Corps', 'De Wura Hotel', 'NaijaMart', 'EduTrack']
    }
  },
  {
    path: '/case-study',
    label: 'Case Study',
    priority: '0.8',
    changefreq: 'monthly',
    seo: {
      title: 'Case Study: So-Safe Corps | Ferdinard Ashonibare',
      description:
        'How Ferdinard Ashonibare built the secure digital platform for Ogun State So-Safe Corps — research, architecture, security, and delivery.',
      keywords: ['case study', 'government platform', 'Ogun State So-Safe Corps']
    }
  },
  {
    path: '/case-study/:slug',
    label: 'Case Study',
    priority: '0.6',
    changefreq: 'monthly',
    seo: {
      title: 'Case Study | Ferdinard Ashonibare',
      description:
        'In-depth case studies of web platforms built by Ferdinard Ashonibare.',
      keywords: ['case study', 'web developer', 'Ferdinard Ashonibare']
    }
  },
  {
    path: '/insights',
    label: 'Insights',
    priority: '0.7',
    changefreq: 'monthly',
    seo: {
      title: 'Insights | Ferdinard Ashonibare',
      description:
        'Notes on engineering, product, and design from full-stack developer Ferdinard Ashonibare.',
      keywords: ['insights', 'web development', 'engineering notes']
    }
  },
  {
    path: '/contact',
    label: 'Contact',
    nav: true,
    priority: '0.8',
    changefreq: 'monthly',
    seo: {
      title: 'Contact | Ferdinard Ashonibare',
      description:
        'Get in touch with Ferdinard Ashonibare about a website, web app, or full-time role.',
      keywords: ['contact Ferdinard Ashonibare', 'hire web developer', 'Lagos developer']
    }
  }
];

// Essay routes derived from the insights content module — same shape as the
// table above so sitemap, prerender, breadcrumbs, and the SEO gate can treat
// them uniformly. `lastmod` carries the publish date so the sitemap reports
// real freshness instead of "today".
export const articleRoutes = insights.map((insight) => ({
  path: `/insights/${insight.slug}`,
  label: insight.title,
  priority: '0.6',
  changefreq: 'monthly',
  lastmod: insight.published,
  seo: {
    title: `${insight.title} | Ferdinard Ashonibare`,
    description: insight.summary,
    keywords: ['insights', insight.category, insight.title]
  }
}));

// Concrete case-study routes derived from the projects content module — one
// source of truth: a project with a non-empty `caseStudyUrl` gets a real,
// prerendered route. The slug is extracted from the URL so projects, router,
// prerenderer, sitemap, breadcrumbs, and structured data all agree.
export const caseStudyRoutes = projects
  .filter((project) => project.caseStudyUrl)
  .map((project) => ({
    path: project.caseStudyUrl,
    label: project.name,
    priority: '0.6',
    changefreq: 'monthly',
    seo: {
      title: `Case Study: ${project.name} | Ferdinard Ashonibare`,
      description: `${project.tagline} — an in-depth case study by Ferdinard Ashonibare on the ${project.name} ${project.sector.toLowerCase()} project.`,
      keywords: ['case study', project.name, project.sector, 'Ferdinard Ashonibare']
    }
  }));

// Primary navigation stays exactly the six table routes above; essays and
// case studies are additional content dimensions (reachable from /work, the
// footer, and sitemap).
export const publicRoutePaths = routeMeta.map((route) => route.path);

export const allRouteMeta = [...routeMeta, ...caseStudyRoutes, ...articleRoutes];
export const allPublicPaths = allRouteMeta.map((route) => route.path);
// Concrete paths only (no parameterized ':slug' patterns) — used by the
// prerender script and sitemap generator.
export const prerenderablePaths = allPublicPaths.filter((path) => !path.includes(':'));
