import UserTable from "@/components/molecules/UserTable";
import React from "react";

const UserManagement = () => {
   return (
      <div className="overflow-scroll w-screen md:w-auto">
         <UserTable />
      </div>
   );
};

export default UserManagement;
