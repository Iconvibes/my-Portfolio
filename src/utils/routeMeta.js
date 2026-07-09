export const routeMeta = [
  {
    path: '/',
    label: 'Home',
    priority: '1.0',
    changefreq: 'weekly',
    seo: {
      title: 'Codeferd Digital | Secure Digital Platforms',
      description:
        'Codeferd Digital designs secure software for governments, institutions, security organizations, and ambitious businesses.',
      keywords: ['Codeferd Digital', 'secure software', 'digital transformation', 'enterprise platforms']
    }
  },
  {
    path: '/about',
    label: 'About',
    priority: '0.8',
    changefreq: 'monthly',
    seo: {
      title: 'About | Codeferd Digital',
      description:
        'Learn how Codeferd Digital delivers secure, high-trust digital platforms with senior execution and disciplined architecture.',
      keywords: ['about Codeferd Digital', 'enterprise software', 'digital platform partner']
    }
  },
  {
    path: '/solutions',
    label: 'Solutions',
    priority: '0.9',
    changefreq: 'monthly',
    seo: {
      title: 'Solutions | Codeferd Digital',
      description:
        'Explore Codeferd Digital solutions for government, security, enterprise, and institutional digital modernization.',
      keywords: ['solutions', 'government platforms', 'security systems', 'enterprise portals']
    }
  },
  {
    path: '/case-study',
    label: 'Case Study',
    priority: '0.8',
    changefreq: 'monthly',
    seo: {
      title: 'Case Study | Codeferd Digital',
      description:
        'See how Codeferd Digital delivered a secure digital platform for Ogun State So-Safe Corps.',
      keywords: ['case study', 'public sector software', 'Ogun State So-Safe Corps']
    }
  },
  {
    path: '/insights',
    label: 'Insights',
    priority: '0.7',
    changefreq: 'monthly',
    seo: {
      title: 'Insights | Codeferd Digital',
      description:
        'Read professional insights on secure modern software delivery, architecture, and digital transformation.',
      keywords: ['insights', 'software architecture', 'digital transformation']
    }
  },
  {
    path: '/contact',
    label: 'Contact',
    priority: '0.8',
    changefreq: 'monthly',
    seo: {
      title: 'Contact | Codeferd Digital',
      description:
        'Start a conversation with Codeferd Digital about your next secure software or digital platform initiative.',
      keywords: ['contact Codeferd Digital', 'secure software', 'digital platform']
    }
  }
];

export const publicRoutePaths = routeMeta.map((route) => route.path);
