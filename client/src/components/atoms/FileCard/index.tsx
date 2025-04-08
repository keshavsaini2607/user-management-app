"use client";
import { Button } from "@/components/ui/button";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { useApiMutation } from "@/hooks/useApi";
import { FileInterface } from "@/types/file.interface";
import { useQueryClient } from "@tanstack/react-query";
import { Bot, File, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
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
   const router = useRouter();

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
      <div className="p-3 sm:p-4 rounded bg-white shadow-sm w-full max-w-[340px] mx-auto">
         <div className="flex items-center space-x-2 overflow-hidden">
            <a href={file.publicUrl} className="flex-shrink-0">
               <File
                  className="text-blue-600 bg-blue-100 rounded p-1"
                  width={24}
                  height={24}
               />
            </a>
            <span className="truncate text-sm sm:text-base">{file.filename}</span>
         </div>
         <div className="border-b border-gray-200 my-3 sm:my-4"></div>
         <div>
            <span className="text-xs sm:text-sm text-gray-600 font-semibold block">
               File Uploaded On: {new Date(file.createdAt).toDateString()}
            </span>
         </div>
         <div className="my-3 sm:my-4"></div>
         <footer className="flex items-center gap-2 sm:gap-4 justify-start">
            <Button
               className="bg-blue-500 hover:bg-blue-600 transition-colors p-2 sm:p-3 flex-1 sm:flex-none"
               onClick={() => router.push(`/dashboard/chat/${file.id}`)}
               aria-label="Chat"
               data-testid="chat-button"
            >
               <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </Button>
            <Button
               className="bg-red-500 hover:bg-red-600 transition-colors p-2 sm:p-3 flex-1 sm:flex-none"
               onClick={handleDelete}
               disabled={isPending}
               aria-label="Delete"
               data-testid="delete-button"
            >
               <Trash className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </Button>
         </footer>
      </div>
   );
};

export default FileCard;
