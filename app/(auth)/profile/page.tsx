"use client"
import ProfilePage from '@/components/auth/ProfilePage'
import React from 'react'

const Profile = () => {

  return (
    <div className=' flex-center max-w-96 mx-auto w-full max-sm:px-2 pt-10'>
        <div className=' flex flex-col gap-8 w-full flex-center max-w-96'>
            <div className=' flex-center flex-col gap-1'>
                <h1 className=' text-3xl max-sm:text-2xl text-blue-500 font-bold'>Create your Profile</h1>
            </div>
            <div className=' w-full'>
                <ProfilePage />
            </div>
        </div>
    </div>
  )
}

export default Profile

