"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/state/auth-store";
import React from "react";

const Navbar = () => {
   const { logout } = useAuthStore();
   
   return (
      <nav className="p-4 px-6 self-end flex items-center justify-between border-b border-b-gray-300">
         <span className="text-2xl font-semibold ">
            <span className="text-blue-400">Doc</span>.ai
         </span>
         <div>
            <Button className="bg-blue-400 text-white cursor-pointer" onClick={logout}>
               Logout
            </Button>
         </div>
      </nav>
   );
};

export default Navbar;
