import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "src/pages/User/components/UserSidebar";

const UserLayout = () => {
  return (
    <>
      <UserSidebar></UserSidebar>
      <Outlet></Outlet>
    </>
  );
};

export default UserLayout;
