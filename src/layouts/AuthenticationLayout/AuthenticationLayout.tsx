import Footer from "src/components/Footer";
import { AuthenticationNavbar } from "src/components/Navbar";

type RegisterLayoutProps = {
  children?: React.ReactNode;
};

const AuthenticationLayout = ({ children }: RegisterLayoutProps) => {
  return (
    <div>
      <AuthenticationNavbar></AuthenticationNavbar>
      <div className="h-[700px] bg-primary">
        <div className="mx-auto max-w-7xl bg-shopee-pattern bg-cover bg-no-repeat px-4">{children}</div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AuthenticationLayout;
