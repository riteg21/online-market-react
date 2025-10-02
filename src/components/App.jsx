import { useState, Suspense, lazy } from "react";
import { Loader } from "./loader/Loader";
import { LoginModal } from "./main/products/modal/LoginModal";
import { Filter } from "./main/filter/Filter";

// const Filter = lazy(
//   () =>
//     new Promise((resolve) =>
//       setTimeout(() => resolve(import("./main/filter/Filter")), 2000)
//     )
// );
const Header = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("./header/Header")), 2000)
    )
);
const Footer = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("./footer/Footer")), 2000)
    )
);

const GamnitProducts = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("./main/products/GamnitProducts")), 2000)
    )
);

export function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenBaggage, setIsOpenBaggage] = useState(false);
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);

  return (
    <div>
      {isOpenLogIn && <LoginModal onClose={() => setIsOpenLogIn(false)} />}
      <Suspense fallback={<Loader />}>
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsOpenBaggage={setIsOpenBaggage}
          setIsOpenLogIn={setIsOpenLogIn}
        />

        <div className="flex justify-between">
          <Filter />
          <GamnitProducts
            searchTerm={searchTerm}
            isOpenBaggage={isOpenBaggage}
            setIsOpenBaggage={setIsOpenBaggage}
          />
        </div>

        <Footer />
      </Suspense>
    </div>
  );
}
