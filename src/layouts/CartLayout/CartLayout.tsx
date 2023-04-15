import React from "react";
import Footer from "src/components/Footer";
import { CartNavbar } from "src/components/Navbar";

type CartLayoutPropsType = {
  children: React.ReactNode;
};

const CartLayout = ({ children }: CartLayoutPropsType) => {
  return (
    <>
      <CartNavbar></CartNavbar>
      {children}
      <Footer></Footer>
    </>
  );
};

export default CartLayout;
