"use client"
import SignIn from '@/components/auth/SignIn'
import React, { useState } from 'react'

const SignInPage = () => {

  return (
    <div className=' flex-center max-w-96 mx-auto w-full max-sm:px-2 pt-16'>
        <div className=' flex flex-col gap-8 w-full flex-center max-w-96'>
            <div className=' flex-center flex-col gap-1'>
                <h1 className=' text-4xl max-sm:text-3xl text-blue-500 font-bold'>News Website</h1>
                <p className=' text-lg max-sm:text-base'>Welcome to our news website</p>
            </div>
            <div className=' w-full'>
                <SignIn />
            </div>
        </div>
    </div>
  )
}

export default SignInPage
