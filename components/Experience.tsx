export type ExperienceRole = {
  title: string;
  period: string;
  highlights: string[];
};

export const COMPANY = {
  name: "ArhamSoft IT Solutions (Pvt.) Ltd.",
  location: "Lahore, Pakistan",
  period: "Aug 2021 – Present",
};

export const EXPERIENCE: ExperienceRole[] = [
  {
    title: "Full Stack Developer",
    period: "Jan 2026 – Present",
    highlights: [
      "Deliver features end-to-end: PostgreSQL schemas with Prisma ORM, Node.js/Express REST APIs and the React/Next.js UI.",
      "Implement authentication and role-based authorization at API and UI level, so each role only sees and edits permitted data.",
      "Integrate payment gateways, auth providers and cloud APIs, handling failure cases so payment and sign-in flows stay reliable.",
    ],
  },
  {
    title: "Senior Frontend Developer",
    period: "Aug 2021 – Dec 2025",
    highlights: [
      "Built SaaS, EdTech and Web3 frontends in React.js, Next.js and TypeScript, including AssetsRack (25,000+ active accounts), Fobell and MetaMutoDAO.",
      "Designed reusable, typed components (data tables, forms, modals, filters) that replaced duplicated per-module UI.",
      "Centralised state and API calls in Redux Toolkit / RTK Query, replacing ad-hoc fetch logic and cutting duplicate network requests.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <div className="section-header text-center mx-auto" data-aos="fade-up">
          <p className="eyebrow section-eyebrow">Experience</p>
          <h2 className="section-title section-heading">Where I&apos;ve Worked</h2>
        </div>

        <div className="experience-card" data-aos="fade-up">
          <div className="experience-company">
            <div>
              <h3 className="experience-company-name">{COMPANY.name}</h3>
              <p className="experience-company-meta">
                {COMPANY.location} · {COMPANY.period}
              </p>
            </div>
            <span className="experience-badge">5+ years · Promoted to Full Stack</span>
          </div>

          <ol className="experience-timeline list-unstyled mb-0">
            {EXPERIENCE.map((role, i) => (
              <li className="experience-role" key={role.title} data-aos="fade-up" data-aos-delay={i * 100}>
                <span className="experience-dot" aria-hidden="true"></span>
                <div className="experience-role-head">
                  <h4 className="experience-role-title">{role.title}</h4>
                  <span className="experience-role-period">{role.period}</span>
                </div>
                <ul className="experience-highlights">
                  {role.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="experience-actions">
            <a href="/cv/Taimoor_Shahid.pdf" className="btn btn-outline-light" download="Taimoor_Shahid.pdf">
              Download Full CV <i className="fa-solid fa-download" aria-hidden="true"></i>
            </a>
            <a href="#projects" className="experience-link">
              See the projects <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
