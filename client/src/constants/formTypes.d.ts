
export interface IFormField {
    name: string;
    type: string;
    label: string;
    placeholder: string;
    validation?: object;
 }
 
 export interface IForm {
    formFields: IFormField[];
    submitButtonText: string;
    onSubmit: (data: any) => void;
 }
 