import React from "react";
import Navbar from "../Features/Navbar/Navbar";
import AdminProductList from "../Features/Admin/Components/AdminProductList";

const AdminHomePage = () => {
  return (
    <Navbar>
      <AdminProductList />
    </Navbar>
  );
};

export default AdminHomePage;
