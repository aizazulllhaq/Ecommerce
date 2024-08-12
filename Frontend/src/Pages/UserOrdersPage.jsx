import React from "react";
import Navbar from "../Features/Navbar/Navbar";
import UserOrders from "../Features/User/Components/UserOrders";

const UserOrdersPage = () => {
  return (
    <Navbar>
        <h1 className="text-2xl">My Orders</h1>
      <UserOrders />
    </Navbar>
  );
};

export default UserOrdersPage;
