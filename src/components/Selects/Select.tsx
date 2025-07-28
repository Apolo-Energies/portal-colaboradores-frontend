import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  options: Option[];
  placeholder?: string;
  register: UseFormRegister<T>;
  required?: boolean;
  errors?: FieldErrors<T>;
}

export const Select = <T extends FieldValues>({
  label,
  name,
  options,
  placeholder,
  register,
  required = false,
  errors,
}: Props<T>) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        {...register(name, { required })}
        className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring ${
          errors && errors[name]
            ? "border-red-500 ring-red-500"
            : "border-gray-300 ring-blue-500"
        }`}
      >
        {placeholder && (
          <option value="" disabled selected hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && errors[name] && (
        <p className="text-xs text-red-600 mt-1">Este campo es obligatorio</p>
      )}
    </div>
  );
}
