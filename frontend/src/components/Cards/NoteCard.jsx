import React from 'react'
import { MdOutlinePushPin } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";


const NoteCard = ({
    title, 
    content,
    isPinned,
    date,
    tags,
    onEdit,
    onDelete,
    onPinNote
}) => {
    return (
        <div className={`w-80 flex  p-4 border rounded-lg shadow-md ${isPinned ? 'border-yellow-400' : 'border-gray-300'}`}>
            <div className=''>
         
        <div className='flex justify-between items-center'>
            <h2 className='text-xl font-bold'>{title}</h2>
            
        </div>
        <p className='mt-2'>{content}</p>
        <div className='mt-4'>
            <p className='text-sm text-gray-500'>Date: {new Date(date).toLocaleDateString()}</p>
            <div className='flex flex-wrap gap-2 mt-2'>
                {tags && tags.map((tag, index) => (
                    <span key={index} className='px-2 py-1 bg-gray-200 rounded-full text-sm'>
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
        </div>

        <div className='flex flex-col items-center justify-between gap-2'>
                <button onClick={onPinNote} className={`p-1 ${isPinned ? 'text-yellow-500' : 'text-gray-500'}`}>
                <MdOutlinePushPin />
                </button>
                     <div>
        <button onClick={onEdit} className='text-blue-500'>
                    <CiEdit />
                </button>
                <button onClick={onDelete} className='text-red-500'>
                    <AiOutlineDelete />
                </button>
        </div>
                
            </div>
       
    </div>
    );
}

export default NoteCard