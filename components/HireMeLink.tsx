"use client";

import type { ReactNode } from "react";

import { presetContactInquiry } from "@/lib/contact-options";

type Props = {
  className?: string;
  children: ReactNode;
};

// Scrolls to the contact form with "Freelance project" already selected.
export default function HireMeLink({ className, children }: Props) {
  return (
    <a href="#contact" className={className} onClick={() => presetContactInquiry("freelance")}>
      {children}
    </a>
  );
}
