import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { buildSeoHead, normalizePath, publicRoutePaths, siteConfig, toAbsoluteUrl } from "../src/seo/site.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const ssrEntryPath = path.join(rootDir, "dist-ssr", "entry-server.js");

const { renderRoute } = await import(pathToFileURL(ssrEntryPath).href);

const buildHtml = (template, routePath, appHtml) => {
  const normalizedPath = normalizePath(routePath);
  const preloadLinks = [...appHtml.matchAll(/<link rel="preload"[^>]*\/>/g)].map(
    ([match]) => match
  );
  const cleanedAppHtml = appHtml.replace(/<link rel="preload"[^>]*\/>/g, "");
  const seoHead = [buildSeoHead(normalizedPath), ...preloadLinks].join("\n");

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
  const priorities = {
    "/": "1.0",
    "/services": "0.9",
    "/work": "0.9",
    "/studio": "0.8",
    "/contact": "0.8"
  };

  const entries = publicRoutePaths
    .map(
      (routePath) => `  <url>
    <loc>${toAbsoluteUrl(routePath)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${routePath === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${priorities[routePath] || "0.7"}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
};

const buildRobots = () => `User-agent: *
Allow: /
Disallow: /admin
Disallow: /.git
Disallow: /.env*
Disallow: /node_modules

Sitemap: ${siteConfig.siteUrl}/sitemap.xml
`;

const template = await readFile(path.join(distDir, "index.html"), "utf8");

for (const routePath of publicRoutePaths) {
  await writeRoute(template, routePath);
}

await writeFile(path.join(distDir, "sitemap.xml"), buildSitemap(), "utf8");
await writeFile(path.join(distDir, "robots.txt"), buildRobots(), "utf8");
await rm(path.join(rootDir, "dist-ssr"), { recursive: true, force: true });
