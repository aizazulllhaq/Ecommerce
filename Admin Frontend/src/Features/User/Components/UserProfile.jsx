import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminInfoAsync, selectAdminInfo } from "../../Admin/adminSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAdminInfo);

  useEffect(() => {
    dispatch(getAdminInfoAsync());
  }, []);

  return (
    <>
      {user && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white py-2 mt-10">
          <h1 className="text-2xl font-bold">Name : {user.name}</h1>
          <h1 className="text-xl font-semibold text-red-800">
            Email : {user.email} and Role : {user.role}
          </h1>
        </div>
      )}
    </>
  );
};

export default UserProfile;
