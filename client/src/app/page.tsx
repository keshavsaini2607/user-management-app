"use client";
import { useAuthStore } from "@/state/auth-store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const App = () => {
   const router = useRouter();
   const { isAuthenticated } = useAuthStore();

   useEffect(() => {
      if (!isAuthenticated) {
         router.push("/auth/signin");
      } else {
         router.push("/dashboard/home");
      }
   }, [isAuthenticated]);
   return <div></div>;
};

export default App;
