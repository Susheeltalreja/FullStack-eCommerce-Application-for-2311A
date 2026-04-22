import { Button } from '@/Components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import Filter from '@/Components/UserComponents/Filter'
import UserCard from '@/Components/UserComponents/UserCard'
import { UserProductThunk } from '@/StateManagement/UserSlices/UserProductSlice'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

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
    sessionStorage.setItem("Filters", JSON.stringify(NewOption));
  }

  useEffect(() => {
    setFilters(JSON.parse(sessionStorage.getItem("Filters")) || {})
  }, [])

  const [SearchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(new URLSearchParams(Filters))
  }, [Filters])

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserProductThunk({Filters, Sort: SortProduct}))
  }, [Filters, SortProduct])

  const {Products} = useSelector(st => st.UserProduct)

  console.log("Products: ", Products)

  return (
    <div className="grid md:grid-cols-[300px_1fr] grid-cols-1 gap-2 py-30 px-5">
      <Filter hanldeFilters={hanldeFilters} filters={Filters}/>
      <div className=" space-y-3 ">
        <div className="border h-16 rounded-lg flex justify-between items-center px-4">
          <div className="">Total: {Products.length}</div>
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
          {
            Products && Products.length > 0 ? (
              Products.map((Item) => (<UserCard Product={Item}/>))
            ) : (<p>No Products found</p>)
          }
        </div>
      </div>
    </div>
  )
}

export default Listing
