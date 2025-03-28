"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/state/auth-store";
import { useRouter } from "next/navigation";
import { DynamicForm } from "@/components/organisms";
import { LOGIN_FORM_FIELDS } from "@/constants";
import Link from "next/link";
import { useApiMutation } from "@/hooks/useApi";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { toast } from "sonner";

const SignIn = () => {
   const { mutate, isPending, error, data } = useApiMutation(
      "POST",
      API_ENDPOINTS.SIGNIN
   );
   const { login } = useAuthStore();
   const router = useRouter();

   const handleLogin = async (formData: any) => {
      try {
         mutate(formData);
      } catch (error) {
         console.error("Login failed:", error);
      }
   };

   useEffect(() => {
      if (data && data?.backendTokens?.token) {
         console.log("data", data);
         toast("Login successful");
         login(data?.backendTokens?.token);
         router.push("/");
      }
   }, [data]);

   useEffect(() => {
      if (error) {
         toast(error?.response?.data?.message || "Something went wrong");
      }
   }, [error]);

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
               submitButtonText={isPending ? "Loading" : "Login"}
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
