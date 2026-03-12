import jflix from './images/jflix.jpg';
import loop from './images/loop.jpg';
import portfolio from './images/myport.jpg';
import tpc from './images/tpc mock.jpg';

const items = [
  {
    image: loop,
    title: "Loopstudio",
    description: "Concept brand site for a VR studio with responsive layout and bold storytelling.",
    category: "Brand Website",
    role: "Strategy, UI design, frontend build",
    challenge: "Position a VR studio with immersive visuals while keeping the experience fast.",
    build: "Crafted a bold narrative layout with responsive sections and clean typography.",
    outcome: "A premium presentation ready for demos, pitches, and product launches.",
    deliverables: ["Landing page", "Responsive layout", "Visual storytelling"],
    results: ["Targeted 90+ Lighthouse performance", "Mobile-first layout across 3 breakpoints", "Launch-ready brand presence"],
    impact: "Positioned to lift demo requests by 20%+",
    stack: ["HTML", "CSS", "JavaScript"],
    githubLink: "https://github.com/Iconvibes/loopstud",
    liveLink: "https://iconvibes.github.io/loopstud/",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)"
  },
  {
    image: tpc,
    title: "Tpc Logistics",
    description: "Logistics landing page with a WhatsApp lead capture flow and clear service highlights.",
    category: "Lead Generation",
    role: "UX flow, UI design, frontend build",
    challenge: "Make service discovery easy and push inquiries to WhatsApp quickly.",
    build: "Designed a streamlined landing page with strong CTAs and WhatsApp routing.",
    outcome: "Faster lead handoff and smoother mobile inquiries.",
    deliverables: ["Service sections", "WhatsApp funnel", "CTA system"],
    results: ["Inquiry flow reduced to 2 taps", "Optimized for 60%+ mobile traffic", "Cleaner lead capture handoff"],
    impact: "Designed to cut inquiry friction by 30%",
    stack: ["HTML", "Tailwind CSS", "JavaScript"],
    githubLink: "https://github.com/Iconvibes/TPC-Logistics",
    liveLink: "https://iconvibes.github.io/TPC-Logistics/",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)"
  },
  {
    image: portfolio,
    title: "My Portfolio",
    description: "Studio website design and build focused on identity, interaction, and performance.",
    category: "Studio Site",
    role: "Brand strategy, UI/UX, frontend development",
    challenge: "Showcase agency positioning, services, and case studies with a premium feel.",
    build: "Developed a dark studio theme with motion, pricing, and training sections.",
    outcome: "A polished brand presence that clearly communicates offerings.",
    deliverables: ["Agency positioning", "Pricing + training", "Motion design"],
    results: ["Clear service + training funnel", "On-scroll motion across key sections", "Improved inquiry structure"],
    impact: "Built to increase qualified inquiries and training leads",
    stack: ["React", "Tailwind CSS", "GSAP"],
    githubLink: "https://github.com/Iconvibes/my-Portfolio",
    liveLink: "https://codeferd.netlify.app/",
    borderColor: "#fde4c3",
    gradient: "linear-gradient(180deg, #fde4c3, #000)"
  },
  {
    image: jflix,
    title: "Netflix Clone",
    description: "Streaming UI prototype with auth flows and TMDB API integration using React.",
    category: "Product Prototype",
    role: "Frontend engineering, API integration",
    challenge: "Prototype a modern streaming UI with smooth browsing and auth patterns.",
    build: "Implemented a React UI with TMDB API data and authentication flows.",
    outcome: "A functional demo for UI design and front-end architecture.",
    deliverables: ["Streaming UI", "Auth flows", "API integration"],
    results: ["20+ dynamic titles loaded via API", "Reusable component system", "Production-style layout flow"],
    impact: "Showcased scalable component patterns",
    stack: ["React", "Firebase", "TMDB API"],
    githubLink: "https://github.com/Iconvibes/jay-movie-trailer",
    liveLink: "https://github.com/Iconvibes/jay-movie-trailer",
    borderColor: "#d1001f",
    gradient: "linear-gradient(180deg, #d1001f, #000)"
  }
];

export default items;
