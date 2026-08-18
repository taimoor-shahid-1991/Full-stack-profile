"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const particlesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !particlesRef.current) return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;

    script.onload = () => {
      const particlesJS = (window as Window & { particlesJS?: (id: string, config: object) => void }).particlesJS;

      if (!particlesJS) return;

      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 1200 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 0.45,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
          },
          size: { value: 2.5, random: true },
          line_linked: {
            enable: true,
            distance: 140,
            color: "#ffffff",
            opacity: 0.18,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      });
    };

    document.body.appendChild(script);

    return () => {
      const canvas = particlesRef.current?.querySelector("canvas");
      if (canvas) {
        canvas.remove();
      }
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div ref={particlesRef} id="particles-js" className="particles-bg" />
      <div className="container hero-inner">
        <div className="row align-items-center gy-5">
          <div className="col-lg-7 hero-content" data-aos="fade-right" data-aos-duration="900">
            <h1 className="hero-title">
              TAIMOOR
              <br />
              <span className="text-accent">SHAHID.</span>
            </h1>
            <h2 className="hero-subtitle">Full Stack Developer</h2>
            <p className="hero-desc">
              I build modern, responsive and high-performance web & mobile applications from idea to deployment.
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
            <Image
              src="/images/profile.webp"
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
