import { useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";
import AuthenticationLayout from "src/layouts/AuthenticationLayout";
import CartLayout from "src/layouts/CartLayout";
import MainLayout from "src/layouts/MainLayout";
import Cart from "src/pages/Cart";
import Login from "src/pages/Login";
import ProductDetails from "src/pages/ProductDetails";
import Profile from "src/pages/Profile";
import Register from "src/pages/Register";
import ProductList from "../pages/ProductList";
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>;
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Outlet></Outlet> : <Navigate to="/"></Navigate>;
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
          path: path.profile,
          element: (
            <MainLayout>
              <Profile></Profile>
            </MainLayout>
          ),
        },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart></Cart>
            </CartLayout>
          ),
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
