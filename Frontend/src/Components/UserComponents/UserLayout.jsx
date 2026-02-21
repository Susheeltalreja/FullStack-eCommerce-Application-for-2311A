import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function UserLayout() {
  return (
    <div className=''>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout
