document.addEventListener("DOMContentLoaded", function () {

  // ---- AOS scroll animations ----
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });

    // Recalculate trigger offsets once images finish loading and shift layout
    window.addEventListener("load", function () {
      AOS.refreshHard();
    });
  }

  // ---- Footer year ----
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Close mobile nav after clicking a link ----
  var nav = document.getElementById("nav");

  if (nav) {
    nav.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        var collapse = bootstrap.Collapse.getOrCreateInstance(nav, { toggle: false });
        collapse.hide();
      });
    });
  }

  // ---- Active nav link on scroll ----
  var sections = document.querySelectorAll("section[id], nav[id]");
  var navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        var id = section.getAttribute("id");
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      }
    });
  }

  // ---- Back to top button ----
  var backToTop = document.getElementById("backToTop");

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", function () {
    setActiveLink();
    toggleBackToTop();
  });

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
