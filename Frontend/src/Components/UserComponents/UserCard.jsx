import React, { useState } from 'react'

import Image from "../../Images/AuthImage.jpg"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCartThunk } from '@/StateManagement/UserSlices/CartSlice';
import { toast } from 'sonner';

function UserCard({ Product }) {

    const [Open, setOpen] = useState(false);

    const [Quantity, setQuantity] = useState(1);

    const { User } = useSelector(st => st.Auth)

    const dispatch = useDispatch();

    function HandleCart() {
        if (User?.ID) {
            let data = {
                UserId: User?.ID,
                ProductId: Product?._id,
                Quantity: Quantity
            }
            dispatch(AddToCartThunk(data)).then((res) => {
                if (res?.payload?.success) {
                    toast.success(`${res?.payload?.message}`)
                } else {
                    toast.error(`${res?.payload?.message}`)
                }
            }).catch((e) => {
                console.log(e)
            })
        }else{
            toast.error("User must be logged in")
        }
    }

    return (
        <div className="">

            {/* Product details component */}
            <Dialog open={Open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Product Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                        <div className="overflow-hidden bg-gray-100">
                            <img
                                src={`http://localhost:5000/uploads/${Product.ProductImage}`}
                                alt={Product.ProductName}
                                className='w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-110'
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <h1 className='font-black text-black text-xl uppercase tracking-tight'>{Product.ProductName}</h1>
                            <div className="flex gap-2">
                                <span className={`text-orange-600 font-black text-md ${Product.ProductSalePrice ? "line-through" : ""}`}>
                                    Rs. 5000
                                </span>
                                <span className={`text-orange-600 font-black text-md ${Product.ProductSalePrice ? "block" : "hidden"}`}>
                                    Rs. {Product.ProductSalePrice}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded">{Product.ProductCategory}</span>
                            <span>{Product.ProductBrand}</span>
                        </div>
                        <div className="text-gray-600 text-sm px-2">{Product.ProductDesc}</div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <Button variant="outline" className="cursor-pointer"
                                    onClick={() => setQuantity(Quantity + 1)}
                                ><Plus /></Button>
                                <span className='px-4 py-2 border rounded-lg'>{Quantity}</span>
                                <Button variant="outline" className="cursor-pointer"
                                    onClick={() => { if (Quantity > 1) { setQuantity(Quantity - 1) } }}
                                ><Minus /></Button>
                            </div>
                            <div className="">
                                <Button className="cursor-pointer" onClick={() => {
                                    HandleCart()
                                    setOpen(false)
                                }}>Add To Cart</Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <div className='group relative border border-gray-200 bg-white space-y-4 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-orange-500'
            >

                {/* Image Container with Zoom Effect */}
                <div className="overflow-hidden bg-gray-100" onClick={() => setOpen(true)}>
                    <img
                        src={`http://localhost:5000/uploads/${Product.ProductImage}`}
                        alt={Product.ProductName}
                        className='w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>

                {/* Product Details */}
                <div className="px-2 space-y-3">
                    <div className="flex justify-between items-center">
                        <h1 className='font-black text-black text-xl uppercase tracking-tight'>{Product.ProductName}</h1>
                        <span className={`text-orange-600 font-black text-sm ${Product.ProductSalePrice ? "line-through text-[10px]" : ""}`}>
                            Rs. 5000
                        </span>
                        <span className={`text-orange-600 font-black text-sm ${Product.ProductSalePrice ? "block" : "hidden"}`}>
                            Rs. {Product.ProductSalePrice}
                        </span>
                    </div>

                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded">{Product.ProductCategory}</span>
                        <span>{Product.ProductBrand}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 px-4 pb-4">
                    <button className='flex-1 bg-black text-white py-2 rounded-lg font-bold transition-all duration-200 hover:bg-gray-800 active:scale-95 cursor-pointer'
                        onClick={() => HandleCart()}
                    >
                        Add To Cart
                    </button>
                </div>

                {/* Subtle Orange Accent Line on Hover */}
                <div className="h-1 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
            </div>
        </div>
    )
}

export default UserCard
