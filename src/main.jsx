import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainRouter } from "./components/Router/MainRouter.jsx";
import { TotalPriceProvider } from "./context/FullPriceContext.jsx";
import { AuthProvider } from "./context/AuthUserContext.jsx";
import { FormOfOrderProvider } from "./context/FormOfOrderContext.jsx";
import { PayProvider } from "./context/PayContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TotalPriceProvider>
      <AuthProvider>
        <FormOfOrderProvider>
          <PayProvider>
            <MainRouter />
          </PayProvider>
        </FormOfOrderProvider>
      </AuthProvider>
    </TotalPriceProvider>
  </StrictMode>
);
