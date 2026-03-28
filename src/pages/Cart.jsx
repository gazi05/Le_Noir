import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
  (sum, item) => sum + (parseFloat(item.price) || 0) * item.quantity,
  0
);
  return (
    <div className="max-w-6xl mx-auto p-6 pt-24">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
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
                  {item.price} JOD
                </p>

                <p className="text-xs text-gray-400">
                  Qty: {item.quantity}
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

          {/* Total Section */}
          <div className="mt-10 flex flex-col gap-4 border-t pt-6">

            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Subtotal</span>
              <span>{total} JOD</span>
            </div>

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{total} JOD</span>
            </div>

            <p className="text-sm text-gray-500">
              Taxes and shipping calculated at checkout
            </p>

            <button
              onClick={() => alert("Checkout coming soon")}
              className="w-full bg-black text-white py-3 rounded-xl mt-2 hover:bg-gray-900 transition"
            >
              Checkout
            </button>

          </div>
        </div>
      )}
    </div>
  );
}