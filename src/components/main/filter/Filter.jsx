import { FilterData } from "../../../data/filter.data";

export const Filter = ({ setFilterCategory }) => {
  const handleCategory = (filterSelect) => {
    setFilterCategory(filterSelect);
  };
  return (
    <div className="mt-10">
      <div className="flex flex-row gap-3">
        {FilterData.map((select) => (
          <button
            className=" bg-transparent rounded-lg shadow-lg mx-3 shadow-orange-100 px-8"
            key={select.id}
            onClick={() => handleCategory(select.category)}
          >
            <h1 className="font-medium text-gray-500 hover:text-gray-800 hover:font-bold">
              {select.category}
            </h1>
          </button>
        ))}
      </div>
    </div>
  );
};
