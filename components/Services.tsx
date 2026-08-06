const SERVICES = [
  { icon: "💻", title: "Web Development", text: "Building fast, responsive and scalable web applications." },
  { icon: "📱", title: "Mobile App Development", text: "Building cross-platform mobile applications with React Native." },
  { icon: "🎯", title: "Frontend Development", text: "Crafting pixel-perfect interfaces with modern technologies." },
  { icon: "⚙️", title: "Backend Development", text: "Building secure and robust server-side applications and APIs." },
  { icon: "📦", title: "CMS Development", text: "Custom WordPress and no-code solutions for your business." },
  { icon: "☁️", title: "Deployment", text: "Deploying applications with best performance and security." },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header text-center mx-auto services-header" data-aos="fade-up">
          <p className="eyebrow section-eyebrow">What I Do</p>
          <h2 className="section-title section-heading">Services I Provide</h2>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-content-center g-4">
          {SERVICES.map((service, i) => (
            <div className="col" data-aos="fade-up" data-aos-delay={i * 80} key={service.title}>
              <div className="card service-card h-100 text-center">
                <div className="card-body">
                  <div className="service-icon mx-auto">{service.icon}</div>
                  <h3 className="h6 card-title">{service.title}</h3>
                  <p className="card-text">{service.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
