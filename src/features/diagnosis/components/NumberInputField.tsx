import { cn } from '@/lib/utils';
import React from 'react';

interface NumberInputFieldProps {
    inputValue: string,
    unit?: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
}

export function NumberInputField ({inputValue = "", setInputValue, unit = ""}: NumberInputFieldProps) {

  const handleNumberClick = (number: string) => {
    setInputValue((prevValue) => prevValue + number);
  };

  const handleDeleteClick = () => {
    setInputValue((prevValue) => prevValue.slice(0, -1));
  };

  const buttonStyle = "border-2 rounded-lg p-4 bg-white hover:bg-blue-500 text-black hover:text-white"

  return (
    <div className="flex flex-col items-center h-2/4 gap-4 text-2xl">

      <div className="flex w-full justify-center items-center" >

        {/* invisible unit text used to center the number input field */}
        <p className="invisible">{unit}</p>

        {/* number input field */}
        <input
          type="text"
          value={inputValue}
          readOnly // Prevent keyboard input
          className="w-1/2 border-2 rounded-2xl p-6 mx-4 text-center"
        />

        {/* unit */}
        <p>{unit}</p>

      </div>

      <div className="grid grid-cols-3 gap-2 w-2/4">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((number) => (
          <button
            key={number}
            onClick={() => handleNumberClick(number)}
            className={buttonStyle}
          >
            {number}
          </button>
        ))}
        <button
          onClick={handleDeleteClick}
          className={cn(buttonStyle, "col-span-2")}
        >
          {"←"}
        </button>
      </div>
    </div>
  );
};