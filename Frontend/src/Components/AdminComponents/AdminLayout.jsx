import React, { Fragment, useState } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  const [openSideBar, setSideBarOpen] = useState(false)
  return (
    <Fragment>
        <div className="w-screen h-screen flex">
            <SideBar open={openSideBar} setOpen={setSideBarOpen} />
            <div className="w-full overflow-auto">
                <Header setOpen={setSideBarOpen}/>
                <Outlet />
            </div>
        </div>
    </Fragment>
  )
}

export default AdminLayout
