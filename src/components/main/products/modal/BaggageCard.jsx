import { useTotalPrice } from "../../../../context/FullPriceContext";

export const BaggageCard = () => {
  const { cartItems, removeItemFromCart } = useTotalPrice();

  return (
    <div className="justify-center">
      {!cartItems.length == 0 ? (
        cartItems.map((product, index) => (
          <div
            key={product.id}
            className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-orange-200 transition-all duration-300 hover:shadow-md mb-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-xl h-20 w-20 object-cover shadow-sm"
                />
                <div className="flex flex-col">
                  <h2 className="font-bold text-gray-800 text-lg mb-1">
                    {product.name}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <p className="font-bold text-orange-500 text-lg">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                    <span className="text-gray-400 hidden sm:block">•</span>
                    <span className="text-gray-500 text-sm">
                      ${product.price} each
                    </span>
                    <span className="text-gray-400 hidden sm:block">•</span>
                    <span className="text-gray-500 text-sm">
                      Qty: {product.quantity}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-2 font-medium rounded-xl px-4 py-2 text-center focus:outline-none transition-all duration-200 text-orange-400 hover:text-white border border-orange-300 hover:bg-orange-500 hover:border-orange-500 hover:shadow-md w-full sm:w-auto"
                onClick={() => removeItemFromCart(product.id)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center mt-10">
          <div className="text-center">
            <img
              src="/baggage.png"
              alt="clear-baggage"
              className="w-40 h-auto mx-auto"
            />
            <h2 className="text-2xl font-extrabold text-gray-500 mt-10">
              The Baggage's empty
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
