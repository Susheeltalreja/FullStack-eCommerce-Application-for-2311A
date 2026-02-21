import React, { Fragment } from 'react'
import { Button } from '../ui/button'
import { Hamburger, LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutUser } from '@/StateManagement/Authentication/Slice';
import { toast } from 'sonner';

function Header({ setOpen }) {

  const dispatch = useDispatch();

  function Logout() {
    dispatch(LogoutUser()).then((data) => {
      if (data?.payload?.success) {
        toast.success(`${data?.payload?.message}`)
      } else {
        toast.error(`${data?.payload?.message}`)
      }
    })
  }

  const {User} = useSelector(st => st.Auth)

  return (
    <Fragment>
      <div className="h-16 relative border-b border-gray-400 w-full flex justify-between items-center px-4">
        <div className="">
          <div className="md:block hidden italic text-gray-500">
            DASHBOARD
          </div>
          <Button className="flex md:hidden" variant="outline" onClick={() => setOpen(true)}><Hamburger /></Button>
        </div>
        <div className="absolute end-[20px] flex gap-2 items-center">
          <div className="text-center">
            <h1 className='uppercase md:text-[16px] text-[10px]'>{User.Name}</h1>
            <h2 className=' md:text-[16px] text-[10px]'>{User.Email}</h2>
          </div>
          <span className='w-[2px] bg-black'></span>
          <div className="">
            <Button className="" variant="outline" onClick={() => Logout()}>Logout <LogOut /></Button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Header
