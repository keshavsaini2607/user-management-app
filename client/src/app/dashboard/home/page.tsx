"use client";
import FileUploader from "@/components/atoms/FileUploader";
import { useUserStore } from "@/state/user-store";
import React from "react";

const HomePage = () => {
   const { user } = useUserStore();
   return (
      <div className="flex flex-col">
         <div className="flex flex-col mb-4">
            <span className="text-gray-700 font-semibold">
               Hi, {user?.username}
            </span>
            <span>
               Upload your files here and chat with AI to get insights from your
               files
            </span>
         </div>
         <FileUploader />
      </div>
   );
};

export default HomePage;
