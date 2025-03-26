import { IForm } from "@/constants/formTypes";
import React from "react";
import { useForm } from "react-hook-form";
import FieldRenderer from "./FieldRenderer";
import { Button } from "@/components/ui/button";

const DynamicForm: React.FC<IForm> = ({
   formFields,
   submitButtonText,
   onSubmit,
}) => {
   const { register, handleSubmit, formState: {errors} } = useForm();
   return (
      <div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
         >
            {formFields.map((field, idx) => (
               <FieldRenderer field={field} key={idx} register={register} errors={errors} />
            ))}
            <Button
               type="submit"
               className="bg-blue-400 cursor-pointer text-white hover:bg-blue-500"
            >
               {submitButtonText}
            </Button>
         </form>
      </div>
   );
};

export default DynamicForm;
