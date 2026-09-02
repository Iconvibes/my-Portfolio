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
      title: 'Ferdinard Ashonibare. I built the So-Safe Corps platform.',
      description:
        'Ferdinard Ashonibare built the official digital platform for Ogun State So-Safe Corps, a state security institution. Full-stack web developer in Lagos, Nigeria. Live in production.',
      socialDescription:
        'I built the digital platform for a state security institution. Live in production. Ferdinard Ashonibare, full-stack web developer in Lagos, Nigeria.',
      keywords: [
        'Ferdinard Ashonibare',
        'Ferdinand Ashonibare',
        'Ferdinard',
        'Ferdinand',
        'Ashonibare',
        'full-stack web developer',
        'web developer Lagos',
        'React developer Nigeria',
        'Node.js developer Lagos',
        'website developer Nigeria',
        'hire web developer',
        'Lagos web developer',
        'Nigeria full-stack developer',
        'Codeferd Digital'
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
      title: 'About Ferdinard Ashonibare | Full-Stack Web Developer — Lagos, Nigeria',
      description:
        'Learn about Ferdinard Ashonibare (Ferdinand Ashonibare) — a full-stack web developer from Lagos, Nigeria building secure platforms for government, hospitality, education, and real estate.',
      keywords: ['about Ferdinard Ashonibare', 'Ferdinand Ashonibare', 'full-stack developer', 'Lagos developer', 'Nigeria web developer', 'Ashonibare developer']
    }
  },
  {
    path: '/work',
    label: 'Projects',
    nav: true,
    priority: '0.9',
    changefreq: 'monthly',
    seo: {
      title: 'Work & Projects | Ferdinard Ashonibare — Full-Stack Developer',
      description:
        'Selected projects by Ferdinard Ashonibare — Ogun State So-Safe Corps government platform, De Wura Hotel, Verdant Estates, and more live platforms.',
      keywords: ['portfolio', 'Ferdinard Ashonibare projects', 'Ogun State So-Safe Corps', 'De Wura Hotel', 'NaijaMart', 'EduTrack', 'Verdant Estates', 'web developer portfolio Lagos']
    }
  },
  {
    path: '/case-study',
    label: 'Case Study',
    priority: '0.8',
    changefreq: 'monthly',
    seo: {
      title: 'Case Study: So-Safe Corps | Ferdinard Ashonibare — Full-Stack Developer',
      description:
        'How Ferdinard Ashonibare built the secure digital platform for Ogun State So-Safe Corps — research, architecture, security, and delivery.',
      keywords: ['case study', 'government platform', 'Ogun State So-Safe Corps', 'Ferdinard Ashonibare', 'web developer case study']
    }
  },
  {
    path: '/case-study/:slug',
    label: 'Case Study',
    priority: '0.6',
    changefreq: 'monthly',
    seo: {
      title: 'Case Studies | Ferdinard Ashonibare — Full-Stack Developer',
      description:
        'In-depth case studies of web platforms built by Ferdinard Ashonibare — government, hospitality, and real estate projects.',
      keywords: ['case study', 'web developer', 'Ferdinard Ashonibare', 'Ferdinand Ashonibare', 'project case study']
    }
  },
  {
    path: '/insights',
    label: 'Insights',
    priority: '0.7',
    changefreq: 'monthly',
    seo: {
      title: 'Insights & Articles | Ferdinard Ashonibare — Full-Stack Developer',
      description:
        'Notes on engineering, product, and design from full-stack developer Ferdinard Ashonibare — web development insights and tutorials.',
      keywords: ['insights', 'web development', 'engineering notes', 'Ferdinard Ashonibare', 'developer blog']
    }
  },
  {
    path: '/contact',
    label: 'Contact',
    nav: true,
    priority: '0.8',
    changefreq: 'monthly',
    seo: {
      title: 'Contact Ferdinard Ashonibare | Hire Full-Stack Developer — Lagos, Nigeria',
      description:
        'Get in touch with Ferdinard Ashonibare (Ferdinand Ashonibare) — hire a full-stack web developer in Lagos, Nigeria for websites, web apps, and projects.',
      keywords: ['contact Ferdinard Ashonibare', 'hire web developer', 'Lagos developer', 'Ferdinand Ashonibare contact', 'Nigeria developer for hire']
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
