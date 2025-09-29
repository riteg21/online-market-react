import { useState } from "react";
import Header from "./header/Header";
import { Footer } from "./footer/Footer";

import { GamnitProducts } from "./main/products/GamnitProducts";

export function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenBaggage, setIsOpenBaggage] = useState(false);
  const [countProduct, setCountProduct] = useState(0);

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIsOpenBaggage={setIsOpenBaggage}
      />
      <GamnitProducts
        searchTerm={searchTerm}
        isOpenBaggage={isOpenBaggage}
        countProduct={countProduct}
        setCountProduct={setCountProduct}
        setIsOpenBaggage={setIsOpenBaggage}
      />
      <Footer />
    </div>
  );
}
