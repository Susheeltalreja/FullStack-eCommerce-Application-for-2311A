import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'sonner';

function ForgetPassword1() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  console.log("Email:", email)

  async function HandleCheckUser(){
    if(!email){
      setError(true)
    }else{
      setError(false)
      const response = await axios.post(`http://localhost:5000/auth/check-user/${email}`);
      if(response?.data?.success){
        toast.success(`${response?.data?.message}`);
      }else{
        toast.error(`${response?.data?.message}`);
      }
    }
  }

  return (
    <div className='flex justify-center items-center h-full px-4'>
      <div className="space-y-3 w-full">
        <Input
        type="email"
        className="w-full"
        onChange={(e) => setEmail(e.target.value)}
        />
        {
          error && <p className='text-red-600'>Input field are required</p>
        }
        <Button onClick={() => HandleCheckUser()}>Submit</Button>
      </div>
    </div>
  )
}

export default ForgetPassword1
