import { IFormField } from "./formTypes";

export const LOGIN_FORM_FIELDS: IFormField[] = [
   {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      validation: {
         required: "Email is required",
         pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
         },
      },
   },
   {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      validation: {
         required: "Password is required",
      },
   },
];

export const SIGNUP_FORM_FIELDS: IFormField[] = [
   {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      validation: {
         required: "Username is required",
         minLength: {
            value: 3,
            message: "Username must be at least 3 characters",
         },
      },
   },
   {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      validation: {
         required: "Email is required",
         pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
         },
      },
   },
   {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      validation: {
         required: "Password is required",
         minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
         },
         pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
               "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
         },
      },
   },
];
