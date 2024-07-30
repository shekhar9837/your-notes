import React, { useEffect, useState } from 'react';

export const SearchBar = ({ value, onChange, handleSearch, handleKeyPress, handleclearSearch }) => {
    const [isFocused, setIsFocused] = useState(false); // State to track input focus

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        if (value === '') {
            setIsFocused(false); // Hide clear button when input is empty
        }
    };

    useEffect(() => {
        // Show clear button if there's text in the input
        if (value) {
            setIsFocused(true);
        } else {
            setIsFocused(false);
        }
    }, [value]);

    return (
        <div className='w-80 px-4 py-2 border-[1px] border-gray-300 rounded-md flex items-center justify-between'>
            <input
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyPress}
                onFocus={handleInputFocus} // Set focus state
                onBlur={handleInputBlur} // Set blur state
                placeholder="Search notes..." 
                type='text'
                className='outline-none w-full'
            />
             {isFocused && value && ( // Show clear button only if input is focused and has text
                <button onClick={handleclearSearch} className='ml-2 px-2'>
                    <svg className="w-4 h-4 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
            <button onClick={handleSearch}>
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </button>
           
        </div>
    );
};
