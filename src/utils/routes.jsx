import Home from '../pages/Home';
import About from '../pages/About';
import Solutions from '../pages/Solutions';
import CaseStudy from '../pages/CaseStudy';
import Insights from '../pages/Insights';
import Contact from '../pages/Contact';
import { routeMeta, publicRoutePaths } from './routeMeta';

const pageMap = {
  '/': <Home />,
  '/about': <About />,
  '/solutions': <Solutions />,
  '/case-study': <CaseStudy />,
  '/insights': <Insights />,
  '/contact': <Contact />
};

export const routeConfig = routeMeta.map((route) => ({
  ...route,
  element: pageMap[route.path]
}));

export { publicRoutePaths };
