import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '../ui/sheet'

import Image from "../../Images/AuthImage.jpg"
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { DecreaseQuantityThunk, FetchCartThunk, IncreaseQuantityThunk, RemoveItemThunk } from '@/StateManagement/UserSlices/CartSlice'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { toast } from 'sonner'

function Cart({ OpenCart, setOpenCart }) {

    const { User } = useSelector(st => st.Auth);
    const { Cart } = useSelector(st => st.Cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(FetchCartThunk({ id: User?.ID }))
    }, [])

    console.log("Cart: ", Cart)

    function IncreaseQuantity(id) {
        dispatch(IncreaseQuantityThunk({ UserId: User?.ID, ProductId: id })).then((res) => {
            if (res?.payload?.success) {
                dispatch(FetchCartThunk({ id: User?.ID }))
            }
        })
    }
    function DecreaseQuantity(id) {
        dispatch(DecreaseQuantityThunk({ UserId: User?.ID, ProductId: id })).then((res) => {
            if (res?.payload?.success) {
                dispatch(FetchCartThunk({ id: User?.ID }))
            }
        })
    }
    function RemoveItem(id) {
        dispatch(RemoveItemThunk({ UserId: User?.ID, ProductId: id })).then((res) => {
            if (res?.payload?.success) {
                dispatch(FetchCartThunk({ id: User?.ID }))
            }
        })
    }

    const Total = Cart?.Product?.reduce((acc, item) => {
        const Price = item?.ProductId?.ProductSalePrice || item?.ProductId?.ProductPrice;
        return acc + Price * item?.Quantity
    }, 0)

    const [isCheckout, setCheckout] = useState(false)

    const [FormData, setFormData] = useState({
        UserId: User?.ID
    });

    console.log("Data:", FormData);

    async function HandleCheckout(){
        try{
            let data = {...FormData, Total}
            const response = await axios.post("http://localhost:5000/user/checkout/final", data);
            if(response?.data?.success){
                setOpenCart(false)
                setCheckout(false)
                dispatch(FetchCartThunk({ id: User?.ID }))
                toast.success(`${response?.data?.message}`)
            }else{
                toast.error(`${response?.data?.message}`)
            }
        }catch(e){
            console.log(`Error: ${e}`)
        }
    }

    return (
        <Sheet open={OpenCart} onOpenChange={setOpenCart}>
            <SheetContent side='right' className='z-70'>
                <SheetHeader>
                    <SheetTitle>Cart</SheetTitle>
                </SheetHeader>
                {
                    !isCheckout ? (
                        <div className="py-2 px-4 h-[500px] overflow-y-scroll space-y-2">
                            {
                                Cart.Product && Cart.Product.length > 0 ? (
                                    Cart.Product.map((item) => (
                                        <div className="border h-32 w-full flex gap-2">
                                            <div className="">
                                                <img src={`http://localhost:5000/uploads/${item?.ProductId?.ProductImage}`} alt="" className="h-32 object-cover" />
                                            </div>
                                            <div className="space-y-1 p-2">
                                                <div className="flex w-full gap-1 flex-col">
                                                    <div className="w-full">
                                                        <h2 className='font-bold bg-gray-200 text-center px-1 rounded py-1'>{item?.ProductId?.ProductName}</h2>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <h3 className='font-bold bg-gray-200 text-center text-[14px] px-1 rounded py-1'>{item?.ProductId?.ProductCategory}</h3>
                                                        {
                                                            item?.ProductId.ProductSalePrice ? (
                                                                <div className=''>
                                                                    <h1 className='font-bold'>Rs. {item?.ProductId.ProductSalePrice}</h1>
                                                                    <h1 className='line-through text-[12px]'>Rs. {item?.ProductId.ProductPrice}</h1>
                                                                </div>
                                                            ) : (
                                                                <h1 className='font-bold'>Rs. {item?.ProductId.ProductPrice}</h1>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex gap-2 items-center">
                                                            <button variant="outline" className="cursor-pointer px-1 py-2 border rounded-lg"
                                                                onClick={() => IncreaseQuantity(item?.ProductId?._id)}
                                                            ><Plus size={20} /></button>
                                                            <span className='px-2 py-1 border rounded-lg'>{item?.Quantity}</span>
                                                            <button variant="outline" className="cursor-pointer px-1 py-2 border rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
                                                                disabled={item?.Quantity === 1}
                                                                onClick={() => DecreaseQuantity(item?.ProductId?._id)}
                                                            ><Minus size={20} /></button>
                                                        </div>
                                                        <div className="">
                                                            <p className='text-[13px] underline text-gray-500 cursor-pointer'
                                                                onClick={() => RemoveItem(item?.ProductId?._id)}
                                                            >Remove</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (<p>No products in cart</p>)
                            }
                        </div>
                    ) : (
                        <div className="px-4 max-w-lg mx-auto grid space-y-4 overflow-scroll">
                            {/* Section Header */}
                            <div className="border-b pb-2 mb-2">
                                <h2 className="text-xl font-semibold">Delivery Information</h2>
                                <p className="text-sm text-gray-500 italic">No online payment required. Pay when you receive your order.</p>
                            </div>

                            {/* Contact Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label>Full Name</Label>
                                    <Input type="text" placeholder="Enter your name"
                                        onChange={(e) => setFormData({
                                            ...FormData,
                                            "FullName": e.target.value
                                        })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>Contact Number</Label>
                                    <Input type="tel" placeholder="03XX-XXXXXXX"
                                        onChange={(e) => setFormData({
                                            ...FormData,
                                            "Contact": e.target.value
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label>Email</Label>
                                <Input type="email" placeholder="Enter your email"
                                    onChange={(e) => setFormData({
                                        ...FormData,
                                        "Email": e.target.value
                                    })}
                                />
                            </div>

                            {/* Shipping Details */}
                            <div className="space-y-1">
                                <Label>Full Address</Label>
                                <Input type="text" placeholder="House #, Street name, Area"
                                    onChange={(e) => setFormData({
                                        ...FormData,
                                        "Address": e.target.value
                                    })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label>City</Label>
                                    <Input type="text" placeholder="e.g. New York"
                                        onChange={(e) => setFormData({
                                            ...FormData,
                                            "City": e.target.value
                                        })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>Postal Code</Label>
                                    <Input type="text" placeholder="Zip code"
                                        onChange={(e) => setFormData({
                                            ...FormData,
                                            "PostalCode": e.target.value
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label>Landmark</Label>
                                <Input type="text" placeholder="Near which famous place?"
                                    onChange={(e) => setFormData({
                                        ...FormData,
                                        "LandMark": e.target.value
                                    })}
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Delivery Instructions</Label>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="e.g. Please call before arriving"
                                    onChange={(e) => setFormData({
                                        ...FormData,
                                        "DeliveryInst": e.target.value
                                    })}
                                />
                            </div>

                        </div>
                    )
                }

                <SheetFooter>
                    {
                        !isCheckout ? (
                            <div className="h-16 px-4 py-2 bg-black rounded cursor-pointer text-white flex justify-between items-center" onClick={() => setCheckout(true)}>
                                <h1 className='font-bold'>Checkout</h1>
                                <h1 className='font-bold'>Rs. {Total}</h1>
                            </div>
                        ) : (
                            <button className="w-full bg-black text-white py-3 rounded-md font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                            onClick={() => HandleCheckout()}
                            >
                                Confirm Order (Pay on Delivery)
                            </button>
                        )
                    }
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Cart
