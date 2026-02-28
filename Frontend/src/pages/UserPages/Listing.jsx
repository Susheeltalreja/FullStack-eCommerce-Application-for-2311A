import { Button } from '@/Components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import Filter from '@/Components/UserComponents/Filter'
import UserCard from '@/Components/UserComponents/UserCard'
import { ArrowUpDown } from 'lucide-react'
import React, { useState } from 'react'

function Listing() {

  const [SortProduct, setSortProduct] = useState("a to z");
  // console.log("Sort", SortProduct)

  const [Filters, setFilters] = useState({});

  function hanldeFilters(Name, Value){
    const NewOption = {...Filters}
    if(!NewOption[Name]){
      NewOption[Name] = [Value]
    }else{
      const Index = NewOption[Name].indexOf(Value);
      if(Index == -1){
        NewOption[Name].push(Value);
      }else{
        NewOption[Name].splice(Index, 1);
      }
    }
    setFilters(NewOption)
    console.log(NewOption);
  }

  return (
    <div className="grid md:grid-cols-[300px_1fr] grid-cols-1 gap-2 py-30 px-5">
      <Filter hanldeFilters={hanldeFilters}/>
      <div className=" space-y-3 ">
        <div className="border h-16 rounded-lg flex justify-between items-center px-4">
          <div className="">Total: 10</div>
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"><ArrowUpDown /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Product Sort</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={SortProduct} onValueChange={setSortProduct}>
                    <DropdownMenuRadioItem value="a to z">A to Z</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="z to a">Z to A</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price low to high">Price low to high</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price high to low">Price high to low</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
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
