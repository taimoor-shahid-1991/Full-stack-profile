import { PORTFOLIO_PROJECTS, SKILL_LOOKUP } from "@/lib/chatbot/knowledge";
import type { AIIntent, IntentMatch } from "@/lib/chatbot/types";

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s+.#-]/g, " ")
    .replace(/\.(\s|$)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function compact(input: string): string {
  return input.replace(/[\s.-]+/g, "");
}

function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Single-word phrases need a word-boundary match — plain `includes` lets
// "hi" match inside "his", "git" match inside "digital", etc.
function hasPhrase(normalized: string, phrase: string): boolean {
  const trimmed = phrase.trim();
  if (trimmed.includes(" ")) {
    return normalized.includes(trimmed);
  }
  return new RegExp(`(^|\\s)${escapeRegExp(trimmed)}(\\s|$)`).test(normalized);
}

// Ordered by specificity — checked first when scores tie, so "does he use redux"
// resolves to stateManagement rather than the broader techStack intent.
const INTENT_KEYWORDS: [AIIntent, string[]][] = [
  ["nextjs", ["next.js", "nextjs", "next js"]],
  ["mobile", ["mobile", "mobile app", "mobile apps", "react native", "android", "ios", "app development"]],
  ["react", ["react.js", "reactjs", "react"]],
  ["database", ["database", "databases", "db", "postgres", "postgresql", "mongodb", "mongo db", "prisma", "sql", "orm"]],
  ["stateManagement", ["redux", "rtk query", "state management", "vuex"]],
  ["cms", ["wordpress", "shopify", "webflow", "bubble.io", "bubble", "cms", "no-code", "no code"]],
  ["tools", ["git", "github", "vs code", "postman", "npm", "vercel", "version control", "dev tools", "deploy", "deploys", "deployment", "hosting", "cloud"]],
  ["education", ["education", "educational", "degree", "university", "college", "study", "studied", "qualification", "academic"]],
  ["contact", ["contact", "reach him", "reach out", "email", "phone", "whatsapp", "get in touch", "connect with"]],
  ["availability", ["available", "availability", "freelance", "freelancing", "open to work", "hire him", "hire", "hiring", "remote", "full-time", "full time", "part-time", "contract"]],
  ["languages", ["languages does he speak", "language does he speak", "speak", "speaks", "urdu", "english"]],
  ["location", ["where is he", "where is taimoor", "located", "based in", "where is he based", "which city", "which country"]],
  ["strengths", ["strength", "strengths", "strong at", "good at", "expertise", "specialize", "specialty"]],
  ["services", ["services", "what do you offer", "what can he do for", "hire him for", "what does he offer"]],
  ["projects", ["projects", "portfolio", "case studies", "apps has he built", "apps has he made", "work has he done"]],
  ["experience", [
    "experience", "experienced", "years", "how long", "career", "seniority", "how senior",
    "where does he work", "where is he working", "currently working", "current job", "current company",
    "company", "companies", "employer", "worked for", "work history", "job", "arhamsoft",
  ]],
  ["frontend", ["frontend", "front-end", "front end", "ui development", "client-side", "client side", "user interface"]],
  ["backend", ["backend", "back-end", "back end", "server-side", "server side", "api development", "node.js", "nodejs", "node", "express.js", "express"]],
  ["techStack", ["tech stack", "technologies", "stack", "what does he use", "what does he build with", "technology", "what he uses", "skills"]],
  ["about", ["who is taimoor", "about taimoor", "tell me about him", "who are you", "introduce", "who is he", "about him"]],
  ["greeting", ["hi", "hello", "hey", "good morning", "good evening", "good afternoon", "salam", "assalam o alaikum"]],
  ["thanks", ["thanks", "thank you", "appreciate it"]],
];

// Short names people use for projects. Matched on word boundaries so ordinary
// words (e.g. "cloud", "assets") don't get mistaken for a project name.
const PROJECT_ALIASES: Record<string, string[]> = {
  AssetsRack: ["assets rack", "asset rack", "assetrack"],
  MetaMutoDAO: ["metamuto", "meta muto", "metamuto dao"],
  "Marilyn Center": ["marilyn"],
  "OzMovies": ["oz movies", "oz movie"],
  "ESIM Management System": ["esim", "e-sim", "esim management"],
  "FLO.ink": ["flo.ink", "flo ink", "floink"],
};

function findProjectMention(normalized: string) {
  const flat = compact(normalized);
  return PORTFOLIO_PROJECTS.find((project) => {
    const fullName = compact(normalize(project.name));
    const aliases = PROJECT_ALIASES[project.name] ?? [];
    return flat.includes(fullName) || aliases.some((alias) => hasPhrase(normalized, alias));
  });
}

function findSkillMention(normalized: string) {
  // Longest alias first, so "react native" wins over "react".
  const entries = SKILL_LOOKUP.flatMap((skill) => skill.aliases.map((alias) => ({ skill, alias })));
  entries.sort((a, b) => b.alias.length - a.alias.length);
  return entries.find(({ alias }) => hasPhrase(normalized, alias))?.skill;
}

// "does he know python", "can he use rust", "any experience with go?"
const SKILL_QUESTION =
  /(?:does|can|do|has|is) (?:he|taimoor|you)(?: also)? (?:know|use|work with|works with|have experience (?:with|in)|code in|program in|familiar with|good (?:at|with)) (.+)$/;

export function detectIntent(question: string): IntentMatch {
  const normalized = normalize(question);
  if (!normalized) {
    return { intent: "fallback", score: 0 };
  }

  const project = findProjectMention(normalized);
  if (project) {
    return { intent: "projectDetail", score: 100, project };
  }

  // "frontend or backend" style questions should get the combined tech-stack
  // answer instead of resolving to just one side.
  if (/(frontend|front-end|front end).{0,15}(or|and).{0,15}(backend|back-end|back end)/.test(normalized)) {
    return { intent: "techStack", score: 10 };
  }

  let best: IntentMatch = { intent: "fallback", score: 0 };

  for (const [intent, phrases] of INTENT_KEYWORDS) {
    let score = 0;
    for (const phrase of phrases) {
      if (hasPhrase(normalized, phrase)) {
        score += phrase.includes(" ") ? 2 : 1;
      }
    }
    if (score > best.score) {
      best = { intent, score };
    }
  }

  if (best.intent !== "fallback") {
    return best;
  }

  const skill = findSkillMention(normalized);
  if (skill) {
    return { intent: "skill", score: 5, skill };
  }

  const unknown = normalized.match(SKILL_QUESTION);
  if (unknown) {
    return { intent: "unknownSkill", score: 1, term: unknown[1].replace(/[?.!\s]+$/, "") };
  }

  return best;
}
