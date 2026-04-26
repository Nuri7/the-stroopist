import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OfferingsMarquee from "./components/OfferingsMarquee";
import About from "./components/About";
import Menu from "./components/Menu";
import Reviews from "./components/Reviews";
import Visit from "./components/Visit";
import Instagram from "./components/Instagram";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OfferingsMarquee />
      <About />
      <Menu />
      <Reviews />
      <Visit />
      <Instagram />
      <Footer />
    </main>
  );
}
