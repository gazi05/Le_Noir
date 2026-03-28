import { useState } from "react";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedPart, setSelectedPart] = useState("full");

  const isSet =
    Array.isArray(product.category) &&
    product.category.includes("set");

  const getPrice = () => {
    if (selectedPart === "jacket" && product.jacketPrice) {
      return product.jacketPrice;
    }
    if (selectedPart === "pants" && product.pantsPrice) {
      return product.pantsPrice;
    }
    return product.price;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-start overflow-y-auto p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">

          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-3/4 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={product.image[selectedImage]}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-2">
              {product.image.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer ${
                    selectedImage === i ? "ring-2 ring-black" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-xl font-bold">{getPrice()}</p>
            <p className="text-gray-600">{product.material}</p>

            {/* Set options */}
            {isSet && (
              <div>
                <p className="font-medium mb-2">Choose Item:</p>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedPart("full")}
                    className={`px-3 py-1 border rounded ${
                      selectedPart === "full" ? "bg-black text-white" : ""
                    }`}
                  >
                    Full Set ({product.price})
                  </button>

                  {product.jacketPrice && (
                    <button
                      onClick={() => setSelectedPart("jacket")}
                      className={`px-3 py-1 border rounded ${
                        selectedPart === "jacket" ? "bg-black text-white" : ""
                      }`}
                    >
                      Jacket ({product.jacketPrice})
                    </button>
                  )}

                  {product.pantsPrice && (
                    <button
                      onClick={() => setSelectedPart("pants")}
                      className={`px-3 py-1 border rounded ${
                        selectedPart === "pants" ? "bg-black text-white" : ""
                      }`}
                    >
                      Pants ({product.pantsPrice})
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 border"
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 border"
              >
                +
              </button>
            </div>

            {/* ADD TO CART ✅ */}
            <button
              onClick={() => {
              addToCart({
                id: `${product.id}-${selectedPart}`, // ✅ unique item
                name:
                  selectedPart === "jacket"
                    ? `${product.name} (Jacket)`
                    : selectedPart === "pants"
                    ? `${product.name} (Pants)`
                    : product.name,

                price: getPrice(), // ✅ correct price
                image: product.image[0], // optional but cleaner
                quantity,
              });
            }}
              className="bg-black text-white py-3 rounded-xl"
            >
              Add to Cart
            </button>

            {/* Cleaning */}
            <div>
              <p className="font-medium">Cleaning:</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {product.Cleaning}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}