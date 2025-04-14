import { UserTable } from "@/components/molecules";
import React from "react";

const UserManagement = () => {
   return (
      <div className="overflow-scroll w-screen md:w-auto">
         <UserTable />
      </div>
   );
};

export default UserManagement;
