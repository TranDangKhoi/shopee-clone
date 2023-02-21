import React from "react";
import Footer from "src/components/Footer";
import { MainNavbar } from "src/components/Navbar";
type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <MainNavbar></MainNavbar>
      {children}
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
