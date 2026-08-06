const TESTIMONIALS = [
  {
    quote:
      "Taimoor is a highly professional developer. He delivered a robust solution that exceeded expectations. Great communication, clean code and always on time.",
    name: "Ahsun Taqveem Chohan",
    role: "CEO, CloudArithm",
  },
  {
    quote:
      "Working with Taimoor was a fantastic experience. He understood our requirements quickly and turned them into a polished, high-performing product.",
    name: "Hamza Rattu",
    role: "CEO, M&A Solutions",
  },
  {
    quote:
      "Reliable, detail-oriented and technically strong. Taimoor's frontend and backend skills made the whole project run smoothly from start to finish.",
    name: "Abid Mehmood",
    role: "Engineering Lead, TruthSayer AI",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header text-center mx-auto" data-aos="fade-up">
          <p className="eyebrow section-eyebrow">Testimonials</p>
          <h2 className="section-title section-heading">Clients Feedback</h2>
        </div>

        <div
          id="testimonialCarousel"
          className="carousel slide testimonial-slider"
          data-bs-ride="carousel"
          data-aos="zoom-in"
        >
          <button
            className="carousel-control-prev slider-arrow"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="prev"
            aria-label="Previous testimonial"
          >
            <span aria-hidden="true">&#10094;</span>
            <span className="visually-hidden">Previous</span>
          </button>

          <div className="carousel-inner">
            {TESTIMONIALS.map((t, i) => (
              <div className={`carousel-item${i === 0 ? " active" : ""}`} key={t.name}>
                <div className="testimonial-slide card">
                  <div className="card-body text-center">
                    <p className="testimonial-quote">&quot;{t.quote}&quot;</p>
                    <div className="testimonial-author d-flex align-items-center justify-content-center gap-3">
                      <div className="text-center">
                        <h4 className="h6 mb-0">{t.name}</h4>
                        <span>{t.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-next slider-arrow"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="next"
            aria-label="Next testimonial"
          >
            <span aria-hidden="true">&#10095;</span>
            <span className="visually-hidden">Next</span>
          </button>

          <div className="carousel-indicators slider-dots">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide-to={i}
                className={`dot${i === 0 ? " active" : ""}`}
                aria-current={i === 0 ? "true" : undefined}
                aria-label={`Slide ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
