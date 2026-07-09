import MainLayout from './layout/MainLayout';
import { routeConfig, publicRoutePaths } from './utils/routes';

export { publicRoutePaths };

export const appRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: routeConfig.map((route) =>
      route.path === '/'
        ? { index: true, element: route.element }
        : { path: route.path.slice(1), element: route.element }
    )
  }
];
