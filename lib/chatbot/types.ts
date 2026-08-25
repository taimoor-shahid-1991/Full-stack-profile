import type { Project } from "@/components/Projects";

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
  | "thanks"
  | "fallback";

export type IntentMatch = {
  intent: AIIntent;
  score: number;
  project?: Project;
};

export type SuggestedQuestion = {
  id: string;
  label: string;
};
