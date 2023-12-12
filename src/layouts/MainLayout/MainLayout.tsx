import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer";
import { MainNavbar } from "src/components/Navbar";
type MainLayoutProps = {
  children?: React.ReactNode;
};
const MainLayoutInner = ({ children }: MainLayoutProps) => {
  console.log("MainLayout");
  return (
    <>
      <MainNavbar></MainNavbar>
      {children}
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

const MainLayout = memo(MainLayoutInner);

export default MainLayout;
