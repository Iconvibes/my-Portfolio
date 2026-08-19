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
  '/case-study/:slug': () => import('../pages/CaseStudy'),
  '/insights': () => import('../pages/Insights'),
  '/insights/:slug': () => import('../pages/InsightArticle'),
  '/contact': () => import('../pages/Contact')
};

const toLazy = (loader) => async () => {
  const module = await loader();
  return { Component: module.default };
};

// A route-level `lazy` module must expose a named `Component` — the pages
// default-export their component, so map it explicitly.
export const routeConfig = routeMeta.map((route) => ({
  ...route,
  lazy: toLazy(pageLoaders[route.path])
}));

// Dynamic routes: case studies and essays each render through a parameterised
// path; concrete /case-study/{slug} and /insights/{slug} URLs match during
// SSR (prerender) and on the client.
export const dynamicRoutes = [
  { path: '/case-study/:slug', lazy: toLazy(pageLoaders['/case-study/:slug']) },
  { path: '/insights/:slug', lazy: toLazy(pageLoaders['/insights/:slug']) }
];

export { publicRoutePaths };

// Path → loader map. Keep it as the parallel-table source for the parity
// tests: keys must cover the routeMeta paths plus the dynamic essay route.
export const pageMap = pageLoaders;
