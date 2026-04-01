export default function Customize() {
  const phoneNumber = "962777732452";

  const message = `Hello, I want a custom design.
Product:
Size:
Color:
Details:`;

  const handleWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-200 via-neutral-300 to-neutral-500 flex items-center justify-center px-6">
      
      {/* Card */}
      <div className="max-w-xl w-full text-center bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/40">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-serif tracking-widest mb-4 text-black">
          CUSTOM ORDERS
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          We create pieces tailored to your vision.  
          Contact us on WhatsApp and bring your idea to life.
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-gray-300 mx-auto mb-8"></div>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="bg-black text-white px-8 py-3 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-gray-800 transition-all duration-300"
        >
          Start Custom Order
        </button>

        {/* Small note */}
        <p className="text-xs text-gray-500 mt-6">
          Response within 24 hours
        </p>

      </div>
    </div>
  );
}