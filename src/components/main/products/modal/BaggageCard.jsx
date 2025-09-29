import { useTotalPrice } from "../../../../context/FullPriceContext";

export const BaggageCard = ({}) => {
  const { cartItems, removeItemFromCart } = useTotalPrice();

  return (
    <div className="justify-center">
      {!cartItems.length == 0 ? (
        cartItems.map((product, index) => (
          <div
            key={index}
            className="text-sm rounded-lg  flex items-center justify-between mb-10"
          >
            <div className="justify-between flex">
              <img
                src={product.image}
                alt=""
                className="rounded-sm h-18 w-25 me-5"
              />
              <div>
                <h1 className="font-bold text-2xl text-gray-600 mb-0">
                  {product.name}
                </h1>
                <p className="font-bold text-gray-400">
                  ${product.price * product.quantity}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="font-medium rounded-lg text-sm px-5 py-2 text-center focus:outline-none transition-colors text-orange-300 hover:text-white border border-orange-300 hover:bg-orange-400 hover:border-orange-400"
              onClick={() => removeItemFromCart(product.id)}
            >
              Clear
            </button>
          </div>
        ))
      ) : (
        <div className="flex justify-center mt-10">
          <h2 className="text-2xl font-extrabold text-gray-500">
            The Baggage's empty
          </h2>
        </div>
      )}
    </div>
  );
};
