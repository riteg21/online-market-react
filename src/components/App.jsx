import { useState, Suspense, lazy } from "react";
import { Loader } from "./loader/Loader";
import { LoginModal } from "./main/products/modal/LoginModal";
const Header = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("./header/Header")), 4000)
    )
);
const Footer = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("./footer/Footer")), 4000)
    )
);

const GamnitProducts = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("./main/products/GamnitProducts")), 4000)
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
        <GamnitProducts
          searchTerm={searchTerm}
          isOpenBaggage={isOpenBaggage}
          setIsOpenBaggage={setIsOpenBaggage}
        />
        <Footer />
      </Suspense>
    </div>
  );
}
