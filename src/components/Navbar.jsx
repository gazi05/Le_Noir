import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile.jsx";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll functions
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleContactScroll = (e) => {
    e.preventDefault();
    document.getElementById("Contact")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleAboutScroll = (e) => {
    e.preventDefault();
    document.getElementById("About")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleDropdownEnter = () => !isMobile && setShopDropdownOpen(true);
  const handleDropdownLeave = () => !isMobile && setShopDropdownOpen(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  // Reusable components
  const NavLink = ({ href, onClick, children }) => (
    <a
      href={href}
      onClick={onClick}
      className="text-xs lg:text-sm font-medium tracking-widest uppercase hover:text-white/80 transition-all duration-300 relative group py-2 cursor-pointer"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
    </a>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/75 backdrop-blur-md   border-white/10 text-white shadow-lg"
          : "bg-linear-to-b from-black/50 to-transparent text-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-0 h-16 md:h-20 flex items-center justify-between relative">
        {/* Mobile Toggle */}
        {isMobile && (
          <button
            className="hover:text-white/80 transition-all duration-300 p-2 hover:bg-white/10 rounded-lg z-50"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Desktop Nav */}
        {!isMobile && (
          <div className="flex items-center gap-8 lg:gap-12">
            <NavLink href="/" onClick={scrollToTop}>Home</NavLink>

            {/* Shop Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center gap-1 text-xs lg:text-sm font-medium tracking-widest uppercase hover:text-white/80 transition-all duration-300 relative group py-2">
                Shop
                <ChevronDown size={16} className={`transition-transform duration-300 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </button>

              <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-300 ${
                shopDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="w-56 bg-white/95 backdrop-blur-sm text-gray-900 rounded-2xl shadow-2xl py-2 overflow-hidden border border-white/20">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-linear-to-r from-gray-400 to-gray-600 rounded-full" />
                  
                  <Link to="/shop/women" className="flex items-center gap-3 px-6 py-3 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-all duration-200" onClick={() => setShopDropdownOpen(false)}>
                    <span>Women</span>
                  </Link>
                  

                  <div className="mx-6 my-1 h-px bg-gray-200" />

                  <Link to="/shop/men" className="flex items-center gap-3 px-6 py-3 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-all duration-200" onClick={() => setShopDropdownOpen(false)}>
                    <span>Men</span>
                  </Link>

                  

                  <div className="mt-2 px-6 py-2 bg-gray-50">
                    <Link to="/shop" className="text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors flex items-center justify-between" onClick={() => setShopDropdownOpen(false)}>
                      <span>View All Products</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <NavLink href="Customize">Customize</NavLink>
            <NavLink href="#About" onClick={handleAboutScroll}>About</NavLink>
            <NavLink href="#Contact" onClick={handleContactScroll}>Contact</NavLink>
          </div>
        )}

        {/* Logo */}
        <a
          href="/"
          onClick={scrollToTop}
          className={`${
            isMobile ? "mx-auto" : "absolute left-180 -translate-x-1/2"
          } text-xl sm:text-2xl md:text-3xl font-serif tracking-[0.3em] uppercase font-bold hover:text-white/80 transition-all duration-300 cursor-pointer`}
        >
          LE NOIR
        </a>

        {/* Cart */}
        <Link to="/cart" className="hover:text-white/80 transition-all duration-300 relative group p-2 hover:bg-white/10 rounded-lg">
          <ShoppingBag size={22} strokeWidth={1.5} />
          <span className="absolute -top-1 -right-1 text-xs font-mono bg-white text-black px-1.5 py-0.5 rounded-full min-w-5 text-center">
            0
          </span>
        </Link>
      </div>

      {/* Mobile Menu - Preserved original style with better spacing */}
      {isMobile && mobileMenuOpen && (
        <div className="bg-black/95 backdrop-blur-lg border-t border-white/10 px-6 py-6 flex flex-col gap-2">
          <a href="/" onClick={scrollToTop} className="text-lg font-serif tracking-wide hover:text-white/80 transition-colors py-3 px-4 hover:bg-white/10 rounded-lg">
            Home
          </a>
          <Link to="/shop/women" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif tracking-wide hover:text-white/80 transition-colors py-3 px-4 hover:bg-white/10 rounded-lg">
            Women
          </Link>
          <Link to="/shop/men" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif tracking-wide hover:text-white/80 transition-colors py-3 px-4 hover:bg-white/10 rounded-lg">
            Men
          </Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif tracking-wide hover:text-white/80 transition-colors py-3 px-4 hover:bg-white/10 rounded-lg flex items-center justify-between">
            <span>All Products</span>
            <span>→</span>
          </Link>
          <div className="h-px bg-white/10 my-3" />
          <a className="text-lg font-serif tracking-wide hover:text-white/80 transition-colors py-3 px-4 hover:bg-white/10 rounded-lg" href="Customize">Customize</a>
          <a href="#About" onClick={handleAboutScroll} className="text-lg font-serif tracking-wide hover:text-white/80 transition-colors py-3 px-4 hover:bg-white/10 rounded-lg">
            About
          </a>
          <a href="#Contact" onClick={handleContactScroll} className="text-lg font-serif tracking-wide hover:text-white/80 transition-colors py-3 px-4 hover:bg-white/10 rounded-lg">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}