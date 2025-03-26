"use client";

import { DynamicForm } from "@/components/organisms";
import { SIGNUP_FORM_FIELDS } from "@/constants";
import Link from "next/link";
import React from "react";

const SignUp = () => {
   const handleSingup = (data: any) => {
      console.log(data);
   };
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
               submitButtonText={"Create Account"}
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
