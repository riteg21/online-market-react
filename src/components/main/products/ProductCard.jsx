import { useState } from "react";
import { useTotalPrice } from "../../../context/FullPriceContext";
import { ButtonOfCount } from "./ButtonOfCount";

export function ProductCard({ image, name, price, description, id }) {
  const [countProduct, setCountProduct] = useState(0);

  const { addToTotal, updateTotal, removeFromTotal } = useTotalPrice();

  const handleIncrement = () => {
    const newCount = countProduct + 1;
    const newTotal = newCount * price;
    const oldTotal = countProduct * price;

    if (countProduct === 0) {
      addToTotal(price);
    } else {
      updateTotal(oldTotal, newTotal);
    }

    return setCountProduct(newCount);
  };
  const handleDecrement = () => {
    if (countProduct > 0) {
      const newCount = countProduct - 1;
      const oldTotal = countProduct * price;

      if (newCount === 0) {
        removeFromTotal(oldTotal);
      } else {
        const newTotal = newCount * price;
        updateTotal(oldTotal, newTotal);
      }
      return setCountProduct(newCount);
    }
  };
  console.log(countProduct);
  return (
    <div
      className="max-w-sm bg-white  rounded-lg shadow-md m-6 shadow-orange-100"
      key={id}
    >
      <img className="rounded-t-lg w-auto h-50" src={image} alt="" />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 ">
          {name}
        </h5>
        <p className="mb-3 font-normal text-gray-400 ">{description}</p>
        <span className="text-3xl font-extrabold text-orange-300">
          ${price}
        </span>
        <ButtonOfCount
          countProduct={countProduct}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
      </div>
    </div>
  );
}
