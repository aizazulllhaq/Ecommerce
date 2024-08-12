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
import UserProfile from "./Features/User/Components/UserProfile";
import UserOrdersPage from "./Pages/UserOrdersPage";
import { getUserInfoAsync, selectUserInfo } from "./Features/User/userSlice";
import UserProfilePage from "./Pages/UserProfilePage";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.loggedInUser);


  useEffect(() => {
    if (user) {
      dispatch(getCartItemByUserIdAsync(user.id));
      dispatch(getUserInfoAsync(user.id));
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
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
