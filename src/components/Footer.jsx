import { motion } from "framer-motion";
import { Instagram, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">

          {/* Brand */}
          <motion.div
            className="text-center md:text-left max-w-sm"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-serif font-light tracking-wider">
              Le Noir
            </h3>

            <div className="w-12 h-px bg-primary my-6 mx-auto md:mx-0" />

            <p className="text-gray-600 leading-relaxed">
              Refined silhouettes. Defined in black.  
              Contemporary streetwear built on identity, quality, and quiet confidence.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="flex flex-col items-center md:items-end gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <nav className="flex flex-col gap-4 text-sm tracking-widest uppercase">

              <a
                href="#collection"
                className="hover:text-primary transition-colors"
              >
                Collection
              </a>

              <a
                href="#about"
                className="hover:text-primary transition-colors"
              >
                About
              </a>

              <a
                href="#contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </a>

            </nav>

            {/* Social Icons */}
            <div className="flex gap-6 mt-4">

              <a
                href="https://instagram.com/YOURBRAND"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>

              <a
                href="https://wa.me/YOURNUMBER"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Phone size={20} />
              </a>

              <a
                href="mailto:your@email.com"
                className="hover:text-primary transition-colors"
              >
                <Mail size={20} />
              </a>

            </div>
          </motion.div>
        </div>

        {/* Bottom Divider */}
        <div className="mt-16 border-t border-foreground/10 pt-8 text-center text-xs tracking-widest text-gray-500">
          © {new Date().getFullYear()} Le Noir. All rights reserved.
        </div>

      </div>
    </footer>
  );
}