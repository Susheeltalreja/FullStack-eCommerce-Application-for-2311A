import AddProductForm from '@/Components/AdminComponents/AddProductForm'
import ProductCards from '@/Components/AdminComponents/ProductCards'
import { Button } from '@/Components/ui/button'
import { FetchProductsThunk } from '@/StateManagement/AdminSlices/ProductSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Products() {
  const [OpenForm, setOpenForm] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchProductsThunk())
  }, [])

  const {Products} = useSelector(st => st.Product)

  console.log("Product", Products)

  return (
    <div className='relative'>
      <div className="h-20">
      <Button className="absolute right-6 top-6 cursor-pointer" onClick={() => setOpenForm(true)}>Add Product</Button>
      <AddProductForm OpenForm={OpenForm} setOpenForm={setOpenForm}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 px-3">
        {
          Products && Products.length > 0 ?
          (Products.map((item) => <ProductCards product={item}/>)) : (<p>No products found</p>)
        }
      </div>
    </div>
  )
}

export default Products
