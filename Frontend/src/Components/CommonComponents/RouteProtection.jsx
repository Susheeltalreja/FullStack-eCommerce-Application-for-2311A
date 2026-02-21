import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function RouteProtection({children, isAuth, user}) {
    const location = useLocation();
    console.log(location.pathname);

    if(!isAuth && !(location.pathname.includes("/auth/login") 
      || location.pathname.includes("/auth/register")
    || location.pathname.includes("/auth/otp")
    || location.pathname.includes("/auth/check-user")
    || location.pathname.includes("/auth/forget-password/")
    )){
        return <Navigate to="/auth/login" />
    }

    if(isAuth && location.pathname.includes("admin") && user.Role !== "admin"){
        return <Navigate to="*" />
    }

    if(isAuth && (location.pathname.includes("/auth/register") || location.pathname.includes("/auth/login"))){
        if(user.Role === "admin"){
            return <Navigate to = "/admin/dashboard" />
        }
        return <Navigate to="/" />
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default RouteProtection
