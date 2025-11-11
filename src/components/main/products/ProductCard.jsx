import { useState, useEffect } from "react";
import { useTotalPrice } from "../../../context/FullPriceContext";
import { ButtonOfCount } from "./ButtonOfCount";
import TiltedCard from "../../motion/motionProducts/TiltedCard";

export function ProductCard({ image, name, price, description, id }) {
  const [countProduct, setCountProduct] = useState(0);

  const { addToTotal, updateTotal, removeFromTotal, cartItems } =
    useTotalPrice();

  useEffect(() => {
    const cartItem = cartItems.find((item) => item.id === id);
    if (!cartItem) {
      setCountProduct(0);
    }
  }, [cartItems, id]);

  const product = {
    id,
    image,
    name,
    price,
    description,
  };

  const handleIncrement = () => {
    const newCount = countProduct + 1;
    const newTotal = newCount * price;
    const oldTotal = countProduct * price;

    if (countProduct === 0) {
      addToTotal(price, product);
    } else {
      updateTotal(oldTotal, newTotal, product, newCount);
    }

    setCountProduct(newCount);
  };
  const handleDecrement = () => {
    if (countProduct > 0) {
      const newCount = countProduct - 1;
      const oldTotal = countProduct * price;

      if (newCount === 0) {
        removeFromTotal(oldTotal, product);
      } else {
        const newTotal = newCount * price;
        updateTotal(oldTotal, newTotal, product, newCount);
      }
      setCountProduct(newCount);
    }
  };

  return (
    <div className="p-4">
      <TiltedCard
        imageSrc={image}
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        rotateAmplitude={12}
        scaleOnHover={1.1}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl m-4 border border-white/20">
            <div className="p-6">
              <h5 className="mb-3 text-2xl font-bold text-gray-900">{name}</h5>
              <p className="mb-4 text-gray-600 leading-relaxed">
                {description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-orange-500">
                  ${price}
                </span>
              </div>
              <ButtonOfCount
                countProduct={countProduct}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
              />
            </div>
          </div>
        }
      />
    </div>
  );
}
