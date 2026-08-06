"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const particlesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !particlesRef.current) return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;

    script.onload = () => {
      const particlesJS = (window as Window & { particlesJS?: (id: string, config: object) => void }).particlesJS;

      if (!particlesJS) return;

      particlesJS("particles-js-not-found", {
        particles: {
          number: { value: 60, density: { enable: true, value_area: 1200 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 0.4,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
          },
          size: { value: 2.2, random: true },
          line_linked: {
            enable: true,
            distance: 130,
            color: "#ffffff",
            opacity: 0.16,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
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
            repulse: { distance: 90, duration: 0.4 },
            push: { particles_nb: 3 },
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
    <main className="not-found-hero">
      <div ref={particlesRef} id="particles-js-not-found" className="particles-bg" />
      <div className="container hero-inner">
        <div className="row justify-content-center">
          <div className="col-lg-8 hero-content text-center">
            <p className="eyebrow section-eyebrow">404 — Page Not Found</p>
            <h1 className="hero-title">
              Oops! The page you are looking for does not exist.
            </h1>
            <p className="hero-desc">
              The link may be broken, or the page may have been moved. Let’s get you back on track.
            </p>
            <div className="hero-actions d-flex flex-wrap gap-3 justify-content-center not-found-actions">
              <Link href="/" className="btn btn-primary btn-lg">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
