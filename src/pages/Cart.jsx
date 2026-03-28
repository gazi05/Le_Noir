import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

export default function Cart() {
  // Get cart state and functions from context
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Calculate total price of all items in the cart
  const total = cart.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0) * item.quantity,
    0
  );

  // Handle checkout → sends order to WhatsApp
  const handleCheckout = () => {
    // Prevent checkout if cart is empty
    if (!cart.length) return;

    let message = "*🛍️ New Order*\n\n";

    // Loop through each cart item and format the message
    cart.forEach((item, index) => {
      message += `*${index + 1}.* ${item.name}\n`;
      message += `Code: ${item.code || "N/A"}\n`;
      message += `Size: ${item.selectedSize || "N/A"}\n`;
      message += `Price: ${item.price} JD\n`;
      message += `Qty: ${item.quantity}\n`;
      message += `Total: ${(item.price || 0) * item.quantity} JD\n\n`;
    });

    // Add total at the end of the message
    message += `*Total: ${total} JD*`;

    // Open WhatsApp with pre-filled message
    window.open(
      `https://wa.me/962777732452?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>

      {/* If cart is empty */}
      {cart.length === 0 ? (
        <div className="flex items-center justify-center h-[70vh] text-center">
          <p className="text-3xl font-semibold text-gray-700">
            Your cart is empty
          </p>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="flex flex-col gap-6">

            {/* Loop through cart items */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-5 border-b pb-6"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-32 object-cover rounded-lg"
                />

                {/* Product Info */}
                <div className="flex-1 flex flex-col gap-1">
                  <h2 className="font-medium text-base">
                    {item.name}
                  </h2>

                  {/* Price */}
                  <p className="text-gray-500 text-sm">
                    {item.price} JD
                  </p>

                  {/* Quantity */}
                  <p className="text-xs text-gray-400">
                    Qty: {item.quantity}
                  </p>

                  {/* Product Code */}
                  <p className="text-xs text-gray-400">
                    Code: {item.code || "N/A"}
                  </p>

                  {/* Size (only shown if exists) */}
                  {item.selectedSize && (
                    <p className="text-xs text-gray-400">
                      Size: {item.selectedSize}
                    </p>
                  )}

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Item Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Total Price */}
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{total} JD</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900"
            >
              Checkout via WhatsApp
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}