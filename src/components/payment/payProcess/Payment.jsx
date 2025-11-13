import Card from "./payCard";
import { useState, useEffect } from "react";

export const Payment = () => {
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("orderFull") || "{}");

    if (orderData?.totalPrice) {
      setTotalPrice(orderData.totalPrice);
    }
  }, []);

  return (
    <div className=" py-2 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-15">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Pay</h1>
          <p className="text-gray-600">Complete your order</p>
        </div>

        <div className="flex justify-center mb-15 transform hover:scale-[1.02] transition-transform duration-300">
          <Card />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 text-center">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 font-medium">Total Price:</span>
            <span className="text-2xl font-bold text-gray-900">
              {totalPrice !== null ? `${totalPrice}$` : "—"}
            </span>
          </div>

          <button
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!totalPrice}
          >
            <span className="flex items-center justify-center gap-2">
              <span>Pay Now</span>
              {totalPrice && (
                <span className="text-orange-100">• {totalPrice}$</span>
              )}
            </span>
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Your data is protected</p>
        </div>
      </div>
    </div>
  );
};
