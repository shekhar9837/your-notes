import React from 'react'
import { getInitials } from '../../Utils/helper'

const ProfileCard = ({userInfo, onLogout}) => {
 // console.log('User Info:', userInfo); Log the userInfo prop
  return (
    <div className='flex gap-4'>
        <div className='w-8 h-8 rounded-full border border-black flex items-center justify-center'>
        {getInitials(userInfo?.fullName)}
        </div>

        <div>
            <p className='text-sm'>{userInfo?.fullName}</p>
            <button onClick={onLogout} className='underline text-button text-sm'>Logout</button>
        </div>
    </div>
  )
}

export default ProfileCard