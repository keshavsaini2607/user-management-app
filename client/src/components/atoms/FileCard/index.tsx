import { Button } from "@/components/ui/button";
import { Bot, File, Trash } from "lucide-react";
import React from "react";

const FileCard = () => {
   return (
      <div className="p-4 rounded bg-white shadow-sm min-w-[300px] w-max">
         <div className="flex items-center space-x-2">
            <File
               className="text-blue-600 bg-blue-100 rounded p-1"
               width={30}
               height={30}
            />
            <span>Keshav_Resume.pdf</span>
         </div>
         <div className="border-b border-gray-200 space-y-4 mt-4"></div>
         <div className="mt-3">
            <span className="text-sm text-gray-600 font-semibold">
               File Uploaded On: {new Date().toDateString()}
            </span>
         </div>
         <div className=" my-4"></div>
         <footer className="flex items-center gap-4">
            <Button className="bg-blue-500 cursor-pointer">
               <Bot className="text-white" />
            </Button>
            <Button className="bg-red-500 cursor-pointer">
               <Trash className="text-white" />
            </Button>
         </footer>
      </div>
   );
};

export default FileCard;
