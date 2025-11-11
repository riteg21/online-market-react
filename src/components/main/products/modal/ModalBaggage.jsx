import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTotalPrice } from "../../../../context/FullPriceContext";
import { BaggageCard } from "./BaggageCard";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/AuthUserContext";

export const ModalBaggage = ({ onClose }) => {
  const { totalPrice, cartItems } = useTotalPrice();
  const { loginTypeFromLS } = useAuth();

  const loginType = loginTypeFromLS;

  const loginLinkHandler = () => {
    return loginType ? "/order" : "/please-sign";
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key == "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-60 bg-black/10 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-[90%] max-w-xl bg-white text-black rounded-2xl shadow-lg animate-fadeIn flex flex-col max-h-[90vh]">
        {/*  */}
        <div className="flex-shrink-0 p-6 pb-4">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-orange-400 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-hide="popup-modal"
            onClick={() => {
              onClose();
            }}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
          <h1 className="text-3xl font-black text-orange-500 flex justify-center">
            Baggage
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-4">
          <div className="mb-6">
            <BaggageCard />
          </div>
        </div>

        {/*  */}
        <div className="flex-shrink-0 p-6 pt-4">
          <div className="flex justify-between items-center">
            {cartItems.length > 0 && (
              <Link
                to={loginLinkHandler()}
                className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-1 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-5 shadow-md shadow-orange-200"
              >
                Buy
              </Link>
            )}
            {cartItems.length > 0 && (
              <h1 className="text-2xl font-bold text-orange-500 ">{`Total Price: $${totalPrice}`}</h1>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
