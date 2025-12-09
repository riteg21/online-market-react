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
    <div className="px-4 sm:px-1 lg:px-4 xl:px-10 py-6 sm:py-8 lg:py-12">
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
            <span className="text-sm sm:text-base">
              Data successfully saved!
            </span>
          </div>
        </div>
      )}

      <div className="flex lg:flex-row sm:flex-col gap-8 lg:gap-12">
        <div className="lg:w-2/3 xl:w-7/12">
          <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={avatarFileInput}
                onChange={handleAvatarChange}
              />
              <div
                className="cursor-pointer"
                onClick={handleAvatarClick}
                aria-label="Change profile picture"
              >
                <img
                  src={avatar}
                  alt="User"
                  className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full bg-orange-200 hover:bg-orange-300 hover:ring-4 md:hover:ring-6 hover:ring-offset-2 hover:ring-orange-400 transition-all duration-300 transform hover:-translate-y-1"
                />
              </div>
            </div>

            <div className="flex-1 w-full">
              {showProfileInfo === true ? (
                <div className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 border border-gray-100 hover:border-orange-400 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                  {/* Personal Info */}
                  <div className="space-y-4 md:space-y-6 lg:space-y-8">
                    <div className="pb-3 border-b-2 border-orange-500">
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                        Your account details
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-4">
                      {/* Name */}
                      <div className="space-y-1 md:space-y-2">
                        <label className="text-xs md:text-sm font-medium text-gray-500 tracking-wider">
                          Name
                        </label>
                        <div className="p-2 md:p-3 lg:p-4 bg-gray-50/50 rounded-lg md:rounded-xl border border-gray-100">
                          <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 break-words">
                            {userPersonalInfo?.name || "Not set"}
                          </p>
                        </div>
                      </div>

                      {/* Surname */}
                      <div className="space-y-1 md:space-y-2">
                        <label className="text-xs md:text-sm font-medium text-gray-500 tracking-wider">
                          Surname
                        </label>
                        <div className="p-2 md:p-3 lg:p-4 bg-gray-50/50 rounded-lg md:rounded-xl border border-gray-100">
                          <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 break-words">
                            {userPersonalInfo?.surname || "Not set"}
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="sm:col-span-2 space-y-1 md:space-y-2">
                        <label className="text-xs md:text-sm font-medium text-gray-500 tracking-wider">
                          Email address
                        </label>
                        <div className="p-2 md:p-3 lg:p-4 bg-gray-50/50 rounded-lg md:rounded-xl border border-gray-100">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3">
                            <div className="p-1.5 md:p-2 lg:p-2.5 bg-blue-50 rounded-lg w-fit">
                              <svg
                                className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                            </div>
                            <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 break-all mt-1 sm:mt-0">
                              {userPersonalInfo?.email ||
                                user?.email ||
                                "Not set"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="sm:col-span-2 space-y-1 md:space-y-2">
                        <label className="text-xs md:text-sm font-medium text-gray-500 tracking-wider">
                          Phone Number
                        </label>
                        <div className="p-2 md:p-3 lg:p-4 bg-gray-50/50 rounded-lg md:rounded-xl border border-gray-100">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3">
                            <div className="p-1.5 md:p-2 lg:p-2.5 bg-green-50 rounded-lg w-fit">
                              <svg
                                className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-green-500"
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
                            <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 break-all mt-1 sm:mt-0">
                              {userPersonalInfo?.phone || "Not set"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Section */}
                    <div className="pt-3 md:pt-4 lg:pt-6 border-t border-gray-200">
                      <div className="flex flex-col gap-4 md:gap-6">
                        <div className="flex-1">
                          <h4 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6">
                            Payment Card
                          </h4>
                          <div className="flex justify-center">
                            <Card />
                          </div>
                        </div>
                        <div className="mt-10 flex justify-center">
                          <button className="w-full md:w-auto px-5 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            Change Info
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl md:rounded-2xl lg:rounded-3xl bg-white/90 backdrop-blur-sm p-4 md:p-6 border shadow-lg transition-all duration-500 border-gray-100">
                  <div className="border-t-2 border-orange-400 pb-3 md:pb-4 mb-3 md:mb-4"></div>
                  <div className="space-y-4 md:space-y-6">
                    <form
                      className="space-y-4 md:space-y-6"
                      onSubmit={handleSubmit(handleSubmitUserForm)}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {/* Email */}
                        <div className="sm:col-span-2 space-y-1 md:space-y-2">
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
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                              },
                            })}
                            type="email"
                            placeholder="example@gmail.com"
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border focus:ring-2 transition-all duration-200 outline-none bg-white/50 text-sm md:text-base ${
                              errors.email
                                ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                                : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                            }`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                              <svg
                                className="w-3 h-3 md:w-4 md:h-4"
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

                        {/* Phone */}
                        <div className="space-y-1 md:space-y-2">
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
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border focus:ring-2 transition-all duration-200 outline-none bg-white/50 text-sm md:text-base ${
                              errors.phone
                                ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                                : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                              <svg
                                className="w-3 h-3 md:w-4 md:h-4"
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

                        {/* Name */}
                        <div className="space-y-1 md:space-y-2">
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
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border focus:ring-2 transition-all duration-200 outline-none bg-white/50 text-sm md:text-base ${
                              errors.name
                                ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                                : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                            }`}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                              <svg
                                className="w-3 h-3 md:w-4 md:h-4"
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

                        {/* Surname */}
                        <div className="space-y-1 md:space-y-2">
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
                                value: 3,
                                message:
                                  "Surname must be at least at 3 symbols",
                              },
                            })}
                            type="surname"
                            placeholder="Santalov"
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border focus:ring-2 transition-all duration-200 outline-none bg-white/50 text-sm md:text-base ${
                              errors.surname
                                ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                                : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                            }`}
                          />
                          {errors.surname && (
                            <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                              <svg
                                className="w-3 h-3 md:w-4 md:h-4"
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
                        <div className="space-y-1 md:space-y-2">
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
                                e.target.value = formatCardNumber(
                                  e.target.value
                                );
                              },
                            })}
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border focus:ring-2 transition-all duration-200 outline-none bg-white/50 text-sm md:text-base ${
                              errors.cardNumber
                                ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                                : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                            }`}
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                              <svg
                                className="w-3 h-3 md:w-4 md:h-4"
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
                        <div className="space-y-1 md:space-y-2">
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
                                e.target.value = formatExpiryDate(
                                  e.target.value
                                );
                              },
                            })}
                            type="text"
                            placeholder="12/21"
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border focus:ring-2 transition-all duration-200 outline-none bg-white/50 text-sm md:text-base ${
                              errors.cardExpiry
                                ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                                : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                            }`}
                          />
                          {errors.cardExpiry && (
                            <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                              <svg
                                className="w-3 h-3 md:w-4 md:h-4"
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

                        {/* CVC */}
                        <div className="space-y-1 md:space-y-2">
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
                              maxLength: {
                                value: 4,
                                message: "CVC can be 3 or 4 digits",
                              },
                            })}
                            type="number"
                            placeholder="123"
                            className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border focus:ring-2 transition-all duration-200 outline-none bg-white/50 text-sm md:text-base ${
                              errors.cardCvc
                                ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                                : "border-gray-300 focus:border-orange-400 focus:ring-orange-200"
                            }`}
                          />
                          {errors.cardCvc && (
                            <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                              <svg
                                className="w-3 h-3 md:w-4 md:h-4"
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

                      <div className="pt-3 md:pt-4 flex justify-center">
                        <button
                          type="submit"
                          disabled={!isValid}
                          className={`px-5 md:px-6 lg:px-8 py-2.5 md:py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg font-medium transition-all duration-200 shadow-md transform hover:-translate-y-0.5 text-sm md:text-base w-full sm:w-auto ${
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
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 xl:w-5/12">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 border border-gray-100 hover:border-orange-400 transition-all duration-300 transform hover:-translate-y-1 shadow-lg h-full">
            <div className="space-y-4 md:space-y-6 h-full flex flex-col">
              <div className="pb-3 border-b-2 border-orange-500">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                  History of your orders
                </h3>
              </div>
              <div className="overflow-hidden flex-1">
                <HistoryOfOrders />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
