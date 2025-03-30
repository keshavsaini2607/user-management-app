"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
   isOpen: boolean;
   onClose: () => void;
   fileId?: string;
}

const LoaderModal: React.FC<Props> = ({ isOpen, onClose, fileId }) => {
   const router = useRouter();
   const handleRedirect = () => {
      if (fileId) {
         router.push(`/dashboard/chat/${fileId}`);
      }
   };
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="bg-white z-50 border-0" removeCloseIcon>
            <DialogTitle>Chat with your uploaded file using AI Bot</DialogTitle>
            <div className="flex flex-row items-center gap-4">
               <Button onClick={handleRedirect} className="bg-blue-500 text-white cursor-pointer">
                  <Bot />
                  Chat with AI
               </Button>
               <Button onClick={onClose} className="border border-blue-500 text-blue-500 cursor-pointer">Not Now</Button>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default LoaderModal;
