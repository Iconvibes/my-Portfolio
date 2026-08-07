import MainLayout from './layout/MainLayout';
import { routeConfig, publicRoutePaths } from './utils/routes';

export { publicRoutePaths };

export const appRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: routeConfig.map((route) =>
      route.path === '/'
        ? { index: true, lazy: route.lazy }
        : { path: route.path.slice(1), lazy: route.lazy }
    )
  }
];
