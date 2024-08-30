import React, { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "./Pages/PageNotFound";
import UserOrdersPage from "./Pages/UserOrdersPage";
import UserProfilePage from "./Pages/UserProfilePage";
import AdminHomePage from "./Pages/AdminHomePage";
import AdminAddProductPage from "./Pages/AdminAddProductPage";
import ProtectedAdmin from "./Features/Auth/Components/ProtectedAdmin";
import AdminOrdersPage from "./Pages/AdminOrdersPage";
// import Footer from "./Features/Common/Footer";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import AdminLogin from "./Features/Admin/Components/AdminLogin";
import { checkAuthAsync, selectCheckAuth } from "./Features/Admin/adminSlice";

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
  const checkAuth = useSelector(selectCheckAuth);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  const router = createBrowserRouter([
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
      path: "/profile",
      element: (
        <ProtectedAdmin>
          <UserProfilePage />
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
