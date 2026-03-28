// src/components/ProductCard.jsx
export default function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full h-80 bg-gray-100 overflow-hidden rounded-t-2xl">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 h-32">
        <h2 className="text-sm md:text-base font-medium text-gray-900 transition-colors duration-300">
          {product.name}
        </h2>
        <p className="text-sm md:text-base font-semibold text-gray-700">
          {product.price} JD
        </p>
      </div>
    </div>
  );
}