import type { Project } from "@/components/Projects";
import type { SKILL_LOOKUP } from "@/lib/chatbot/knowledge";

export type ChatMessageRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  content: string;
};

export type AIIntent =
  | "greeting"
  | "about"
  | "experience"
  | "techStack"
  | "frontend"
  | "backend"
  | "nextjs"
  | "react"
  | "database"
  | "stateManagement"
  | "cms"
  | "tools"
  | "services"
  | "projects"
  | "projectDetail"
  | "education"
  | "strengths"
  | "contact"
  | "location"
  | "mobile"
  | "availability"
  | "languages"
  | "skill"
  | "unknownSkill"
  | "thanks"
  | "fallback";

export type IntentMatch = {
  intent: AIIntent;
  score: number;
  project?: Project;
  skill?: (typeof SKILL_LOOKUP)[number];
  term?: string;
};

export type SuggestedQuestion = {
  id: string;
  label: string;
};
