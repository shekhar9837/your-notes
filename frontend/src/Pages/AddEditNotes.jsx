import React, { useState } from 'react'
import TagInput from '../components/TagInput'
import { RxCross2 } from 'react-icons/rx'

export const AddEditNotes = ({onClose}) => {
  const [title,  setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState([])

  const [error, setError] = useState(null);

  const handleEdit = async(e)=>{
      e.preventDefault()

      if(!title){
          setError("Please enter a title")
          return
      }

      if(!content){
          setError("Please enter a content")
          return
      }
      setError("")
  }


  return (
    <div className='relative'>
      
        <button onClick={onClose} className='text-[1.2rem] -top-2 -right-2 absolute text-gray-500'>
        <RxCross2 />
        </button>

        <div className='flex flex-col gap-2 '>
            <label className="input-label">TITLE</label>
            <input 
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            type="text" placeholder='have to study' className='text-[1.4rem] border rounded-lg p-2 text-slate-950 outline-none' />
        </div>

        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label'>CONTENT</label>
            <textarea
             value={content}
             onChange={(e)=> setContent(e.target.value)}
             type="text" placeholder='Content' className=' text-sm border rounded-lg bg-slate-50 p-2 outline-none text-slate-950'
            rows={10}
            ></textarea>
        </div>
        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>
        {error && <p className='text-sm text-red-500 pb-1'>{error}</p>}
        <button onClick={handleEdit}
            className="flex w-full justify-center rounded-md bg-button px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            ADD
          </button>

          
    </div>
  )
}
