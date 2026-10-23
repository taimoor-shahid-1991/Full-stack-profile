import { PROJECTS } from "@/components/Projects";
import { SERVICES } from "@/components/Services";
import { STATS } from "@/components/About";

export const PROFILE = {
  name: "Taimoor Shahid",
  role: "Senior Frontend & Full-Stack Developer",
  experience: "5+ years",
  location: "Lahore, Pakistan",
  summary:
    "Taimoor is a Senior Frontend & Full-Stack Developer with 5+ years of experience building scalable, high-performance web applications. His core stack is React, Next.js, TypeScript, Node.js, PostgreSQL and MongoDB.",
};

export const SKILLS = {
  frontend: [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript (ES6+)",
    "Tailwind CSS",
    "HTML5",
    "CSS3 / Sass",
    "Vue.js",
    "Angular.js",
    "React Native",
    "Bootstrap",
    "GSAP Animations",
    "jQuery",
  ],
  backend: ["Node.js", "Express.js", "REST APIs"],
  database: ["PostgreSQL", "MongoDB", "Prisma ORM"],
  stateManagement: ["Redux Toolkit", "RTK Query", "Context API", "Vuex"],
  cms: ["WordPress", "Shopify", "Webflow", "Bubble.io"],
  tools: ["Git", "GitHub", "VS Code", "Postman", "npm", "Vercel"],
};

export const CORE_SKILLS = ["React.js", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB"];

// Every technology the assistant can confirm, with the words people use to ask about it.
export const SKILL_LOOKUP: { label: string; aliases: string[]; category: string; core?: boolean }[] = [
  { label: "React.js", aliases: ["react", "react.js", "reactjs"], category: "frontend", core: true },
  { label: "Next.js", aliases: ["next", "next.js", "nextjs"], category: "frontend", core: true },
  { label: "TypeScript", aliases: ["typescript", "ts"], category: "frontend & backend", core: true },
  { label: "JavaScript (ES6+)", aliases: ["javascript", "js", "es6"], category: "frontend & backend", core: true },
  { label: "Tailwind CSS", aliases: ["tailwind", "tailwindcss"], category: "frontend", core: true },
  { label: "Node.js", aliases: ["node", "node.js", "nodejs"], category: "backend", core: true },
  { label: "Express.js", aliases: ["express", "express.js", "expressjs"], category: "backend", core: true },
  { label: "PostgreSQL", aliases: ["postgres", "postgresql", "sql"], category: "databases", core: true },
  { label: "Prisma ORM", aliases: ["prisma"], category: "databases", core: true },
  { label: "MongoDB", aliases: ["mongo", "mongodb", "mongoose"], category: "databases", core: true },
  { label: "Redux Toolkit", aliases: ["redux", "redux toolkit"], category: "state management", core: true },
  { label: "RTK Query", aliases: ["rtk", "rtk query"], category: "state management", core: true },
  { label: "HTML5", aliases: ["html", "html5"], category: "frontend" },
  { label: "CSS3 / Sass", aliases: ["css", "css3", "sass", "scss"], category: "frontend" },
  { label: "Bootstrap", aliases: ["bootstrap"], category: "frontend" },
  { label: "Vue.js", aliases: ["vue", "vue.js", "vuejs", "vuex"], category: "frontend" },
  { label: "Angular.js", aliases: ["angular", "angular.js", "angularjs"], category: "frontend" },
  { label: "React Native", aliases: ["react native"], category: "mobile" },
  { label: "jQuery", aliases: ["jquery"], category: "frontend" },
  { label: "GSAP Animations", aliases: ["gsap"], category: "frontend" },
  { label: "WordPress", aliases: ["wordpress", "elementor"], category: "CMS" },
  { label: "Shopify", aliases: ["shopify"], category: "CMS" },
  { label: "Webflow", aliases: ["webflow"], category: "CMS" },
  { label: "Bubble.io", aliases: ["bubble", "bubble.io"], category: "no-code" },
  { label: "Web3.js", aliases: ["web3", "web3.js", "blockchain"], category: "Web3" },
  { label: "Vercel", aliases: ["vercel"], category: "deployment" },
];

export const EXPERIENCE = [
  {
    title: "Full Stack Developer",
    company: "ArhamSoft (Pvt.) Ltd.",
    period: "Jan 2026 – Present",
  },
  {
    title: "Senior Frontend Developer",
    company: "ArhamSoft IT Solutions (Pvt.) Ltd.",
    period: "Aug 2021 – Dec 2025",
  },
];

export const LANGUAGES = ["English", "Urdu"];

export const EDUCATION = [
  {
    degree: "Bachelor of Computer Science (BCS)",
    institute: "National College of Business Administration & Economics (NCBA&E)",
    location: "Lahore, Pakistan",
    years: "2011–2016",
  },
  {
    degree: "Intermediate in Computer Science (ICS)",
    institute: "Punjab College of Information Technology",
    location: "Lahore, Pakistan",
    years: "2008–2010",
  },
];

export const STRENGTHS = [
  "Full Stack Web Application Development",
  "Frontend Architecture & Component Design",
  "REST API Design & Integration",
  "Database Design & Management",
  "Performance Optimization",
  "Responsive & Mobile-First Development",
  "Team Collaboration & Agile/Scrum",
  "Debugging & Problem Solving",
  "Clean, Maintainable & Scalable Code",
];

export const CONTACT = {
  email: "taymoor.shahid.ts@gmail.com",
  phone: "+92 323 8820858",
  whatsapp: "https://wa.me/923238820858",
  linkedin: "https://www.linkedin.com/in/taimoor-shahid-713277234",
  github: "https://github.com/taimoor-shahid-1991",
  location: "Lahore, Pakistan",
};

export const PORTFOLIO_STATS = STATS;
export const PORTFOLIO_PROJECTS = PROJECTS;
export const PORTFOLIO_SERVICES = SERVICES;
