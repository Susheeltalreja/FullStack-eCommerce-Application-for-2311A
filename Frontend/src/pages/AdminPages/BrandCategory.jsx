import BrandManagement from '@/Components/AdminComponents/BrandManagement'
import CategoryManagment from '@/Components/AdminComponents/CategoryManagment'
import React from 'react'

function BrandCategory() {
  return (
    <div className='grid md:grid-cols-2 px-4 py-2 gap-2 h-screen'>
      <BrandManagement />
      <CategoryManagment />
    </div>
  )
}

export default BrandCategory
