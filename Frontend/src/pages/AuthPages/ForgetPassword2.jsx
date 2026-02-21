import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

function ForgetPassword2() {

  const params = useParams();
  const [data, setData] = useState({
    UserEmail : params.email,
    NewPassword : "",
    ConfirmPassword : ""
  })

  const navigate = useNavigate();

  async function handleForgetPassword(){
    const response = await axios.put("http://localhost:5000/auth/update", data);
    if(response?.data?.success){
      navigate("/auth/login");
      toast.success(`${response?.data?.message}`);
    }else{
      toast.error(`${response?.data?.message}`);
    }
  }

  useEffect(() => {
    async function CheckUser() {
      const response = await axios.post(`http://localhost:5000/auth/check-user/${params.email}`);
      if(!response?.data?.success){
        navigate("/auth/login");
        toast.error(`${response?.data?.message}`)
      }
    }
    CheckUser();
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="space-y-3">
        <Label>New Password</Label>
        <Input type="password" placeholder="New Password" onChange={(e) => setData({
          ...data,
          "NewPassword" : e.target.value
        })}/>
        <Label>Confirm Password</Label>
        <Input type="password" placeholder="Confirm Password" onChange={(e) => setData({
          ...data,
          "ConfirmPassword" : e.target.value
        })}/>
        <Button onClick={() => handleForgetPassword()}>Submit</Button>
      </div>
    </div>
  )
}

export default ForgetPassword2
