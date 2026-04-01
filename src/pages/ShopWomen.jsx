// src/pages/WomensShop.jsx
import { useState, useEffect } from "react";
import { products as allProducts } from "../data/Products.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductModal from "../components/ProductModal.jsx";
import Footer from "../components/Footer.jsx";

export default function WomensShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterColor, setFilterColor] = useState("all");

  // Modal & Cart
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Load only women products
  useEffect(() => {
    const womenProducts = allProducts.filter((p) => p.gender === "women");
    setProducts(womenProducts);
    setLoading(false);
  }, []);

  // ✅ FIXED FILTER (works with arrays)
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      filterCategory === "all" ||
      (Array.isArray(p.category)
        ? p.category.includes(filterCategory)
        : p.category === filterCategory);

    const matchColor =
      filterColor === "all" ||
      (Array.isArray(p.color)
        ? p.color.includes(filterColor)
        : p.color === filterColor);

    return matchCategory && matchColor;
  });

  return (
    <>
    <div className="pt-24 min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-serif mb-4">
          Women's Collection
        </h1>
        <p className="text-gray-600 mb-8">
          Explore the latest trends in women's apparel
        </p>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap mb-8">
          {/* Category */}
          <div>
            <span className="font-medium mr-2">Category:</span>
            {["all", "set", "dress", "jacket", "pants"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 border rounded-full text-sm mr-2 mb-2 transition ${
                  filterCategory === cat
                    ? "bg-black text-white"
                    : "border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Color */}
          <div>
            <span className="font-medium mr-2">Color:</span>
            {["all", "beige", "saffron", "navy", "white"].map((col) => (
              <button
                key={col}
                onClick={() => setFilterColor(col)}
                className={`px-3 py-1 border rounded-full text-sm mr-2 mb-2 transition ${
                  filterColor === col
                    ? "bg-black text-white"
                    : "border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, part, quantity) => {
            setCartCount((prev) => prev + quantity);
          }}
        />
      )}

      {/* Cart Counter */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg">
          Cart: {cartCount}
        </div>
      )}
    </div>
    <Footer />
    </>
  );
}