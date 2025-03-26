import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IFormField } from "@/constants/formTypes";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface Props {
   field: IFormField;
   register: UseFormRegister<FieldValues>;
   errors: FieldErrors<FieldValues>;
}
const FieldRenderer: React.FC<Props> = ({ field, register, errors }) => {
    console.log(errors);
   switch (field.type) {
      case "text":
      case "email":
      case "password":
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
   }
};

export default FieldRenderer;
