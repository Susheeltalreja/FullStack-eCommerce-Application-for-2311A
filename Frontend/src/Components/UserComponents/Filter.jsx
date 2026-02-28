import React, { useEffect } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { FetchBrandThunk, FetchCategoryThunk } from '@/StateManagement/AdminSlices/BrandCategorySlice';

function Filter({hanldeFilters}) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchBrandThunk())
    dispatch(FetchCategoryThunk())
  }, [])

  const { Brands, Category } = useSelector(st => st.BrandCategory)
  // console.log("Brand", Brands);
  // console.log("category:", Category);

  return (
    <div className='md:h-100 h-full border-r'>
      <div className="space-y-3">
        <div className="font-bold p-2 border-b border-zinc-400">Category</div>
        <div className="">
          {
            Category && Category.length > 0 ? (
              Category.map((item) => (
                <div className="flex gap-2 p-2">
                  <Checkbox
                  onCheckedChange={() => hanldeFilters("Category",item.CategoryName)}
                  id={item.CategoryName} />
                  <Label htmlFor={item.CategoryName}>{item.CategoryName}</Label>
                </div>
              ))
            ) : (<p>No Categories found</p>)
          }
        </div>
      </div>
      <div className="space-y-3">
        <div className="font-bold p-2 border-b border-zinc-400">Brand</div>
        <div className="">
          {
            Brands && Brands.length > 0 ? (
              Brands.map((item) => (
                <div className="flex gap-2 p-2">
                  <Checkbox 
                  onCheckedChange={() => hanldeFilters("Brand",item.BrandName)}
                  id={item.BrandName} />
                  <Label htmlFor={item.BrandName}>{item.BrandName}</Label>
                </div>
              ))
            ) : (<p>No Categories found</p>)
          }
        </div>
      </div>
    </div>
  )
}

export default Filter
