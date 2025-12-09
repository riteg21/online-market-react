import { useOrderForm } from "../../context/FormOfOrderContext";

export const HistoryOfOrders = () => {
  const { getOrdersHistory } = useOrderForm();
  const historyOfOrders = getOrdersHistory();

  return (
    <div className="py-3 md:py-4 lg:py-6 px-1 md:px-2 lg:px-4 h-full">
      {historyOfOrders.length > 0 ? (
        <div className="space-y-3 md:space-y-4 lg:space-y-6 h-full overflow-y-auto pr-1">
          {historyOfOrders.map((order) => (
            <div
              key={order.id}
              className="p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl lg:rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-orange-600 truncate">
                    #{order.id.toString().slice(-6)}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    Placed on{" "}
                    {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium w-fit mt-1 sm:mt-0">
                  Completed
                </div>
              </div>

              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 max-h-32 md:max-h-40 lg:max-h-48 overflow-y-auto pr-1">
                {order.cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-1.5 md:p-2 lg:p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gray-200 rounded-md flex items-center justify-center mr-2 md:mr-3 flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-xs">No image</div>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-medium text-gray-900 text-xs md:text-sm truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 truncate hidden md:block">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right ml-1 md:ml-2 flex-shrink-0">
                      <div className="font-medium text-gray-900 text-xs md:text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-3 pt-2 md:pt-3 border-t border-gray-200">
                <button className="text-xs md:text-sm font-medium text-orange-600 hover:text-white px-2 md:px-3 py-1 md:py-1.5 hover:bg-orange-400 rounded-lg transition-colors w-full sm:w-auto text-center">
                  View Details
                </button>
                <div className="text-right w-full sm:w-auto">
                  <div className="text-xs md:text-sm text-gray-500">
                    Order Total
                  </div>
                  <div className="text-base md:text-lg font-bold text-gray-900">
                    ${order.totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 md:py-8 lg:py-10 h-full flex flex-col justify-center">
          <div className="mx-auto w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3 md:mb-4">
            <svg
              className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-1 md:mb-2">
            No orders yet
          </h3>
          <p className="text-gray-500 text-xs md:text-sm">
            Your order history will appear here
          </p>
        </div>
      )}
    </div>
  );
};
