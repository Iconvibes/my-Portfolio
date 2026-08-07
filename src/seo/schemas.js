// Server-side structured data + SEO head builder.
//
// This module is deliberately separate from `./site.js` so the client bundle
// can load it lazily (MainLayout only needs it to swap JSON-LD on SPA
// navigation). The prerender and SEO scripts import it directly — it is
// plain data + string building, Node-safe.

import { siteConfig } from '../content/site.js';
import { getSeoConfig, normalizePath, toAbsoluteUrl } from './site.js';
import { routeMeta } from '../utils/routeMeta.js';
import { faqItems } from '../content/faq.js';
import { projects } from '../content/projects.js';
import { featuredCaseStudy } from '../content/caseStudies.js';
import { contactChannels } from '../content/contact.js';
import { capabilities, techMarquee } from '../content/capabilities.js';
import { credentials } from '../content/credentials.js';

const SITE_URL = siteConfig.siteUrl;
const PERSON_ID = `${SITE_URL}/#person`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const escapeAttribute = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

// Guard against `</script>` breakout inside JSON-LD blocks.
const escapeJsonLd = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

export const buildPersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: siteConfig.siteName,
  url: SITE_URL,
  image: `${SITE_URL}${siteConfig.schemaImage || siteConfig.defaultImage}`,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  jobTitle: 'Full-Stack Web Developer',
  description: siteConfig.defaultDescription,
  worksFor: { '@id': ORGANIZATION_ID },
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.addressLocality,
    addressCountry: siteConfig.addressCountry
  },
  sameAs: siteConfig.socialProfiles,
  knowsLanguage: ['en'],
  ...(credentials.education.length > 0
    ? {
        alumniOf: credentials.education.map(({ institution, url }) =>
          url
            ? { '@type': 'EducationalOrganization', name: institution, url }
            : { '@type': 'EducationalOrganization', name: institution }
        )
      }
    : {}),
  ...(credentials.certifications.length > 0
    ? {
        hasCredential: credentials.certifications.map(({ name, issuer, year, url }) => ({
          '@type': 'EducationalOccupationalCredential',
          name,
          ...(issuer ? { credentialCategory: issuer } : {}),
          ...(year ? { dateIssued: String(year) } : {}),
          ...(url ? { url } : {})
        }))
      }
    : {}),
  knowsAbout: [
    ...new Set([
      ...capabilities.flatMap((capability) => [capability.title, ...capability.items]),
      ...techMarquee
    ])
  ].slice(0, 24)
});

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: siteConfig.brandName,
  url: SITE_URL,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  logo: `${SITE_URL}${siteConfig.defaultImage}`,
  founder: { '@id': PERSON_ID },
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.addressLocality,
    addressCountry: siteConfig.addressCountry
  }
});

export const buildWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: siteConfig.siteName,
  url: SITE_URL,
  publisher: { '@id': ORGANIZATION_ID },
  inLanguage: 'en'
});

export const buildFaqSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: faqItems.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer }
  }))
});

export const buildProfilePageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: 'About — Ferdinard Ashonibare',
  url: toAbsoluteUrl('/about'),
  mainEntity: { '@id': PERSON_ID }
});

export const buildCollectionPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Selected Work',
  url: toAbsoluteUrl('/work'),
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.tagline || project.description,
        url: project.href || undefined,
        image: project.image ? `${SITE_URL}${project.image}` : undefined
      }
    }))
  }
});

export const buildArticleSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: featuredCaseStudy.title,
  description: featuredCaseStudy.overview,
  url: toAbsoluteUrl('/case-study'),
  image: `${SITE_URL}${siteConfig.defaultImage}`,
  author: { '@id': PERSON_ID },
  publisher: { '@id': ORGANIZATION_ID },
  mainEntityOfPage: toAbsoluteUrl('/case-study'),
  about: featuredCaseStudy.client
});

export const buildContactPageSchema = () => {
  const emailChannel = contactChannels.find((channel) => channel.label === 'Email');

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact',
    url: toAbsoluteUrl('/contact'),
    mainEntity: {
      '@type': 'ContactPoint',
      email: emailChannel?.value || siteConfig.email,
      telephone: siteConfig.phone,
      contactType: 'inquiries',
      areaServed: 'Worldwide',
      availableLanguage: ['en']
    }
  };
};

export const buildBreadcrumbListSchema = (path = '/') => {
  const normalized = normalizePath(path);
  const route = routeMeta.find((item) => item.path === normalized);
  if (!route || normalized === '/') {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: route.label, item: toAbsoluteUrl(route.path) }
    ]
  };
};

const baseSchemas = () => [buildPersonSchema(), buildOrganizationSchema(), buildWebsiteSchema()];

export const buildStructuredData = (path = '/') => {
  const normalized = normalizePath(path);
  const schemas = baseSchemas();

  switch (normalized) {
    case '/':
      schemas.push(buildFaqSchema());
      break;
    case '/about':
      schemas.push(buildProfilePageSchema());
      break;
    case '/work':
      schemas.push(buildCollectionPageSchema());
      break;
    case '/case-study':
      schemas.push(buildArticleSchema());
      break;
    case '/contact':
      schemas.push(buildContactPageSchema());
      break;
    default:
      break;
  }

  const breadcrumb = buildBreadcrumbListSchema(normalized);
  if (breadcrumb) {
    schemas.push(breadcrumb);
  }

  return schemas;
};

export const serializeStructuredData = (schemas) =>
  schemas.map((schema) => `<script type="application/ld+json">${escapeJsonLd(schema)}</script>`).join('\n');

// The hero portrait is the LCP element on the home page (and prominent on
// /about), so preload it there — but not on routes that don't render it.
const PORTRAIT_PRELOAD =
  '<link rel="preload" as="image" href="/profile.jpg" fetchpriority="high">';

export const buildSeoHead = (path = '/') => {
  const normalized = normalizePath(path);
  const seo = getSeoConfig(path);
  const structuredData = serializeStructuredData(buildStructuredData(path));
  const preload = normalized === '/' || normalized === '/about' ? `${PORTRAIT_PRELOAD}\n` : '';

  return `
<title>${escapeAttribute(seo.title)}</title>
<meta name="author" content="${escapeAttribute(siteConfig.siteName)}">
<meta name="description" content="${escapeAttribute(seo.description)}">
<meta name="keywords" content="${escapeAttribute(seo.keywords.join(', '))}">
<meta name="robots" content="${seo.robots}">
<meta name="theme-color" content="${siteConfig.themeColor}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${escapeAttribute(siteConfig.siteName)}">
<meta property="og:title" content="${escapeAttribute(seo.title)}">
<meta property="og:description" content="${escapeAttribute(seo.socialDescription)}">
<meta property="og:image" content="${seo.image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:alt" content="${escapeAttribute(seo.socialDescription)}">
<meta property="og:url" content="${seo.canonical}">
<meta property="og:locale" content="${siteConfig.locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeAttribute(seo.title)}">
<meta name="twitter:description" content="${escapeAttribute(seo.socialDescription)}">
<meta name="twitter:image" content="${seo.image}">
<meta name="twitter:image:alt" content="${escapeAttribute(seo.socialDescription)}">
<link rel="canonical" href="${seo.canonical}">
<link rel="llms.txt" href="${SITE_URL}/llms.txt">
${preload}${structuredData}
`;
};

