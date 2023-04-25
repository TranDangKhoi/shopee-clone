import { useContext, lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";
import AuthenticationLayout from "src/layouts/AuthenticationLayout";
import CartLayout from "src/layouts/CartLayout";
import MainLayout from "src/layouts/MainLayout";
import UserLayout from "src/layouts/UserLayout";

const Login = lazy(() => import("src/pages/Login"));
const Cart = lazy(() => import("src/pages/Cart"));
const NotFound = lazy(() => import("src/pages/NotFound"));
const ProductDetails = lazy(() => import("src/pages/ProductDetails"));
const Register = lazy(() => import("src/pages/Register"));
const ChangePassword = lazy(() => import("src/pages/User/pages/ChangePassword"));
const OrderHistory = lazy(() => import("src/pages/User/pages/OrderHistory"));
const Profile = lazy(() => import("src/pages/User/pages/Profile"));
const ProductList = lazy(() => import("src/pages/ProductList"));

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
          <Suspense>
            <ProductList></ProductList>
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetails></ProductDetails>
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "*",
      element: (
        <MainLayout>
          <Suspense>
            <NotFound></NotFound>
          </Suspense>
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
              <Suspense>
                <Cart></Cart>
              </Suspense>
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
              element: (
                <Suspense>
                  <Profile></Profile>
                </Suspense>
              ),
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword></ChangePassword>
                </Suspense>
              ),
            },
            {
              path: path.orderHistory,
              element: (
                <Suspense>
                  <OrderHistory></OrderHistory>
                </Suspense>
              ),
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
              <Suspense>
                <Login></Login>
              </Suspense>
            </AuthenticationLayout>
          ),
        },
        {
          path: path.register,
          element: (
            <AuthenticationLayout>
              <Suspense>
                <Register></Register>
              </Suspense>
            </AuthenticationLayout>
          ),
        },
      ],
    },
  ]);
  return routeElements;
}
