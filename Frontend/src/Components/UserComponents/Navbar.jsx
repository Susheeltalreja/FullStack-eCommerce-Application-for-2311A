import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { LogOutIcon, ShoppingCart, Hamburger } from 'lucide-react';
import { LogoutUser } from '@/StateManagement/Authentication/Slice';
import { toast } from 'sonner';
import Cart from './Cart';
import { FetchCategoryThunk } from '@/StateManagement/AdminSlices/BrandCategorySlice';
import { UserProductThunk } from '@/StateManagement/UserSlices/UserProductSlice';

function ResponsiveNavbar({ Logout, Auth, ToggleNav, setToggleNav, setOpenCart }) {
  const location = useLocation();
  const { Category } = useSelector(st => st.BrandCategory);
  // Data Logic
  const list = Array.isArray(Category) ? Category : [];
  const mainCategories = list.slice(0, 3);
  const extraCategories = list.slice(3);

  return (
    <div className={`w-[80%] fixed top-24 rounded-4xl px-4 py-4 z-50 space-y-3 md:hidden transition-all ${ToggleNav ? "block" : "hidden"} ${location.pathname.includes("/user/list") ? "bg-black text-white border border-zinc-800" : "bg-white text-black shadow-2xl"}`}>
      {Auth && (
        <button className="cursor-pointer px-3 py-2 flex gap-2 rounded-lg font-bold text-orange-500" onClick={() => setOpenCart(true)}>
          <ShoppingCart /> Cart
        </button>
      )}

      <div className="font-bold flex flex-col space-y-2">
        {/* Main 3 for Mobile */}
        {mainCategories.map((cat) => (
          <Link
            key={cat._id}
            to="/user/list"
            className='hover:bg-orange-400 p-3 rounded-xl'
            onClick={() => setToggleNav(false)}
          >
            {cat.CategoryName}
          </Link>
        ))}

        {/* Remaining for Mobile */}
        {extraCategories.map((cat) => (
          <Link
            key={cat._id}
            to="/user/list"
            className='hover:bg-orange-400 p-3 rounded-xl opacity-80'
            onClick={() => setToggleNav(false)}
          >
            {cat.CategoryName}
          </Link>
        ))}
      </div>

      {Auth ? (
        <Button className="w-full bg-orange-500 text-white" onClick={() => Logout()}>Logout <LogOutIcon /></Button>
      ) : (
        <div className="flex flex-col gap-2 w-full">
          <Link to="/auth/login"><button className="w-full bg-orange-400 px-4 py-2 rounded-xl font-bold">SignIn</button></Link>
          <Link to="/auth/register"><button className={`w-full px-4 py-2 rounded-xl font-bold border ${location.pathname.includes("/user/list") ? "bg-white text-black" : "bg-black text-white"}`}>SignUp</button></Link>
        </div>
      )}
    </div>
  )
}

function Navbar() {
  const { isAuth } = useSelector(state => state.Auth);
  const { Category } = useSelector(st => st.BrandCategory);
  const dispatch = useDispatch();
  const location = useLocation();

  const [ToggleNav, setToggleNav] = useState(false);
  const [OpenCart, setOpenCart] = useState(false);
  useEffect(() => {
    dispatch(FetchCategoryThunk())
  }, [])
  // Logic: Split Category into 3 main and the rest
  const list = Array.isArray(Category) ? Category : [];
  const mainCategories = list.slice(0, 3);
  const extraCategories = list.slice(3);

  function handleLogout() {
    dispatch(LogoutUser()).then((data) => {
      if (data?.payload?.success) toast.success(`${data?.payload?.message}`)
      else toast.error(`${data?.payload?.message}`)
    });
  }

  return (
    <div className="w-screen flex justify-center items-center relative">
      <Cart OpenCart={OpenCart} setOpenCart={setOpenCart} />

      <ResponsiveNavbar ToggleNav={ToggleNav} setToggleNav={setToggleNav} Auth={isAuth} Logout={handleLogout} setOpenCart={setOpenCart} />

      <div className={`w-[80%] h-14 flex justify-between items-center px-6 fixed top-5 z-60 rounded-4xl transition-all
        ${location.pathname.includes("/user/list") ? "bg-black text-white" : "bg-white text-black shadow-md border"}`}>

        <div className="font-bold text-lg">
          <Link to="/user/home" onClick={() => setToggleNav(false)}>eCommerce</Link>
        </div>

        {/* DESKTOP CATEGORIES */}
        <div className="hidden md:flex items-center space-x-4 font-bold h-full">
          {mainCategories.map((cat) => (
            <Link key={cat._id} to="/user/list/" className="hover:text-orange-500 transition-colors">
              {cat.CategoryName}
            </Link>
          ))}

          {/* MORE DROPDOWN */}
          {extraCategories.length > 0 && (
            <div className="relative group flex items-center h-full cursor-pointer">
              <span className="hover:text-orange-500 flex items-center gap-1">
                More <span className="text-[10px]">▼</span>
              </span>

              <div className="absolute top-full left-0 hidden group-hover:block pt-2 animate-in fade-in zoom-in-95 duration-200">
                <div className={`flex flex-col min-w-[150px] rounded-xl shadow-xl border p-2
                  ${location.pathname.includes("/user/list") ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white text-black border-gray-100"}`}>
                  {extraCategories.map((cat) => (
                    <Link
                      key={cat._id}
                      to="/user/list"
                      className="p-2 hover:bg-orange-400 hover:text-white rounded-lg transition-all text-sm"
                    >
                      {cat.CategoryName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="md:flex hidden items-center">
          {isAuth ? (
            <div className="flex gap-2">
              <button className={`cursor-pointer px-3 py-2 flex gap-2 rounded-lg font-bold hover:scale-110 transition
                ${location.pathname.includes("/user/list") ? "bg-white text-black" : "bg-black text-white"}`}
                onClick={() => setOpenCart(true)}><ShoppingCart /></button>
              <button className={`cursor-pointer px-4 py-2 flex gap-2 rounded-lg font-bold hover:scale-110 transition
                ${location.pathname.includes("/user/list") ? "bg-white text-black" : "bg-black text-white"}`}
                onClick={() => handleLogout()}>Logout <LogOutIcon /></button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/auth/login"><button className="cursor-pointer bg-orange-400 px-4 py-2 rounded-xl font-bold hover:scale-110 transition">SignIn</button></Link>
              <Link to="/auth/register"><button className={`cursor-pointer px-4 py-2 rounded-xl font-bold hover:scale-110 transition
                ${location.pathname.includes("/user/list") ? "bg-white text-black" : "bg-black text-white"}`}>SignUp</button></Link>
            </div>
          )}
        </div>

        <div className="md:hidden block">
          <Button variant="ghost" className={location.pathname.includes("/user/list") ? "text-white" : "text-black"} onClick={() => setToggleNav(!ToggleNav)}>
            <Hamburger size={30} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar