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
          <div className="skill-card skill-card--wide" data-aos="fade-up" data-aos-delay="0">
            <div className="skill-card-inner">
              <p className="skill-eyebrow">Frontend Technologies</p>
              <h3 className="skill-heading">
                React.js, Next.js, Vue.js, Angular.js, React Native, JavaScript (ES6+), HTML5, CSS, Bootstrap,
                GSAP Animations, jQuery
              </h3>
              <span className="skill-divider"></span>
            </div>
          </div>

          <div className="skill-card" data-aos="fade-up" data-aos-delay="80">
            <div className="skill-card-inner">
              <p className="skill-eyebrow">Backend Technologies</p>
              <h3 className="skill-heading">Node.js, Express.js, REST APIs</h3>
              <span className="skill-divider"></span>
            </div>
          </div>

          <div className="skill-card" data-aos="fade-up" data-aos-delay="160">
            <div className="skill-card-inner">
              <p className="skill-eyebrow">Databases &amp; ORM</p>
              <h3 className="skill-heading">PostgreSQL, MongoDB, Prisma ORM, TypeScript</h3>
              <span className="skill-divider"></span>
            </div>
          </div>

          <div className="skill-card" data-aos="fade-up" data-aos-delay="0">
            <div className="skill-card-inner">
              <p className="skill-eyebrow">State Management</p>
              <h3 className="skill-heading">Redux, Redux Toolkit, RTK Query, Vuex</h3>
              <span className="skill-divider"></span>
            </div>
          </div>

          <div className="skill-card skill-card--triple" data-aos="fade-up" data-aos-delay="80">
            <div className="skill-card-inner skill-card-inner--split">
              <div className="skill-split-col">
                <p className="skill-mini-label">CMS Platforms</p>
                <p className="skill-mini-value">WordPress / Shopify / Webflow / Bubble.io</p>
              </div>
              <div className="skill-split-col">
                <p className="skill-mini-label">Version Control &amp; Tools</p>
                <p className="skill-mini-value">Git / GitHub / VS Code / Postman / npm / Vercel</p>
              </div>
            </div>
          </div>

          <div className="skill-card skill-card--stat" data-aos="fade-up" data-aos-delay="160">
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
