"use client";

import { DynamicForm } from "@/components/organisms";
import { SIGNUP_FORM_FIELDS } from "@/constants";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { useApiMutation } from "@/hooks/useApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const SignUp = () => {
   const { mutate, data, error, isPending } = useApiMutation("POST", API_ENDPOINTS.SIGNUP);
   const router = useRouter();
   const handleSingup = async (data: any) => {
      try {
         mutate(data);
      } catch (error) {
         console.error("Login failed:", error);
      }
   };

   useEffect(() => {
      if (data && data.id) {
         toast("Account created successfully. Please login to continue.");
         router.replace("/auth/signin");
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
                  Create an account
               </h2>
            </div>
            <DynamicForm
               formFields={SIGNUP_FORM_FIELDS}
               onSubmit={handleSingup}
               submitButtonText={isPending ? "Loading" : "Create Account"}
            />
            <div className="grid place-items-end">
               <span className="text-sm font-semibold">
                  Already have an account?{" "}
                  <Link href={"/auth/signin"} className="text-blue-500">
                     Log-In
                  </Link>
               </span>
            </div>
         </div>
      </div>
   );
};

export default SignUp;
