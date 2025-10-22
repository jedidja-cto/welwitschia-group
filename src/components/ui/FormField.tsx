import React from 'react';

type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  as?: 'input' | 'textarea' | 'select';
  children?: React.ReactNode;
};

export const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  error,
  className = '',
  value,
  onChange,
  as = 'input',
  children,
}: FormFieldProps) => {
  const id = `field-${name}`;
  
  return (
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-wg-green ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          value={value}
          onChange={onChange}
          rows={4}
        />
      ) : as === 'select' ? (
        <select
          id={id}
          name={name}
          required={required}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-wg-green ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          value={value}
          onChange={onChange as any}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-wg-green ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          value={value}
          onChange={onChange}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormField;