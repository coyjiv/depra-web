import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div className={`w-5 h-5 border-2 border-gray-400 rounded-md cursor-pointer ${checked ? 'bg-blue-600 border-blue-500' : 'bg-white'}`}>
          {checked && (
            <svg className="w-4 h-4 mx-auto my-0.5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          )}
        </div>
      </div>
      <div className="ml-3 text-gray-700">
        {label}
      </div>
    </label>
  );
}

export default Checkbox;
