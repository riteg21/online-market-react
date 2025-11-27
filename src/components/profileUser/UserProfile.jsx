import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthUserContext";
import { useProfileInfo } from "../../context/ProfileInfoContext";

export const UserProfile = () => {
  const { user } = useAuth();
  const { userInfoHandler } = useProfileInfo();
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
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
      cardHolder: "",
    },
  });
  const [avatar, setAvatar] = useState("user.svg");
  const avatarFileInput = useRef(null);

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
    userInfoHandler(data);
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
      <div className=" flex justify-baseline">
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
          <div className="flex justify-center">
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
                            message: "Please enter a valid expiry date (MM/YY)",
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
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
