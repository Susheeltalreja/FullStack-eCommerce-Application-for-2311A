import React, { Fragment } from 'react'
import { Button } from '../ui/button'
import { Hamburger, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { LogoutUser } from '@/StateManagement/Authentication/Slice';
import { toast } from 'sonner';

function Header({setOpen}) {

  const dispatch = useDispatch();

  function Logout(){
    dispatch(LogoutUser()).then((data) => {
      if(data?.payload?.success){
        toast.success(`${data?.payload?.message}`)
      }else{
        toast.error(`${data?.payload?.message}`)
      }
    })
  }
  return (
    <Fragment>
      <div className="h-16 relative border-b border-gray-400 w-full flex justify-between items-center px-4">
        <Button className="flex md:hidden" onClick={() => setOpen(true)}><Hamburger /></Button>
        <Button className="absolute end-[20px]" onClick={() => Logout()}>Logout <LogOut /></Button>
      </div>
    </Fragment>
  )
}

export default Header
