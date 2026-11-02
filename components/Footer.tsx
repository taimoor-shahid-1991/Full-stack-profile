import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="gy-4 footer-inner">
          <div className="footer-brand text-center mb-5" data-aos="fade-up">
            <a href="#home" className="logo d-inline-flex align-items-center gap-2">
              <div className="logo-badge">
                <Image src="/images/logo.webp" alt="Taimoor Shahid Logo" width={216} height={40} />
              </div>
            </a>
          </div>

          <div className="footer-social d-flex justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="100">
            <span>Connect</span>
            <ul className="social-list d-flex gap-2 list-unstyled">
              <li>
                <a
                  href="https://www.linkedin.com/in/taimoor-shahid-713277234"
                  className="linkedin"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/taimoor-shahid-1991"
                  className="github"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-github" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  href="mailto:taymoor.shahid.ts@gmail.com"
                  className="email"
                  aria-label="Email"
                >
                  <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923238820858"
                  className="whatsapp"
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Taimoor Shahid. All rights reserved.</p>
      </div>
    </footer>
  );
}
