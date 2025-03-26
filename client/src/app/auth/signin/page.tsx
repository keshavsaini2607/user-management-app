"use client";

import React from "react";
import { useAuthStore } from "@/state/auth-store";
import { useRouter } from "next/navigation";
import { DynamicForm } from "@/components/organisms";
import { LOGIN_FORM_FIELDS } from "@/constants";
import Link from "next/link";

const SignIn = () => {
    const { login } = useAuthStore();
    const router = useRouter();

   const handleLogin = (data: any) => {
      console.log(data);
      const dummyToken = "dummy-jwt-token";
      login(dummyToken);
      router.push("/");
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
            <div>
               <h2 className="mt-6 text-center text-2xl font-semibold text-gray-700">
                  Sign in to your account
               </h2>
            </div>
            <DynamicForm
               formFields={LOGIN_FORM_FIELDS}
               onSubmit={handleLogin}
               submitButtonText="Login"
            />
            <div className="grid place-items-end">
               <span className="text-sm font-semibold">
                  New here?{" "}
                  <Link href={"/auth/signup"} className="text-blue-500">
                     Sign-Up
                  </Link>
               </span>
            </div>
         </div>
      </div>
   );
};

export default SignIn;
