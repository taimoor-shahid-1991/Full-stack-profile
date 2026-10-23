const CORE_STACK = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript (ES6+)",
  "Node.js",
  "Express.js",
  "Redux Toolkit",
  "RTK Query",
  "Tailwind CSS",
  "PostgreSQL",
  "Prisma ORM",
  "MongoDB",
];

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <span className="skills-bg-glow" aria-hidden="true"></span>
      <span className="skills-orb skills-orb-1" aria-hidden="true"></span>
      <span className="skills-orb skills-orb-2" aria-hidden="true"></span>
      <div className="container">
        <div className="section-header text-center mx-auto" data-aos="fade-up">
          <p className="eyebrow section-eyebrow">My Skills</p>
          <h2 className="section-title section-heading">Technologies I Work With</h2>
        </div>

        <div className="skills-grid">
          <div className="skill-card skill-card--core" data-aos="fade-up" data-aos-delay="0">
            <div className="skill-card-inner">
              <p className="skill-eyebrow">Core Stack · Daily Drivers</p>
              <h3 className="skill-heading">
                React, Next.js &amp; TypeScript on the frontend, Node.js with PostgreSQL / MongoDB on the backend.
              </h3>
              <ul className="skill-core-list list-unstyled mb-0">
                {CORE_STACK.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="skill-card" data-aos="fade-up" data-aos-delay="80">
            <div className="skill-card-inner">
              <p className="skill-eyebrow">Frontend</p>
              <h3 className="skill-heading">React.js, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3 / Sass</h3>
              <span className="skill-divider"></span>
            </div>
          </div>

          <div className="skill-card" data-aos="fade-up" data-aos-delay="160">
            <div className="skill-card-inner">
              <p className="skill-eyebrow">Backend &amp; APIs</p>
              <h3 className="skill-heading">Node.js, Express.js, REST API Design &amp; Integration</h3>
              <span className="skill-divider"></span>
            </div>
          </div>

          <div className="skill-card" data-aos="fade-up" data-aos-delay="0">
            <div className="skill-card-inner">
              <p className="skill-eyebrow">Databases &amp; ORM</p>
              <h3 className="skill-heading">PostgreSQL, MongoDB, Prisma ORM</h3>
              <span className="skill-divider"></span>
            </div>
          </div>

          <div className="skill-card" data-aos="fade-up" data-aos-delay="80">
            <div className="skill-card-inner">
              <p className="skill-eyebrow">State Management</p>
              <h3 className="skill-heading">Redux Toolkit, RTK Query, Context API</h3>
              <span className="skill-divider"></span>
            </div>
          </div>

          <div className="skill-card skill-card--triple" data-aos="fade-up" data-aos-delay="0">
            <div className="skill-card-inner skill-card-inner--split">
              <div className="skill-split-col">
                <p className="skill-mini-label">Also Worked With</p>
                <p className="skill-mini-value skill-mini-value--muted">
                  Vue.js / Angular.js / React Native / Bootstrap / jQuery / GSAP
                </p>
              </div>
              <div className="skill-split-col">
                <p className="skill-mini-label">CMS &amp; No-Code</p>
                <p className="skill-mini-value skill-mini-value--muted">WordPress / Shopify / Webflow / Bubble.io</p>
              </div>
              <div className="skill-split-col">
                <p className="skill-mini-label">Tools &amp; Practices</p>
                <p className="skill-mini-value skill-mini-value--muted">
                  Git / GitHub / Postman / Vercel / Agile &amp; Scrum
                </p>
              </div>
            </div>
          </div>

          <div className="skill-card skill-card--stat" data-aos="fade-up" data-aos-delay="80">
            <div className="skill-card-inner">
              <p className="skill-stat-number">50+</p>
              <p className="skill-mini-label">Projects Shipped</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
