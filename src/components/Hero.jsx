import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile.jsx";

import heroMobile from "../assets/images/10.webp";
import heroDesktop from "../assets/images/11.webp";

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <picture className="absolute inset-0">
        <source media="(min-width: 768px)" srcSet={heroDesktop} />
        <motion.img
          src={heroMobile}
          alt="Luxury Earth Collection"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </picture>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/10 to-background/70" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-center items-start pt-20 md:pt-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Subtitle */}
        <motion.span
          className="text-white font-mono text-xl tracking-[0.3em] uppercase mb-6"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The Earth Collection
        </motion.span>

        {/* Main heading */}
        <motion.h1
          className={`text-white ${isMobile ? "text-4xl" : "text-5xl md:text-8xl"} font-serif font-light tracking-tight mb-8 max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]`}
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          More Than Fashion<br /> <i className="italic">it's a feeling</i>
        </motion.h1>

        {/* Shop Now button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            to="/shop"
            className="group inline-flex items-center gap-4 border border-white text-white px-8 py-4 font-medium tracking-widest uppercase transition-all
                       hover:bg-white hover:text-black
                       active:bg-white active:text-black
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            Shop Now
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 group-active:translate-x-2" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}