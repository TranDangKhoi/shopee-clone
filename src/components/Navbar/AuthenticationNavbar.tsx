import React from "react";
import { Link } from "react-router-dom";
import ShoppeeLogoIcon from "../Icon/ShoppeeLogoIcon";

const AuthenticationNavbar = () => {
  return (
    <header className="bg-white py-5">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-end">
          <Link to="/">
            <ShoppeeLogoIcon fillColor="primary"></ShoppeeLogoIcon>
          </Link>
          <div className="ml-5 text-xl lg:text-2xl">Đăng ký</div>
        </nav>
      </div>
    </header>
  );
};

export default AuthenticationNavbar;
