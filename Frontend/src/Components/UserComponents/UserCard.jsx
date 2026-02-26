import React from 'react'

import Image from "../../Images/AuthImage.jpg"

function UserCard() {
    return (
        <div className='group relative border border-gray-200 bg-white space-y-4 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-orange-500'>

            {/* Image Container with Zoom Effect */}
            <div className="overflow-hidden bg-gray-100">
                <img
                    src={Image}
                    alt="{product.ProductName}"
                    className='w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-110'
                />
            </div>

            {/* Product Details */}
            <div className="px-4 space-y-3">
                <div className="flex justify-between items-center">
                    <h1 className='font-black text-black text-xl uppercase tracking-tight'>Product 1</h1>
                    {/* <span className={`text-orange-600 font-black text-sm ${product.ProductSalePrice ? "line-through" : ""}`}>
                        Rs. 5000
                    </span> */}
                    {/* <span className={`text-orange-600 font-black text-sm ${product.ProductSalePrice ? "block" : "hidden"}`}>
                        Rs. {product.ProductSalePrice}
                    </span> */}
                </div>

                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">Men</span>
                    <span>Nike</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 px-4 pb-4">
                <button className='flex-1 bg-black text-white py-2 rounded-lg font-bold transition-all duration-200 hover:bg-gray-800 active:scale-95 cursor-pointer'
                >
                    Add To Cart
                </button>
            </div>

            {/* Subtle Orange Accent Line on Hover */}
            <div className="h-1 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
        </div>
    )
}

export default UserCard
