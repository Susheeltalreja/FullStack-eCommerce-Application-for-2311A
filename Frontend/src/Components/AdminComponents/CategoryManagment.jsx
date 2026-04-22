import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { 
    AddCategoryThunk, 
    DeleteCategoryThunk, 
    FetchCategoryThunk, 
    UpdateCategoryThunk 
} from '@/StateManagement/AdminSlices/BrandCategorySlice';
import { toast } from 'sonner';
import axios from 'axios';
import { Edit, Trash2, Plus, Search, Loader2 } from 'lucide-react';

function CategoryManagment() {
    const dispatch = useDispatch();
    const { Category, isLoading } = useSelector(st => st.BrandCategory);

    const [openDialog, setOpenDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        dispatch(FetchCategoryThunk());
    }, [dispatch]);

    // Combined Add/Update Logic
    async function handleCategorySubmit() {
        if (!categoryName.trim()) return toast.error("Category name is required");

        setIsSubmitting(true);
        try {
            const action = selectedCategory?._id 
                ? UpdateCategoryThunk({ id: selectedCategory._id, data: { CategoryName: categoryName } })
                : AddCategoryThunk({ CategoryName: categoryName });

            const res = await dispatch(action);
            
            if (res?.payload?.success) {
                setOpenDialog(false);
                dispatch(FetchCategoryThunk());
                toast.success(res.payload.message);
            } else {
                toast.error(res?.payload?.message || "Something went wrong");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleDelete(id) {
        dispatch(DeleteCategoryThunk(id)).then((res) => {
            if (res?.payload?.success) {
                dispatch(FetchCategoryThunk());
                toast.success(res.payload.message);
            }
        });
    }

    // Debounce Search logic
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResult([]);
            return;
        }

        const delay = setTimeout(async () => {
            try {
                const response = await axios.get(`http://localhost:5000/cb/search-category/${searchQuery}`, {
                    withCredentials: true
                });
                setSearchResult(response?.data?.Categories || []);
            } catch (err) {
                console.error("Search error", err);
            }
        }, 600);

        return () => clearTimeout(delay);
    }, [searchQuery]);

    // Unified list for rendering
    const categoriesToDisplay = searchQuery ? searchResult : Category;

    return (
        <div className='w-full p-6 h-full bg-white shadow-sm border rounded-3xl overflow-hidden flex flex-col'>
            
            {/* Top Bar */}
            <div className="flex w-full justify-between items-center md:mb-6 flex-wrap gap-2 mb-2">
                <Button 
                    className="rounded-xl bg-orange-500 hover:bg-orange-600 transition-colors"
                    onClick={() => {
                        setSelectedCategory(null);
                        setCategoryName("");
                        setOpenDialog(true);
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
                
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                        type="text" 
                        placeholder="Search categories..." 
                        className="w-[250px] pl-10 bg-gray-50 border-none ring-1 ring-gray-200"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Modal */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedCategory ? "Update Category" : "Add New Category"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <Input 
                            placeholder="e.g. Electronics" 
                            value={categoryName} 
                            onChange={(e) => setCategoryName(e.target.value)} 
                        />
                        <Button 
                            disabled={isSubmitting}
                            onClick={handleCategorySubmit}
                            className="w-full"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                            {selectedCategory ? "Update Category" : "Save Category"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Data Table Area */}
            <div className="flex-1 overflow-auto space-y-2 pr-2">
                {categoriesToDisplay && categoriesToDisplay.length > 0 ? (
                    categoriesToDisplay.map((item, i) => (
                        <div 
                            key={item?._id} 
                            className="group flex justify-between items-center px-5 py-3 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all duration-200"
                        >
                            <div className="flex items-center gap-4">
                                <span className='text-xs font-mono text-gray-400'>#{i + 1}</span>
                                <h2 className='text-sm font-semibold text-gray-700'>{item.CategoryName}</h2>
                            </div>
                            
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 text-blue-600"
                                    onClick={() => {
                                        setSelectedCategory(item);
                                        setCategoryName(item.CategoryName);
                                        setOpenDialog(true);
                                    }}
                                >
                                    <Edit size={14} />
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 text-red-600"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    <Trash2 size={14} />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                        <p>{isLoading ? "Loading..." : "No categories found"}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryManagment;