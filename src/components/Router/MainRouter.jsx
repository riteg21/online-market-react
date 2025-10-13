import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { App } from "../App";
import { BackendError } from "../payment/404/404";
import { ErrorNoRegister } from "../ErrorNoRegister/ErrorNoRegister";

export function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/404" element={<BackendError />} />
          <Route path="/please-sign" element={<ErrorNoRegister />} />
        </Route>
      </Routes>
    </Router>
  );
}
