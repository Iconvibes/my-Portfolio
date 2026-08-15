import { describe, expect, it } from 'vitest';
import {
  allPublicPaths,
  allRouteMeta,
  articleRoutes,
  publicRoutePaths,
  routeMeta
} from './routeMeta.js';
import { dynamicRoutes, pageMap, routeConfig } from './routes.jsx';
import { navigation } from '../content/navigation.js';
import { insights } from '../content/insights.js';

describe('route table integrity', () => {
  it('exposes at least the six public routes', () => {
    expect(routeMeta.length).toBeGreaterThanOrEqual(6);
  });

  it('has unique paths and complete SEO facts per route', () => {
    const paths = routeMeta.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);

    for (const route of routeMeta) {
      expect(route.path).toMatch(/^\//);
      expect(route.label).toBeTruthy();
      expect(route.priority).toBeTruthy();
      expect(route.changefreq).toBeTruthy();
      expect(route.seo?.title).toBeTruthy();
      expect(route.seo?.description).toBeTruthy();
    }
  });

  it('derives publicRoutePaths in the same order as the table', () => {
    expect(publicRoutePaths).toEqual(routeMeta.map((route) => route.path));
  });

  it('derives one article route per insight, with publish dates and SEO facts', () => {
    expect(articleRoutes.length).toBe(insights.length);
    const paths = articleRoutes.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const route of articleRoutes) {
      expect(route.path).toMatch(/^\/insights\/[a-z0-9-]+$/);
      expect(route.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(route.seo?.title).toBeTruthy();
      expect(route.seo?.description).toBeTruthy();
    }
    // Primary + articles, no overlap.
    expect(allRouteMeta.length).toBe(routeMeta.length + articleRoutes.length);
    expect(allPublicPaths).toEqual(allRouteMeta.map((route) => route.path));
  });
});

// The parallel-table hazard: route paths exist in routeMeta AND as pageMap
// keys in utils/routes.jsx. If one drifts, routeConfig silently gets an
// undefined element. This test makes the drift impossible to ship.
describe('route table ↔ page map parity', () => {
  it('pageMap keys cover every route table path plus the dynamic essay route', () => {
    const tablePaths = routeMeta.map((route) => route.path).sort();
    const mapKeys = Object.keys(pageMap)
      .filter((key) => key !== '/insights/:slug')
      .sort();
    expect(mapKeys).toEqual(tablePaths);
    expect(pageMap['/insights/:slug']).toBeTypeOf('function');
  });

  it('every route (including the dynamic one) resolves to a Component', async () => {
    for (const route of [...routeConfig, ...dynamicRoutes]) {
      expect(route.lazy).toBeTypeOf('function');
      const mod = await route.lazy();
      expect(mod.Component).toBeTypeOf('function');
    }
  });

  it('every public path (concrete articles included) has a matching router route', () => {
    const concrete = new Set(routeConfig.map((route) => route.path));
    for (const path of allPublicPaths) {
      const covered =
        concrete.has(path) ||
        dynamicRoutes.some(({ path: pattern }) => {
          const staticPrefix = pattern.slice(0, pattern.indexOf('/:'));
          return path.startsWith(staticPrefix);
        });
      expect(covered, `no router route for ${path}`).toBe(true);
    }
  });
});

// The navigation seam: navigation (pure domain data in src/content/) duplicates
// the path/label facts of the route table on purpose — content must not depend
// on route plumbing. This test lives in src/utils/ because it is the seam that
// keeps the two copies honest in both directions.
describe('navigation ↔ route table parity', () => {
  it('navigation hrefs exactly match the public route paths', () => {
    const navPaths = navigation.map((item) => item.href).sort();
    expect(navPaths).toEqual([...publicRoutePaths].sort());
  });

  it('navigation labels match the route table labels', () => {
    const navLabels = navigation.map((item) => item.label).sort();
    const tableLabels = routeMeta.map((route) => route.label).sort();
    expect(navLabels).toEqual(tableLabels);
  });
});
