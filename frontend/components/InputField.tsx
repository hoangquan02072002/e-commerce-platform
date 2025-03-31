import * as React from "react";
import { InputFieldProps } from "../lib/types";

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  isRequired,
  isOptional,
  type = "text",
  name,
  error,
  autoComplete,
}) => {
  const id = React.useId();
  const errorId = React.useId();

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mt-7 text-sm font-medium">
        {label}
        {isRequired && (
          <span className="text-red-600" aria-hidden="true">
            *
          </span>
        )}
        {isOptional && <span className="text-stone-500">(Optional)</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={isRequired}
        aria-required={isRequired}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        autoComplete={autoComplete}
        className="self-stretch px-3.5 py-4 mt-4 text-sm whitespace-nowrap bg-white rounded-md border border-solid border-stone-300 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      {error && (
        <div id={errorId} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
