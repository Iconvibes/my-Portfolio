// Lightweight, client-safe SEO helpers.
//
// Deliberately free of content-module imports so the shared client bundle
// stays small. The schema builders and full head builder live in
// `./schemas.js` (loaded lazily by the client, imported directly by the
// prerender scripts).

import { siteConfig } from '../content/site.js';
import { publicRoutePaths, routeMeta } from '../utils/routeMeta.js';

export { siteConfig, publicRoutePaths };

export const normalizePath = (path = '/') => (path === '/' ? '/' : path.replace(/\/$/, ''));
export const toAbsoluteUrl = (path = '/') => `${siteConfig.siteUrl}${normalizePath(path)}`;

export const getSeoConfig = (path = '/') => {
  const normalizedPath = normalizePath(path);
  const route = routeMeta.find((item) => item.path === normalizedPath) ?? routeMeta[0];
  const canonical = toAbsoluteUrl(route.path);

  return {
    title: route.seo.title || siteConfig.defaultTitle,
    description: route.seo.description || siteConfig.defaultDescription,
    socialDescription: route.seo.socialDescription || route.seo.description || siteConfig.defaultDescription,
    keywords: route.seo.keywords || [],
    robots: 'index,follow',
    canonical,
    image: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
    path: route.path
  };
};
