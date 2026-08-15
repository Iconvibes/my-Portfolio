import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { normalizePath, allPublicPaths, siteConfig, toAbsoluteUrl } from "../src/seo/site.js";
import { buildSeoHead } from "../src/seo/schemas.js";
import { allRouteMeta } from "../src/utils/routeMeta.js";
import { buildRobots } from "./robots.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const ssrEntryPath = path.join(rootDir, "dist-ssr", "entry-server.js");

const { renderRoute } = await import(pathToFileURL(ssrEntryPath).href);

const buildHtml = (template, routePath, appHtml) => {
  const normalizedPath = normalizePath(routePath);
  const seoHeadBase = buildSeoHead(normalizedPath);

  // React 19's renderToString emits its own <link rel="preload"> for eager
  // <img>s (e.g. the hero portrait). Deduplicate against the head builder's
  // preload links by URL so we never ship two preloads for the same asset.
  const seoHeadHrefs = new Set(
    [...seoHeadBase.matchAll(/<link rel="preload"[^>]*href="([^"]+)"/g)].map(
      ([, href]) => href
    )
  );
  const preloadLinks = [...appHtml.matchAll(/<link rel="preload"[^>]*\/>/g)]
    .map(([match]) => match)
    .filter((link) => {
      const href = link.match(/href="([^"]*)"/)?.[1];
      return !href || !seoHeadHrefs.has(href);
    });
  const cleanedAppHtml = appHtml.replace(/<link rel="preload"[^>]*\/>/g, "");
  const seoHead = [seoHeadBase, ...preloadLinks].join("\n");

  return template
    .replace("<!--seo-head-->", seoHead)
    .replace('<div id="root"></div>', `<div id="root">${cleanedAppHtml}</div>`);
};

const writeRoute = async (template, routePath) => {
  const appHtml = await renderRoute(routePath);
  const pageHtml = buildHtml(template, routePath, appHtml);
  const normalizedPath = normalizePath(routePath);

  const outputPath =
    normalizedPath === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, normalizedPath.slice(1), "index.html");

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, pageHtml, "utf8");
};

const buildSitemap = () => {
  const today = new Date().toISOString().slice(0, 10);
  const entries = allPublicPaths
    .map((routePath) => {
      const route = allRouteMeta.find((item) => item.path === routePath);
      // Essays report their real publish date as lastmod; the primary routes
      // are freshly regenerated on every deploy.
      const lastmod = route?.lastmod || today;

      return `  <url>
    <loc>${toAbsoluteUrl(routePath)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route?.changefreq || "monthly"}</changefreq>
    <priority>${route?.priority || "0.7"}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
};

const template = await readFile(path.join(distDir, "index.html"), "utf8");

for (const routePath of allPublicPaths) {
  await writeRoute(template, routePath);
}

await writeFile(path.join(distDir, "sitemap.xml"), buildSitemap(), "utf8");
await writeFile(path.join(distDir, "robots.txt"), buildRobots(), "utf8");
await rm(path.join(rootDir, "dist-ssr"), { recursive: true, force: true });
