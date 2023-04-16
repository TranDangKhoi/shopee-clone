import { useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";
import AuthenticationLayout from "src/layouts/AuthenticationLayout";
import CartLayout from "src/layouts/CartLayout";
import MainLayout from "src/layouts/MainLayout";
import UserLayout from "src/layouts/UserLayout";
import Cart from "src/pages/Cart";
import Login from "src/pages/Login";
import ProductDetails from "src/pages/ProductDetails";
import Register from "src/pages/Register";
import ChangePassword from "src/pages/User/pages/ChangePassword";
import Profile from "src/pages/User/pages/Profile";
import ProductList from "../pages/ProductList";
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.login}></Navigate>;
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.home}></Navigate>;
}

export default function useRoutesElement() {
  const routeElements = useRoutes([
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList></ProductList>
        </MainLayout>
      ),
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetails></ProductDetails>
        </MainLayout>
      ),
    },
    {
      path: "",
      element: <ProtectedRoute></ProtectedRoute>,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart></Cart>
            </CartLayout>
          ),
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout></UserLayout>
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile></Profile>,
            },
            {
              path: path.changePassword,
              element: <ChangePassword></ChangePassword>,
            },
          ],
        },
      ],
    },
    {
      path: "",
      element: <RejectedRoute></RejectedRoute>,
      children: [
        {
          path: path.login,
          element: (
            <AuthenticationLayout>
              <Login></Login>
            </AuthenticationLayout>
          ),
        },
        {
          path: path.register,
          element: (
            <AuthenticationLayout>
              <Register></Register>
            </AuthenticationLayout>
          ),
        },
      ],
    },
  ]);
  return routeElements;
}
