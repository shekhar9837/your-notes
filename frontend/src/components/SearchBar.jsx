import React from 'react'

export const SearchBar = ({value, onChange, handleSearch, handleKeyPress}) => {

  return (
 
        <div className='w-80 px-4 py-2 border-[1px] border-gray-300 rounded-md flex items-center justify-center gap-4'>

         <input value={value} onChange={onChange} handleKeyPress={handleKeyPress} placeholder="Search your note " type='text' className='outline-none w-full' />
            <button onClick={handleSearch}  >
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </button>
            </div>
  
  )
}
