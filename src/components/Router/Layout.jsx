import { Outlet, useLocation, Link } from "react-router-dom";
import { useState, useMemo } from "react";

export function Layout() {
  const { pathname } = useLocation();

  const isHomePage = useMemo(() => pathname === "/", [pathname]);
  return (
    <div className="pt-8 pl-18 pr-18 justify-center">
      {!isHomePage && (
        <header className=" flex items-center justify-between">
          <Link to="/" className="flex justify-between ">
            <img src="/logo.svg" alt="Logo" className="h-15 w-auto me-5" />
            <h1 className="text-4xl mt-4 font-black leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r to-orange-600 from-orange-400">
              Smart Basket
            </h1>
          </Link>
        </header>
      )}
      <Outlet />
    </div>
  );
}
