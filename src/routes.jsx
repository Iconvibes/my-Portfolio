import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import CaseStudy from './pages/CaseStudy';
import Insights from './pages/Insights';
import Contact from './pages/Contact';

export { publicRoutePaths } from './seo/site';

export const appRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'solutions', element: <Solutions /> },
      { path: 'case-study', element: <CaseStudy /> },
      { path: 'insights', element: <Insights /> },
      { path: 'contact', element: <Contact /> }
    ]
  }
];
