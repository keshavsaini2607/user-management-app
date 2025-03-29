import { Button } from "@/components/ui/button";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { useApiMutation } from "@/hooks/useApi";
import { FileInterface } from "@/types/file.interface";
import { useQueryClient } from "@tanstack/react-query";
import { Bot, File, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";

const FileCard = ({ file }: { file: FileInterface }) => {
   const {
      mutate: deleteFile,
      isPending,
      isSuccess,
      error,
   } = useApiMutation("DELETE", `${API_ENDPOINTS.DELETE_FILE}/${file.id}`);
   const queryClient = useQueryClient();

   const handleDelete = async () => {
      try {
         deleteFile(undefined);
      } catch (error) {
         console.error("Error deleting file:", error);
      }
   };

   useEffect(() => {
      if (isSuccess) {
         toast.success("File deleted successfully");
         queryClient.invalidateQueries(queryClient.getQueryData(["userfiles"]));
      }
   }, [isSuccess]);

   useEffect(() => {
      if (error) {
         toast.error("Error deleting file");
      }
   });

   return (
      <div className="p-4 rounded bg-white shadow-sm w-full sm:w-[300px] md:w-[320px] lg:w-[340px]">
         <div className="flex items-center space-x-2 overflow-hidden">
            <a href={file.publicUrl}>
               <File
                  className="text-blue-600 bg-blue-100 rounded p-1 flex-shrink-0"
                  width={30}
                  height={30}
               />
            </a>
            <span className="truncate">{file.filename}</span>
         </div>
         <div className="border-b border-gray-200 space-y-4 mt-4"></div>
         <div className="mt-3">
            <span className="text-sm text-gray-600 font-semibold block">
               File Uploaded On: {new Date(file.createdAt).toDateString()}
            </span>
         </div>
         <div className="my-4"></div>
         <footer className="flex items-center gap-2 sm:gap-4 justify-start">
            <Button className="bg-blue-500 cursor-pointer w-full sm:w-auto">
               <Bot className="text-white" />
            </Button>
            <Button
               className="bg-red-500 cursor-pointer w-full sm:w-auto"
               onClick={handleDelete}
               disabled={isPending}
            >
               <Trash className="text-white" />
            </Button>
         </footer>
      </div>
   );
};

export default FileCard;
