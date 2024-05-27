import React, { useState, InputHTMLAttributes } from 'react';
import { ErrorMessage, useField } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactElement;
  showPasswordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  showPasswordToggle = false,
  ...props
}) => {
  const [ field, meta ] = useField(props);
  const [ showPassword, setShowPassword ] = useState(false);

  return (
    <div className="mb-6 relative">
      <div className="relative mt-1">
        <input
          {...field}
          {...props}
          className={` placeholder-dark-purple text-black text-lg block w-full py-2 px-4 border rounded-md ${meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring focus:border-green-500 duration-500 pb-1`}
          type={showPassword && props.type === 'password' ? 'text' : props.type}
        />
        {icon && (
          <div className="absolute inset-y-0 right-2 pr-3 flex items-center pointer-events-none text-xl text-medium-purple">
            {icon}
          </div>
        )}
        {showPasswordToggle && props.type === 'password' && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <button
              type="button"
              className="focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="text-xl text-green-500 mr-2" /> : <FaEye className="text-xl text-green-500 mr-2" />}
            </button>
          </div>
        )}
      </div>
      {meta.touched && meta.error && (
        <div className="mt-2 text-xs text-red-600 absolute -bottom-5 left-0">
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
};

export default InputField;