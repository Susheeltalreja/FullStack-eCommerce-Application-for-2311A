import React from 'react'
import { Outlet } from 'react-router-dom'
function AuthLayout() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
      <div className="hidden md:flex justify-center items-center flex-col bg-black relative">
        <div className="">
        <h1 className='font-bold text-orange-400 text-5xl hover:scale-110 cursor-pointer'>ShopEase</h1>
        </div>
        <div className="text-gray-400 absolute bottom-10">
          EST . 2026 PREMIUM QUALITY
        </div>
      </div>
      <div className=" bg-white md:px-10 px-5 relative flex flex-col justify-center items-center w-full ">
        <div className="md:w-[70%] w-full">
        <Outlet />
        </div>
        <div className="absolute text-gray-400 bottom-10">
          &copy; ShopEase Inc . All Rights Reserved
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
