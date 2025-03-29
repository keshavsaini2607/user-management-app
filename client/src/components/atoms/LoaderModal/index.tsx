import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";

interface Props {
   isOpen: boolean;
   onClose: () => void;
}

const LoaderModal: React.FC<Props> = ({ isOpen, onClose }) => {
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="bg-white z-50 border-0" removeCloseIcon>
            <DialogTitle>Uploading File</DialogTitle>
         </DialogContent>
      </Dialog>
   );
};

export default LoaderModal;
