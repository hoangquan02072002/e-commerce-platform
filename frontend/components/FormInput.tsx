import * as React from "react";
import { FormInputProps } from "../lib/types";

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type,
  required,
  optional,
}) => {
  return (
    <>
      <label htmlFor={id} className="mt-7 text-sm text-black">
        {label}
        {required && <span className="text-red-600">*</span>}
        {optional && <span className="text-stone-500">(Optional)</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        aria-required={required}
        className="flex shrink-0 self-stretch mt-3 bg-white rounded-md border border-solid border-stone-300 h-[45px] w-full"
      />
    </>
  );
};
