export const siteConfig = {
  siteName: 'Codeferd Digital',
  siteUrl: 'https://www.codeferd.digital',
  defaultTitle: 'Codeferd Digital | Secure Digital Platforms',
  defaultDescription: 'Codeferd Digital builds secure digital platforms for governments, institutions, security organizations, and ambitious businesses.',
  defaultImage: '/og.png',
  locale: 'en_US',
  themeColor: '#070B14',
  email: 'hello@codeferd.digital',
  phone: '+2349137360986',
  addressLocality: 'Lagos',
  addressCountry: 'NG',
  socialProfiles: ['https://github.com/Iconvibes', 'https://www.linkedin.com/in/ferdinard-ashonibare-3a3203369']
};

export const publicRoutePaths = ['/', '/about', '/solutions', '/case-study', '/insights', '/contact'];

const routeCatalog = {
  '/': {
    title: 'Codeferd Digital | Secure Digital Platforms',
    description: 'Codeferd Digital designs secure software for governments, institutions, security organizations and ambitious businesses.',
    keywords: ['Codeferd Digital', 'secure software', 'digital transformation', 'enterprise platforms'],
    robots: 'index,follow',
    canonical: `${siteConfig.siteUrl}/`,
    image: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
    schemas: []
  },
  '/about': {
    title: 'About | Codeferd Digital',
    description: 'Learn how Codeferd Digital delivers secure, high-trust digital platforms with senior execution and disciplined architecture.',
    keywords: ['about', 'enterprise software', 'digital platform partner'],
    robots: 'index,follow',
    canonical: `${siteConfig.siteUrl}/about`,
    image: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
    schemas: []
  },
  '/solutions': {
    title: 'Solutions | Codeferd Digital',
    description: 'Explore Codeferd Digital solutions for government, security, enterprise, and institutional digital modernization.',
    keywords: ['solutions', 'government platforms', 'security systems', 'enterprise portals'],
    robots: 'index,follow',
    canonical: `${siteConfig.siteUrl}/solutions`,
    image: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
    schemas: []
  },
  '/case-study': {
    title: 'Case Study | Codeferd Digital',
    description: 'See how Codeferd Digital delivered a secure digital platform for Ogun State So-Safe Corps.',
    keywords: ['case study', 'public sector software', 'digital platform'],
    robots: 'index,follow',
    canonical: `${siteConfig.siteUrl}/case-study`,
    image: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
    schemas: []
  },
  '/insights': {
    title: 'Insights | Codeferd Digital',
    description: 'Read professional insights on secure modern software delivery, architecture, and digital transformation.',
    keywords: ['insights', 'software architecture', 'digital transformation'],
    robots: 'index,follow',
    canonical: `${siteConfig.siteUrl}/insights`,
    image: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
    schemas: []
  },
  '/contact': {
    title: 'Contact | Codeferd Digital',
    description: 'Start a conversation with Codeferd Digital about your next secure software or digital platform initiative.',
    keywords: ['contact', 'secure software', 'digital platform'],
    robots: 'index,follow',
    canonical: `${siteConfig.siteUrl}/contact`,
    image: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
    schemas: []
  }
};
export const normalizePath = (path = '/') => (path === '/' ? '/' : path.replace(/\/$/, ''));
export const toAbsoluteUrl = (path = '/') => `${siteConfig.siteUrl}${normalizePath(path)}`;
export const getSeoConfig = (path = '/') => routeCatalog[normalizePath(path)] ?? routeCatalog['/'];
export const buildSeoHead = (path = '/') => {
  const seo = getSeoConfig(path);
  return `
<meta name="description" content="${seo.description}">
<meta name="keywords" content="${seo.keywords.join(', ')}">
<meta name="robots" content="${seo.robots}">
<meta property="og:title" content="${seo.title}">
<meta property="og:description" content="${seo.description}">
<meta property="og:image" content="${seo.image}">
<meta property="og:url" content="${seo.canonical}">
<link rel="canonical" href="${seo.canonical}">
`;
};
