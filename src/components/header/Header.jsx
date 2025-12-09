import { useCallback, useState } from "react";
import { useTotalPrice } from "../../context/FullPriceContext";
import { useAuth } from "../../context/AuthUserContext";
import { Link } from "react-router-dom";

const Header = ({
  searchTerm,
  setSearchTerm,
  setIsOpenBaggage,
  setIsOpenLogIn,
}) => {
  const { totalPrice } = useTotalPrice();
  const { user, loginType } = useAuth();

  const openBaggage = useCallback(() => {
    setIsOpenBaggage(true);
  });
  const openLogIn = useCallback(() => {
    setIsOpenLogIn(true);
  });
  return (
    <div className="justify-center">
      <header className="flex items-center justify-between">
        <div className="flex items-start justify-between">
          <img src="/logo.svg" alt="Logo" className="h-15 w-auto me-5" />
          <h1 className="text-4xl mt-4 font-bold leading-none tracking-tight bg-clip-text text-orange-400">
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
            className="block px-2.5 pb-3 pt-4 w-2xl text-sm text-orange-300 bg-orange-50 rounded-lg border-1 border-orange-200 appearance-none   focus:outline-none focus:ring-0 focus:border-orange-400 peer shadow-md shadow-orange-100"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-sm text-orange-300  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-orange-50  px-2 peer-focus:px-2 peer-focus:text-orange-400 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Deep Search
          </label>
        </div>
        <div className="flex justify-between items-center ">
          <div className="relative">
            <button
              type="button"
              className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-1 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-5 shadow-md shadow-orange-200 "
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
          {loginType ? (
            <Link to={"/profile"}>
              <div className="w-14 h-14 rounded-full flex justify-center items-center p-1 bg-orange-200">
                <img src={user.img} alt="User-Photo" className="w-auto h-12" />
              </div>
            </Link>
          ) : (
            <button
              type="button"
              className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-1 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center shadow-md shadow-gray-300 "
              onClick={openLogIn}
            >
              Sign In
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
