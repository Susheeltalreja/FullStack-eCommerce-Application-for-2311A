import React, { useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'

import Image from "../../Images/AuthImage.jpg"
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { DecreaseQuantityThunk, FetchCartThunk, IncreaseQuantityThunk, RemoveItemThunk } from '@/StateManagement/UserSlices/CartSlice'

function Cart({ OpenCart, setOpenCart }) {

    const { User } = useSelector(st => st.Auth);
    const { Cart } = useSelector(st => st.Cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(FetchCartThunk({ id: User?.ID }))
    }, [])

    console.log("Cart: ", Cart)

    function IncreaseQuantity(id){
        dispatch(IncreaseQuantityThunk({UserId: User?.ID, ProductId: id})).then((res) => {
            if(res?.payload?.success){
                dispatch(FetchCartThunk({ id: User?.ID }))
            }
        })
    }
    function DecreaseQuantity(id){
        dispatch(DecreaseQuantityThunk({UserId: User?.ID, ProductId: id})).then((res) => {
            if(res?.payload?.success){
                dispatch(FetchCartThunk({ id: User?.ID }))
            }
        })
    }
    function RemoveItem(id){
        dispatch(RemoveItemThunk({UserId: User?.ID, ProductId: id})).then((res) => {
            if(res?.payload?.success){
                dispatch(FetchCartThunk({ id: User?.ID }))
            }
        })
    }

    return (
        <Sheet open={OpenCart} onOpenChange={setOpenCart}>
            <SheetContent side='right' className='z-70'>
                <SheetHeader>
                    <SheetTitle>Cart</SheetTitle>
                </SheetHeader>
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
            </SheetContent>
        </Sheet>
    )
}

export default Cart
