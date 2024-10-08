import React from "react";
import Navbar from "../Features/Navbar/Navbar";
import AdminOrders from "../Features/Admin/Components/AdminOrders";

const AdminOrdersPage = () => {
  return (
    <Navbar>
      <AdminOrders />
    </Navbar>
  );
};

export default AdminOrdersPage;
