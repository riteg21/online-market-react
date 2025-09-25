import { Outlet, useLocation, Link } from "react-router-dom";
import { useState, useMemo } from "react";

export function Layout() {
  const { pathname } = useLocation();

  const isHomePage = useMemo(() => pathname === "/", [pathname]);
  return (
    <div className="pt-8 pl-18 pr-18 justify-center">
      {!isHomePage && (
        <header className=" flex items-center justify-between">
          <Link to="/" className="flex items-center justify-between ">
            <img src="/logo.png" alt="Logo" className="h-14 w-auto me-5" />
            <h1 className="text-3xl mt-5 font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r to-orange-600 from-orange-200">
              Smart Basket
            </h1>
          </Link>
        </header>
      )}
      <Outlet />
    </div>
  );
}
