import { useCallback, useState } from "react";
import { useTotalPrice } from "../../context/FullPriceContext";

const Header = ({ searchTerm, setSearchTerm, setIsOpenBaggage }) => {
  const { totalPrice } = useTotalPrice();
  const openBaggage = useCallback(() => {
    setIsOpenBaggage(true);
  });
  return (
    <div className="justify-center">
      <header className="flex items-center justify-between">
        <div className="flex items-center justify-between ">
          <img src="/logo.png" alt="Logo" className="h-15 w-auto me-5" />
          <h1 className="text-4xl mt-2 font-black leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r to-orange-600 from-orange-400">
            Smart Basket
          </h1>
        </div>
        <div className="relative me-10">
          <input
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            type="search"
            id="floating_outlined"
            value={searchTerm}
            className="block px-2.5 pb-2.5 pt-4 w-2xl text-sm text-orange-300 bg-white rounded-lg border-1 border-orange-200 appearance-none   focus:outline-none focus:ring-0 focus:border-orange-400 peer shadow-md shadow-orange-100"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-sm text-orange-300  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-orange-400 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Deep Search
          </label>
        </div>
        <div className="flex justify-between items-center ">
          <div className="relative">
            <button
              type="button"
              className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-1 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-5 shadow-md shadow-orange-200"
              onClick={openBaggage}
            >
              <svg
                className="w-3.5 h-3.5 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 21"
              >
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
              </svg>
              {!totalPrice == 0 ? `$${totalPrice}` : "Buy Now"}
            </button>
          </div>

          <button
            type="button"
            className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-1 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                clipRule="evenodd"
              />
            </svg>
            Log-In
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
