import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTotalPrice } from "../../../../context/FullPriceContext";
import { BaggageCard } from "./BaggageCard";

export const ModalBaggage = ({ onClose, setCountProduct }) => {
  const { totalPrice, cartItems } = useTotalPrice();

  console.log(cartItems);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key == "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-60 bg-black/10 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-[90%] max-w-xl bg-white text-black p-6 rounded-2xl shadow-lg animate-fadeIn">
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
        <h1 className="text-3xl font-black text-orange-500 flex justify-center mb-10">
          Baggage
        </h1>
        <div className="mb-10">
          <BaggageCard setCountProduct={setCountProduct} />
        </div>
        <h1 className="text-xl font-black text-orange-400 ">{`Total Price: $${totalPrice}`}</h1>
      </div>
    </div>,
    document.body
  );
};
