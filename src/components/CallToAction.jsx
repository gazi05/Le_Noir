import { motion } from "framer-motion";
import { Instagram, Phone, Mail } from "lucide-react";

export default function DirectContactCTA() {
  return (
    <section id="Contact" className="py-24 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8">

        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-light tracking-wide"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          Ready to Own the Drop?
        </motion.h2>

        {/* Accent Line */}
        <div className="w-16 h-px bg-primary" />

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Limited pieces. Direct orders only.  
          Connect with us and secure yours today.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          
         <a
            href="https://wa.me/962777732452"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 border border-foreground text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-all rounded-md"
          >
            <Phone size={18} />
            WhatsApp
          </a>
          {/* Instagram */}
          <a
            href="https://instagram.com/YOURBRAND"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 border border-foreground text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-all rounded-md"
          >
            <Instagram size={18} />
            Instagram
          </a>

          {/* Email (optional) */}
          <a
            href="waleed.london24@gmail.com"
            className="flex items-center justify-center gap-3 px-8 py-4 border border-foreground text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-all rounded-md"
          >
            <Mail size={18} />
            Email
          </a>

        </motion.div>

      </div>
    </section>
  );
}