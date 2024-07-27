import React, { useState } from 'react'
import InputPassword from '../components/InputPassword'
import { Link } from 'react-router-dom'
import { validateEmail } from '../Utils/helper'

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] =useState("")
  const [error, setError] = useState(null);
  const handleLogin = async(e)=>{
   
    e.preventDefault()

    if(!name){
      setError("Please enter a name")
        return
    }

    if(!validateEmail(email)){
        setError("Please enter a valid email")
        return
    }

    if(!password){
        setError("Please enter a password")
        return
    }
    setError("")
}

  return (
    <div className="flex min-h-full flex-1 flex-col  justify-center px-6  py-12 lg:px-8 ">
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-8 border-[1px] border-gray-300 rounded-md py-10">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className=" mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      SignUp
      </h2>
    </div>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <div className="mt-2">
            <input
            onChange={(e)=> setName(e.target.value)}
              type="text"
              placeholder='Name'
              className="block w-full rounded-md border-0 py-1.5 px-2 my-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <input
            onChange={(e)=> setEmail(e.target.value)}
              type="text"
              placeholder='Email'
              className="block w-full rounded-md border-0 py-1.5 px-2 my-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
           <InputPassword />

            {error && <p className='text-sm text-red-500 pb-1'>{error}</p>}
          </div>
        </div>


        <div>
          <button
            // type="submit"
            className="flex w-full justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Account
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
       Already have an Account?{" "}
       <Link to="/login" className='font-medium text-button underline'>
      LogIn
       </Link>
    
      </p>
    </div>
  </div>
  )
}

export default Signup