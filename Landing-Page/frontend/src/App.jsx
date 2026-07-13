import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductIntro from './components/ProductIntro';
import Features from './components/Features';
import Advantages from './components/Advantages';
import Mascot3D from './components/Mascot3D';
import DemoStory from './components/DemoStory';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import PricingCTA from './components/PricingCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProductIntro />
        <Features />
        <Advantages />
        <Mascot3D />
        <DemoStory />
        <Testimonials />
        <FAQ />
        <PricingCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
