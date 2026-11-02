// Shared by the contact form and /api/contact so both validate against the same values.

export const INQUIRY_TYPES = {
  role: "Full-time / contract role",
  freelance: "Freelance project",
  other: "Something else",
} as const;

export type InquiryKey = keyof typeof INQUIRY_TYPES;

export const SERVICE_OPTIONS = [
  "SaaS / Web Application",
  "Frontend Development",
  "APIs & Backend",
  "Performance & SEO",
  "Mobile App (React Native)",
  "WordPress / Shopify / Webflow / Bubble.io",
  "Other",
];

export const BUDGET_OPTIONS = ["Under $500", "$500 – $2,000", "$2,000 – $5,000", "$5,000+", "Not sure yet"];

export function isInquiryKey(value: string): value is InquiryKey {
  return Object.prototype.hasOwnProperty.call(INQUIRY_TYPES, value);
}

export const CONTACT_PRESET_EVENT = "contact:preset";

// Lets buttons elsewhere on the page (e.g. "Hire Me for a Project") pre-select
// the inquiry type in the contact form before scrolling to it.
export function presetContactInquiry(inquiry: InquiryKey) {
  window.dispatchEvent(new CustomEvent<InquiryKey>(CONTACT_PRESET_EVENT, { detail: inquiry }));
}
