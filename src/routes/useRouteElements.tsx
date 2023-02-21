import { useRoutes } from "react-router-dom";
import AuthenticationLayout from "src/layouts/AuthenticationLayout";
import MainLayout from "src/layouts/MainLayout";
import Login from "src/pages/Login";
import Register from "src/pages/Register";
import ProductList from "../pages/ProductList";

export default function useRoutesElement() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <ProductList></ProductList>
        </MainLayout>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthenticationLayout>
          <Login></Login>
        </AuthenticationLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <AuthenticationLayout>
          <Register></Register>
        </AuthenticationLayout>
      ),
    },
  ]);
  return routeElements;
}
