import React from "react";
import { Link } from "react-router-dom";
import ShopeeLogoIcon from "../Icon/ShopeeLogoIcon";

const AuthenticationNavbar = () => {
  return (
    <header className="bg-white py-5">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-end">
          <Link to="/">
            <ShopeeLogoIcon fillColor="primary"></ShopeeLogoIcon>
          </Link>
          <div className="ml-5 text-xl lg:text-2xl">Đăng ký</div>
        </nav>
      </div>
    </header>
  );
};

export default AuthenticationNavbar;
