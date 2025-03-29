"use client";

import { API_ENDPOINTS } from "@/constants/endpoints";
import { useApiQuery } from "@/hooks/useApi";
import { useUserStore } from "@/state/user-store";
import { ShieldUser, User } from "lucide-react";
import { useEffect } from "react";

export default function Navbar() {
   const { setUser, user } = useUserStore();
   const { data } = useApiQuery("user-profile", API_ENDPOINTS.PROFILE);

   useEffect(() => {
      if (data) {
         setUser(data);
      }
   }, [data]);

   return (
      <nav className="sticky top-0 z-30 w-full shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="flex h-16 items-center px-4 md:px-6">
            <div className="md:hidden w-8" />

            <div className="flex flex-1 items-center gap-2">
               <h2 className="text-lg font-semibold">
                  Role: {user && user.role === "user" ? "User" : "Admin"}
               </h2>
               {user && user.role === "user" ? <User /> : <ShieldUser />}
            </div>
         </div>
      </nav>
   );
}
