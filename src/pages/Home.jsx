import Hero from "../components/Hero.jsx";
import Collection from "../components/Collection.jsx";
import BrandStatement from "../components/Brandstatement.jsx" ;
import About from "../components/About.jsx";
import DirectContactCTA from  "../components/CallToAction.jsx";
import Footer from "../components/Footer.jsx";
export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-foreground">
      
      <Hero />
      <Collection />
      <BrandStatement />
      <About />
      <DirectContactCTA />
      <Footer />
    </div>
  );
}