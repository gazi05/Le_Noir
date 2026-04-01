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

  const modalRef = useRef(null);

  const toastTimeout = useRef(null);

  if (!product) return null;
  if (!Array.isArray(product.image)) return null;
  if (!Array.isArray(product.sizes)) return null;

  const isMultiItem =
  Array.isArray(product.items) && product.items.length > 1;

  const getSelectedItem = () => {
    if (selectedPart === "full") return null;
    return product.items?.find((item) => item.type === selectedPart);
  };

  const getPrice = () => {
    const item = getSelectedItem();
    return item ? item.price : product.price;
  };

  const getCode = () => {
    const item = getSelectedItem();
    return item ? item.code : "";
  };

  const getMeasurementType = () => {
    const item = getSelectedItem();

    
      if (item) {
      if (item.type === "Jacket") return "Jacket";
      if (item.type === "Pants") return "Pants";
      if (item.type === "Skirt") return "Pants";
      if (item.type === "Dress") return "Dress";
      if (item.type === "Shirt") return "Tops";
    }

    if (product.category?.includes("Dress")) return "Dress";

    return null;
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

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
    onClose();
    }
  };

  const measurementType = getMeasurementType();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-start overflow-y-auto p-4" onClick={handleOutsideClick}>
      <div
          ref={modalRef}
          className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >

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

            {/* ITEMS */}
            {isMultiItem&& (
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

                  {product.items?.map((item) => (
                    <button
                      key={`${product.id}-${item.type}`}
                      onClick={() => {
                        setSelectedPart(item.type);
                        setSelectedSize("");
                      }}
                      className={`px-3 py-1 border ${
                        selectedPart === item.type
                          ? "bg-black text-white"
                          : ""
                      }`}
                    >
                      {item.type}
                    </button>
                  ))}
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

            {/* MEASUREMENTS */}
            {measurementType &&
              selectedSize &&
              sizeChart?.[measurementType]?.[selectedSize] && (
                <div className="text-sm text-gray-600 border-t pt-2">
                  <p className="font-medium mb-1">
                    Measurements:
                  </p>

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
                    selectedPart === "full"
                      ? product.name
                      : `${product.name} (${selectedPart})`,
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
          className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg shadow-lg text-sm font-medium
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