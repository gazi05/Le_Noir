export default function MenShop() {
  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-200 via-neutral-300 to-neutral-500 flex items-center justify-center px-6">

      <div className="text-center max-w-md">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-serif tracking-widest mb-4 text-black">
          MEN
        </h1>

        {/* Coming Soon */}
        <p className="text-xl md:text-2xl font-medium tracking-widest text-gray-700 mb-6">
          COMING SOON
        </p>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">
          Our men’s collection is on the way.  
          Stay tuned for exclusive designs and new drops.
        </p>

      </div>

    </div>
  );
}