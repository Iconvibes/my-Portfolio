import { describe, expect, it } from 'vitest';
import { publicRoutePaths, routeMeta } from './routeMeta.js';
import { pageMap, routeConfig } from './routes.jsx';
import { navigation } from '../content/navigation.js';

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
});

// The parallel-table hazard: route paths exist in routeMeta AND as pageMap
// keys in utils/routes.jsx. If one drifts, routeConfig silently gets an
// undefined element. This test makes the drift impossible to ship.
describe('route table ↔ page map parity', () => {
  it('pageMap keys exactly match the route table paths', () => {
    const tablePaths = routeMeta.map((route) => route.path).sort();
    const mapKeys = Object.keys(pageMap).sort();
    expect(mapKeys).toEqual(tablePaths);
  });

  it('every route resolves to a lazy module that exposes a Component', async () => {
    for (const route of routeConfig) {
      expect(route.lazy).toBeTypeOf('function');
      const mod = await route.lazy();
      expect(mod.Component).toBeTypeOf('function');
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
