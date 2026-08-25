export type Project = {
  name: string;
  image: string;
  type: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "AssetsRack",
    image: "/images/assetsrack.webp",
    type: "Asset Management / SaaS Platform",
    description:
      "A modern asset-management platform helping organizations manage assets, users, reservations, reporting, and operational workflows through a clean SaaS-style interface.",
    stack: ["Next.js", "NextAuth.js", "Next.js Backend"],
  },
  {
    name: "Cloudarithm",
    image: "/images/cloudarithm.webp",
    type: "Digital Services / Software Development Agency",
    description:
      "A professional digital-services website presenting software development capabilities, engagement models, custom solutions, client success stories, and conversion-focused calls to action.",
    stack: ["Next.js", "NextAuth.js", "Next.js Backend"],
  },
  {
    name: "MetaMutoDAO",
    image: "/images/metamuto-dao.webp",
    type: "Decentralized / DAO Platform",
    description:
      "A dark, immersive decentralized platform focused on community-driven governance, proposals, voting, crowdfunding, and autonomous ecosystem participation.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    name: "Marilyn Center",
    image: "/images/marilyn-center.webp",
    stack: ["WordPress", "PHP", "Elementor", "MySQL", "CSS3", "JavaScript"],
    type: "Healthcare & Behavioral Health",
    description: "A comprehensive healthcare and addiction recovery platform providing structured information on outpatient programs, patient intake forms, FAQ accordions, locations, and educational resources."
  },
  {
    name: "RESolution",
    image: "/images/resolution.webp",
    stack: ["Bubble.io", "No-Code", "API Connector", "Custom Workflows", "CSS"],
    type: "Real Estate Matchmaking",
    description: "A no-code real estate matching web application enabling buyers, sellers, landlords, and tenants to connect via custom questionnaire matching, background checks, and dynamic property search."
  },
  {
    name: "OzMovies",
    image: "/images/ozmovies.webp",
    stack: ["Next.js", "Typescript", "Tailwind css", "MongoDB", "Rest API", "Serverless Functions"],
    type: "Streaming / Media Application",
    description: "Created a media-focused application designed around content discovery, user experience, and smooth application interactions for entertainment browsing."
  },
  {
    name: "ESIM Management System",
    image: "/images/esim.webp",
    stack: ["React.js", "RTK Query", "Tailwind css", "MongoDB", "Rest API"],
    type: "Travel / Telecom Management System",
    description: "Built a complete ESIM management platform for handling product flows, user operations, and operational processes in a telecom-oriented business workflow."
  },
  {
    name: "FLO.ink",
    image: "/images/flo.ink.webp",
    stack: ["Next.js", "Typescript", "Tailwind css", "MongoDB", "Rest API", "Serverless Functions"],
    type: "Short-form Video / Creator Platform",
    description: "Developed and maintained a creator-focused platform centered on short-form content, user interactions, and streamlined social engagement workflows."
  }
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
            <div className="project-item" data-aos="fade-up" data-aos-delay={i * 80} key={project.name}>
              <article className="project-card">
                <div className="project-card-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image} alt={`${project.name} project preview`} />
                </div>
                <div className="project-card-body">
                  <p className="project-card-type">{project.type}</p>
                  <h3 className="project-card-title">{project.name}</h3>
                  <p className="project-card-description">{project.description}</p>

                  <ul className="project-card-stack list-unstyled mb-0">
                    {project.stack.map((tech) => (
                      <li key={tech}>
                        <span className="project-stack-badge">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
