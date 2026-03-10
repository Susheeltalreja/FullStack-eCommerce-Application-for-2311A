import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'

import Image from "../../Images/AuthImage.jpg"
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'

function Cart({ OpenCart, setOpenCart }) {
    return (
        <Sheet open={OpenCart} onOpenChange={setOpenCart}>
            <SheetContent side='right' className='z-70'>
                <SheetHeader>
                    <SheetTitle>Cart</SheetTitle>
                </SheetHeader>
                <div className="py-2 px-4 h-[500px] overflow-y-scroll">
                    <div className="border h-32 w-full flex gap-2">
                        <div className="">
                            <img src={Image} alt="" className="h-32 object-cover" />
                        </div>
                        <div className="space-y-2 p-2">
                            <div className="flex w-full gap-1 flex-col">
                                <div className="w-full">
                                    <h2 className='font-bold bg-gray-200 text-center px-1 rounded py-1'>Product 1</h2>
                                </div>
                                <div className="flex justify-between items-center">
                                    <h3 className='font-bold bg-gray-200 text-center px-1 rounded py-1'>Men</h3>
                                    <h1 className='font-bold'>Rs. 1000</h1>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-2 items-center">
                                        <button variant="outline" className="cursor-pointer px-1 py-2 border rounded-lg"
                                        ><Plus size={20}/></button>
                                        <span className='px-2 py-1 border rounded-lg'>1</span>
                                        <button variant="outline" className="cursor-pointer px-1 py-2 border rounded-lg"
                                        ><Minus size={20}/></button>
                                    </div>
                                    <div className="">
                                        <p className='text-[13px] underline text-gray-500 cursor-pointer'>Remove</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default Cart
