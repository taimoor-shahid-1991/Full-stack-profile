const MARQUEE_ITEMS = [
  "React.js",
  "Next.js",
  "React Native",
  "JavaScript",
  "GSAP Animations",
  "jQuery",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "MongoDB",
  "Prisma ORM",
  "TypeScript",
  "Redux Toolkit",
  "RTK Query",
  "WordPress",
  "Shopify",
  "Webflow",
  "Bubble.io",
  "Git",
  "GitHub",
  "VS Code",
  "Postman",
  "npm",
  "Vercel",
  "CSS",
  "Bootstrap",
];

function MarqueeTrack() {
  return (
    <div className="skills-marquee-track">
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
    </div>
  );
}

export default function SkillsMarquee() {
  return (
    <div className="skills-marquee" aria-hidden="true">
      <MarqueeTrack />
      <MarqueeTrack />
    </div>
  );
}
