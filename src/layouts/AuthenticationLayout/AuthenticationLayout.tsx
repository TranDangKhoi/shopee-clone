import { memo } from "react";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer";
import { AuthenticationNavbar } from "src/components/Navbar";

type RegisterLayoutProps = {
  children?: React.ReactNode;
};

const AuthenticationLayoutInner = ({ children }: RegisterLayoutProps) => {
  return (
    <div>
      <AuthenticationNavbar></AuthenticationNavbar>
      <div className="h-full bg-primary lg:h-[650px]">
        <div className="container lg:bg-shopee-pattern lg:bg-no-repeat">
          <Outlet></Outlet>
          {children}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

const AuthenticationLayout = memo(AuthenticationLayoutInner);

export default AuthenticationLayout;
