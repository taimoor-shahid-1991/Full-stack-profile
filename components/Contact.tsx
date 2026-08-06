import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="row gy-5 contact-inner">
          <div className="col-lg-5 contact-info" data-aos="fade-right" data-aos-duration="900">
            <p className="eyebrow section-eyebrow">Get In Touch</p>
            <h2 className="section-title section-heading">Let&apos;s Talk About Your Project</h2>
            <p className="contact-desc">
              Have an idea in mind or just want to say hello? Fill out the form and I&apos;ll get back to you as soon as possible.
            </p>

            <ul className="contact-list list-unstyled">
              <li className="contact-item">
                <span className="contact-icon">
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                </span>
                <div>
                  <span className="contact-label">Phone</span>
                  <a className="contact-value" href="tel:+923238820858">+92 323 8820858</a>
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                </span>
                <div>
                  <span className="contact-label">Whatsapp</span>
                  <a className="contact-value" href="https://wa.me/923238820858" target="_blank" rel="noopener noreferrer">
                    +92 323 8820858
                  </a>
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                </span>
                <div>
                  <span className="contact-label">Email</span>
                  <a className="contact-value" href="mailto:taymoor.shahid.ts@gmail.com">taymoor.shahid.ts@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-lg-7" data-aos="fade-left" data-aos-duration="900" data-aos-delay="150">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
