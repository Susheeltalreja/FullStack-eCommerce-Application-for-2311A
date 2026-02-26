import Filter from '@/Components/UserComponents/Filter'
import UserCard from '@/Components/UserComponents/UserCard'
import React from 'react'

function Listing() {
  return (
    <div className="grid md:grid-cols-[300px_1fr] grid-cols-1 gap-2 py-30 px-5 bg-black text-white">
      <Filter />
      <div className="border  border-black space-y-3">
        <div className="border h-16 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
    </div>
  )
}

export default Listing
