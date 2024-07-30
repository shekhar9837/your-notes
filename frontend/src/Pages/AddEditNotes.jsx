import React, { useEffect, useState } from 'react'
import TagInput from '../components/TagInput'
import { RxCross2 } from 'react-icons/rx'
import axiosInstance from '../Utils/axiosInstance'

export const AddEditNotes = ({onClose, getAllNotes, noteDetails, type}) => {
  const [title, setTitle] = useState(noteDetails ? noteDetails.title : '');
  const [content, setContent] = useState(noteDetails ? noteDetails.content : '');
  const [tags, setTags] = useState(noteDetails ? noteDetails.tags : []);
  const [error, setError] = useState(null);
  console.log(noteDetails)

  useEffect(() => {
    if (noteDetails) {
      setTitle(noteDetails.title);
      setContent(noteDetails.content);
      setTags(noteDetails.tags);
    }
  }, [noteDetails]);

  const addNewNote =async ()=>{
    try{
      const response = await axiosInstance.post("/add-note",{
        title,
        content,
        tags
      })
      if(response.data && response.data.note){
        getAllNotes()
        onClose()
      }

    }catch(e){
        if(e.response.data && e.response.data && e.response.data.message){
          setError(e.response.data.message)
    
    }
  }
  }

  const editNote = async () => {
    const noteId = noteDetails?._id; 
  
    if (!noteId) {
      setError("Note ID is missing");
      return;
    }
  
    try {
      const response = await axiosInstance.put('/edit-note/' + noteId, {
        title,
        content,
        tags,
        
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (e) {
      if (e.response.data && e.response.data.message) {
        setError(e.response.data.message);
      }
    }
  };
  

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

      if(type === "edit"){
        editNote()
      }else{
        addNewNote()
      }

  }


  return (
    <div className='relative'>
       <form onSubmit={handleEdit} >
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
        <button type="submit"
            className="flex w-full justify-center rounded-md bg-button px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          {type === "edit" ? "UPDATE" : "ADD"}
          </button>
          </form>
          

          
    </div>
  )
}
