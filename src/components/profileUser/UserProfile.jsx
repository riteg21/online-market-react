import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthUserContext";
import { useProfileInfo } from "../../context/ProfileInfoContext";
import Card from "../payment/payProcess/payCard";
import { HistoryOfOrders } from "./HistoryOfOrders";

export const UserProfile = () => {
  const { user } = useAuth();
  const { userInfoHandler, showProfileInfo } = useProfileInfo();
  const [showSuccess, setShowSuccess] = useState(false);

  const [userPersonalInfo, setUserPersonalInfo] = useState();

  useEffect(() => {
    const storageUserInfo = localStorage.getItem("userInfo");

    if (storageUserInfo) {
      try {
        setUserPersonalInfo(JSON.parse(storageUserInfo));
      } catch (e) {
        console.error("Failed to parse userInfo from localStorage:", e);
      }
    }
  }, []);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      surname: "",
      email: user?.email || "",
      phone: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const [avatar, setAvatar] = useState("user.svg");
  const avatarFileInput = useRef(null);

  useEffect(() => {
    if (userPersonalInfo && Object.keys(userPersonalInfo).length > 0) {
      reset(userPersonalInfo);
    }
  }, [userPersonalInfo, reset]);

  const handleAvatarClick = () => {
    avatarFileInput.current?.click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const avatarURL = URL.createObjectURL(file);
      setAvatar(avatarURL);
    }
  };

  const handleSubmitUserForm = (data) => {
    userInfoHandler(data, true);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const formatExpiryDate = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .substring(0, 5);
  };

  return (
    <div className="px-20 py-15">
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

      <div className="flex justify-baseline">
        <div className="sticky top-20">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={avatarFileInput}
            onChange={handleAvatarChange}
          />
          <div className="cursor-pointer" onClick={() => handleAvatarClick()}>
            <img
              src={avatar}
              alt="User"
              className="w-50 h-50 rounded-full bg-orange-200 hover:bg-orange-300 hover:ring-6 hover:ring-offset-2 hover:ring-orange-400 transition-all duration-300 transform hover:-translate-y-1"
            />
          </div>
        </div>

        <div className="ms-40">
          <div className="flex ">
            {showProfileInfo === true ? (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-10 border border-gray-100 hover:border-orange-400 transition-all duration-300 transform hover:-translate-y-1 shadow-xl">
                {/* Личная информация */}
                <div className="space-y-6 lg:space-y-8">
                  <div className="pb-3 border-b-2 border-orange-500">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
                      Your account details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {/* Name */}
                    <div className="space-y-3">
                      <label className="text-sm lg:text-base font-medium text-gray-500 tracking-wider">
                        Name
                      </label>
                      <div className="p-4 lg:p-5 bg-gray-50/50 rounded-xl border border-gray-100">
                        <p className="text-lg lg:text-xl font-semibold text-gray-800">
                          {userPersonalInfo?.name || "Not set"}
                        </p>
                      </div>
                    </div>

                    {/* Surname */}
                    <div className="space-y-3">
                      <label className="text-sm lg:text-base font-medium text-gray-500 tracking-wider">
                        Surname
                      </label>
                      <div className="p-4 lg:p-5 bg-gray-50/50 rounded-xl border border-gray-100">
                        <p className="text-lg lg:text-xl font-semibold text-gray-800">
                          {userPersonalInfo?.surname || "Not set"}
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-sm lg:text-base font-medium text-gray-500 tracking-wider">
                        Email address
                      </label>
                      <div className="p-4 lg:p-5 bg-gray-50/50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 lg:p-3 bg-blue-50 rounded-lg">
                            <svg
                              className="w-6 h-6 lg:w-7 lg:h-7 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                          <p className="text-lg lg:text-xl font-semibold text-gray-800">
                            {userPersonalInfo?.email ||
                              user?.email ||
                              "Not set"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-sm lg:text-base font-medium text-gray-500 tracking-wider">
                        Phone Number
                      </label>
                      <div className="p-4 lg:p-5 bg-gray-50/50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 lg:p-3 bg-green-50 rounded-lg">
                            <svg
                              className="w-6 h-6 lg:w-7 lg:h-7 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="text-lg lg:text-xl font-semibold text-gray-800">
                            {userPersonalInfo?.phone || "Not set"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="pt-8 lg:pt-12">
                    <div className="border-t border-gray-200 pt-8 lg:pt-10">
                      <h4 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6 lg:mb-8">
                        Payment Card
                      </h4>
                      <div className="max-w-2xl">
                        <Card
                          cardNumber={userPersonalInfo?.cardNumber}
                          cardExpiry={userPersonalInfo?.cardExpiry}
                          cardCvc={userPersonalInfo?.cardCvc}
                          cardHolderName={`${userPersonalInfo?.name || ""} ${
                            userPersonalInfo?.surname || ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`rounded-3xl bg-white/90 backdrop-blur-sm px-6 py-6 border shadow-lg transition-all  duration-500 border-gray-100`}
              >
                <div className="border-t-2 border-orange-400 pb-4 mb-6"></div>
                <div className="space-y-6">
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit(handleSubmitUserForm)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* email */}
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
                          placeholder="example@gmail.com"
                          className={`w-90 px-4 py-3 rounded-xl border focus:ring-2 transition-all duration-200 outline-none bg-white/50 ${
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
                      {/* phone */}
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
                              message:
                                "Phone number must be at least 10 digits",
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
                      {/* name */}
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          {...register("name", {
                            required: "Name input is required",
                            minLength: {
                              value: 3,
                              message: "Name must be at least at 3 symbols",
                            },
                          })}
                          type="name"
                          placeholder="Aleksandr"
                          className={`w-full px-4 py-3 rounded-xl border focus:ring-2 transition-all duration-200 outline-none bg-white/50 ${
                            errors.name
                              ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                              : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                          }`}
                        />
                        {errors.name && (
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
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      {/* surname */}
                      <div className="space-y-2">
                        <label
                          htmlFor="surname"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Surname
                        </label>
                        <input
                          {...register("surname", {
                            required: "Surname input is required",
                            minLength: {
                              value: 6,
                              message: "Surname must be at least at 3 symbols",
                            },
                          })}
                          type="surname"
                          placeholder="Santalov"
                          className={`w-full px-4 py-3 rounded-xl border focus:ring-2 transition-all duration-200 outline-none bg-white/50 ${
                            errors.surname
                              ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                              : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                          }`}
                        />
                        {errors.surname && (
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
                            {errors.surname.message}
                          </p>
                        )}
                      </div>
                      {/* Card Number */}
                      <div className="space-y-2">
                        <label
                          htmlFor="cardNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Card Number
                        </label>
                        <input
                          {...register("cardNumber", {
                            required: "Card Number input is required",
                            pattern: {
                              value: /^[\d\s]{19,20}$/,
                              message: "Please enter a valid card number",
                            },
                            onChange: (e) => {
                              e.target.value = formatCardNumber(e.target.value);
                            },
                          })}
                          type="cardNum"
                          placeholder="1234 5678 9012 3456"
                          className={`w-full px-4 py-3 rounded-xl border focus:ring-2 transition-all duration-200 outline-none bg-white/50 ${
                            errors.cardNumber
                              ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                              : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                          }`}
                        />
                        {errors.cardNumber && (
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
                            {errors.cardNumber.message}
                          </p>
                        )}
                      </div>
                      {/* Card Expiry */}
                      <div className="space-y-2">
                        <label
                          htmlFor="cardExpiry"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Expiry Date
                        </label>
                        <input
                          {...register("cardExpiry", {
                            required: "Card Expiry input is required",
                            pattern: {
                              value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                              message:
                                "Please enter a valid expiry date (MM/YY)",
                            },
                            onChange: (e) => {
                              e.target.value = formatExpiryDate(e.target.value);
                            },
                          })}
                          type="cardExp"
                          placeholder="12/21"
                          className={`w-full px-4 py-3 rounded-xl border focus:ring-2 transition-all duration-200 outline-none bg-white/50 ${
                            errors.cardExpiry
                              ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                              : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                          }`}
                        />
                        {errors.cardExpiry && (
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
                            {errors.cardExpiry.message}
                          </p>
                        )}
                      </div>
                      {/* Cvc */}
                      <div className="space-y-2">
                        <label
                          htmlFor="cardCvc"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Card CVC
                        </label>
                        <input
                          {...register("cardCvc", {
                            required: "Card CVC input is required",
                            minLength: {
                              value: 3,
                              message: "Please, write a correct CVC number",
                            },
                          })}
                          type="number"
                          placeholder="122"
                          className={`w-full px-4 py-3 rounded-xl border focus:ring-2 transition-all duration-200 outline-none bg-white/50 ${
                            errors.cardCvc
                              ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                              : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                          }`}
                        />
                        {errors.cardCvc && (
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
                            {errors.cardCvc.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="pt-4 flex justify-center">
                      <button
                        type="submit"
                        disabled={!isValid}
                        className={`px-8 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl font-medium transition-all duration-200 shadow-md transform hover:-translate-y-0.5 ${
                          !isValid
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
            )}
            <div className="ms-20 bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-10 border border-gray-100 hover:border-orange-400 transition-all duration-300 transform hover:-translate-y-1 shadow-xl">
              <div className="space-y-6 lg:space-y-8">
                <div className="pb-3 border-b-2 border-orange-500">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
                    History of your orders
                  </h3>
                </div>
                <div>
                  <HistoryOfOrders />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
