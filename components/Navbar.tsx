"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id], nav[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function setActiveLink() {
      const scrollPos = window.scrollY + 120;
      sections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          const id = el.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    }

    window.addEventListener("scroll", setActiveLink);
    return () => window.removeEventListener("scroll", setActiveLink);
  }, []);

  async function handleNavLinkClick() {
    if (!navRef.current) return;
    const { Collapse } = await import("bootstrap");
    Collapse.getOrCreateInstance(navRef.current, { toggle: false }).hide();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark header" id="header">
      <div className="container-fluid header-inner">
        <a href="#home" className="navbar-brand logo">
          <div className="logo-badge">
            <Image src="/images/logo.png" alt="Taimoor Shahid Logo" width={216} height={40} />
          </div>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          id="navToggle"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav" ref={navRef}>
          <ul className="navbar-nav mx-lg-auto mb-3 mb-lg-0 nav-list">
            <li className="nav-item">
              <a href="#about" className="nav-link" onClick={handleNavLinkClick}>About</a>
            </li>
            <li className="nav-item">
              <a href="#skills" className="nav-link" onClick={handleNavLinkClick}>Skills</a>
            </li>
            <li className="nav-item">
              <a href="#projects" className="nav-link" onClick={handleNavLinkClick}>Projects</a>
            </li>
            <li className="nav-item">
              <a href="#services" className="nav-link" onClick={handleNavLinkClick}>Services</a>
            </li>
          </ul>
          <a href="#contact" className="btn btn-outline-light btn-connect" onClick={handleNavLinkClick}>
            Let&apos;s Connect
          </a>
        </div>
      </div>
    </nav>
  );
}
