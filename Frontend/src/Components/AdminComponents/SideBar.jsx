import { ChartBar, Codepen, ListOrdered, ShieldUser, ShoppingBasket } from 'lucide-react'
import React, { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const ConfigLink = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <ChartBar />
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />
  },
  {
    id: "orders",
    label: "orders",
    path: "/admin/orders",
    icon: <ListOrdered />
  },
  {
    id: "brandcategory",
    label: "BrandCategory",
    path: "/admin/brandcategory",
    icon: <Codepen />
  },
]

function SideBar({ open, setOpen }) {
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <Fragment>
      <div className="w-64 border-r border-gray-400 md:block hidden">
        <h1 className='font-bold flex items-center gap-2 mt-3'><ShieldUser className='w-8 h-8' />Admnin Dashboard</h1>
        <aside className='flex gap-4 flex-col px-4 py-2'>
          {
            ConfigLink && ConfigLink.map((e) => (
              <Link to={e.path} key={e.id} className={`flex gap-3 w-full hover:bg-gray-200 transition-all px-4 py-2 rounded-xl ${location.pathname == e.path ? "bg-gray-200" : ""}`}>{e.icon}  {e.label}</Link>
            ))
          }
        </aside>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className="w-64">
          <SheetHeader>
            <SheetTitle>
              <div className="">
                <h1 className='font-bold flex items-center gap-2 mt-3'><ShieldUser className='w-8 h-8' />Admnin Dashboard</h1>
              </div>
            </SheetTitle>
          </SheetHeader>
          <aside className='flex gap-4 flex-col px-4 py-2'>
            {
              ConfigLink && ConfigLink.map((e) => (
                <Link to={e.path}
                onClick={() => setOpen(false)}
                key={e.id} className={`flex gap-3 w-full hover:bg-gray-200 transition-all px-4 py-2 rounded-xl ${location.pathname == e.path ? "bg-gray-200" : ""}`}>{e.icon}  {e.label}</Link>
              ))
            }
          </aside>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default SideBar
