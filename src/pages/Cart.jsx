import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0) * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) return;

    let message = "*New Order*\n\n";

    cart.forEach((item, index) => {
      message += `*${index + 1}.* ${item.name}\n`;
      message += `Code: ${item.code}\n`;
      message += `Price: ${item.price} JD\n`;
      message += `Quantity: ${item.quantity}\n`;

      message += "\n";
    });

    message += `*Total:* ${total} JD\n`;

    const phoneNumber = "962777732452"; 

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 pt-24">

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <p className="text-3xl font-semibold text-gray-700">
              Your cart is empty
            </p>
            <p className="text-gray-500 mt-2">
              Add some products to get started
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">

            {/* Items */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-5 border-b pb-6"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-32 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1 flex flex-col gap-1">
                  <h2 className="font-medium text-base">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {item.price} JD
                  </p>

                  <p className="text-xs text-gray-400">
                    Qty: {item.quantity}
                  </p>

                  <p className="text-xs text-gray-400">
                    code: {item.code}
                  </p>

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

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-gray-500 hover:text-black transition"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{total} JD</span>
            </div>

            <p className="text-sm text-gray-500">
              Shipping may be calculated based on your location and will be confirmed in the WhatsApp conversation.
            </p>

            {/* WhatsApp Checkout */}
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-xl mt-2 hover:bg-gray-900 transition"
            >
              Checkout via WhatsApp
            </button>

          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}