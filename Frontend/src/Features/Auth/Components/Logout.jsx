import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LogoutUserAsync, selectLoggedInUser } from "../authenticationSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(LogoutUserAsync());
  }, []);

  if (!user) return <Navigate to={"/login"} replace={true} />;
};

export default Logout;
