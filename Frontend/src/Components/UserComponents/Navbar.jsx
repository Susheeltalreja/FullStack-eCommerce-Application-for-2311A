import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { LogOutIcon } from 'lucide-react';
import { LogoutUser } from '@/StateManagement/Authentication/Slice';
import { toast } from 'sonner';

function Navbar() {
  const {isAuth} = useSelector(state => state.Auth);

  const dispatch = useDispatch();

  function handleLogout(){
    dispatch(LogoutUser()).then((data) => {
      if(data?.payload?.success){
        toast.success(`${data?.payload?.message}`)
      }else{
        toast.error(`${data?.payload?.message}`)
      }
    });
  }

  return (
    <div className="w-screen flex justify-center items-center">
          <div className='w-[80%] h-16 flex justify-between items-center px-4 fixed top-5 z-60 bg-white text-black rounded-4xl'>
      <div className="font-bold">
        <Link to="/user/home">eCommerce</Link>
      </div>
      <div className="space-x-3 font-bold">
        <Link to="/user/list">Men</Link>
        <Link to="/user/list">Women</Link>
        <Link to="/user/list">Kids</Link>
        <Link to="/user/list">Accessories</Link>
      </div>
      {
        isAuth ? <Button className="cursor-pointer" onClick={() => handleLogout()}>Logout <LogOutIcon /></Button> :  
        (<div className="space-x-2">
        <Link to="/auth/login"><button className="cursor-pointer bg-orange-400 px-4 py-2 rounded-xl font-bold hover:scale-110 transition">SignIn</button></Link>
        <Link to="/auth/register"><button className="cursor-pointer bg-black px-4 py-2 rounded-xl font-bold text-white hover:scale-110 transition">SignUp</button></Link>
      </div>)
      }
    </div>
    </div>
  )
}

export default Navbar
