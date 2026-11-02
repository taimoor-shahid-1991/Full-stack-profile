import type { ReactNode } from "react";

import {
  BackendDevIcon,
  CmsDevIcon,
  DeploymentIcon,
  FrontendDevIcon,
  MobileDevIcon,
  WebDevIcon,
} from "@/components/ServiceIcons";
import HireMeLink from "@/components/HireMeLink";

export type Service = {
  id: string;
  icon: ReactNode;
  title: string;
  text: string;
};

export const SERVICES: Service[] = [
  {
    id: "01",
    icon: <WebDevIcon />,
    title: "SaaS & Web Applications",
    text: "End-to-end apps with Next.js, Node.js and PostgreSQL or MongoDB, from database design to a deployed, production-ready UI.",
  },
  {
    id: "02",
    icon: <FrontendDevIcon />,
    title: "Frontend for Your Product",
    text: "Join your team to ship features, turn Figma designs into pixel-perfect React UIs, and clean up slow or hard-to-maintain frontends.",
  },
  {
    id: "03",
    icon: <BackendDevIcon />,
    title: "APIs & Backend",
    text: "Secure REST APIs with authentication, role-based access and integrations such as payment gateways and cloud services.",
  },
  {
    id: "04",
    icon: <DeploymentIcon />,
    title: "Performance & SEO",
    text: "Speed up slow pages with Next.js server rendering, smart caching and image/bundle optimisation, then deploy on Vercel.",
  },
  {
    id: "05",
    icon: <MobileDevIcon />,
    title: "Mobile Apps",
    text: "Cross-platform iOS and Android apps with React Native that share logic with your web app.",
  },
  {
    id: "06",
    icon: <CmsDevIcon />,
    title: "Business Websites",
    text: "WordPress, Shopify, Webflow and Bubble.io sites your team can update without needing a developer.",
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header text-center mx-auto services-header" data-aos="fade-up">
          <p className="eyebrow section-eyebrow">Services</p>
          <h2 className="section-title section-heading">How I Can Help</h2>
          <p className="services-intro">
            Alongside my full-time role, I take on selected freelance projects for startups and businesses.
          </p>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-content-center g-4">
          {SERVICES.map((service, i) => (
            <div className="col" data-aos="fade-up" data-aos-delay={i * 80} key={service.title}>
              <div className="card service-card h-100">
                <div className="card-body">
                  <div className="service-card-top">
                    <div className="service-icon">{service.icon}</div>
                    <span className="service-index">{service.id}</span>
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-text">{service.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="services-cta text-center" data-aos="fade-up">
          <p>Have a project in mind?</p>
          <HireMeLink className="btn btn-primary btn-lg">
            Let&apos;s Discuss Your Project <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </HireMeLink>
        </div>
      </div>
    </section>
  );
}
