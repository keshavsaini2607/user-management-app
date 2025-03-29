"use client";
import FileCard from "@/components/atoms/FileCard";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { useApiQuery } from "@/hooks/useApi";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FileInterface } from "@/types/file.interface";

const FileList = () => {
   const { isPending, data } = useApiQuery(
      "userfiles",
      API_ENDPOINTS.GET_USER_FILES
   );

   return (
      <div className="w-full">
         {isPending ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {[...Array(4)].map((_, index) => (
                  <Skeleton 
                     key={index} 
                     className="w-full h-[200px] rounded-lg"
                  />
               ))}
            </div>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
               {data?.map((file: FileInterface) => (
                  <FileCard key={file.id} file={file} />
               ))}
            </div>
         )}
      </div>
   );
};

export default FileList;
