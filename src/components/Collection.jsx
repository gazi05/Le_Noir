import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile.jsx";
import { products } from "../data/Products.js";  // ← THIS WAS MISSING!

export default function Collection() {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  // Guard clause - if no products, don't render slider
  if (!products || products.length === 0) {
    return (
      <section className="py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500">No products available</p>
        </div>
      </section>
    );
  }

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance && currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (distance < -minSwipeDistance && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index) => setCurrentIndex(index);

  // Previous/Next handlers for buttons
  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const nextSlide = () => {
    if (currentIndex < products.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <section className="py-20 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-wide">
            The Collection
          </h2>
          <div className="w-16 h-px bg-black mx-auto mt-6" />
        </div>

        {/* Mobile Slider */}
        {isMobile ? (
          <div className="relative">
            {/* Navigation Arrows */}
            {currentIndex > 0 && (
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg hover:bg-black hover:text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            
            {currentIndex < products.length - 1 && (
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg hover:bg-black hover:text-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            )}

            <div
              className="overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <motion.div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {products.map((product) => (
                  <div key={product.id} className="w-full shrink-0 px-2">
                    <Link to="/shop" className="group block">
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105 rounded-lg"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className="text-lg font-medium tracking-wide">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-sm tracking-widest">
                          {product.price}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "w-8 bg-black"
                      : "w-2 bg-gray-400 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Link to="/shop" className="group block">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105 rounded-lg"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-medium tracking-wide">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm font-bold tracking-widest">
                      {product.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}