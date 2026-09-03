// Lightweight, client-safe SEO helpers.
//
// Deliberately free of content-module imports so the shared client bundle
// stays small. The schema builders and full head builder live in
// `./schemas.js` (loaded lazily by the client, imported directly by the
// prerender scripts).

import { siteConfig } from '../content/site.js';
import { allRouteMeta, publicRoutePaths } from '../utils/routeMeta.js';

export { siteConfig, publicRoutePaths };

export { allRouteMeta, allPublicPaths, prerenderablePaths } from '../utils/routeMeta.js';

export const normalizePath = (path = '/') => (path === '/' ? '/' : path.replace(/\/$/, ''));

// Netlify serves each route as a directory file (dist/about/index.html) and 301s
// the bare path to its trailing-slash form. Every crawler-facing URL (canonical,
// og:url, sitemap, JSON-LD) must point at the URL that actually serves the page,
// so non-root paths get their trailing slash appended here.
export const toAbsoluteUrl = (path = '/') => {
  const normalized = normalizePath(path);
  return normalized === '/' ? `${siteConfig.siteUrl}/` : `${siteConfig.siteUrl}${normalized}/`;
};

export const getSeoConfig = (path = '/') => {
  const normalizedPath = normalizePath(path);
  const route = allRouteMeta.find((item) => item.path === normalizedPath) ?? allRouteMeta[0];
  const canonical = toAbsoluteUrl(route.path);

  return {
    title: route.seo.title || siteConfig.defaultTitle,
    description: route.seo.description || siteConfig.defaultDescription,
    socialDescription: route.seo.socialDescription || route.seo.description || siteConfig.defaultDescription,
    keywords: route.seo.keywords || [],
    robots: 'index,follow',
    canonical,
    image: `${siteConfig.siteUrl}${route.seo.ogImage || siteConfig.defaultImage}`,
    path: route.path
  };
};
