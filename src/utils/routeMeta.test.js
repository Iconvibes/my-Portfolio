import { describe, expect, it } from 'vitest';
import {
  allPublicPaths,
  allRouteMeta,
  articleRoutes,
  caseStudyRoutes,
  publicRoutePaths,
  routeMeta
} from './routeMeta.js';
import { dynamicRoutes, pageMap, routeConfig } from './routes.jsx';
import { navigation } from '../content/navigation.js';
import { insights } from '../content/insights.js';
import { projects } from '../content/projects.js';

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
    // Primary + case studies + articles, no overlap.
    expect(allRouteMeta.length).toBe(routeMeta.length + caseStudyRoutes.length + articleRoutes.length);
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
  it('navigation hrefs exactly match the nav-flagged route paths', () => {
    const navRoutes = routeMeta.filter((route) => route.nav);
    const navPaths = navigation.map((item) => item.href).sort();
    expect(navPaths).toEqual(navRoutes.map((route) => route.path).sort());
  });

  it('navigation labels match the nav-flagged route labels', () => {
    const navRoutes = routeMeta.filter((route) => route.nav);
    const navLabels = navigation.map((item) => item.label).sort();
    const tableLabels = navRoutes.map((route) => route.label).sort();
    expect(navLabels).toEqual(tableLabels);
  });
});

describe('case-study routes derived from projects', () => {
  it('derives a case-study route for every project with a non-empty caseStudyUrl', () => {
    const expected = projects
      .filter((project) => project.caseStudyUrl)
      .map((project) => project.caseStudyUrl)
      .sort();
    const actual = caseStudyRoutes.map((route) => route.path).sort();
    expect(actual).toEqual(expected);
  });

  it('every case-study route has SEO metadata', () => {
    for (const route of caseStudyRoutes) {
      expect(route.path).toMatch(/^\/case-study\/[a-z0-9-]+$/);
      expect(route.label).toBeTruthy();
      expect(route.seo?.title).toBeTruthy();
      expect(route.seo?.description).toBeTruthy();
    }
  });

  it('every case-study route appears in allRouteMeta and prerenderable paths', () => {
    for (const route of caseStudyRoutes) {
      expect(allRouteMeta).toContainEqual(expect.objectContaining({ path: route.path }));
      expect(allPublicPaths).toContain(route.path);
    }
  });

  it('every concrete case-study route has a matching router route', () => {
    const concrete = new Set(routeConfig.map((route) => route.path));
    for (const route of caseStudyRoutes) {
      // Should match either as an exact path in routeConfig or via the dynamic pattern
      const covered =
        concrete.has(route.path) ||
        dynamicRoutes.some(({ path: pattern }) => {
          const staticPrefix = pattern.slice(0, pattern.indexOf('/:'));
          return route.path.startsWith(staticPrefix);
        });
      expect(covered, `no router route for case study ${route.path}`).toBe(true);
    }
  });

  it('no case-study route collides with the base /case-study path', () => {
    const caseStudyPath = routeMeta.find((r) => r.path === '/case-study');
    expect(caseStudyPath).toBeTruthy();
    for (const route of caseStudyRoutes) {
      expect(route.path).not.toBe('/case-study');
    }
  });

  it('every case-study route resolves to a Component via dynamic router pattern', async () => {
    // Concrete case-study paths resolve through the /case-study/:slug dynamic
    // route — they do not need their own entry in routeConfig.
    const dynamicCaseStudy = dynamicRoutes.find((r) => r.path === '/case-study/:slug');
    expect(dynamicCaseStudy).toBeTruthy();
    expect(dynamicCaseStudy.lazy).toBeTypeOf('function');
    const mod = await dynamicCaseStudy.lazy();
    expect(mod.Component).toBeTypeOf('function');
  });

  it('does not generate a route for projects without caseStudyUrl', () => {
    const noCaseStudy = projects.filter((project) => !project.caseStudyUrl);
    for (const project of noCaseStudy) {
      expect(caseStudyRoutes.find((r) => r.path === project.caseStudyUrl)).toBeUndefined();
    }
  });
});
