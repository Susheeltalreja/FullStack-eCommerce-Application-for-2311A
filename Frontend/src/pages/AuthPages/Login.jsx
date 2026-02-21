import React, { useState } from 'react'
import { LoginForm } from '@/Config'
import { Label } from '@/Components/ui/label'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UserLogin } from '@/StateManagement/Authentication/Slice'
import { toast } from 'sonner'
function Login() {
  const [FormData, setFormData] = useState({
    UserEmail: "",
    UserPassword: ""
  })

  const dispatch = useDispatch();
  function LoggedIn() {
    dispatch(UserLogin(FormData)).then((response) => {
      if (response?.payload?.success) {
        toast.success(`${response?.payload?.message}`);
      } else {
        toast.error(`${response?.payload?.message}`);
      }
    });
  }
  console.log(FormData);
  return (
    <div className='flex justify-center items-center gap-2 flex-col h-full'>
      <div className="space-y-3 w-full px-4">
        {
          LoginForm && LoginForm.length > 0 ?
            LoginForm.map((e) => (
              <div className="space-y-2" key={e.name}>
                <Label>{e.label}</Label>
                <Input type={e.type} placeholder={e.placeholder} onChange={(event) => setFormData({
                  ...FormData,
                  [e.name]: event.target.value
                })}></Input>
              </div>
            )) : ''
        }
        <div className="flex justify-between w-full">
          <p>Not have an account? <Link to="/auth/register" className='font-bold hover:underline'>Register</Link></p>
          <Link to="/auth/check-user" className='font-bold hover:underline'>Forget Password!</Link>
        </div>
        <Button onClick={() => LoggedIn()}>Login</Button>
      </div>
    </div>
  )
}

export default Login
