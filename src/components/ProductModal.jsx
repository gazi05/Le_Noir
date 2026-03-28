import { useState, useRef } from "react";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedPart, setSelectedPart] = useState("full");
  const [showToast, setShowToast] = useState(false);

  const toastTimeout = useRef(null);

  const isSet =
    Array.isArray(product.category) &&
    product.category.includes("set");

  const handleAddToCart = (item) => {
    addToCart(item);

    setShowToast(true);

    if (toastTimeout.current) {
      clearTimeout(toastTimeout.current);
    }

    toastTimeout.current = setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const getPrice = () => {
    if (selectedPart === "jacket" && product.jacketPrice) {
      return product.jacketPrice;
    }
    if (selectedPart === "pants" && product.pantsPrice) {
      return product.pantsPrice;
    }
    return product.price;
  };

  const getCode = () => {
    if (selectedPart === "jacket") return product.jacketCode;
    if (selectedPart === "pants") return product.pantsCode;
    return product.dressCode || product.jacketCode;
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

            {/* Price */}
            <p className="text-xl font-bold">
              {getPrice()} JOD
            </p>

            {/* CODE DISPLAY */}
            {getCode() && (
              <p className="text-sm text-gray-500">
                Code: {getCode()}
              </p>
            )}

            <p className="text-gray-600">{product.material}</p>

            {/* SET OPTIONS */}
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
                    Full Set ({product.price} JOD)
                  </button>

                  {product.jacketPrice && (
                    <button
                      onClick={() => setSelectedPart("jacket")}
                      className={`px-3 py-1 border rounded ${
                        selectedPart === "jacket" ? "bg-black text-white" : ""
                      }`}
                    >
                      Jacket ({product.jacketPrice} JOD)
                    </button>
                  )}

                  {product.pantsPrice && (
                    <button
                      onClick={() => setSelectedPart("pants")}
                      className={`px-3 py-1 border rounded ${
                        selectedPart === "pants" ? "bg-black text-white" : ""
                      }`}
                    >
                      Pants ({product.pantsPrice} JOD)
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* QUANTITY */}
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

            {/* ADD TO CART */}
            <button
              onClick={() => {
                handleAddToCart({
                  id: `${product.id}-${selectedPart}`,
                  name:
                    selectedPart === "jacket"
                      ? `${product.name} (Jacket)`
                      : selectedPart === "pants"
                      ? `${product.name} (Pants)`
                      : product.name,

                  price: getPrice(),
                  quantity,
                  image: product.image[0],
                  selectedPart,
                  code: getCode(),
                });
              }}
              className="bg-black text-white py-3 rounded-xl hover:cursor-pointer transition-colors duration-300 text-center font-medium"
            >
              Add to Cart
            </button>

            {/* CLEANING */}
            <div>
              <p className="font-medium">Cleaning:</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {product.Cleaning}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TOAST */}
      <div
        className={`fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 ${
          showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        Added to cart
      </div>

    </div>
  );
}