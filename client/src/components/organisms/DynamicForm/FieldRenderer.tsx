import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IFormField } from "@/constants/formTypes";
import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface Props {
   field: IFormField;
   register: UseFormRegister<FieldValues>;
   errors: FieldErrors<FieldValues>;
}

const FieldRenderer: React.FC<Props> = ({ field, register, errors }) => {
   const [showPassword, setShowPassword] = useState(false);

   switch (field.type) {
      case "text":
      case "email":
         return (
            <div className="flex flex-col gap-1">
               <Label className="text-gray-600">{field.label}</Label>
               <Input
                  {...register(field.name, field.validation)}
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  className="outline-none border active:border active:border-blue-400 border-gray-300 rounded-md px-3 py-2 w-full"
               />
               {errors && errors[field.name] && (
                  <p className="text-red-500 text-sm">
                     {String(errors[field.name]?.message || "")}
                  </p>
               )}
            </div>
         );
      case "password":
         return (
            <div className="flex flex-col gap-1">
               <Label className="text-gray-600">{field.label}</Label>
               <div className="relative">
                  <Input
                     {...register(field.name, field.validation)}
                     type={showPassword ? "text" : "password"}
                     placeholder={field.placeholder}
                     name={field.name}
                     className="outline-none border active:border active:border-blue-400 border-gray-300 rounded-md px-3 py-2 w-full pr-10"
                  />
                  <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
               </div>
               {errors && errors[field.name] && (
                  <p className="text-red-500 text-sm">
                     {String(errors[field.name]?.message || "")}
                  </p>
               )}
            </div>
         );
   }
};

export default FieldRenderer;
