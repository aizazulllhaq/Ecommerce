import React from "react";
import UserProfile from "../Features/User/Components/UserProfile";
import Navbar from "../Features/Navbar/Navbar";

const UserProfilePage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-2xl">My Profile</h1>
        <UserProfile />
      </Navbar>
    </div>
  );
};

export default UserProfilePage;
