"use client";
import Spinner from "@/components/atoms/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { useApiQuery } from "@/hooks/useApi";
import { Bot, Send } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const ChatPage = () => {
   const { isPending, data } = useApiQuery(
      "userfiles",
      API_ENDPOINTS.GET_USER_FILES
   );
   const params = useParams();
   const fileId = params.fileId;
   const [currentFile, setCurrentFile] = React.useState<any>(null);

   useEffect(() => {
      if (data) {
         const file = data.find((file: any) => file.id === fileId[0]);
         setCurrentFile(file);
      }
   }, [data]);

   if (isPending) {
      return <Spinner loading={isPending} />;
   }

   const chatStyles = {
      bot: "bg-white p-3 md:p-4 rounded-lg shadow-md self-start max-w-[85%] md:max-w-[70%] text-gray-700",
      user: "bg-blue-500 text-white p-3 md:p-4 rounded-lg shadow-md self-end max-w-[85%] md:max-w-[70%]",
      container: "flex flex-col h-[85vh] bg-gray-50 overflow-hidden",
      header: "bg-blue-500 p-3 md:p-4 rounded-lg z-10 flex-shrink-0",
      main: "flex-1 overflow-hidden px-2 md:px-4 lg:px-6",
      chatWrapper: "h-full overflow-y-auto flex flex-col gap-3 md:gap-4 w-full max-w-5xl mx-auto py-4",
      footer: "bg-white border-t border-gray-200 p-3 md:p-4 flex-shrink-0 w-full",
      inputWrapper: "flex items-center gap-2 md:gap-4 max-w-5xl mx-auto w-full",
   };

   return (
      <div className={chatStyles.container}>
         <header className={chatStyles.header}>
            <div className="flex items-center gap-3 md:gap-4 max-w-5xl mx-auto">
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-50 flex items-center justify-center">
                  <Bot className="w-6 h-6 md:w-7 md:h-7" />
               </div>
               <div>
                  <h2 className="text-white text-lg md:text-xl font-semibold truncate">
                     Chat with {currentFile?.filename || 'Bot'}
                  </h2>
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
                  <div key={index} className={index % 2 === 0 ? chatStyles.user : chatStyles.bot}>
                     <p>{index % 2 === 0 
                        ? "This is a user message to show scrolling behavior" 
                        : "This is a bot response to demonstrate the scroll functionality"}</p>
                  </div>
               ))}
            </div>
         </main>

         <footer className={chatStyles.footer}>
            <div className={chatStyles.inputWrapper}>
               <Input
                  placeholder="What would you like to know?"
                  className="text-base md:text-lg h-12 md:h-14"
               />
               <Button 
                  className="bg-blue-500 hover:bg-blue-600 h-12 md:h-14 aspect-square flex items-center justify-center"
               >
                  <Send className="w-6 h-6 md:w-7 md:h-7 text-white" />
               </Button>
            </div>
         </footer>
      </div>
   );
};

export default ChatPage;