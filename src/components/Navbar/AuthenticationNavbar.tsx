import React from "react";
import { Link, useMatch } from "react-router-dom";
import { path } from "src/constants/path.enum";
import ShopeeLogoIcon from "../Icon/ShopeeLogoIcon";

const AuthenticationNavbar = () => {
  const matchRegister = useMatch("/register");
  const isRegisterPage = Boolean(matchRegister);
  return (
    <header className="bg-white py-5">
      <div className="container">
        <nav className="flex items-end">
          <Link to={path.home}>
            <ShopeeLogoIcon fillColor="primary"></ShopeeLogoIcon>
          </Link>
          <div className="ml-5 text-xl lg:text-2xl">{isRegisterPage ? "Đăng ký" : "Đăng nhập"}</div>
        </nav>
      </div>
    </header>
  );
};

export default AuthenticationNavbar;
