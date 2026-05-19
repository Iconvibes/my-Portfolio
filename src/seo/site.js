import projectItems from "../data/projects.js";
import pricing from "../data/pricing.js";
import services from "../data/services.js";
import trainingPrograms from "../data/training.js";

export const siteConfig = {
  siteName: "Codeferd Digital",
  siteUrl: "https://www.ferdinardashonibare.com",
  defaultTitle: "Codeferd Digital | Web Development Agency in Lagos",
  defaultDescription:
    "Founder-led web development studio in Lagos building premium websites, case studies, and conversion-focused digital experiences for modern brands.",
  defaultImage: "/og.png",
  locale: "en_NG",
  themeColor: "#0a0a0a",
  email: "ferdinardoluwajuwonlo@gmail.com",
  phone: "+2349137360986",
  addressLocality: "Lagos",
  addressCountry: "NG",
  socialProfiles: [
    "https://github.com/Iconvibes",
    "https://www.linkedin.com/in/ferdinard-ashonibare-3a3203369",
    "https://www.tiktok.com/@codeferd"
  ]
};

export const publicRoutePaths = ["/", "/services", "/studio", "/work", "/contact"];

const routeCatalog = {
  "/": {
    title: "Codeferd Digital | Web Development Agency in Lagos",
    description:
      "Codeferd Digital is a founder-led web development agency in Lagos building premium websites, React apps, and conversion-focused digital experiences for modern brands.",
    keywords: [
      "Codeferd Digital",
      "web development agency Lagos",
      "React developer Nigeria",
      "frontend developer Lagos",
      "website design agency Nigeria",
      "portfolio website developer"
    ],
    pageType: "website"
  },
  "/services": {
    title: "Web Development Services | Codeferd Digital",
    description:
      "Explore Codeferd Digital services across web strategy, UI design, frontend engineering, website optimization, and structured frontend training.",
    keywords: [
      "web development services",
      "frontend training Lagos",
      "React development services",
      "website redesign Nigeria",
      "Tailwind CSS development",
      "UI UX design services"
    ],
    pageType: "service"
  },
  "/studio": {
    title: "About the Studio | Codeferd Digital",
    description:
      "Meet Ashonibare Ferdinard and learn how Codeferd Digital blends strategy, UI design, and frontend engineering for premium web experiences.",
    keywords: [
      "Ashonibare Ferdinard",
      "Codeferd Digital founder",
      "frontend engineer Lagos",
      "web design studio Nigeria",
      "about Codeferd Digital"
    ],
    pageType: "about"
  },
  "/work": {
    title: "Case Studies and Projects | Codeferd Digital",
    description:
      "Review selected Codeferd Digital projects, case studies, prototypes, and live builds across government, logistics, studio, and product experiences.",
    keywords: [
      "web design portfolio Nigeria",
      "frontend case studies",
      "React portfolio projects",
      "website projects Lagos",
      "Codeferd Digital work"
    ],
    pageType: "portfolio"
  },
  "/contact": {
    title: "Contact Codeferd Digital | Start a Project",
    description:
      "Contact Codeferd Digital to discuss a new website, redesign, React build, or frontend training program. Based in Lagos and working worldwide.",
    keywords: [
      "contact web developer Lagos",
      "hire React developer Nigeria",
      "start a web project",
      "website inquiry Lagos",
      "Codeferd Digital contact"
    ],
    pageType: "contact"
  }
};

const routeLabels = {
  "/": "Home",
  "/services": "Services",
  "/studio": "Studio",
  "/work": "Work",
  "/contact": "Contact"
};

const stripTrailingSlash = (path) => {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
};

export const normalizePath = (path = "/") => stripTrailingSlash(path.split("?")[0] || "/");

export const toAbsoluteUrl = (path = "/") => {
  const normalizedPath = normalizePath(path);
  return normalizedPath === "/"
    ? `${siteConfig.siteUrl}/`
    : `${siteConfig.siteUrl}${normalizedPath}`;
};

const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.siteName,
  url: `${siteConfig.siteUrl}/`,
  logo: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  sameAs: siteConfig.socialProfiles,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.addressLocality,
    addressCountry: siteConfig.addressCountry
  },
  areaServed: "Worldwide"
});

const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.siteName,
  url: `${siteConfig.siteUrl}/`,
  description: routeCatalog["/"].description,
  inLanguage: "en"
});

const professionalServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.siteName,
  image: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
  url: `${siteConfig.siteUrl}/`,
  description: routeCatalog["/"].description,
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.addressLocality,
    addressCountry: siteConfig.addressCountry
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactType: "sales",
    areaServed: "Worldwide",
    availableLanguage: ["English"]
  },
  sameAs: siteConfig.socialProfiles
});

const serviceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web development and frontend training",
  provider: {
    "@type": "ProfessionalService",
    name: siteConfig.siteName,
    url: `${siteConfig.siteUrl}/`
  },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Codeferd Digital Services",
    itemListElement: [
      ...services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description
        }
      })),
      ...pricing.map((plan) => {
        const numericPrice = plan.price.replace(/[^\d.]/g, "");
        return {
          "@type": "Offer",
          name: plan.name,
          ...(numericPrice ? { price: numericPrice, priceCurrency: "USD" } : {}),
          description: plan.description
        };
      }),
      ...trainingPrograms.map((program) => ({
        "@type": "Offer",
        name: program.name,
        price: program.price.replace(/[^\d.]/g, ""),
        priceCurrency: "USD",
        description: program.description
      }))
    ]
  }
});

const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ashonibare Ferdinard",
  jobTitle: "Founder and Frontend Engineer",
  worksFor: {
    "@type": "Organization",
    name: siteConfig.siteName
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.addressLocality,
    addressCountry: siteConfig.addressCountry
  },
  sameAs: siteConfig.socialProfiles
});

const workSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Codeferd Digital Case Studies",
  itemListElement: projectItems.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: item.title,
      description: item.description,
      url: item.liveLink
    }
  }))
});

const breadcrumbSchema = (path) => {
  const normalizedPath = normalizePath(path);
  const crumbs =
    normalizedPath === "/"
      ? [{ name: routeLabels["/"], item: `${siteConfig.siteUrl}/` }]
      : [
          { name: routeLabels["/"], item: `${siteConfig.siteUrl}/` },
          { name: routeLabels[normalizedPath], item: toAbsoluteUrl(normalizedPath) }
        ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item
    }))
  };
};

export const getSeoConfig = (path = "/") => {
  const normalizedPath = normalizePath(path);
  const page = routeCatalog[normalizedPath] || routeCatalog["/"];
  const canonical = toAbsoluteUrl(normalizedPath);
  const image = `${siteConfig.siteUrl}${siteConfig.defaultImage}`;
  const sharedSchemas = [organizationSchema(), breadcrumbSchema(normalizedPath)];

  let schemas = [websiteSchema(), professionalServiceSchema(), ...sharedSchemas];

  if (normalizedPath === "/services") {
    schemas = [serviceSchema(), ...sharedSchemas];
  }

  if (normalizedPath === "/studio") {
    schemas = [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: page.title,
        url: canonical,
        description: page.description
      },
      personSchema(),
      ...sharedSchemas
    ];
  }

  if (normalizedPath === "/work") {
    schemas = [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: page.title,
        url: canonical,
        description: page.description
      },
      workSchema(),
      ...sharedSchemas
    ];
  }

  if (normalizedPath === "/contact") {
    schemas = [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: page.title,
        url: canonical,
        description: page.description
      },
      {
        "@context": "https://schema.org",
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: ["English"]
      },
      ...sharedSchemas
    ];
  }

  return {
    ...page,
    canonical,
    image,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    schemas
  };
};

export const buildSeoHead = (path = "/") => {
  const seo = getSeoConfig(path);
  const keywords = seo.keywords.join(", ");
  const schemaJson = JSON.stringify(seo.schemas);

  return `
    <title>${seo.title}</title>
    <meta name="description" content="${seo.description}" />
    <meta name="keywords" content="${keywords}" />
    <meta name="robots" content="${seo.robots}" />
    <meta name="author" content="${siteConfig.siteName}" />
    <meta name="application-name" content="${siteConfig.siteName}" />
    <meta property="og:locale" content="${siteConfig.locale}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${siteConfig.siteName}" />
    <meta property="og:title" content="${seo.title}" />
    <meta property="og:description" content="${seo.description}" />
    <meta property="og:url" content="${seo.canonical}" />
    <meta property="og:image" content="${seo.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${seo.title}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seo.title}" />
    <meta name="twitter:description" content="${seo.description}" />
    <meta name="twitter:image" content="${seo.image}" />
    <link rel="canonical" href="${seo.canonical}" />
    <script type="application/ld+json">${schemaJson}</script>
  `.trim();
};
