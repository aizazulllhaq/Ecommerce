import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AdminLogoutAsync, selectLoggedInAdminToken } from "../adminSlice";

const AdminLogout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInAdminToken);

  useEffect(() => {
    dispatch(AdminLogoutAsync());
  }, []);

  if (!user) return <Navigate to={"/admin/login"} replace={true} />;
};

export default AdminLogout;
