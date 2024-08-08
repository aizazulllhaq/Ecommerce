import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { loggedInUser } = useSelector((state) => state.auth);

  if (!loggedInUser) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }

  return children;
};

export default Protected;
