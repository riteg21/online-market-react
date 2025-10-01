export const DescriptionError = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <img src="/404.svg" alt="" className="w-140 h-auto mb-10" />
      <div className="ms-10">
        <p className="mb-10 font-extrabold leading-none tracking-tight text-gray-500 text-6xl ">
          Our backend is taking a coffee break.
        </p>
        <p className="mb-10 text-2xl font-medium text-gray-400">
          Meanwhile, enjoy the peaceful emptiness
        </p>
      </div>
    </div>
  );
};
