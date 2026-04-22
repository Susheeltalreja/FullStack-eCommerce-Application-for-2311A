import React, { useEffect, useState, useMemo } from 'react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { DecreaseQuantityThunk, FetchCartThunk, IncreaseQuantityThunk, RemoveItemThunk } from '@/StateManagement/UserSlices/CartSlice';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { toast } from 'sonner';

function Cart({ OpenCart, setOpenCart }) {
    const dispatch = useDispatch();
    const { User } = useSelector(st => st.Auth);
    const { Cart } = useSelector(st => st.Cart);
    
    const [isCheckout, setCheckout] = useState(false);
    const [formData, setFormData] = useState({ UserId: User?.ID });

    useEffect(() => {
        if (User?.ID) {
            dispatch(FetchCartThunk({ id: User?.ID }));
        }
    }, [User?.ID, dispatch]);

    // Efficiently calculate total only when Cart changes
    const totalAmount = useMemo(() => {
        return Cart?.Product?.reduce((acc, item) => {
            const price = item?.ProductId?.ProductSalePrice || item?.ProductId?.ProductPrice || 0;
            return acc + (price * item?.Quantity);
        }, 0) || 0;
    }, [Cart]);

    // Unified handler for cart updates
    const updateCart = async (actionThunk, productId) => {
        const res = await dispatch(actionThunk({ UserId: User?.ID, ProductId: productId }));
        if (res?.payload?.success) {
            dispatch(FetchCartThunk({ id: User?.ID }));
        }
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    async function handleCheckoutSubmit() {
        try {
            const finalData = { ...formData, Total: totalAmount };
            const response = await axios.post("http://localhost:5000/user/checkout/final", finalData);
            
            if (response?.data?.success) {
                setOpenCart(false);
                setCheckout(false);
                dispatch(FetchCartThunk({ id: User?.ID }));
                toast.success(response?.data?.message);
            } else {
                toast.error(response?.data?.message);
            }
        } catch (e) {
            console.error("Checkout Error:", e);
            toast.error("An error occurred during checkout.");
        }
    }

    return (
        <Sheet open={OpenCart} onOpenChange={setOpenCart}>
            <SheetContent side='right' className='z-70 flex flex-col'>
                <SheetHeader>
                    <SheetTitle>{isCheckout ? "Checkout" : "Your Cart"}</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    {!isCheckout ? (
                        <div className="space-y-4 px-1">
                            {Cart?.Product?.length > 0 ? (
                                Cart.Product.map((item) => (
                                    <div key={item?.ProductId?._id} className="border rounded-lg flex gap-3 p-2">
                                        <img 
                                            src={`http://localhost:5000/uploads/${item?.ProductId?.ProductImage}`} 
                                            className="h-24 w-20 object-cover rounded" 
                                            alt={item?.ProductId?.ProductName} 
                                        />
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h2 className='font-bold text-sm bg-gray-100 px-2 py-1 rounded inline-block mb-1'>
                                                    {item?.ProductId?.ProductName}
                                                </h2>
                                                <div className="flex justify-between items-baseline">
                                                    <span className='text-xs text-gray-500'>{item?.ProductId?.ProductCategory}</span>
                                                    <div className='text-right'>
                                                        <p className='font-bold text-sm'>Rs. {item?.ProductId?.ProductSalePrice || item?.ProductId?.ProductPrice}</p>
                                                        {item?.ProductId?.ProductSalePrice && item?.ProductId?.ProductSalePrice> 0 ? (
                                                            <p className='line-through text-[10px] text-gray-400'>Rs. {item?.ProductId?.ProductPrice}</p>
                                                        ) : ""}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="icon" className="h-7 w-7" 
                                                        onClick={() => updateCart(IncreaseQuantityThunk, item?.ProductId?._id)}>
                                                        <Plus size={14} />
                                                    </Button>
                                                    <span className='w-6 text-center text-sm font-medium'>{item?.Quantity}</span>
                                                    <Button variant="outline" size="icon" className="h-7 w-7"
                                                        disabled={item?.Quantity === 1}
                                                        onClick={() => updateCart(DecreaseQuantityThunk, item?.ProductId?._id)}>
                                                        <Minus size={14} />
                                                    </Button>
                                                </div>
                                                <button onClick={() => updateCart(RemoveItemThunk, item?.ProductId?._id)} 
                                                    className='text-xs text-red-500 underline'>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>}
                        </div>
                    ) : (
                        <div className="space-y-4 px-1">
                            <div className="bg-gray-50 p-3 rounded-md border border-dashed border-gray-300">
                                <h3 className="text-sm font-semibold">Delivery Information</h3>
                                <p className="text-[11px] text-gray-500 italic">Cash on Delivery (COD) Only.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label>Full Name</Label>
                                    <Input name="FullName" placeholder="Name" onChange={handleInputChange} />
                                </div>
                                <div className="space-y-1">
                                    <Label>Contact</Label>
                                    <Input name="Contact" placeholder="03XX-XXXXXXX" onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label>Email</Label>
                                <Input name="Email" type="email" placeholder="email@example.com" onChange={handleInputChange} />
                            </div>

                            <div className="space-y-1">
                                <Label>Address</Label>
                                <Input name="Address" placeholder="House/Street/Area" onChange={handleInputChange} />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label>City</Label>
                                    <Input name="City" placeholder="City" onChange={handleInputChange} />
                                </div>
                                <div className="space-y-1">
                                    <Label>Postal Code</Label>
                                    <Input name="PostalCode" placeholder="Zip" onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label>Landmark</Label>
                                <Input name="LandMark" placeholder="Nearby place" onChange={handleInputChange} />
                            </div>

                            <div className="space-y-1">
                                <Label>Delivery Instructions</Label>
                                <textarea name="DeliveryInst" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                                    placeholder="Any special requests?" onChange={handleInputChange} />
                            </div>
                        </div>
                    )}
                </div>

                <SheetFooter className="pt-4 border-t">
                    {!isCheckout ? (
                        <Button className="w-full flex justify-between h-12" disabled={!Cart?.Product?.length} onClick={() => setCheckout(true)}>
                            <span className="font-bold">Checkout</span>
                            <span className="font-bold">Rs. {totalAmount}</span>
                        </Button>
                    ) : (
                        <div className="w-full space-y-2">
                            <Button className="w-full h-12 font-bold" onClick={handleCheckoutSubmit}>
                                Confirm Order (Pay on Delivery)
                            </Button>
                            <Button variant="ghost" className="w-full text-xs" onClick={() => setCheckout(false)}>
                                Back to Cart
                            </Button>
                        </div>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default Cart;