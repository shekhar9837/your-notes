import React from 'react';

const EmptyCard = () => {
  return (
    <div className=" flex flex-col items-center justify-center mt-20">
      <img
        src="src/assets/error.png" 
        alt="Empty Notebook"
        className="w-40 h-40 mb-4"
      />
      <p className="text-gray-800 text-sm">
        Oops! found noting
      </p>
    </div>

  );
}

export default EmptyCard;
