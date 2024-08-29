import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {selectLoggedInUser } from "../authenticationSlice";

const Protected = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);

  if (!loggedInUser) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }

  return children;
};

export default Protected;
