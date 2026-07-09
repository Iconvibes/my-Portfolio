import { siteConfig } from '../content/site.js';
import { publicRoutePaths, routeMeta } from '../utils/routeMeta.js';

export { siteConfig, publicRoutePaths };

export const normalizePath = (path = '/') => (path === '/' ? '/' : path.replace(/\/$/, ''));
export const toAbsoluteUrl = (path = '/') => `${siteConfig.siteUrl}${normalizePath(path)}`;

const escapeAttribute = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

export const getSeoConfig = (path = '/') => {
  const normalizedPath = normalizePath(path);
  const route = routeMeta.find((item) => item.path === normalizedPath) ?? routeMeta[0];
  const canonical = toAbsoluteUrl(route.path);

  return {
    title: route.seo.title || siteConfig.defaultTitle,
    description: route.seo.description || siteConfig.defaultDescription,
    keywords: route.seo.keywords || [],
    robots: 'index,follow',
    canonical,
    image: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
    path: route.path
  };
};

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.siteName,
  url: siteConfig.siteUrl,
  image: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.addressLocality,
    addressCountry: siteConfig.addressCountry
  },
  sameAs: siteConfig.socialProfiles
});

export const buildWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.siteName,
  url: siteConfig.siteUrl
});

export const buildSeoHead = (path = '/') => {
  const seo = getSeoConfig(path);
  const schema = [buildOrganizationSchema(), buildWebsiteSchema()];

  return `
<title>${escapeAttribute(seo.title)}</title>
<meta name="description" content="${escapeAttribute(seo.description)}">
<meta name="keywords" content="${escapeAttribute(seo.keywords.join(', '))}">
<meta name="robots" content="${seo.robots}">
<meta name="theme-color" content="${siteConfig.themeColor}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${escapeAttribute(siteConfig.siteName)}">
<meta property="og:title" content="${escapeAttribute(seo.title)}">
<meta property="og:description" content="${escapeAttribute(seo.description)}">
<meta property="og:image" content="${seo.image}">
<meta property="og:url" content="${seo.canonical}">
<meta property="og:locale" content="${siteConfig.locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeAttribute(seo.title)}">
<meta name="twitter:description" content="${escapeAttribute(seo.description)}">
<meta name="twitter:image" content="${seo.image}">
<link rel="canonical" href="${seo.canonical}">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
`;
};
