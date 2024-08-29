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
import { getCartItemByUserIdAsync } from "./Features/Cart/cartSlice";
import Protected from "./Features/Auth/Components/Protected";
import PageNotFound from "./Pages/PageNotFound";
import OrderSuccess from "./Features/Order/OrderSuccess";
import UserOrdersPage from "./Pages/UserOrdersPage";
import UserProfilePage from "./Pages/UserProfilePage";
import Logout from "./Features/Auth/Components/Logout";
import AdminHomePage from "./Pages/AdminHomePage";
import AdminAddProductPage from "./Pages/AdminAddProductPage";
import ProtectedAdmin from "./Features/Auth/Components/ProtectedAdmin";
import AdminOrdersPage from "./Pages/AdminOrdersPage";
// import Footer from "./Features/Common/Footer";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import {
  checkAuthAsync,
  selectCheckAuth,
} from "./Features/Auth/authenticationSlice";
import ForgetPassword from "./Features/Auth/Components/ForgetPassword";
import ResetPassword from "./Features/Auth/Components/ResetPassword";
import AdminLogin from "./Features/Admin/Components/AdminLogin";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.loggedInUserToken);
  const checkAuth = useSelector(selectCheckAuth);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getCartItemByUserIdAsync());
    }
  }, [dispatch, user]);
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
      path: "/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
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
      path: "/admin/login",
      element: <AdminLogin />,
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

  return (
    <>
      {checkAuth && (
        <AlertProvider template={AlertTemplate} {...options}>
          <RouterProvider router={router} />
        </AlertProvider>
      )}
    </>
  );
};

export default App;
