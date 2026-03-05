import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Ham, Hamburger, LogOutIcon } from 'lucide-react';
import { LogoutUser } from '@/StateManagement/Authentication/Slice';
import { toast } from 'sonner';



function ResponsiveNavbar({ Logout, Auth, ToggleNav, setToggleNav }) {
  const location = useLocation();
  return (
    <div className={`w-[80%] fixed top-24 rounded-4xl px-4 py-2 z-50 space-y-3 md:hidden ${ToggleNav ? "block" : "hidden"}  ${location.pathname.includes("/user/list") ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="font-bold flex flex-col space-y-2">
        <Link to="/user/list" className='hover:bg-orange-400 p-3 rounded-xl' onClick={() => setToggleNav(false)}>Men</Link>
        <Link to="/user/list" className='hover:bg-orange-400 p-3 rounded-xl' onClick={() => setToggleNav(false)}>Women</Link>
        <Link to="/user/list" className='hover:bg-orange-400 p-3 rounded-xl' onClick={() => setToggleNav(false)}>Kids</Link>
        <Link to="/user/list" className='hover:bg-orange-400 p-3 rounded-xl' onClick={() => setToggleNav(false)}>Accessories</Link>
      </div>
      {
        Auth ? <Button className="cursor-pointer" onClick={() => Logout()}>Logout <LogOutIcon /></Button> :
          (<div className="flex flex-col gap-2 w-full">
            <Link to="/auth/login"><button className="w-full cursor-pointer bg-orange-400 px-4 py-2 rounded-xl font-bold transition">SignIn</button></Link>
            <Link to="/auth/register"><button className={`w-full cursor-pointer px-4 py-2 rounded-xl font-bold transition
                ${location.pathname.includes("/user/list") ? "bg-white text-black" : "bg-black text-white"}
                `}>SignUp</button></Link>
          </div>)
      }
    </div>
  )
}


function Navbar() {
  const { isAuth } = useSelector(state => state.Auth);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(LogoutUser()).then((data) => {
      if (data?.payload?.success) {
        toast.success(`${data?.payload?.message}`)
      } else {
        toast.error(`${data?.payload?.message}`)
      }
    });
  }

  const location = useLocation();

  const [ToggleNav, setToggleNav] = useState(false);
  function HandleToggle(){
    if(ToggleNav){
      setToggleNav(false)
    }else{
      setToggleNav(true)
    }
  }

  return (
    <div className="w-screen flex justify-center items-center relative">
      {/* Mobile device navbar  */}
      <ResponsiveNavbar ToggleNav={ToggleNav} setToggleNav={setToggleNav} Auth={isAuth} Logout={handleLogout} />
      {/* {Big navbar} */}
      <div className={`w-[80%] h-12 flex justify-between items-center px-4 fixed top-5 z-60  rounded-4xl
        ${location.pathname.includes("/user/list") ? "bg-black text-white" : "bg-white text-black"}
        `}>
        <div className="font-bold">
          <Link to="/user/home" onClick={() => setToggleNav(false)}>eCommerce</Link>
        </div>
        <div className="space-x-3 font-bold md:block hidden">
          <Link to="/user/list">Men</Link>
          <Link to="/user/list">Women</Link>
          <Link to="/user/list">Kids</Link>
          <Link to="/user/list">Accessories</Link>
        </div>
        <div className="md:block hidden">
          {
            isAuth ? <Button className="cursor-pointer" onClick={() => handleLogout()}>Logout <LogOutIcon /></Button> :
              (<div className="space-x-2">
                <Link to="/auth/login"><button className="cursor-pointer bg-orange-400 px-4 py-2 rounded-xl font-bold hover:scale-110 transition">SignIn</button></Link>
                <Link to="/auth/register"><button className={`cursor-pointer px-4 py-2 rounded-xl font-bold hover:scale-110 transition
                ${location.pathname.includes("/user/list") ? "bg-white text-black" : "bg-black text-white"}
                `}>SignUp</button></Link>
              </div>)
          }
        </div>
        <div className="md:hidden block">
          <Button variant="outline" className="text-black cursor-pointer" onClick={() => HandleToggle()}><Hamburger size={40}/></Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
