import Footer from "src/components/Footer";
import { AuthenticationNavbar } from "src/components/Navbar";

type RegisterLayoutProps = {
  children?: React.ReactNode;
};

const AuthenticationLayout = ({ children }: RegisterLayoutProps) => {
  return (
    <div>
      <AuthenticationNavbar></AuthenticationNavbar>
      <div className="h-full bg-primary lg:h-[650px]">
        <div className="container lg:bg-shopee-pattern lg:bg-no-repeat">{children}</div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AuthenticationLayout;
