import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/Hero.jsx";
import Collection from "../components/Collection.jsx";
import BrandStatement from "../components/Brandstatement.jsx";
import About from "../components/About.jsx";
import DirectContactCTA from "../components/CallToAction.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");

      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
  }, [location]);

  return (
    <div id="top" className="min-h-screen bg-zinc-50 text-foreground">
      
      <Hero />
      <div id="collection">
        <Collection />
      </div>
      <BrandStatement />
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <DirectContactCTA />
      </div>
      

      <Footer />

    </div>
  );
}