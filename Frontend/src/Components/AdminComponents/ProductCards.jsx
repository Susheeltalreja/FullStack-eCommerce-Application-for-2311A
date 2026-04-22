import { DeleteProductThunk, FeaturedProductThunk, FetchProductsThunk } from '@/StateManagement/AdminSlices/ProductSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Star, Edit3, Trash2 } from 'lucide-react'; // Added icons for cleaner buttons

function ProductCards({ product, setOpenForm, setData }) {
  const dispatch = useDispatch();

  function HandleDelete(Data) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(DeleteProductThunk(Data?._id)).then((d) => {
        if (d?.payload?.success) {
          dispatch(FetchProductsThunk());
          toast.success(`${d?.payload?.message}`);
        } else {
          toast.error("Failed to delete product");
        }
      });
    }
  }

  function HandleFeature(id, currentValue) {
    // Force a boolean check: if it's undefined/null, treat as false, then flip it
    const newValue = currentValue === true ? false : true;

    const data = { Featured: newValue };

    console.log("Sending to Backend:", { id, data }); // Check your console!

    dispatch(FeaturedProductThunk({ id, data })).then((res) => {
      // res.payload must contain the { success: true } from your controller
      if (res?.payload?.success) {
        dispatch(FetchProductsThunk());
        toast.success(newValue ? "Added to Featured" : "Removed from Featured");
      } else {
        // If the backend returns success: false (like the 3-product limit), show that message
        toast.error(res?.payload?.message || "Failed to update status");
      }
    });
  }

  return (
    <div className='group relative border border-gray-100 bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-orange-500/50'>

      {/* Image & Star Section */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={`http://localhost:5000/uploads/${product.ProductImage}`}
          alt={product.ProductName}
          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
        />

        {/* The Star Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            HandleFeature(product._id, product.
              isFeatured);
          }}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm transition-all active:scale-75 group/star hover:bg-white"
        >
          <Star
            size={20}
            className={`transition-all duration-300 ${product.isFeatured
              ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
              : "text-gray-400 fill-transparent group-hover/star:text-yellow-400"
              }`}
          />
        </button>
      </div>

      {/* Details */}
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className='font-bold text-gray-900 text-base leading-tight line-clamp-2'>{product.ProductName}</h3>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-orange-600 font-bold text-sm">
              Rs. {product.ProductSalePrice || product.ProductPrice}
            </span>
            {product.ProductSalePrice && (
              <span className="text-[10px] text-gray-400 line-through">
                Rs. {product.ProductPrice}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{product.ProductCategory}</span>
          <span>{product.ProductBrand}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            className='flex-1 py-2.5 rounded-xl font-bold text-xs bg-zinc-900 text-white flex items-center justify-center gap-2 transition-all hover:bg-orange-500 active:scale-95'
            onClick={() => { setOpenForm(true); setData(product); }}
          >
            <Edit3 size={14} /> Edit
          </button>
          <button
            className='flex-1 py-2.5 rounded-xl font-bold text-xs border border-red-100 text-red-600 flex items-center justify-center gap-2 transition-all hover:bg-red-50 active:scale-95'
            onClick={() => HandleDelete(product)}
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCards;