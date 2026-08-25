import { PORTFOLIO_PROJECTS } from "@/lib/chatbot/knowledge";
import type { AIIntent, IntentMatch } from "@/lib/chatbot/types";

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s+.#-]/g, " ")
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
  ["react", ["react.js", "reactjs", "react native", "react"]],
  ["database", ["database", "postgres", "postgresql", "mongodb", "mongo db", "prisma", "sql", "orm"]],
  ["stateManagement", ["redux", "rtk query", "state management", "vuex"]],
  ["cms", ["wordpress", "shopify", "webflow", "bubble.io", "bubble", "cms", "no-code", "no code"]],
  ["tools", ["git", "github", "vs code", "postman", "npm", "vercel", "version control", "dev tools"]],
  ["education", ["education", "educational", "degree", "university", "college", "study", "studied", "qualification", "academic"]],
  ["contact", ["contact", "reach him", "reach out", "email", "phone", "whatsapp", "hire him", "get in touch", "connect with"]],
  ["location", ["where is he", "where is taimoor", "located", "based in", "which city", "which country"]],
  ["strengths", ["strength", "strengths", "strong at", "good at", "expertise", "specialize", "specialty"]],
  ["services", ["services", "what do you offer", "what can he do for", "hire him for", "what does he offer"]],
  ["projects", ["projects", "portfolio", "case studies", "apps has he built", "apps has he made", "work has he done"]],
  ["experience", ["experience", "experienced", "years", "how long", "career", "seniority", "how senior"]],
  ["frontend", ["frontend", "front-end", "front end", "ui development", "client-side", "client side", "user interface"]],
  ["backend", ["backend", "back-end", "back end", "server-side", "server side", "api development", "node.js", "nodejs", "node", "express.js", "express"]],
  ["techStack", ["tech stack", "technologies", "stack", "what does he use", "what does he build with", "technology", "what he uses"]],
  ["about", ["who is taimoor", "about taimoor", "tell me about him", "who are you", "introduce", "who is he", "about him"]],
  ["greeting", ["hi", "hello", "hey", "good morning", "good evening", "good afternoon"]],
  ["thanks", ["thanks", "thank you", "appreciate it"]],
];

// Lets an abbreviated mention (e.g. "MetaMuto" for the "MetaMutoDAO" project)
// resolve by checking every suffix of the message against the project alias
// as a prefix match, in either direction.
function fuzzyIncludes(flat: string, alias: string): boolean {
  const minLen = 4;
  for (let i = 0; i <= flat.length - minLen; i++) {
    const suffix = flat.slice(i);
    if (alias.startsWith(suffix) || suffix.startsWith(alias)) return true;
  }
  return false;
}

function findProjectMention(normalized: string) {
  const flat = compact(normalized);
  return PORTFOLIO_PROJECTS.find((project) => {
    const alias = compact(normalize(project.name));
    return flat.includes(alias) || fuzzyIncludes(flat, alias);
  });
}

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

  return best;
}
