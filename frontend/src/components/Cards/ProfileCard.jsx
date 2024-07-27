import React from 'react'
import { getInitials } from '../../Utils/helper'

const ProfileCard = ({onLogout}) => {
  return (
    <div className='flex gap-4'>
        <div className='w-8 h-8 rounded-full border border-black flex items-center justify-center'>
        {getInitials("shekhar Maurya")}
        </div>

        <div>
            <p className='text-sm'>Shekhar</p>
            <button onClick={onLogout} className='underline text-button text-sm'>Logout</button>
        </div>
    </div>
  )
}

export default ProfileCard