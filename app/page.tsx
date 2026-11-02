import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";
import SkillsMarquee from "@/components/SkillsMarquee";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SkillsMarquee />
      <Experience />
      <Projects />
      <Skills />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
