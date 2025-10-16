import { FilterData } from "../../../data/filter.data";
import { useState } from "react";

export const Filter = ({ setFilterCategory }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const handleCategory = (filterSelect) => {
    if (activeCategory === filterSelect) {
      setActiveCategory(null);
      setFilterCategory(null);
    } else {
      setActiveCategory(filterSelect);
      setFilterCategory(filterSelect);
    }
  };
  return (
    <div className="mt-8">
      <div className="flex flex-row gap-4 flex-wrap justify-center">
        {FilterData.map((select) => (
          <button
            className={`relative rounded-xl px-5 py-2.5 me-5 transition-all duration-400 ease-out transform hover:scale-105 group overflow-hidden
          ${
            activeCategory === select.category
              ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-400/30 scale-105"
              : "bg-white/70 backdrop-blur-sm text-gray-700 shadow-md shadow-gray-200/20 hover:shadow-orange-200/30 border border-gray-100/60"
          }
        `}
            key={select.id}
            onClick={() => handleCategory(select.category)}
          >
            {activeCategory !== select.category && (
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            )}

            <span
              className={`relative z-10 text-sm font-semibold tracking-wide transition-colors duration-300
          ${
            activeCategory === select.category
              ? "text-white drop-shadow-sm"
              : "text-gray-700 group-hover:text-orange-600"
          }`}
            >
              {select.category}
            </span>

            <div
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 transition-all duration-300 rounded-full
          ${
            activeCategory === select.category
              ? "bg-white scale-100"
              : "bg-orange-300 scale-0 group-hover:scale-100 group-hover:bg-orange-400"
          }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
