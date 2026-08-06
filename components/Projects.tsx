const PROJECTS = [
  { image: "/images/project-1.svg", alt: "E-Commerce Platform", title: "E-Commerce Platform", description: "Next.js · Stripe · PostgreSQL", year: "2026" },
  { image: "/images/project-2.svg", alt: "Dashboard Application", title: "Dashboard Application", description: "React · RTK Query · Tailwind CSS", year: "2025" },
  { image: "/images/project-3.svg", alt: "Portfolio Website", title: "Portfolio Website", description: "Next.js · GSAP · Tailwind CSS", year: "2025" },
  { image: "/images/project-4.svg", alt: "WordPress Website", title: "WordPress Website", description: "WordPress · ACF · Elementor", year: "2024" },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header text-center mx-auto" data-aos="fade-up">
          <p className="eyebrow section-eyebrow">Recent Work</p>
          <h2 className="section-title section-heading">Some Of My Recent Work</h2>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <div className="project-item" data-aos="fade-up" data-aos-delay={i * 80} key={project.title}>
              <article className="project-card">
                <div className="project-card-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image} alt={project.alt} />
                </div>
                <div className="project-card-meta">
                  <div>
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-description">{project.description}</p>
                  </div>
                  <span className="project-card-year">{project.year}</span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
