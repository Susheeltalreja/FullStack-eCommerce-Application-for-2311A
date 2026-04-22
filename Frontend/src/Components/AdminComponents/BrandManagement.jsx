import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux';
import { AddBrandThunk, DeleteBrandThunk, FetchBrandThunk, UpdateBrandThunk } from '@/StateManagement/AdminSlices/BrandCategorySlice';
import { toast } from 'sonner';
import axios from 'axios';

function BrandManagement() {

    const [openDialog, setOpenDialog] = useState(false);

    const [brand, setBrand] = useState("");
    const [BrandDetails, setBrandDetails] = useState(null);

    const [SearchBrand, setSearchBrand] = useState("");
    const [SearchResult, setSearchResult] = useState([]);
    // console.log("Brand: ", brand);

    const dispatch = useDispatch();

    function hanldeBrands() {
        if (BrandDetails?._id) {
            dispatch(UpdateBrandThunk({ id: BrandDetails?._id, data: { BrandName: brand } })).then((res) => {
                if (res?.payload?.success) {
                    setOpenDialog(false);
                    dispatch(FetchBrandThunk());
                    toast.success(`${res?.payload?.message}`);
                } else {
                    toast.error(`${res?.payload?.message}`);
                }
            })
        } else {
            dispatch(AddBrandThunk({ BrandName: brand })).then((res) => {
                if (res?.payload?.success) {
                    setOpenDialog(false);
                    dispatch(FetchBrandThunk());
                    toast.success(`${res?.payload?.message}`);
                } else {
                    toast.error(`${res?.payload?.message}`);
                }
            });
        }
    }

    useEffect(() => {
        dispatch(FetchBrandThunk());
    }, [])

    const { isLoading, Brands } = useSelector(st => st.BrandCategory)

    // console.log("Brands: ", Brands);

    function HandleOutput(item) {
        setBrandDetails(item);
        setBrand(item?.BrandName)
    }
    // console.log("Brand Name: ", brand);

    function HandleDelete(item) {
        const Id = item?._id;
        dispatch(DeleteBrandThunk(Id)).then((res) => {
            if (res?.payload?.success) {
                dispatch(FetchBrandThunk());
                toast.success(`${res?.payload?.message}`);
            } else {
                toast.error(`${res?.payload?.message}`);
            }
        })
    }

    //Debouncing useEffect hook
    useEffect(() => {
        if (!SearchBrand) {
            setSearchResult([])
            return;
        };
        //Call first
        const res = setTimeout(() => {
            async function SearchBrandFunc() {
                const response = await axios.get(`http://localhost:5000/cb/search-brand/${SearchBrand}`, {
                    withCredentials: true
                });
                setSearchResult(response?.data?.FindBrand);
            }
            SearchBrandFunc();
        }, 1000);

        return () => {
            clearTimeout(res)
        };
    }, [SearchBrand])


    console.log("Search Result: ", SearchResult);

    return (
        <div className='w-full  p-3 h-[70%] bg-gray-100 rounded-3xl '>

            <div className="flex w-full justify-between items-center">
                <button className="cursor-pointer px-4 py-2 bg-orange-400 rounded-2xl text-white font-bold" onClick={() => {
                    setOpenDialog(true)
                    setBrand("")
                    setBrandDetails(null)
                }}>Add Brand</button>
                <Input type="text" placeholder="Enter your brand name!" className="w-[200px] bg-white"
                    onChange={(e) => setSearchBrand(e.target.value)}
                />
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                {/* <Dialog> */}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Brand
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Input type="text" placeholder="Enter your brand Name!" value={brand} onChange={(e) => setBrand(e.target.value)} />
                        <Button className="cursor-pointer" onClick={() => hanldeBrands()}>Add</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="flex flex-col gap-2 w-full h-[80%] overflow-auto justify-start items-start mt-3">
                {
                    SearchBrand ? (
                        SearchResult && SearchResult.length > 0 ? (
                            SearchResult.map((items, i) => (
                                <div className="group flex justify-between w-full items-center px-4 py-2 border-b border-gray-500 bg-gray-200" key={items?._id}>
                                    <h1 className='text-lg font-bold'>{i + 1}</h1>
                                    <h2 className='text-lg font-bold'>{items.BrandName}</h2>
                                    <div className="space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                        <button className='bg-transparent border border-blue-800 px-2 py-1 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer' onClick={() => {
                                            setOpenDialog(true)
                                            HandleOutput(items)
                                        }}>Edit</button>
                                        <button className='bg-transparent border border-red-800 px-2 py-1 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer'
                                            onClick={() => HandleDelete(items)}
                                        >Delete</button>
                                    </div>
                                </div>
                            ))
                        ) : (<p>No brand found</p>)
                    ) : (
                        Brands && Brands.length > 0 ?
                            Brands.map((items, i) => (
                                <div className="group flex justify-between w-full items-center px-4 py-2 border-b border-gray-500 bg-gray-200" key={items?._id}>
                                    <h1 className='text-lg font-bold'>{i + 1}</h1>
                                    <h2 className='text-lg font-bold'>{items.BrandName}</h2>
                                    <div className="space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                        <button className='bg-transparent border border-blue-800 px-2 py-1 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer' onClick={() => {
                                            setOpenDialog(true)
                                            HandleOutput(items)
                                        }}>Edit</button>
                                        <button className='bg-transparent border border-red-800 px-2 py-1 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer'
                                            onClick={() => HandleDelete(items)}
                                        >Delete</button>
                                    </div>
                                </div>
                            )) : "No Brands Found"
                    )
                }
            </div>
        </div>
    )
}

export default BrandManagement
