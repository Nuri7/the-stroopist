import dynamic from 'next/dynamic';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OfferingsMarquee from "./components/OfferingsMarquee";

// Dynamically import below-the-fold components
const About = dynamic(() => import('./components/About'));
const Menu = dynamic(() => import('./components/Menu'));
const Reviews = dynamic(() => import('./components/Reviews'));
const Visit = dynamic(() => import('./components/Visit'));
const Instagram = dynamic(() => import('./components/Instagram'));
const Footer = dynamic(() => import('./components/Footer'));

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
