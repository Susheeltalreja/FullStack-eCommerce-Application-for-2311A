import React, { useEffect, useRef, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Check, CloudIcon, Folder, LockKeyhole, X } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

function ImageUpload({formData, setFormData}) {

  const [Image, setImage] = useState(null);

  const InputRef = useRef();
  // console.log(Image);
  function SelectImage(e) {
    setImage(e.target.files[0]);
  }
  // console.log("Image: ", Image);
  function HandleDrag(e) {
    e.preventDefault();
  }
  function HandleDrop(e) {
    e.preventDefault();
    setImage(e.dataTransfer.files[0])
  }
  function HandleRemove() {
    setImage(null)
    if (InputRef.current.value) {
      InputRef.current.value = "";
    }
    console.log("Input Ref: ", InputRef.current.value)
  }
  async function HandleUpload(){
    const data = new FormData()
    data.append("ProductImage", Image)
    const response = await axios.post("http://localhost:5000/product/upload", data);
    setFormData({
      ...formData,
      "ProductImage" : response?.data?.address
    })
  }

  // useEffect(() => {
  //   if(!Image) return;
  //   HandleUpload();
  // }, [Image])

  return (
    <div className="">
      <Label className="mb-2">Product Image</Label>
      <Input type="file" onChange={(i) => SelectImage(i)} id="image" className="hidden" ref={InputRef} />
      <Label htmlFor="image" onDragOver={(params) => HandleDrag(params)} onDrop={(params) => HandleDrop(params)} className="h-32 border border-dashed border-black rounded">
        {
          !Image ? (<div className="w-full flex justify-center items-center gap-3">
            <CloudIcon size={40} />
            <h3>Drag & Drop or Click to Upload</h3>
          </div>) : (
            <div className="w-full flex justify-between items-center px-4">
              <Folder size={40} />
              <h3 className='w-[200px]'>{Image?.name}</h3>
              {
                formData.ProductImage ? (<LockKeyhole />) : (<div className="flex gap-1">
                  <Button variant="outline" className="cursor-pointer" onClick={() => HandleRemove()}><X /></Button>
                  <Button variant="outline" className="cursor-pointer" onClick={() => HandleUpload()}><Check /></Button>
                  </div>)
              }
            </div>
          )
        }
      </Label>
    </div>
  )
}

export default ImageUpload
