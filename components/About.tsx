import Image from "next/image";

export const STATS = [
  { icon: "🚀", label: "Senior Frontend Developer", delay: 0 },
  { icon: "💼", label: "Full Stack Developer", delay: 100 },
  { icon: "⏱️", label: "5+ Years Experience", delay: 200 },
  { icon: "✅", label: "50+ Projects Completed", delay: 300 },
  { icon: "⭐", label: "Committed to Quality", delay: 400 },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-5 about-image" data-aos="fade-right" data-aos-duration="900">
            <div className="about-image-frame">
              <Image src="/images/about-me.webp" className="img-fluid" alt="Taimoor Shahid working" width={600} height={720} />
              <span className="about-image-vignette" aria-hidden="true"></span>
            </div>
            <span className="frame-corner corner-tl" aria-hidden="true"></span>
            <span className="frame-corner corner-br" aria-hidden="true"></span>
          </div>
          <div className="col-lg-7 about-content" data-aos="fade-left" data-aos-duration="900" data-aos-delay="150">
            <p className="eyebrow">About Me</p>
            <h2 className="section-title">
              Building digital solutions with <span className="text-accent">clean code</span> and creative thinking.
            </h2>
            <p className="about-text">
              I&apos;m a Senior Frontend &amp; Full-Stack Developer with 5+ years of experience building scalable,
              high-performance web applications. My core stack is React, Next.js and TypeScript on the frontend,
              with Node.js, PostgreSQL and MongoDB on the backend.
            </p>
            <p className="about-text">
              I enjoy turning complex problems into simple, intuitive solutions, from reusable component
              architecture to well-structured APIs. My goal is to write clean, maintainable code that ships
              products people actually use.
            </p>

            <div className="row g-3 about-stats">
              {STATS.map((stat, i) => (
                <div className={i === STATS.length - 1 && STATS.length % 2 ? "col-12" : "col-6"} data-aos="zoom-in" data-aos-delay={stat.delay} key={stat.label}>
                  <div className="card stat-item h-100">
                    <div className="card-body d-flex align-items-center gap-2">
                      <span className="stat-icon">{stat.icon}</span>
                      <span>{stat.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
