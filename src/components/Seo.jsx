import { useEffect } from "react";
import { getSeoConfig, siteConfig } from "../seo/site";

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertLink = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const Seo = ({ path }) => {
  useEffect(() => {
    const seo = getSeoConfig(path);

    document.title = seo.title;
    document.documentElement.lang = "en";

    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: seo.keywords.join(", ") });
    upsertMeta('meta[name="robots"]', { name: "robots", content: seo.robots });
    upsertMeta('meta[name="author"]', { name: "author", content: siteConfig.siteName });
    upsertMeta('meta[name="application-name"]', {
      name: "application-name",
      content: siteConfig.siteName
    });

    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: siteConfig.locale
    });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: siteConfig.siteName
    });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: seo.description
    });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: seo.canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: seo.image });
    upsertMeta('meta[property="og:image:width"]', {
      property: "og:image:width",
      content: "1200"
    });
    upsertMeta('meta[property="og:image:height"]', {
      property: "og:image:height",
      content: "630"
    });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: seo.title
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image"
    });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: seo.description
    });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: seo.image });

    upsertLink('link[rel="canonical"]', { rel: "canonical", href: seo.canonical });

    let schemaScript = document.head.querySelector('script[data-seo-schema="route"]');
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.setAttribute("data-seo-schema", "route");
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(seo.schemas);
  }, [path]);

  return null;
};

export default Seo;
