import { motion } from "framer-motion";
import brandImg from "../assets/images/Beige-Linen-Jacket-Pants.webp"; 

export default function BrandStatement() {
  const fadeSlide = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  return (
    <section className="py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

        {/* Left: Image */}
        <motion.div
          className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-lg"
          variants={fadeSlide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={brandImg}
            loading="lazy"
            alt="Brand Statement"
            className="w-full h-64 md:h-105 lg:h-125 object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div
          className="md:w-1/2 w-full flex flex-col justify-center text-center md:text-left"
          variants={{ ...fadeSlide, hidden: { x: 100, opacity: 0 }, exit: { x: 100, opacity: 0 } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-wide mb-6">
            Designed for movement. <br /> Built for confidence.
          </h2>
          <p className="text-lg text-gray-600 max-w-md">
            At Le Noir, every piece is carefully curated to balance elegance and comfort, letting you move with confidence while looking effortlessly stylish.
          </p>
        </motion.div>

      </div>
    </section>
  );
}