import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authenticationSlice";

const ProtectedAdmin = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);

  if (!loggedInUser) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }

  if (loggedInUser && loggedInUser.role !== "ADMIN")
    return <Navigate to={"/"} replace={true} />;

  return children;
};
export default ProtectedAdmin;
