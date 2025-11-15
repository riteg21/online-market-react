import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthUserContext";
import { useTotalPrice } from "../../../context/FullPriceContext";
import { Link } from "react-router-dom";
import { useOrderForm } from "../../../context/FormOfOrderContext";
import { useForm } from "react-hook-form";

export const Order = () => {
  const { cartItems, removeItemFromCart, totalPrice } = useTotalPrice();
  const { user } = useAuth();
  const taxOfOrder = totalPrice % 10;
  const delivery = 5;
  const totalPriceOfOrder = totalPrice + taxOfOrder + delivery;

  const { orderInfoHandler, userOrderInfo } = useOrderForm();

  const [submit, setSubmit] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: user?.email || "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const formValues = watch();

  const handleSubmitHookForm = (data) => {
    orderInfoHandler(data, totalPriceOfOrder, cartItems);
    setShowSuccess(true);
    setSubmit(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  useEffect(() => {
    console.log(userOrderInfo);
  }, [userOrderInfo]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showSuccess && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-right duration-500">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Data successfully saved!</span>
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <div className="rounded-3xl shadow-lg bg-white/90 backdrop-blur-sm px-6 py-6 border border-gray-100">
            <div className="border-b-2 border-orange-400 pb-4 mb-6">
              <h2 className="font-bold text-2xl text-gray-800 flex items-center gap-2">
                <div className="w-2 h-6 bg-orange-400 rounded-full"></div>
                1. Baggage
              </h2>
            </div>

            <div className="space-y-4">
              {cartItems.map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-orange-200 transition-all duration-300 hover:shadow-md"
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
                          <span className="text-gray-400 hidden sm:block">
                            •
                          </span>
                          <span className="text-gray-500 text-sm">
                            ${product.price} each
                          </span>
                          <span className="text-gray-400 hidden sm:block">
                            •
                          </span>
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
              ))}
            </div>

            {cartItems.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    Order Price:
                  </span>
                  <span className="text-2xl font-bold text-gray-800">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {cartItems.length === 0 && (
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
                  <p className="text-gray-400">Add some items to get started</p>
                  <Link
                    to={"/"}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-2xl font-bold hover:from-orange-500 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 group mt-20"
                  >
                    <svg
                      className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Go Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
          {/*  */}
          <div
            className={`rounded-3xl bg-white/90 backdrop-blur-sm px-6 py-6 border shadow-lg transition-all duration-500 border-gray-100`}
          >
            <div className="border-b-2 border-orange-400 pb-4 mb-6">
              <h2 className="font-bold text-2xl text-gray-800 flex items-center gap-2">
                <div className="w-2 h-6 bg-orange-400 rounded-full"></div>
                2. Personal Info
              </h2>
            </div>

            <div className="space-y-6">
              <form
                className="space-y-6"
                onSubmit={handleSubmit(handleSubmitHookForm)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 transition-all duration-200 outline-none bg-white/50 ${
                        errors.email
                          ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                          : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^\+?[\d\s\-\(\)]{10,}$/,
                          message: "Please enter a valid phone number",
                        },
                        minLength: {
                          value: 10,
                          message: "Phone number must be at least 10 digits",
                        },
                      })}
                      type="tel"
                      placeholder="+7 (999) 100-20-20"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 transition-all duration-200 outline-none bg-white/50 ${
                        errors.phone
                          ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                          : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    {...register("address", {
                      required: "Please, write a true address",
                      minLength: {
                        value: 10,
                        message: "Address at least must be by 10 characters",
                      },
                    })}
                    type="text"
                    placeholder="Moscow, str. Mira, 98"
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 transition-all duration-200 outline-none bg-white/50 ${
                      errors.address
                        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                        : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Comment
                  </label>
                  <textarea
                    {...register("comment", {
                      maxLength: {
                        value: 100,
                        message: "The comment MAX length - 100",
                      },
                    })}
                    placeholder="Add any special instructions..."
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 transition-all duration-200 outline-none bg-white/50 resize-none ${
                      errors.comment
                        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                        : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                    }`}
                  />
                  {errors.comment && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.comment.message}
                    </p>
                  )}
                  <div className="text-right text-sm text-gray-500">
                    {formValues.comment?.length || 0}/100
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!isValid || cartItems.length === 0}
                    className={`px-8 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl font-medium transition-all duration-200 shadow-md transform hover:-translate-y-0.5 ${
                      !isValid || cartItems.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:from-orange-500 hover:to-orange-600 hover:shadow-lg"
                    }`}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* */}
        <div className="lg:w-96">
          <div className="rounded-3xl shadow-lg bg-white/90 backdrop-blur-sm px-6 py-6 border border-gray-100 sticky top-20">
            <div className="border-b-2 border-orange-400 pb-4 mb-6">
              <h2 className="font-bold text-2xl text-gray-800 flex items-center gap-2">
                <div className="w-2 h-6 bg-orange-400 rounded-full"></div>
                3. Order Summary
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-600 font-medium">Subtotal</span>
                </div>
                <span className="text-gray-800 font-semibold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-600 font-medium">Tax</span>
                </div>
                <span className="text-gray-800 font-semibold">
                  ${taxOfOrder.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-gray-600 font-medium">Delivery</span>
                </div>
                <span className="text-gray-800 font-semibold">
                  ${delivery.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-4 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl px-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                    <svg
                      className="w-2 h-2 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-bold text-lg">
                    Total Amount
                  </span>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  ${totalPriceOfOrder.toFixed(2)}
                </span>
              </div>
            </div>

            <Link to={"/pay"}>
              <button
                className={`w-full mt-6 px-6 py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl font-bold text-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 ${
                  !submit || cartItems.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!submit || cartItems.length === 0}
              >
                {cartItems.length === 0 ? "Cart is Empty" : "Pay Now"}
                <svg
                  className="w-5 h-5 inline-block ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
