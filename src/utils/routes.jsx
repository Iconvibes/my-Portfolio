import { routeMeta, publicRoutePaths } from './routeMeta';

// Route-level code splitting: each page becomes its own chunk, loaded on
// demand by the router. React Router v7's data routers resolve `lazy` route
// modules during SSR (createStaticHandler.query awaits them), so the
// prerender still renders fully hydrated HTML for every route.
const pageLoaders = {
  '/': () => import('../pages/Home'),
  '/about': () => import('../pages/About'),
  '/work': () => import('../pages/Work'),
  '/case-study': () => import('../pages/CaseStudy'),
  '/insights': () => import('../pages/Insights'),
  '/contact': () => import('../pages/Contact')
};

// A route-level `lazy` module must expose a named `Component` — the pages
// default-export their component, so map it explicitly.
export const routeConfig = routeMeta.map((route) => ({
  ...route,
  lazy: async () => {
    const module = await pageLoaders[route.path]();
    return { Component: module.default };
  }
}));

export { publicRoutePaths };

// Path → loader map. Keep it as the parallel-table source for the parity
// tests: keys must exactly match routeMeta paths.
export const pageMap = pageLoaders;
