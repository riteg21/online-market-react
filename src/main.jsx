import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainRouter } from "./components/Router/MainRouter.jsx";
import { TotalPriceProvider } from "./context/FullPriceContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TotalPriceProvider>
      <MainRouter />
    </TotalPriceProvider>
  </StrictMode>
);
