export const shouldSkipMotion = () => {
  if (typeof window === "undefined") return true;

  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent;
  const isCrawler = /bot|crawler|spider|headlesschrome|googlebot|bingbot/i.test(userAgent);

  return prefersReducedMotion || isCrawler;
};
