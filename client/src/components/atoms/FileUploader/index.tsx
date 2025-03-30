"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Spinner from "../Spinner";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/api/upload";
import LoaderModal from "../LoaderModal";

interface FileUploaderProps {
   onFileSelect?: (file: File) => void;
   accept?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
   onFileSelect,
   accept = "application/pdf",
}) => {
   const { isPending, data, error, mutate } = useMutation({
      mutationFn: (formData: FormData) => uploadFile(formData),
   });

   console.log({ data });
   const [isDragging, setIsDragging] = useState(false);
   const [file, setFile] = useState<File | null>(null);
   const [showLoaderModal, setShowLoaderModal] = useState(false);

   const handleDrag = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
         setIsDragging(true);
      } else if (e.type === "dragleave") {
         setIsDragging(false);
      }
   }, []);

   const handleDrop = useCallback(
      (e: React.DragEvent) => {
         e.preventDefault();
         e.stopPropagation();
         setIsDragging(false);

         const files = Array.from(e.dataTransfer.files);
         if (files && files[0]) {
            setFile(files[0]);
            onFileSelect?.(files[0]);
         }
      },
      [onFileSelect]
   );

   const handleFileInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         const files = e.target.files;
         if (files && files[0]) {
            setFile(files[0]);
            onFileSelect?.(files[0]);
         }
      },
      [onFileSelect]
   );

   const handleUpload = useCallback(() => {
      if (file) {
         const formData = new FormData();
         formData.append("file", file);
         console.log("Uploading file:", file.name);
         for (const pair of formData.entries()) {
            console.log("pair", pair[0], pair[1]); // Ensure file is present
         }
         mutate(formData);
      }
   }, [file, mutate]);

   useEffect(() => {
      if (data) {
         toast.success("File uploaded successfully");
         setShowLoaderModal(true);
         setFile(null);
      }
   }, [data]);

   useEffect(() => {
      if (error) {
         console.log(error);
         toast.error(error.response.data.message || "Error uploading file");
      }
   }, [error]);

   return (
      <div
         className={cn(
            "w-[60%] p-6 border-2 border-dashed mx-auto rounded-lg cursor-pointer transition-colors",
            "flex flex-col items-center justify-center gap-4",
            isDragging
               ? "border-blue-500 bg-blue-50"
               : "border-gray-300 hover:border-blue-500"
         )}
         onDragEnter={handleDrag}
         onDragLeave={handleDrag}
         onDragOver={handleDrag}
         onDrop={handleDrop}
      >
         <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileInput}
            id="file-upload"
         />
         <label
            htmlFor="file-upload"
            className="flex flex-col items-center cursor-pointer"
         >
            <Upload
               size={40}
               className={cn(
                  "mb-2 transition-colors",
                  isDragging ? "text-blue-500" : "text-gray-400"
               )}
            />
            <p className="text-sm text-gray-600 text-center">
               {file ? (
                  <>Selected file: {file.name}</>
               ) : (
                  <>
                     <span className="font-semibold">Click to upload</span> or
                     drag and drop
                     <br />
                     PDF (up to 10MB)
                  </>
               )}
            </p>
         </label>
         {file && (
            <Button
               className="bg-blue-500 text-white cursor-pointer"
               disabled={isPending}
               onClick={handleUpload}
            >
               Upload File
            </Button>
         )}

         {isPending && (
            <div>
               <Spinner loading={isPending} />
               <span className="text-blue-500 font-semibold text-sm mt-3">
                  Uploading your file please wait...
               </span>
            </div>
         )}

         <LoaderModal 
            isOpen={showLoaderModal}
            onClose={() => setShowLoaderModal(false)}
            fileId={data?.data?.fileId}
         />
      </div>
   );
};

export default FileUploader;
