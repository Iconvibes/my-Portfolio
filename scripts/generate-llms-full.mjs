/**
 * Generates dist/llms-full.txt — the full-text companion to the curated
 * llms.txt summary.
 *
 * Convention (AnswerDotAI llms-txt): llms.txt is a short, curated overview an
 * agent reads first; llms-full.txt carries the COMPLETE content of every page
 * in plain Markdown so a model can fetch the whole site in one request without
 * parsing HTML. Each page is introduced by its title as an H1 and a link to
 * its live URL.
 *
 * Everything is derived from the content modules in src/content/ — the same
 * source of truth the UI and the JSON-LD schema builders use — so the file can
 * never drift out of sync with the site. Wired into `npm run build` after
 * prerender; the SEO smoke check (scripts/check-seo.mjs) asserts it exists,
 * covers every public route, and is reachable from llms.txt.
 *
 * Usage: node scripts/generate-llms-full.mjs
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, writeFile } from "node:fs/promises";

import { siteConfig } from "../src/content/site.js";
import { capabilities, technologies } from "../src/content/capabilities.js";
import { processSteps, values } from "../src/content/process.js";
import { faqItems } from "../src/content/faq.js";
import { insightDate, insights, readingTime } from "../src/content/insights.js";
import { projects } from "../src/content/projects.js";
import { featuredCaseStudy } from "../src/content/caseStudies.js";
import { testimonials } from "../src/content/testimonials.js";
import { contactChannels, socialLinks } from "../src/content/contact.js";
import { facts } from "../src/content/facts.js";
import { credentials } from "../src/content/credentials.js";
import { industries } from "../src/content/industries.js";
import { toAbsoluteUrl } from "../src/seo/site.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(path.resolve(__dirname, ".."), "dist");

const URLS = {
  home: toAbsoluteUrl("/"),
  about: toAbsoluteUrl("/about"),
  work: toAbsoluteUrl("/work"),
  caseStudy: toAbsoluteUrl("/case-study"),
  insights: toAbsoluteUrl("/insights"),
  contact: toAbsoluteUrl("/contact")
};

const section = (lines, heading) => {
  lines.push(`## ${heading}`);
  lines.push("");
};

const buildHome = () => {
  const lines = [];
  lines.push(`# Home — ${siteConfig.siteName}`);
  lines.push("");
  lines.push(URLS.home);
  lines.push("");
  lines.push(siteConfig.defaultDescription);
  lines.push("");

  section(lines, "Key facts");
  facts.forEach((fact) => lines.push(`- **${fact.label}:** ${fact.statement}`));
  lines.push("");

  section(lines, "Status");
  const live = projects.filter((project) => project.status === "live");
  const inProgress = projects.filter((project) => project.status !== "live");
  lines.push(
    `- ${live.length} live platform${live.length === 1 ? "" : "s"}: ${live.map((project) => project.name).join(", ")}`
  );
  lines.push(
    `- ${inProgress.length} product${inProgress.length === 1 ? "" : "s"} in the making: ${inProgress.map((project) => project.name).join(", ")}`
  );
  lines.push(`- ${industries.length} focus sectors: ${industries.map((industry) => industry.title).join(", ")}`);
  lines.push("- Open to remote full-time roles, long-term contracts, and one-off projects");
  lines.push("");

  section(lines, "Capabilities");
  for (const capability of capabilities) {
    lines.push(`### ${capability.title}`);
    lines.push("");
    lines.push(capability.description);
    lines.push("");
    capability.items.forEach((item) => lines.push(`- ${item}`));
    lines.push("");
  }

  section(lines, "Technology stack");
  technologies.forEach((group) => lines.push(`- ${group.group}: ${group.items.join(", ")}`));
  lines.push("");

  section(lines, "Process");
  processSteps.forEach((step) => {
    lines.push(`### ${step.number} — ${step.title}`);
    lines.push("");
    lines.push(step.text);
    lines.push("");
  });

  section(lines, "Values");
  values.forEach((value) => lines.push(`- **${value.title}** — ${value.text}`));
  lines.push("");

  section(lines, "Frequently asked questions");
  faqItems.forEach((item) => {
    lines.push(`### ${item.question}`);
    lines.push("");
    lines.push(item.answer);
    lines.push("");
  });

  // Only ship real quotes — mirrors the Review schema guard in schemas.js.
  if (testimonials.length > 0) {
    section(lines, "Testimonials");
    testimonials.forEach((testimonial) =>
      lines.push(
        `- "${testimonial.quote}" — ${testimonial.name}${testimonial.role ? `, ${testimonial.role}` : ""}`
      )
    );
    lines.push("");
  }

  return lines.join("\n");
};

const buildAbout = () => {
  const lines = [];
  lines.push(`# About — ${siteConfig.siteName}`);
  lines.push("");
  lines.push(URLS.about);
  lines.push("");
  lines.push(
    `${siteConfig.siteName} is a full-stack web developer in ${siteConfig.location}, building fast, secure web platforms for government, hospitality, education, and beyond — from idea to launch, end to end.`
  );
  lines.push("");

  section(lines, "Education");
  credentials.education.forEach((entry) => {
    const field = entry.field ? `. ${entry.field}` : "";
    lines.push(`- ${entry.degree} — ${entry.institution}, ${entry.location || siteConfig.location} (${entry.year})${field}`);
  });
  lines.push("");

  if (credentials.certifications.length > 0) {
    section(lines, "Certifications");
    credentials.certifications.forEach((cert) =>
      lines.push(`- ${cert.name} — ${cert.issuer} (${cert.year})`)
    );
    lines.push("");
  }

  if (credentials.currentlyLearning.length > 0) {
    section(lines, "Currently deepening");
    credentials.currentlyLearning.forEach((item) => lines.push(`- ${item}`));
    lines.push("");
  }

  section(lines, "Industries served");
  industries.forEach((industry) =>
    lines.push(`- **${industry.title}** — ${industry.description}`)
  );
  lines.push("");

  return lines.join("\n");
};

const buildWork = () => {
  const lines = [];
  lines.push("# Work — Selected Projects");
  lines.push("");
  lines.push(URLS.work);
  lines.push("");
  lines.push("Selected projects built by Ferdinard Ashonibare.");
  lines.push("");

  projects.forEach((project) => {
    lines.push(`## ${project.name}`);
    lines.push("");
    lines.push(project.tagline);
    lines.push("");
    lines.push(`- Sector: ${project.sector}`);
    lines.push(`- Status: ${project.status === "live" ? "Live in production" : "Coming soon"}`);
    lines.push(`- ${project.href ? `Live URL: ${project.href}` : "Domain: launching soon"}`);
    lines.push("");
    lines.push(project.description);
    lines.push("");
    lines.push("Highlights:");
    project.highlights.forEach((highlight) => lines.push(`- ${highlight}`));
    lines.push("");
    lines.push(`Tech: ${project.tech.join(", ")}`);
    lines.push("");
  });

  return lines.join("\n");
};

const buildCaseStudy = () => {
  const cs = featuredCaseStudy;
  const lines = [];
  lines.push(`# Case Study — ${cs.title}`);
  lines.push("");
  lines.push(URLS.caseStudy);
  lines.push("");
  lines.push(`Client: ${cs.client}`);
  lines.push(`Live URL: ${cs.liveUrl}`);
  lines.push("");
  lines.push(cs.overview);
  lines.push("");

  const narrative = [
    ["Challenge", cs.challenge],
    ["Research", cs.research],
    ["Planning", cs.planning],
    ["Design", cs.design],
    ["Architecture", cs.architecture],
    ["Development", cs.development],
    ["Security", cs.security],
    ["Performance", cs.performance],
    ["Lessons learned", cs.lessons],
    ["Outcome", cs.outcome],
    ["Future", cs.future]
  ];
  narrative.forEach(([heading, text]) => {
    section(lines, heading);
    lines.push(text);
    lines.push("");
  });

  section(lines, "How the platform works");
  lines.push(cs.howItBuilt);
  lines.push("");
  cs.architectureLayers.forEach((layer) => {
    lines.push(`- **${layer.layer} — ${layer.title}**: ${layer.detail}. ${layer.note}`);
  });
  lines.push("");

  section(lines, "At a glance");
  cs.atAGlance.forEach((metric) => lines.push(`- ${metric.label}: ${metric.value}`));
  lines.push("");

  section(lines, "Measured outcomes");
  cs.outcomes
    .filter((outcome) => outcome.value)
    .forEach((outcome) =>
      lines.push(
        `- **${outcome.label}:** ${outcome.value}${outcome.detail ? ` — ${outcome.detail}` : ""}`
      )
    );
  lines.push("");

  section(lines, "Tech stack");
  lines.push(cs.techStack.join(", "));
  lines.push("");

  section(lines, "Timeline");
  lines.push(cs.timeline.join(" → "));
  lines.push("");

  return lines.join("\n");
};

const buildInsights = () => {
  const lines = [];
  lines.push("# Insights — Notes from the field");
  lines.push("");
  lines.push(URLS.insights);
  lines.push("");
  lines.push(
    "Short, practical writing on engineering, product, and design — learned the hard way, shared the easy way."
  );
  lines.push("");

  insights.forEach((insight) => {
    lines.push(`## ${insight.title}`);
    lines.push("");
    lines.push(`Category: ${insight.category}`);
    lines.push(`Published: ${insightDate(insight.published)}`);
    lines.push(`Reading time: ${readingTime(insight)} min`);
    lines.push("");
    lines.push(insight.summary);
    lines.push("");
    lines.push(`Full article: ${toAbsoluteUrl(`/insights/${insight.slug}`)}`);
    lines.push("");
  });

  return lines.join("\n");
};

const buildContact = () => {
  const lines = [];
  lines.push(`# Contact — ${siteConfig.siteName}`);
  lines.push("");
  lines.push(URLS.contact);
  lines.push("");
  lines.push(`Get in touch with ${siteConfig.siteName} about a website, web app, or full-time role.`);
  lines.push("");

  section(lines, "Contact channels");
  contactChannels.forEach((channel) => lines.push(`- ${channel.label}: ${channel.value}`));
  lines.push("");

  section(lines, "Social profiles");
  socialLinks.forEach((link) => lines.push(`- ${link.label}: ${link.value} (${link.href})`));
  lines.push("");

  return lines.join("\n");
};

// One full page per essay — complete body text, so an agent can read the whole
// article without fetching the HTML page.
const buildArticle = (insight) => {
  const lines = [];
  lines.push(`# ${insight.title}`);
  lines.push("");
  lines.push(toAbsoluteUrl(`/insights/${insight.slug}`));
  lines.push("");
  lines.push(`Category: ${insight.category}`);
  lines.push(`Published: ${insightDate(insight.published)}`);
  lines.push(`Reading time: ${readingTime(insight)} min`);
  lines.push("");
  lines.push(insight.summary);
  lines.push("");

  insight.body.forEach((block) => {
    if (block.type === "h2") {
      lines.push(`## ${block.text}`);
      lines.push("");
    } else if (block.type === "ul") {
      block.items.forEach((item) => lines.push(`- ${item}`));
      lines.push("");
    } else if (block.type === "quote") {
      lines.push(`> ${block.text}`);
      lines.push("");
    } else {
      lines.push(block.text);
      lines.push("");
    }
  });

  return lines.join("\n");
};

// One page per concrete case-study route — agents that fetch llms-full.txt
// need the same coverage as the sitemap and the prerenderer.
const buildProjectCaseStudyPage = (project) => {
  const lines = [];
  lines.push(`# Case Study: ${project.name}`);
  lines.push("");
  lines.push(toAbsoluteUrl(project.caseStudyUrl));
  lines.push("");
  lines.push(`Client: ${project.name}`);
  lines.push(`Sector: ${project.sector}`);
  lines.push(`Status: ${project.status === "live" ? "Live in production" : project.status === "production" ? "In production" : "Launching soon"}`);
  if (project.href) {
    lines.push(`Live URL: ${project.href}`);
  }
  lines.push("");
  lines.push(project.description);
  lines.push("");
  lines.push(project.tagline);
  lines.push("");

  section(lines, "Highlights");
  project.highlights.forEach((highlight) => lines.push(`- ${highlight}`));
  lines.push("");

  section(lines, "Technology");
  lines.push(project.tech.join(", "));
  lines.push("");

  return lines.join("\n");
};

const pages = [
  buildHome(),
  buildAbout(),
  buildWork(),
  buildCaseStudy(),
  ...projects
    .filter((project) => project.caseStudyUrl)
    .map(buildProjectCaseStudyPage),
  buildInsights(),
  buildContact(),
  ...insights.map(buildArticle)
];

const output = `${pages.join("\n\n")}\n`;

await mkdir(distDir, { recursive: true });
await writeFile(path.join(distDir, "llms-full.txt"), output, "utf8");

console.log(`✅ llms-full.txt generated (${Buffer.byteLength(output)} bytes, ${pages.length} pages)`);
