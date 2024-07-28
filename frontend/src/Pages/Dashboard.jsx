import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/Cards/NoteCard'
import { GoPlus } from "react-icons/go";
import { AddEditNotes } from './AddEditNotes';
import Modal from "react-modal"

export const Dashboard = () => {
  const [openEditModal, setOpenEditModal] = useState(false)
  function openModal() {
    setOpenEditModal(true);
  }
  function closeModal() {
    setOpenEditModal(false);
  }
  return (
    <div>
        <Navbar/>
        <div className='mx-auto'>
        <div className='bg-red-400 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 m-8'>
            <NoteCard
             title={"hey"} 
             date={"28 july"}
             content={"sdfnjksf mklmnskladfnk </div></div></div></div></div></div></div></div></div></div></div>  jsnkfnas "}/>
            <NoteCard
             title={"hey"} 
             date={"28 july"}
             content={"sdfnjksf mklmnskladfnk </div></div></div></div></div></div></div></div></div></div></div>  jsnkfnas "}/>
            <NoteCard
             title={"hey"} 
             date={"28 july"}
             content={"sdfnjksf mklmnskladfnk </div></div></div></div></div></div></div></div></div></div></div>  jsnkfnas "}/>
            <NoteCard
             title={"hey"} 
             date={"28 july"}
             content={"sdfnjksf mklmnskladfnk </div></div></div></div></div></div></div></div></div></div></div>  jsnkfnas "}/>
            <NoteCard
             title={"hey"} 
             date={"28 july"}
             content={"sdfnjksf mklmnskladfnk </div></div></div></div></div></div></div></div></div></div></div>  jsnkfnas "}/>
          </div>
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

        <AddEditNotes onClose={closeModal}/>
        </Modal>

    </div>
  )
}
