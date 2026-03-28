import { motion , useInView} from "framer-motion";
import aboutImg from "../assets/images/saffron-satin-set2.webp";

export default function About() {

  const fadeSlide = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };
  
  return (
    
    <section className="py-20 bg-background text-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">

        {/* TEXT LEFT */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col gap-6"
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-wide">
            About Us
          </h2>

          <span className="text-xl md:text-2xl text-primary font-medium">
            Discover the story behind our brand
          </span>

          <p className="text-lg md:text-xl leading-relaxed text-gray-600">
            <span className="font-semibold">Le Noir</span> is a contemporary streetwear brand founded in 2022 in Jordan . Built on the power of black and defined by refined silhouettes, the brand blends elevated design with everyday comfort — delivering premium pieces that speak with confidence, not noise.
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-gray-600">
            Designed for individuals who value identity, quality, and effortless style, Le Noir makes modern luxury accessible without compromise.
          </p>

        </motion.div>

        {/* IMAGE RIGHT */}
      <motion.div
          className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-lg"
          variants={fadeSlide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
      >
        <img
          src={aboutImg}
          loading="lazy"
          alt="About Le Noir"
          className="w-full h-64 md:h-105 lg:h-125 object-cover rounded-2xl shadow-lg"
        />
      </motion.div>

      </div>
    </section>
  );
}