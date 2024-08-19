import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authenticationSlice";
import { selectUserInfo } from "../../User/userSlice";

const ProtectedAdmin = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const user = useSelector(selectUserInfo);

  if (!loggedInUser) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }

  if (user && user.role !== "ADMIN")
    return <Navigate to={"/"} replace={true} />;

  return children;
};
export default ProtectedAdmin;
