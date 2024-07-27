import React, { useState } from 'react'
import ProfileCard from './Cards/ProfileCard'
import {useNavigate } from "react-router-dom"
import { SearchBar } from './SearchBar'

const Navbar = () => {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const  onLogout=()=>{
        navigate("/login")
    }
    const handleSearch=()=>{
        setQuery("")
    }
    const handleKeyPress=(event)=>{
        if(event.key === 'Enter'){
            handleSearch()
        }
    }
  return (
    <div className='flex justify-between items-center px-8 py-4'>
        <div>
            <h1 className='text-[1.4rem] font-bold'>YourNotes</h1>
        </div><div>
            <SearchBar value={query} onChange={(e)=> setQuery(e.target.value)} handleSearch={handleSearch} handleKeyPress={handleKeyPress}/>
        </div>
        <div>
            <ProfileCard onLogout={onLogout}/>
        </div>
    </div>
  )
}

export default Navbar