import { detectIntent } from "@/lib/chatbot/intents";
import {
  CONTACT,
  EDUCATION,
  PORTFOLIO_PROJECTS,
  PORTFOLIO_SERVICES,
  PROFILE,
  SKILLS,
  STRENGTHS,
} from "@/lib/chatbot/knowledge";
import type { AIIntent, IntentMatch, SuggestedQuestion } from "@/lib/chatbot/types";

const FALLBACK_TEXT =
  "I don't have that information in my portfolio knowledge, but you can ask me about Taimoor's experience, skills, projects, education, or contact information.";

function list(items: string[]): string {
  return items.map((item) => `• ${item}`).join("\n");
}

function projectResponse(project: (typeof PORTFOLIO_PROJECTS)[number]): string {
  return [
    `**${project.name}** — ${project.type}`,
    project.description,
    "",
    "Tech stack:",
    list(project.stack),
  ].join("\n");
}

function buildResponse(match: IntentMatch): string {
  switch (match.intent) {
    case "greeting":
      return `Hi! I'm Taimoor's portfolio assistant. Ask me about his experience, tech stack, projects, education, or how to get in touch.`;

    case "thanks":
      return "You're welcome! Let me know if there's anything else you'd like to know about Taimoor.";

    case "about":
      return `${PROFILE.summary} He's based in ${PROFILE.location} and enjoys turning complex problems into clean, maintainable solutions.`;

    case "experience":
      return `Taimoor has ${PROFILE.experience} of professional experience as a ${PROFILE.role}, working across both frontend and backend development on scalable, production-grade applications.`;

    case "techStack":
      return [
        "Taimoor's core stack includes:",
        `• Frontend: ${SKILLS.frontend.slice(0, 4).join(", ")}`,
        `• Backend: ${SKILLS.backend.join(", ")}`,
        `• Database: ${SKILLS.database.join(", ")}`,
        `• State: ${SKILLS.stateManagement.join(", ")}`,
        "",
        `He also has experience with ${SKILLS.cms.join(", ")}.`,
      ].join("\n");

    case "frontend":
      return ["On the frontend, Taimoor works with:", list(SKILLS.frontend)].join("\n");

    case "backend":
      return ["On the backend, Taimoor works with:", list(SKILLS.backend)].join("\n");

    case "nextjs":
      return "Yes, Next.js is one of Taimoor's core frontend technologies — this portfolio itself is built with it.";

    case "react":
      return "Yes, React.js is one of Taimoor's core frontend technologies, and he's also built cross-platform apps with React Native.";

    case "database":
      return ["Taimoor works with the following databases and ORMs:", list(SKILLS.database)].join("\n");

    case "stateManagement":
      return ["For state management, Taimoor uses:", list(SKILLS.stateManagement)].join("\n");

    case "cms":
      return ["Taimoor also builds with CMS and no-code platforms:", list(SKILLS.cms)].join("\n");

    case "tools":
      return ["Taimoor's everyday development tools:", list(SKILLS.tools)].join("\n");

    case "services":
      return ["Taimoor offers the following services:", list(PORTFOLIO_SERVICES.map((s) => s.title))].join("\n");

    case "projects":
      return [
        "Here are some of Taimoor's recent projects:",
        list(PORTFOLIO_PROJECTS.map((p) => `${p.name} — ${p.type}`)),
        "",
        "Ask me about any of them by name for more detail.",
      ].join("\n");

    case "projectDetail":
      return match.project ? projectResponse(match.project) : FALLBACK_TEXT;

    case "education":
      return EDUCATION.map((e) => `• ${e.degree}, ${e.institute}, ${e.location} (${e.years})`).join("\n");

    case "strengths":
      return ["Taimoor's key strengths include:", list(STRENGTHS)].join("\n");

    case "contact":
      return [
        "You can reach Taimoor here:",
        `• Email: ${CONTACT.email}`,
        `• Phone / WhatsApp: ${CONTACT.phone}`,
        `• LinkedIn: ${CONTACT.linkedin}`,
        `• Location: ${CONTACT.location}`,
      ].join("\n");

    case "location":
      return `Taimoor is based in ${PROFILE.location}.`;

    default:
      return FALLBACK_TEXT;
  }
}

export function getChatbotResponse(question: string): { intent: AIIntent; text: string } {
  const match = detectIntent(question);
  return { intent: match.intent, text: buildResponse(match) };
}

export function getSuggestedQuestions(): SuggestedQuestion[] {
  return [
    { id: "about", label: "Tell me about Taimoor" },
    { id: "experience", label: "How much experience does he have?" },
    { id: "techStack", label: "What technologies does he use?" },
    { id: "nextjs", label: "Does he work with Next.js?" },
    { id: "projects", label: "What projects has he worked on?" },
    { id: "project-1", label: `Tell me about ${PORTFOLIO_PROJECTS[0]?.name}` },
    { id: "education", label: "What is his educational background?" },
    { id: "contact", label: "How can I contact him?" },
  ];
}
