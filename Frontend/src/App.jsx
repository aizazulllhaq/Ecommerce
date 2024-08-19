import React, { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Cart from "./Features/Cart/Cart";
import CheckoutPage from "./Pages/CheckoutPage";
import ProductDetail from "./Features/Product-List/Components/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItemByUserIdAsync,
  selectItems,
} from "./Features/Cart/cartSlice";
import Protected from "./Features/Auth/Components/Protected";
import PageNotFound from "./Pages/PageNotFound";
import OrderSuccess from "./Features/Order/OrderSuccess";
import UserOrdersPage from "./Pages/UserOrdersPage";
import { getUserInfoAsync } from "./Features/User/userSlice";
import UserProfilePage from "./Pages/UserProfilePage";
import Logout from "./Features/Auth/Components/Logout";
import AdminHomePage from "./Pages/AdminHomePage";
import AdminAddProductPage from "./Pages/AdminAddProductPage";
import ProtectedAdmin from "./Features/Auth/Components/ProtectedAdmin";
import AdminOrdersPage from "./Pages/AdminOrdersPage";
import Footer from "./Features/Common/Footer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.loggedInUserToken);
  const items = useSelector(selectItems);

  useEffect(() => {
    if (user) {
      dispatch(getCartItemByUserIdAsync());
    }
  }, [dispatch, user]);
  console.log("items form start : ", items);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <HomePage />
        </Protected>
      ),
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/cart",
      element: (
        <Protected>
          <Cart />
        </Protected>
      ),
    },
    {
      path: "/checkout",
      element: (
        <Protected>
          <CheckoutPage />
        </Protected>
      ),
    },
    {
      path: "/product-detail/:id",
      element: (
        <Protected>
          <ProductDetail />
          <Footer />
        </Protected>
      ),
    },
    {
      path: "/order-success/:id",
      element: (
        <Protected>
          <OrderSuccess />
        </Protected>
      ),
    },
    {
      path: "/profile/orders",
      element: (
        <Protected>
          <UserOrdersPage />
        </Protected>
      ),
    },
    {
      path: "/profile",
      element: (
        <Protected>
          <UserProfilePage />
        </Protected>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedAdmin>
          <AdminHomePage />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/admin/add-product",
      element: (
        <ProtectedAdmin>
          <AdminAddProductPage />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/admin/product/:id",
      element: (
        <ProtectedAdmin>
          <AdminAddProductPage />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/admin/orders",
      element: (
        <ProtectedAdmin>
          <AdminOrdersPage />
        </ProtectedAdmin>
      ),
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
