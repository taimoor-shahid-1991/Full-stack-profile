import { detectIntent } from "@/lib/chatbot/intents";
import {
  CONTACT,
  CORE_SKILLS,
  EDUCATION,
  EXPERIENCE,
  LANGUAGES,
  PORTFOLIO_BUDGETS,
  PORTFOLIO_PROJECTS,
  PORTFOLIO_SERVICES,
  PORTFOLIO_TESTIMONIALS,
  PROFILE,
  SKILLS,
  STRENGTHS,
} from "@/lib/chatbot/knowledge";
import type { AIIntent, IntentMatch, SuggestedQuestion } from "@/lib/chatbot/types";

const FALLBACK_TEXT =
  "I don't have that information in my portfolio knowledge, but you can ask me about Taimoor's experience, skills, projects, services, availability, or how to contact him.";

function list(items: string[]): string {
  return items.map((item) => `• ${item}`).join("\n");
}

function projectResponse(project: (typeof PORTFOLIO_PROJECTS)[number]): string {
  return [
    `**${project.name}** — ${project.type}`,
    project.description,
    "",
    `Taimoor's role: ${project.role}`,
    list(project.contributions),
    "",
    `Challenge: ${project.challenge}`,
    `How he solved it: ${project.solution}`,
    "",
    "Tech stack:",
    list(project.stack),
  ].join("\n");
}

function buildResponse(match: IntentMatch): string {
  switch (match.intent) {
    case "greeting":
      return `Hi! I'm Taimoor's portfolio assistant. Ask me about his experience, tech stack, projects, services, or how to get in touch.`;

    case "thanks":
      return "You're welcome! Let me know if there's anything else you'd like to know about Taimoor.";

    case "about":
      return `${PROFILE.summary} He's based in ${PROFILE.location} and is ${PROFILE.status}.`;

    case "experience":
      return [
        `Taimoor has ${PROFILE.experience} of professional experience building scalable, production-grade web applications. He joined ArhamSoft IT Solutions as a Senior Frontend Developer and was promoted to Full Stack Developer.`,
        "",
        "Work history:",
        list(EXPERIENCE.map((job) => `**${job.title}**, ${job.company} (${job.period})`)),
        "",
        "Current responsibilities:",
        list(EXPERIENCE[0]?.highlights ?? []),
      ].join("\n");

    case "mobile":
      return "Yes. Taimoor builds cross-platform mobile apps with React Native, though his main focus is web applications with React, Next.js, TypeScript and Node.js.";

    case "availability":
      return [
        `Yes. Taimoor is ${PROFILE.status}.`,
        "",
        "• Hiring for a role: use the contact form and choose **Full-time / contract role**, or download his CV: " + CONTACT.cv,
        "• Freelance work: choose **Freelance project** in the contact form, or use the **Hire Me for a Project** button.",
        `• Or email him directly: ${CONTACT.email}`,
      ].join("\n");

    case "languages":
      return `Taimoor speaks ${LANGUAGES.join(" and ")}.`;

    case "skill": {
      const skill = match.skill;
      if (!skill) return FALLBACK_TEXT;
      if (skill.core) {
        return `Yes, ${skill.label} is part of Taimoor's core ${skill.category} stack, and he uses it day-to-day on production projects.`;
      }
      return `Yes, Taimoor has worked with ${skill.label} (${skill.category}). His main focus, though, is ${CORE_SKILLS.join(", ")}.`;
    }

    case "unknownSkill":
      return `${match.term ? `"${match.term}" isn't` : "That isn't"} part of Taimoor's listed stack. His core technologies are ${CORE_SKILLS.join(", ")}. Ask me about any of them, or about his projects.`;

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
      return "Yes, React.js is one of Taimoor's core frontend technologies. He uses it with Next.js and TypeScript on most of his projects.";

    case "database":
      return ["Taimoor works with the following databases and ORMs:", list(SKILLS.database)].join("\n");

    case "stateManagement":
      return ["For state management, Taimoor uses:", list(SKILLS.stateManagement)].join("\n");

    case "cms":
      return ["Taimoor also builds with CMS and no-code platforms:", list(SKILLS.cms)].join("\n");

    case "tools":
      return ["Taimoor's everyday development tools:", list(SKILLS.tools)].join("\n");

    case "services":
      return [
        "Alongside his full-time role, Taimoor takes on selected freelance projects. He can help with:",
        list(PORTFOLIO_SERVICES.map((s) => `**${s.title}**: ${s.text}`)),
        "",
        "To discuss a project, choose **Freelance project** in the contact form.",
      ].join("\n");

    case "pricing":
      return [
        "Pricing depends on the scope of the project, so Taimoor quotes each one individually.",
        `The contact form lets you pick a budget range (${PORTFOLIO_BUDGETS.join(", ")}). Share your project details there and he'll get back to you with an estimate.`,
      ].join("\n");

    case "testimonials":
      return [
        "Here's what people say about working with Taimoor:",
        ...PORTFOLIO_TESTIMONIALS.map((t) => `• "${t.quote}" — **${t.name}**, ${t.role}`),
      ].join("\n");

    case "resume":
      return `You can download Taimoor's CV here: ${CONTACT.cv}\nIt's also available via the **Download CV** button at the top of the page.`;

    case "projects":
      return [
        "Taimoor has successfully delivered 50+ projects. Here are some of his recent projects:",
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
        `• GitHub: ${CONTACT.github}`,
        `• Location: ${CONTACT.location}`,
        "",
        "Or use the contact form at the bottom of this page.",
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
    { id: "projects", label: "What projects has he worked on?" },
    { id: "project-1", label: `Tell me about ${PORTFOLIO_PROJECTS[0]?.name}` },
    { id: "availability", label: "Is he available for work?" },
    { id: "services", label: "What services does he offer?" },
    { id: "contact", label: "How can I contact him?" },
  ];
}
