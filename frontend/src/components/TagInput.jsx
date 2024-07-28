import React, { useState } from 'react';
import { CiSquarePlus } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';

const TagInput = ({ tags = [], setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTags = () => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
      console.log("Tag added and input value reset");  // Debugging line
    }
  };

  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();  // Prevent the default form submission behavior
      addNewTags();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags.length > 0 && (
        <div className='flex items-center flex-wrap'>
          {tags.map((tag, index) => (
            <span
              key={index}
              className='flex items-center justify-center px-2 py-1 bg-gray-200 rounded-full text-sm gap-1'
            >
              #{tag}
              <button onClick={() => handleRemoveTag(tag)} className='text-sm ml-1'>
                <RxCross2 />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className='flex items-center justify-start mt-2'>
        <input
          onChange={handleInputChange}
          onKeyDown={handleKeydown}
          value={inputValue}
          type='text'
          placeholder='Add tags'
          className='bg-transparent border px-2 text-sm py-2 outline-none'
        />
        <button onClick={addNewTags} className='text-button'>
          <CiSquarePlus size={30} />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
