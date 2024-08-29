import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInAdminToken } from "../../Admin/adminSlice";

const ProtectedAdmin = ({ children }) => {
  const loggedInAdminToken = useSelector(selectLoggedInAdminToken);

  if (!loggedInAdminToken) {
    return <Navigate to={"/admin/login"} replace={true}></Navigate>;
  }

  if (loggedInAdminToken && loggedInAdminToken.role !== "ADMIN")
    return <Navigate to={"/admin/login"} replace={true} />;

  return children;
};
export default ProtectedAdmin;
