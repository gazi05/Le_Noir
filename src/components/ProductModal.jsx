import { useState, useRef } from "react";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { sizeChart } from "../data/Size";

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedPart, setSelectedPart] = useState("full");
  const [selectedSize, setSelectedSize] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const toastTimeout = useRef(null);

  // safety
  if (!product) return null;
  if (!Array.isArray(product.image)) return null;
  if (!Array.isArray(product.sizes)) return null;

  const isSet =
    Array.isArray(product.category) &&
    product.category.includes("set");

  // 🔥 FIX: decide measurement type based on selected part
  const getMeasurementType = () => {
    if (selectedPart === "jacket") return "jacket";
    if (selectedPart === "pants") return "pants";
    return null; // full set → no measurements
  };

  const handleAddToCart = (item) => {
    if (!selectedSize) {
      setToast({
        show: true,
        message: "Please select a size first",
        type: "warning",
      });

      clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 2500);

      return;
    }

    addToCart(item);

    setToast({
      show: true,
      message: "Item added to cart",
      type: "success",
    });

    clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2500);
  };

  const getPrice = () => {
    if (selectedPart === "jacket" && product.jacketPrice) {
      return product.jacketPrice;
    }
    if (selectedPart === "pants" && product.pantsPrice) {
      return product.pantsPrice;
    }
    return product.price || 0;
  };

  const getCode = () => {
    if (selectedPart === "jacket") return product.jacketCode;
    if (selectedPart === "pants") return product.pantsCode;
    return product.dressCode || product.jacketCode || "";
  };

  const measurementType = getMeasurementType();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-start overflow-y-auto p-4">

      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">

          {/* IMAGES */}
          <div className="flex flex-col gap-4">
            <img
              src={product.image[selectedImage]}
              className="w-full h-125 object-cover rounded-xl"
              alt=""
            />

            <div className="flex gap-2">
              {product.image.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(i)}
                  className="w-20 h-20 object-cover cursor-pointer rounded"
                  alt=""
                />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-4">

            <h2 className="text-2xl font-semibold">
              {product.name}
            </h2>

            <p className="text-xl font-bold">
              {getPrice()} JOD
            </p>

            {getCode() && (
              <p className="text-sm text-gray-500">
                Code: {getCode()}
              </p>
            )}

            {/* SET OPTIONS */}
            {isSet && (
              <div>
                <p className="font-medium">Choose Item:</p>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setSelectedPart("full");
                      setSelectedSize("");
                    }}
                    className={`px-3 py-1 border ${
                      selectedPart === "full"
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    Full Set
                  </button>

                  {product.jacketPrice && (
                    <button
                      onClick={() => {
                        setSelectedPart("jacket");
                        setSelectedSize("");
                      }}
                      className={`px-3 py-1 border ${
                        selectedPart === "jacket"
                          ? "bg-black text-white"
                          : ""
                      }`}
                    >
                      Jacket
                    </button>
                  )}

                  {product.pantsPrice && (
                    <button
                      onClick={() => {
                        setSelectedPart("pants");
                        setSelectedSize("");
                      }}
                      className={`px-3 py-1 border ${
                        selectedPart === "pants"
                          ? "bg-black text-white"
                          : ""
                      }`}
                    >
                      Pants
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* SIZE */}
            <div>
              <p className="font-medium">Size:</p>

              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* 🔥 MEASUREMENTS (FIXED LOGIC) */}
            {measurementType &&
              selectedSize &&
              sizeChart?.[measurementType]?.[selectedSize] && (
                <div className="text-sm text-gray-600 border-t pt-2">
                  <p className="font-medium mb-1">Measurements:</p>

                  {Object.entries(
                    sizeChart[measurementType][selectedSize]
                  ).map(([key, value]) => (
                    <p key={key}>
                      {key}: {value} cm
                    </p>
                  ))}
                </div>
              )}

            {/* QUANTITY */}
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
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

            {/* ADD */}
            <button
              onClick={() =>
                handleAddToCart({
                  id: `${product.id}-${selectedPart}-${selectedSize}`,
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
                  selectedSize,
                  code: getCode(),
                })
              }
              className="bg-black text-white py-3 rounded-xl"
            >
              Add to Cart
            </button>

            {/* CLEANING */}
            {product.Cleaning && (
              <div>
                <p className="font-medium">Cleaning:</p>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {product.Cleaning}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* TOAST */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg shadow-lg text-sm font-medium transition
          ${toast.type === "success" ? "bg-green-600 text-white" : ""}
          ${toast.type === "warning" ? "bg-yellow-400 text-black" : ""}
          `}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}