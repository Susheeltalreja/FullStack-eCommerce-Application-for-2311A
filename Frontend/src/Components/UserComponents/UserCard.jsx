import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button';
import { Minus, Plus, ShoppingCart, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCartThunk, FetchCartThunk } from '@/StateManagement/UserSlices/CartSlice';
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
                    dispatch(FetchCartThunk({ id: User?.ID }))
                    toast.success(`${res?.payload?.message}`)
                } else {
                    toast.error(`${res?.payload?.message}`)
                }
            }).catch((e) => {
                console.log(e)
            })
        } else {
            toast.error("Please log in to add items to cart")
        }
    }

    return (
        <div className="w-full max-w-sm mx-auto">
            {/* --- Product Quick View Dialog --- */}
            <Dialog open={Open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px] overflow-hidden rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">Product Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                            <img
                                src={`http://localhost:5000/uploads/${Product.ProductImage}`}
                                alt={Product.ProductName}
                                className='w-full h-full object-contain p-4'
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className='font-bold text-2xl text-gray-900 leading-tight'>{Product.ProductName}</h2>
                                    <p className="text-orange-500 font-bold text-sm">{Product.ProductBrand}</p>
                                </div>
                                <div className="text-right">
                                    <div className={`text-gray-400 text-sm line-through ${!Product.ProductSalePrice && "hidden"}`}>
                                        Rs. {Product.ProductPrice}
                                    </div>
                                    <div className="text-2xl font-black text-black">
                                        Rs. {Product.ProductSalePrice || Product.ProductPrice}
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                {Product.ProductDesc}
                            </p>

                            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center border rounded-full bg-gray-50 p-1">
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="rounded-full h-8 w-8 hover:bg-white"
                                        onClick={() => { if (Quantity > 1) { setQuantity(Quantity - 1) } }}
                                    ><Minus className="h-4 w-4" /></Button>
                                    <span className='w-10 text-center font-bold'>{Quantity}</span>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="rounded-full h-8 w-8 hover:bg-white"
                                        onClick={() => setQuantity(Quantity + 1)}
                                    ><Plus className="h-4 w-4" /></Button>
                                </div>
                                <Button className="flex-1 rounded-full font-bold shadow-lg shadow-black/10 transition-transform active:scale-95" 
                                    onClick={() => {
                                        HandleCart()
                                        setOpen(false)
                                    }}>
                                    Add To Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* --- Main Card UI --- */}
            <div className='group relative flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
                
                {/* Sale Badge */}
                {Product.ProductSalePrice ? (
                    <div className="absolute top-3 left-3 z-10 bg-orange-600 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase">
                        Sale
                    </div>
                ) : ("")}

                {/* Image Section */}
                <div className="relative overflow-hidden cursor-pointer" onClick={() => setOpen(true)}>
                    <img
                        src={`http://localhost:5000/uploads/${Product.ProductImage}`}
                        alt={Product.ProductName}
                        className='w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <Eye className="h-4 w-4" /> Quick View
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-4 space-y-3 flex-grow">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{Product.ProductBrand}</p>
                        <h3 className='font-bold text-gray-900 truncate text-lg'>{Product.ProductName}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-gray-900">
                            Rs. {Product.ProductSalePrice || Product.ProductPrice}
                        </span>
                        {Product.ProductSalePrice ? (
                            <span className="text-xs text-gray-400 line-through font-medium">
                                Rs. {Product.ProductPrice}
                            </span>
                        ) : null}
                    </div>
                </div>

                {/* Footer / Action */}
                <div className="px-4 pb-4 mt-auto">
                    <button 
                        onClick={() => HandleCart()}
                        className='w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:bg-zinc-800 active:scale-95'
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add To Cart
                    </button>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="h-1.5 w-0 bg-orange-500 transition-all duration-500 group-hover:w-full"></div>
            </div>
        </div>
    )
}

export default UserCard