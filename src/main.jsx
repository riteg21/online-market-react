import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainRouter } from "./components/Router/MainRouter.jsx";
import { TotalPriceProvider } from "./context/FullPriceContext.jsx";
import { AuthProvider } from "./context/AuthUserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TotalPriceProvider>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </TotalPriceProvider>
  </StrictMode>
);
