"use client";
import FileCard from "@/components/atoms/FileCard";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { useApiQuery } from "@/hooks/useApi";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FileInterface } from "@/types/file.interface";
import { useUserStore } from "@/state/user-store";

export const FileList = () => {
   const { setUserFiles } = useUserStore();
   const { isPending, data } = useApiQuery(
      "userfiles",
      API_ENDPOINTS.GET_USER_FILES
   );

   useEffect(() => {
      if (data && data.length) {
         setUserFiles(data);
      }
   }, [data]);

   return (
      <div className="w-full">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {data?.map((file: FileInterface) => (
               <FileCard key={file.id} file={file} />
            ))}
         </div>
      </div>
   );
};
