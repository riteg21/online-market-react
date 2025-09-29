export const ButtonOfCount = ({
  countProduct,
  handleDecrement,
  handleIncrement,
}) => {
  return (
    <div className="flex justify-end-safe pr-1">
      {countProduct !== 0 && (
        <button
          type="button"
          className="text-orange-200 hover:text-white border border-orange-200 hover:bg-orange-300 hover:border-orange-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center me-2"
          onClick={handleDecrement}
        >
          -
        </button>
      )}
      <button
        type="button"
        className={`font-medium rounded-lg text-sm px-5 py-2 text-center focus:outline-none transition-colors
    ${
      countProduct !== 0
        ? "bg-orange-400 text-white border-orange-400"
        : "text-orange-300 hover:text-white border border-orange-300 hover:bg-orange-400 hover:border-orange-400"
    }`}
        onClick={handleIncrement}
      >
        {countProduct !== 0 ? countProduct : "+"}
      </button>
    </div>
  );
};
