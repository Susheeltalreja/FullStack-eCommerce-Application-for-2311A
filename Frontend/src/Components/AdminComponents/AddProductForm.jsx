import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useDispatch, useSelector } from 'react-redux'
import { FetchBrandThunk, FetchCategoryThunk } from '@/StateManagement/AdminSlices/BrandCategorySlice'
import { Textarea } from '../ui/textarea'
import ImageUpload from './ImageUpload'
import { AddProductThunk } from '@/StateManagement/AdminSlices/ProductSlice'
import { Button } from '../ui/button'
import { toast } from 'sonner'

const ProductForm = [
    {
        name: "ProductName",
        label: "Product Name",
        placeholder: "Enter your product name!",
        type: "text"
    },
    {
        name: "ProductPrice",
        label: "Product Price",
        placeholder: "Enter your product price!",
        type: "number"
    },
    {
        name: "ProductSalePrice",
        label: "Product Sale Price (Optional)",
        placeholder: "Enter your product's sale price!",
        type: "number"
    },
    {
        name: "ProductQuantity",
        label: "Product Quantity",
        placeholder: "Enter your product's quantity!",
        type: "number"
    },
]

function AddProductForm({ OpenForm, setOpenForm }) {

    const dispatch = useDispatch();

    const {Brands, Category} = useSelector(st => st.BrandCategory);
    // console.log("Brands", Brands);
    // console.log("Category: ", Category);

    useEffect(() => {
        dispatch(FetchBrandThunk());
        dispatch(FetchCategoryThunk());
    }, [])

    const [formData, setFormData] = useState({
        ProductImage: "",
        ProductName: "",
        ProductPrice: 0,
        ProductSalePrice: 0,
        ProductQuantity: 0,
        ProductCategory: "",
        ProductBrand: "",
        ProductDesc: ""
    })
    function HandleProduct(){
        dispatch(AddProductThunk(formData)).then((data) => {
            if(data?.payload?.success){
                toast.success(`${data?.payload?.message}`)
            }else{
                toast.error(`${data?.payload?.message}`)
            }
        })
    }

    return (
        <Sheet open={OpenForm} onOpenChange={setOpenForm}>
            <SheetContent side='right'>
                <SheetHeader>
                    <SheetTitle>Product Form</SheetTitle>
                </SheetHeader>
                <div className="space-y-3 px-4 py-2 overflow-auto">
                    <div className="">
                        <ImageUpload formData={formData} setFormData={setFormData}/>
                    </div>
                    {
                        ProductForm.map((i) => (
                            <div className="" key={i.name}>
                                <Label className="mb-2">{i.label}</Label>
                                <Input type={i.type} placeholder={i.placeholder} 
                                onChange={(e) => setFormData({
                                    ...formData,
                                    [i.name] : e.target.value
                                })}
                                />
                            </div>
                        ))
                    }
                    <div className="">
                        <Label className="mb-2">Product Category</Label>
                        <Select 
                        onValueChange={(value) => setFormData({
                            ...formData,
                            "ProductCategory": value
                        })}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select your category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Product Category</SelectLabel>
                                    {
                                        Category ? (Category.map((e) => (
                                            <SelectItem value={e.CategoryName} key={e.CategoryName}>{e.CategoryName}</SelectItem>
                                        ))) : (<p>No categories available</p>)
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="">
                        <Label className="mb-2">Product Brand</Label>
                        <Select onValueChange={(value) => setFormData({
                            ...formData,
                            "ProductBrand": value
                        })}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select your brand" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Product Brand</SelectLabel>
                                    {
                                        Brands ? (Brands.map((e) => (
                                            <SelectItem value={e.BrandName} key={e.BrandName}>{e.BrandName}</SelectItem>
                                        ))) : (<p>No brand available</p>)
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="">
                        <Label className="mb-2">Product Description</Label>
                        <Textarea placeholder="Enter product's description" onChange={(e) => setFormData({
                            ...formData,
                            "ProductDesc": e.target.value
                        })}/>
                    </div>
                    <div className="">
                        <Button className="cursor-pointer" onClick={() => HandleProduct()}>Add</Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default AddProductForm
