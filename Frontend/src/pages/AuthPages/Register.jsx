import React, { useState } from 'react'
import { registerForm } from '@/Config'
import { Label } from '@/Components/ui/label'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UserRegister } from '@/StateManagement/Authentication/Slice'
import { toast } from 'sonner'
function Register() {
  const [inputsData, setInputsData] = useState({
    UserName: "",
    UserEmail: "",
    UserPassword: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleRegister(){
    dispatch(UserRegister(inputsData)).then((data) => {
      if(data?.payload?.success){
        toast.success(`${data?.payload?.message}`)
        navigate("/auth/otp", {state: inputsData?.UserEmail});
      }else{
        toast.error(`${data?.payload?.message}`)
      }
    });
  }

  return (
    <div className="flex justify-center items-center gap-2 flex-col h-full">
      <div className='space-y-3 w-full px-4'>
        {
          registerForm && registerForm.length > 0 ?
            registerForm.map((e) => (
              <div className="space-y-2" key={e.name}>
                <Label>{e.label}</Label>
                <Input type={e.type} placeholder={e.placeholder} onChange={(i) => setInputsData({
                  ...inputsData,
                  [e.name] : i.target.value
                })}></Input>
              </div>
            )) : ""
        }
        <p>Already have an account? <Link to="/auth/login" className='font-bold hover:underline'>Login</Link></p>
        <Button className="cursor-pointer" onClick={() => handleRegister()}>Sign Up</Button>
      </div> 
    </div>
  )
}

export default Register
