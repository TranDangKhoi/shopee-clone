import { useRoutes } from "react-router-dom";
import RegisterLayout from "src/layouts/RegisterLayout";
import Login from "src/pages/Login";
import Register from "src/pages/Register";
import ProductList from "../pages/ProductList";

export default function useRoutesElement() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: <ProductList></ProductList>,
    },
    {
      path: "/login",
      element: (
        <RegisterLayout>
          <Login></Login>
        </RegisterLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <RegisterLayout>
          <Register></Register>
        </RegisterLayout>
      ),
    },
  ]);
  return routeElements;
}
