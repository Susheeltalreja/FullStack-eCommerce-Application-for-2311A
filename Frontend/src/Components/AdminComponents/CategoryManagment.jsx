import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux';
import { AddCategoryThunk, DeleteCategoryThunk, FetchCategoryThunk, UpdateCategoryThunk } from '@/StateManagement/AdminSlices/BrandCategorySlice';
import { toast } from 'sonner';
import axios from 'axios';
function CategoryManagment() {
    const [openDialog, setOpenDialog] = useState(false);
    const [category, setCategory] = useState("");
    const [CategoryDetails, setCategoryDetails] = useState(null);

    const [SearchCategory, setSearchCategory] = useState("");
    const [SearchResult, setSearchResult] = useState([]);
    // console.log("Category: ", category);

    const disptach = useDispatch();

    function handleCategory() {
        if (CategoryDetails?._id) {
            disptach(UpdateCategoryThunk({ id: CategoryDetails?._id, data: { CategoryName: category } })).then((res) => {
                if (res?.payload?.success) {
                    setOpenDialog(false);
                    disptach(FetchCategoryThunk())
                    toast.success(`${res?.payload?.message}`);
                } else {
                    toast.error(`${res?.payload?.message}`);
                }
            });
        } else {
            disptach(AddCategoryThunk({ CategoryName: category })).then((res) => {
                if (res?.payload?.success) {
                    setOpenDialog(false);
                    disptach(FetchCategoryThunk())
                    toast.success(`${res?.payload?.message}`);
                } else {
                    toast.error(`${res?.payload?.message}`);
                }
            });
        }
    }

    useEffect(() => {
        disptach(FetchCategoryThunk())
    }, [])

    const { Category, isLoading } = useSelector(st => st.BrandCategory)
    // console.log("Categories: ", Category)

    function HandleEditCategory(item) {
        setCategoryDetails(item)
        setCategory(item?.CategoryName)
    }
    function HandleDeleteCategory(item) {
        disptach(DeleteCategoryThunk(item?._id)).then((res) => {
            if (res?.payload?.success) {
                disptach(FetchCategoryThunk());
                toast.success(`${res?.payload?.message}`);
            } else {
                toast.error(`${res?.payload?.message}`);
            }
        })
    }

    useEffect(() => {
        if (!SearchCategory) {
            setSearchResult([])
            return;
        };

        const res = setTimeout(() => {
            async function SearchCategoryFunc() {
                const response = await axios.get(`http://localhost:5000/cb/search-category/${SearchCategory}`, {
                    withCredentials: true
                });
                setSearchResult(response?.data?.Categories);
            }
            SearchCategoryFunc();
        }, 1000)

        return () => {
            clearTimeout(res);
        }

    }, [SearchCategory])

    console.log("Search: ", SearchCategory);

    return (
        <div className='w-full h-100 border border-black p-2'>

            <div className="flex justify-between items-center">
                <Button className="cursor-pointer" onClick={() => {
                    setOpenDialog(true)
                    setCategoryDetails(null)
                    setCategory("")
                }}>Add Category</Button>
                <Input type="text" placeholder="Enter your category name!" className="w-[200px]"
                    onChange={(e) => setSearchCategory(e.target.value)}
                />
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Category
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Input type="text" placeholder="Enter your Category Name!" value={category} onChange={(e) => setCategory(e.target.value)} />
                        <Button className="cursor-pointer" onClick={() => handleCategory()}>Add</Button>
                    </div>
                </DialogContent>
            </Dialog>


            <div className="flex flex-col gap-2 w-full h-[300px] overflow-auto justify-start items-start mt-3">
                {
                    SearchCategory ? (
                        SearchResult && SearchResult.length > 0 ?
                            (SearchResult.map((items, i) => (
                                <div className="flex justify-between w-full items-center px-4 py-2 border-b" key={items?._id}>
                                    <h1 className='text-lg font-bold'>{i + 1}</h1>
                                    <h2 className='text-lg font-bold'>{items.CategoryName}</h2>
                                    <div className="space-x-3">
                                        <button className='bg-transparent border border-blue-800 px-2 py-1 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer'
                                            onClick={() => {
                                                HandleEditCategory(items)
                                                setOpenDialog(true)
                                            }}
                                        >Edit</button>
                                        <button className='bg-transparent border border-red-800 px-2 py-1 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer'
                                            onClick={() => HandleDeleteCategory(items)}
                                        >Delete</button>
                                    </div>
                                </div>
                            ))) : (<p>No brand found</p>)
                    ) : (
                        Category && Category.length > 0 ?
                            Category.map((items, i) => (
                                <div className="flex justify-between w-full items-center px-4 py-2 border-b" key={items?._id}>
                                    <h1 className='text-lg font-bold'>{i + 1}</h1>
                                    <h2 className='text-lg font-bold'>{items.CategoryName}</h2>
                                    <div className="space-x-3">
                                        <button className='bg-transparent border border-blue-800 px-2 py-1 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer'
                                            onClick={() => {
                                                HandleEditCategory(items)
                                                setOpenDialog(true)
                                            }}
                                        >Edit</button>
                                        <button className='bg-transparent border border-red-800 px-2 py-1 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer'
                                            onClick={() => HandleDeleteCategory(items)}
                                        >Delete</button>
                                    </div>
                                </div>
                            )) : "No Categories found"
                    )
                }
            </div>
        </div>
    )
}

export default CategoryManagment
