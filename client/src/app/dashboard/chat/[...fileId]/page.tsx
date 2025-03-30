"use client";
import Spinner from "@/components/atoms/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
} from "@/components/ui/select";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { useApiQuery } from "@/hooks/useApi";
import { Bot, Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ChatPage = () => {
   const { isPending, data } = useApiQuery(
      "userfiles",
      API_ENDPOINTS.GET_USER_FILES
   );
   const params = useParams();
   const fileId = params.fileId;
   const [currentFile, setCurrentFile] = React.useState<any>(null);
   const router = useRouter();

   console.log("files", data);

   useEffect(() => {
      if (data) {
         const file = data.find((file: any) => file.id === fileId[0]);
         setCurrentFile(file);
      }
   }, [data]);

   if (isPending) {
      return <Spinner loading={isPending} />;
   }

   const getDisplayFilename = (filename: string) => {
      if (!filename) return "Bot";
      const extension = filename.split(".").pop();
      const name = filename.split(".").slice(0, -1).join(".");
      return window.innerWidth < 768
         ? `${name.substring(0, 20)}...${extension}`
         : filename;
   };

   const chatStyles = {
      bot: "bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-md self-start max-w-[90%] sm:max-w-[85%] md:max-w-[70%] text-gray-700 text-sm sm:text-base",
      user: "bg-blue-500 text-white p-2 sm:p-3 md:p-4 rounded-lg shadow-md self-end max-w-[90%] sm:max-w-[85%] md:max-w-[70%] text-sm sm:text-base",
      container:
         "flex flex-col h-[85vh] bg-gray-50 overflow-hidden w-[90vw] md:w-full",
      header: "bg-blue-500 p-2 sm:p-3 md:p-4 rounded-lg z-10 flex-shrink-0",
      main: "flex-1 overflow-hidden px-2 sm:px-3 md:px-4 lg:px-6",
      chatWrapper:
         "h-full overflow-y-auto flex flex-col gap-2 sm:gap-3 md:gap-4 w-full max-w-5xl mx-auto py-2 sm:py-3 md:py-4",
      footer:
         "bg-white border-t border-gray-200 p-2 sm:p-3 md:p-4 flex-shrink-0 w-full",
      inputWrapper:
         "flex items-center gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto w-full",
   };

   return (
      <div className={chatStyles.container}>
         <header className={chatStyles.header}>
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto">
               <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-50 flex items-center justify-center">
                  <Bot className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
               </div>
               <div>
                  <Select onValueChange={(val: string) => router.push(`/dashboard/chat/${val}`)}>
                     <SelectTrigger className="border-none shadow-none cursor-pointer">
                        <h2 className="text-white text-xs md:text-xl font-semibold truncate">
                           Chat with {getDisplayFilename(currentFile?.filename)}
                        </h2>
                     </SelectTrigger>
                     <SelectContent className="border-none bg-white">
                        {data?.map((file: any) => (
                           <SelectItem key={file.id} value={file.id}>
                              {getDisplayFilename(file.filename)}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
            </div>
         </header>

         <main className={chatStyles.main}>
            <div className={chatStyles.chatWrapper}>
               <div className={chatStyles.bot}>
                  <p>Hello, how can I assist you?</p>
               </div>

               <div className={chatStyles.user}>
                  <p>I have a question about your recent purchase.</p>
               </div>

               <div className={chatStyles.bot}>
                  <p>Can you please provide me with the invoice?</p>
               </div>

               {/* Adding more messages to demonstrate scroll */}
               {Array.from({ length: 15 }).map((_, index) => (
                  <div
                     key={index}
                     className={
                        index % 2 === 0 ? chatStyles.user : chatStyles.bot
                     }
                  >
                     <p>
                        {index % 2 === 0
                           ? "This is a user message to show scrolling behavior"
                           : "This is a bot response to demonstrate the scroll functionality"}
                     </p>
                  </div>
               ))}
            </div>
         </main>

         <footer className={chatStyles.footer}>
            <div className={chatStyles.inputWrapper}>
               <Input
                  placeholder="What would you like to know?"
                  className="text-sm sm:text-base md:text-lg h-10 sm:h-12 md:h-14"
               />
               <Button className="bg-blue-500 hover:bg-blue-600 h-10 sm:h-12 md:h-14 aspect-square flex items-center justify-center">
                  <Send className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
               </Button>
            </div>
         </footer>
      </div>
   );
};

export default ChatPage;
