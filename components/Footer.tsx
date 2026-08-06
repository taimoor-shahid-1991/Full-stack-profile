import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="gy-4 footer-inner">
          <div className="footer-brand text-center mb-5" data-aos="fade-up">
            <a href="#home" className="logo d-inline-flex align-items-center gap-2">
              <div className="logo-badge">
                <Image src="/images/logo.png" alt="Taimoor Shahid Logo" width={216} height={40} />
              </div>
            </a>
          </div>

          <div className="footer-social d-flex justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="100">
            <span>Follow Me</span>
            <ul className="social-list d-flex gap-2 list-unstyled">
              <li>
                <a href="#" className="twitter" aria-label="Twitter">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
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
                <a href="#" className="snapchat" aria-label="Snapchat">
                  <i className="fa-brands fa-snapchat"></i>
                </a>
              </li>
              <li>
                <a href="#" className="facebook" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f"></i>
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
