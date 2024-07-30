import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/Cards/NoteCard'
import { GoPlus } from "react-icons/go";
import { AddEditNotes } from './AddEditNotes';
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../Utils/axiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmptyCard from '../components/EmptyCard';


export const Dashboard = () => {
  const addedNote = () => toast("Note added");
  const deletedNote = () => toast("Note deleted");

  const [openEditModal, setOpenEditModal] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [notes, setNotes] = useState([])
  const [noteDetails, setNoteDetails] = useState(null);
  const [isSearched, setIsSearched] = useState(false)
  const navigate = useNavigate()
  function openModal() {
    setOpenEditModal(true);
  }
  function closeModal() {
    setOpenEditModal(false);
    setNoteDetails(null);
  } 

  const getUserInfo = async()=>{
    try{
      const response = await axiosInstance.get("/get-user");
      // console.log("response",response)
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    }catch(e){
      if(e.response.status === 401){
        localStorage.clear()
        navigate("/signin")
      }
    }
  }
  const getAllNotes =async ()=>{
    try{
      const response = await axiosInstance.get("/get-all-notes");
      console.log("response",response)
      if(response.data && response.data.notes){
        setNotes(response.data.notes);
      }
    }catch(e){
      console.log("error",e)
    }
  }

 
  const handleEdit = (note) => {
    setNoteDetails(note); // Set the note details to be edited
    openModal();
  };

 const handleDelete =async (data) => {
  const noteId = data._id;

  try{
    const response = await axiosInstance.delete("/delete-note/" + noteId);
   if(response.data && response.data.error){

      getAllNotes()
   }
  }catch(e){
    console.log("error",e)
  }
 }  

 const searchNote = async(query)=>{
      try{
        const response = await axiosInstance.get("search-notes", {
          params: {
            query
          }
        })
        if(response.data && response.data.notes){
          setNotes(response.data.notes);
          setIsSearched(true);
        }
      }catch(e){
        console.log("error",e)
      }
 }

 const handleClearSearch=()=>{
   setIsSearched(false);
   getAllNotes()
 }
 

  useEffect(() => {
    getUserInfo()
    getAllNotes()
  }, [])

 

  return (
    <div>
        <Navbar userInfo={userInfo} searchNote={searchNote} handleClearSearch={handleClearSearch} />
        <div className='mx-auto'>
          { notes.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 m-8'>
            {notes.map((note) => (
              <NoteCard
              key={note._id} 
                title={note.title} 
                date={note.createdOn}
                content={note.content}
                tags={note.tags} 
                isPinned={note.isPinned} 
                onEdit={()=>handleEdit(note)}
                onDelete={()=>handleDelete(note)}
                isPinNote={()=>{}}
                />
            ))}
            
          </div>) : (
            <EmptyCard />
          )}
        </div>

        <div>
          <button onClick={openModal} className='absolute bottom-4 right-8 p-4 flex items-center justify-center bg-button rounded-xl'>
          <GoPlus className='text-[2rem] text-white' />
          </button>
        </div>
        <Modal
        isOpen={openEditModal}
        onRequestClose={closeModal}
        style={
          {
            overlay:{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }
          }
        }
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 "
        >

        <AddEditNotes noteDetails={noteDetails} onClose={closeModal} getAllNotes={getAllNotes}    type={noteDetails ? "edit" : "add"} />
        </Modal>

    </div>
  )
}
