export type Project = {
  name: string;
  image: string;
  type: string;
  role: string;
  description: string;
  contributions: string[];
  stack: string[];
  challenge: string;
  solution: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Fobell",
    image: "/images/fobell.webp",
    type: "EdTech / AI-Powered Exam Preparation",
    role: "Full-Stack Developer",
    description:
      "An AI-powered exam preparation platform bringing verified teachers, exam resources, worksheets, live classes, and scholarships together for Cambridge IGCSE, A Level, and local board students.",
    contributions: [
      "Built the student-facing Next.js + TypeScript app: teacher discovery, resource & worksheet library, live classes and scholarship pages.",
      "Designed Node.js APIs and MongoDB schemas for teachers, boards, subjects, resources and enrolments.",
      "Integrated the AI-assisted study features into the UI, including loading, streaming and error states.",
    ],
    challenge:
      "Thousands of resources spread across multiple exam boards, levels and subjects made filtering slow and the pages heavy, while public pages still needed to rank well in search.",
    solution:
      "Modelled a board → subject → resource hierarchy with indexed MongoDB queries, moved filtering to paginated server-side APIs, and rendered public pages on the server so they load fast and stay SEO-friendly.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "AI Integration"],
  },
  {
    name: "AssetsRack",
    image: "/images/assetsrack.webp",
    type: "Asset Management / SaaS Platform",
    role: "Frontend Developer",
    description:
      "A modern asset-management platform helping organizations manage assets, users, reservations, reporting, and operational workflows through a clean SaaS-style interface.",
    contributions: [
      "Developed responsive dashboard modules for assets, users, reservations and reports.",
      "Built a set of reusable, typed React components (data tables, forms, modals, filters) shared across every module.",
      "Integrated REST APIs with Redux Toolkit and RTK Query, and wired up NextAuth.js-based authentication.",
    ],
    challenge:
      "Data-heavy screens refetched the same lists repeatedly, and each module had its own copy of very similar table and form UI, which made changes slow and the app feel sluggish.",
    solution:
      "Moved data fetching to RTK Query with cache tags so a mutation only invalidates the lists it affects, and consolidated duplicated UI into shared components. That cut network calls and made new modules much quicker to build.",
    stack: ["Next.js", "TypeScript", "Redux Toolkit", "RTK Query", "NextAuth.js", "Tailwind CSS", "MongoDB"],
  },
  {
    name: "Cloudarithm",
    image: "/images/cloudarithm.webp",
    type: "Digital Services / Software Development Agency",
    role: "Full-Stack Developer",
    description:
      "A professional digital-services website presenting software development capabilities, engagement models, custom solutions, client success stories, and conversion-focused calls to action.",
    contributions: [
      "Built the site in Next.js + TypeScript with reusable section components for services, engagement models and case studies.",
      "Implemented lead-capture forms backed by Next.js API routes.",
    ],
    challenge:
      "Many pages shared similar sections with different content, and the site had to stay fast and rank well since it is the agency's main lead source.",
    solution:
      "Built a library of data-driven section components and statically generated the pages with optimized images, so new pages are assembled from existing blocks and stay fast and SEO-friendly.",
    stack: ["Next.js", "TypeScript", "Next.js API Routes", "Tailwind CSS", "REST API"],
  },
  {
    name: "MetaMutoDAO",
    image: "/images/metamuto-dao.webp",
    type: "Decentralized / DAO Platform",
    role: "Frontend Developer",
    description:
      "A dark, immersive decentralized platform focused on community-driven governance, proposals, voting, crowdfunding, and autonomous ecosystem participation.",
    contributions: [
      "Built the governance UI for proposals, voting and crowdfunding flows.",
      "Integrated wallet connection and on-chain interactions with Web3.js, with app state in Redux Toolkit.",
    ],
    challenge:
      "Blockchain transactions are slow and can fail, so users were unsure whether a vote or contribution had gone through, and wrong-network wallets caused silent errors.",
    solution:
      "Tracked every transaction as an explicit pending / confirmed / failed state in Redux Toolkit, added wallet and network detection with prompts to switch, and showed clear progress feedback until confirmation.",
    stack: ["React.js", "Redux Toolkit", "Web3.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    name: "Marilyn Center",
    image: "/images/marilyn-center.webp",
    type: "Healthcare & Behavioral Health",
    role: "WordPress Developer",
    description:
      "A comprehensive healthcare and addiction recovery platform providing structured information on outpatient programs, patient intake forms, FAQ accordions, locations, and educational resources.",
    contributions: [
      "Built custom Elementor page templates for programs, locations and educational resources.",
      "Set up patient intake forms and FAQ sections, with responsive styling and custom CSS/JS.",
    ],
    challenge:
      "A large amount of content (programs, locations, FAQs) had to stay visually consistent and easy for non-technical staff to update, and intake forms had to work smoothly on mobile.",
    solution:
      "Created reusable Elementor templates and global styles so staff edit content instead of layouts, and built mobile-first intake forms with validation, plus image and caching optimizations for speed.",
    stack: ["WordPress", "PHP", "Elementor", "MySQL", "CSS3", "JavaScript"],
  },
  {
    name: "RESolution",
    image: "/images/resolution.webp",
    type: "Real Estate Matchmaking",
    role: "Bubble.io Developer",
    description:
      "A no-code real estate matching web application enabling buyers, sellers, landlords, and tenants to connect via custom questionnaire matching, background checks, and dynamic property search.",
    contributions: [
      "Built the questionnaire-based matching logic with custom Bubble workflows.",
      "Connected background-check and property data services through the API Connector.",
    ],
    challenge:
      "Matching buyers, sellers, landlords and tenants across many questionnaire answers within Bubble's no-code limits, without searches becoming slow.",
    solution:
      "Structured questionnaire answers into dedicated data types with match criteria, ran the matching in backend workflows, and constrained searches to indexed fields so results load quickly.",
    stack: ["Bubble.io", "API Connector", "Custom Workflows", "Responsive Design"],
  },
  {
    name: "OzMovies",
    image: "/images/ozmovies.webp",
    type: "Streaming / Media Application",
    role: "Frontend Developer",
    description:
      "A media application designed around content discovery, smooth interactions and an easy browsing experience for entertainment content.",
    contributions: [
      "Built the content discovery, search and detail pages in Next.js + TypeScript.",
      "Integrated the content REST APIs and serverless functions for data loading.",
    ],
    challenge:
      "An image-heavy catalog made browsing pages slow, and live search fired a request on every keystroke.",
    solution:
      "Lazy-loaded optimized poster images, paginated the catalog, and added debounced search with cached results, so browsing stays smooth with far fewer API calls.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "REST API", "Serverless Functions"],
  },
  {
    name: "ESIM Management System",
    image: "/images/esim.webp",
    type: "Travel / Telecom Management System",
    role: "Frontend Developer",
    description:
      "An eSIM management platform for handling product flows, user operations and day-to-day operational processes in a telecom business.",
    contributions: [
      "Built the product, order and user-management screens in React.js.",
      "Handled API data fetching and caching with Redux Toolkit and RTK Query.",
    ],
    challenge:
      "The purchase and activation flow had many states (plan, payment, activation) across different user roles, and screens easily showed stale order or eSIM status.",
    solution:
      "Modelled the flow as explicit steps in Redux Toolkit, used RTK Query cache invalidation after each mutation so orders and eSIM statuses always show the latest data, and added role-based route guards.",
    stack: ["React.js", "Redux Toolkit", "RTK Query", "Tailwind CSS", "MongoDB", "REST API"],
  },
  {
    name: "FLO.ink",
    image: "/images/flo.ink.webp",
    type: "Short-form Video / Creator Platform",
    role: "Frontend Developer",
    description:
      "A creator-focused platform centered on short-form content, user interactions, and streamlined social engagement.",
    contributions: [
      "Developed and maintained the creator and feed interfaces, plus engagement features such as likes, comments and sharing.",
      "Integrated REST APIs and serverless functions behind the feed.",
    ],
    challenge:
      "A video-heavy feed needed to scroll smoothly on mobile, and likes and comments had to feel instant despite network latency.",
    solution:
      "Used Intersection Observer to load and play only visible videos, paginated the feed, and applied optimistic UI updates for likes and comments that roll back if the request fails.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "REST API", "Serverless Functions"],
  },
];

function ProjectLinks({ project }: { project: Project }) {
  if (!project.liveUrl && !project.githubUrl) {
    return (
      <p className="project-card-private">
        <i className="fa-solid fa-lock" aria-hidden="true"></i> Client project · source code is private
      </p>
    );
  }

  return (
    <div className="project-card-actions">
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Live Site <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
          <i className="fa-brands fa-github" aria-hidden="true"></i> Source Code
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header text-center mx-auto" data-aos="fade-up">
          <p className="eyebrow section-eyebrow">Recent Work</p>
          <h2 className="section-title section-heading">Some of My Recent Work</h2>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <div
              className="project-item"
              data-aos="fade-up"
              data-aos-delay={(i % 2) * 80}
              key={project.name}
            >
              <article className="project-card" tabIndex={0} aria-label={`${project.name} project`}>
                <div className="project-card-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image} alt={`${project.name} project preview`} />
                </div>
                <div className="project-card-body">
                  <p className="project-card-type">{project.type}</p>
                  <h3 className="project-card-title">{project.name}</h3>
                  <p className="project-card-role">
                    <span>My Role:</span> {project.role}
                  </p>
                  <p className="project-card-description">{project.description}</p>

                  <p className="project-card-label">What I Built</p>
                  <ul className="project-card-contributions">
                    {project.contributions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <ul className="project-card-stack list-unstyled">
                    {project.stack.map((tech) => (
                      <li key={tech}>
                        <span className="project-stack-badge">{tech}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="project-card-hint">
                    <i className="fa-solid fa-lightbulb" aria-hidden="true"></i>
                    <span>
                      <span className="hint-hover">Hover</span>
                      <span className="hint-touch">Tap</span> to see the challenge &amp; how I solved it
                    </span>
                  </p>
                </div>

                <div className="project-card-overlay">
                  <p className="project-card-type">{project.type}</p>
                  <h3 className="project-card-title">{project.name}</h3>

                  <div className="project-overlay-block">
                    <p className="project-card-label">
                      <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> Challenge
                    </p>
                    <p>{project.challenge}</p>
                  </div>

                  <div className="project-overlay-block">
                    <p className="project-card-label">
                      <i className="fa-solid fa-circle-check" aria-hidden="true"></i> How I Solved It
                    </p>
                    <p>{project.solution}</p>
                  </div>

                  <ProjectLinks project={project} />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
