import { Route, Routes } from 'react-router-dom'
import './App.css'

//Admin related stuff
import AdminLayout from './Components/AdminComponents/AdminLayout'
import Dashboard from './pages/AdminPages/Dashboard'
import Products from './pages/AdminPages/Products'
import Orders from './pages/AdminPages/Orders'

//User related stuff
import UserLayout from './Components/UserComponents/UserLayout'
import Listing from './pages/UserPages/Listing'
import Checkout from './pages/UserPages/Checkout'
import Home from './pages/UserPages/Home'

// Auth related stuff 
import AuthLayout from './Components/AuthComponents/AuthLayout'
import Login from './pages/AuthPages/Login'
import Register from './pages/AuthPages/Register'
import RouteProtection from './Components/CommonComponents/RouteProtection'
import NotFound from './pages/NotFound'
import RenderRootPage from './Components/CommonComponents/RenderRootPage'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ReturnUser } from './StateManagement/Authentication/Slice'
import OtpVerify from './pages/AuthPages/OtpVerify'
import ForgetPassword1 from './pages/AuthPages/ForgetPassword1'
import ForgetPassword2 from './pages/AuthPages/ForgetPassword2'
import BrandCategory from './pages/AdminPages/BrandCategory'


function App() {
  const {User, isAuth, AuthLoad} = useSelector(state => state.Auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ReturnUser())
  }, [])

  if(!AuthLoad){
    return <h1>Loading....</h1>
  }

  console.log("User", User);
  console.log("Auth", isAuth);
  return (
    <Routes>
      {/* Admin related routes  */}
      <Route path='/admin' element={<RouteProtection isAuth={isAuth} user={User} ><AdminLayout /></RouteProtection>}>
        <Route path='dashboard' element={<Dashboard />}></Route>
        <Route path='products' element={<Products />}></Route>
        <Route path='orders' element={<Orders />}></Route>
        <Route path='brandcategory' element={<BrandCategory />}></Route>
      </Route>

      {/* User related routes  */}
      <Route path='/user' element={<UserLayout />}>
        <Route path='home' element={<Home />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
        <Route path="list" element={<Listing />}></Route>
      </Route>

      {/* Root page  */}
      <Route path='/' element={<RenderRootPage />}></Route>
      {/* Auth pages  */}
      <Route path="/auth" element={<RouteProtection isAuth={isAuth} user={User} ><AuthLayout /></RouteProtection>}>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path="otp" element={<OtpVerify />}></Route>
        <Route path='check-user' element={<ForgetPassword1 />}></Route>
        <Route path='forget-password/:email' element={<ForgetPassword2 />}></Route>
      </Route>

      <Route path='*' element={<NotFound />}></Route>

    </Routes>
  )
}

export default App
