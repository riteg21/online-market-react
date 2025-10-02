import { FilterSelect } from "./FilterSelect";
import { FilterData } from "../../../data/filter.data";

export const Filter = () => {
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-2">
        {FilterData.map((select) => (
          <FilterSelect id={select.id} category={select.category} />
        ))}
      </div>
    </div>
  );
};
