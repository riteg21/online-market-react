export const ErrorNoRegister = () => {
  return (
    <div className="flex justify-center items-center min-h-screen animate-none">
      <img
        src="/lock-withoutRegister.svg"
        alt=""
        className="w-140 h-auto mb-10"
      />
      <div className="ms-10">
        <p className="mb-10 font-extrabold leading-none tracking-tight text-gray-500 text-6xl ">
          You are not registered.
        </p>
        <p className="mb-10 text-2xl font-medium text-gray-400">
          Please sign up and return to your shopping.
        </p>
      </div>
    </div>
  );
};
