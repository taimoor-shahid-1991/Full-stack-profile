import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-7 hero-content" data-aos="fade-right" data-aos-duration="900">
            <h1 className="hero-title">
              TAIMOOR
              <br />
              <span className="text-accent">SHAHID.</span>
            </h1>
            <h2 className="hero-subtitle">Full Stack Developer</h2>
            <p className="hero-desc">
              I build modern, responsive and high-performance web applications from idea to deployment.
            </p>

            <div className="hero-actions d-flex flex-wrap gap-3">
              <a href="#projects" className="btn btn-primary btn-lg">
                View My Work
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
              <a
                href="/cv/Taimoor_Shahid.pdf"
                className="btn btn-outline-light btn-lg cv-download-btn"
                download="Taimoor_Shahid.pdf"
              >
                Download CV
                <i className="fa-solid fa-download" aria-hidden="true"></i>
              </a>
            </div>

            <div className="hero-social d-flex align-items-center gap-3">
              <span className="find-me">Find Me On</span>
              <ul className="social-list d-flex gap-3 list-unstyled mb-0">
                <li>
                  <a
                    href="https://www.linkedin.com/in/taimoor-shahid-713277234"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin"
                    aria-label="LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/taimoor-shahid-1991"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github"
                    aria-label="GitHub"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-5 hero-image" data-aos="fade-left" data-aos-duration="900" data-aos-delay="150">
            <span className="hero-shape" aria-hidden="true"></span>
            <span className="hero-orbit hero-orbit-1" aria-hidden="true"></span>
            <span className="hero-orbit hero-orbit-2" aria-hidden="true"></span>
            <span className="hero-dot" aria-hidden="true"></span>
            <Image
              src="/images/profile.png"
              className="img-fluid hero-photo"
              alt="Taimoor Shahid portrait"
              width={460}
              height={536}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
