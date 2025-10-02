export const FilterSelect = ({ id, category }) => {
  return (
    <button
      className=" bg-transparent rounded-lg shadow-lg m-6 shadow-orange-100 px-10"
      key={id}
    >
      <h1 className="font-medium text-gray-500 hover:text-gray-800 hover:font-bold">
        {category}
      </h1>
    </button>
  );
};
