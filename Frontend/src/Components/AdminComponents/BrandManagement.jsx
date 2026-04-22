import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { AddBrandThunk, DeleteBrandThunk, FetchBrandThunk, UpdateBrandThunk } from '@/StateManagement/AdminSlices/BrandCategorySlice';
import { toast } from 'sonner';
import axios from 'axios';
import { Edit, Trash2, Plus, Search, Loader2 } from 'lucide-react';

function BrandManagement() {
    const dispatch = useDispatch();
    const { isLoading, Brands } = useSelector(st => st.BrandCategory);

    const [openDialog, setOpenDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [brandName, setBrandName] = useState("");
    const [selectedBrand, setSelectedBrand] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        dispatch(FetchBrandThunk());
    }, [dispatch]);

    // Handle Add or Update
    async function handleBrandSubmit() {
        if (!brandName.trim()) return toast.error("Brand name is required");
        
        setIsSubmitting(true);
        const action = selectedBrand?._id 
            ? UpdateBrandThunk({ id: selectedBrand._id, data: { BrandName: brandName } })
            : AddBrandThunk({ BrandName: brandName });

        const res = await dispatch(action);
        
        if (res?.payload?.success) {
            setOpenDialog(false);
            dispatch(FetchBrandThunk());
            toast.success(res.payload.message);
        } else {
            toast.error(res?.payload?.message || "Operation failed");
        }
        setIsSubmitting(false);
    }

    function handleDelete(id) {
        dispatch(DeleteBrandThunk(id)).then((res) => {
            if (res?.payload?.success) {
                dispatch(FetchBrandThunk());
                toast.success(res.payload.message);
            }
        });
    }

    function openEditDialog(item) {
        setSelectedBrand(item);
        setBrandName(item.BrandName);
        setOpenDialog(true);
    }

    // Debouncing Search
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResult([]);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const response = await axios.get(`http://localhost:5000/cb/search-brand/${searchQuery}`, {
                    withCredentials: true
                });
                setSearchResult(response?.data?.FindBrand || []);
            } catch (err) {
                console.error("Search error", err);
            }
        }, 600); // reduced to 600ms for snappier feel

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Determine which list to show
    const displayBrands = searchQuery ? searchResult : Brands;

    return (
        <div className='w-full p-6 h-full bg-white shadow-sm border rounded-3xl overflow-hidden flex flex-col'>
            
            {/* Header Section */}
            <div className="flex w-full justify-between items-center md:mb-6 flex-wrap gap-2 mb-2">
                <Button 
                    className="rounded-xl bg-orange-500 hover:bg-orange-600"
                    onClick={() => {
                        setSelectedBrand(null);
                        setBrandName("");
                        setOpenDialog(true);
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Brand
                </Button>
                
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                        type="text" 
                        placeholder="Search brands..." 
                        className="w-[250px] pl-10 bg-gray-50 border-none ring-1 ring-gray-200"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Modal */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{selectedBrand ? "Update Brand" : "Add New Brand"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input 
                            placeholder="Enter brand name" 
                            value={brandName} 
                            onChange={(e) => setBrandName(e.target.value)} 
                        />
                        <Button 
                            disabled={isSubmitting}
                            onClick={handleBrandSubmit}
                            className="w-full"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
                            {selectedBrand ? "Update Brand" : "Create Brand"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* List Section */}
            <div className="flex-1 overflow-auto space-y-2 pr-2">
                {displayBrands && displayBrands.length > 0 ? (
                    displayBrands.map((item, i) => (
                        <div 
                            key={item?._id} 
                            className="group flex justify-between items-center px-5 py-3 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all duration-200"
                        >
                            <div className="flex items-center gap-4">
                                <span className='text-xs font-mono text-gray-400'>#{i + 1}</span>
                                <h2 className='text-sm font-semibold text-gray-700'>{item.BrandName}</h2>
                            </div>
                            
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                                    onClick={() => openEditDialog(item)}
                                >
                                    <Edit size={16} />
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                        <p>{isLoading ? "Loading..." : "No brands found"}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BrandManagement;