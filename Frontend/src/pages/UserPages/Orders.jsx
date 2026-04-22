import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchOrdersForUserThunk } from '@/StateManagement/UserSlices/OrdersSlice';
// Added CheckCircle2 here
import { ChevronDown, Package, Calendar, MapPin, CreditCard, ShoppingBag, Clock, CheckCircle2 } from 'lucide-react';

const UserOrders = () => {
  const [expandedId, setExpandedId] = useState(null);
  const dispatch = useDispatch();
  
  const { User } = useSelector(st => st.Auth);
  const { UserOrders } = useSelector(st => st.UserOrders);

  useEffect(() => {
    if (User?.ID) {
      dispatch(FetchOrdersForUserThunk(User.ID));
    }
  }, [User?.ID, dispatch]);

  // Changed to lowercase to match your JSON: "Status": "pending"
  const steps = ['pending', 'processing', 'shipped', 'delivered'];

  return (
    <div className="w-full bg-white min-h-screen px-4 py-20 max-w-5xl mx-auto space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-lg">
            <ShoppingBag className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-black text-black uppercase tracking-tighter">Order History</h1>
        </div>
        <p className="text-sm text-gray-400 font-medium max-w-md">
          Check the status of recent orders, manage returns, and discover similar products.
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {UserOrders?.length > 0 ? (
          UserOrders.map((order) => {
            const isExpanded = expandedId === order?._id;
            // Added .toLowerCase() to ensure it matches the 'steps' array exactly
            const currentStepIdx = steps.indexOf(order?.Status?.toLowerCase());

            return (
              <div
                key={order?._id}
                className={`bg-white border transition-all duration-200 ${
                  isExpanded ? 'border-black shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]' : 'border-gray-200 hover:border-orange-500'
                } rounded-2xl overflow-hidden`}
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : order?._id)}
                  className="p-6 cursor-pointer select-none"
                >
                  <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-6">
                    {/* Order Meta */}
                    <div className="flex gap-8 items-center">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Order Number</p>
                        <p className="font-bold text-black text-sm">#{order?._id.slice(-8).toUpperCase()}</p>
                      </div>
                      <div className="hidden sm:block space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Placed On</p>
                        <p className="font-bold text-black text-sm">{order?.createdAt?.split("T")[0]}</p>
                      </div>
                    </div>

                    {/* Total & Status */}
                    <div className="flex items-center gap-6 ml-auto md:ml-0">
                      <div className="text-right sm:text-left space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount</p>
                        <p className="font-black text-black text-lg">Rs. {order?.Total}</p>
                      </div>
                      
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border-2 ${
                        order.Status?.toLowerCase() === 'delivered' 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-orange-500 border-orange-500'
                      }`}>
                        {order?.Status}
                      </div>

                      <ChevronDown 
                        className={`text-black transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                        size={20} 
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="p-6 lg:p-8 space-y-10">
                      
                      {/* Step Tracker */}
                      <div className="hidden md:flex justify-between relative before:absolute before:content-[''] before:h-1 before:w-full before:bg-gray-100 before:top-4 before:left-0 before:z-0">
                        {steps.map((step, i) => (
                          <div key={step} className="relative z-10 flex flex-col items-center gap-2 px-2">
                            <div className={`h-8 w-8 rounded-full border-4 flex items-center justify-center transition-colors ${
                              i <= currentStepIdx ? 'bg-orange-500 border-white text-white' : 'bg-white border-gray-100 text-gray-300'
                            }`}>
                              {i < currentStepIdx ? <CheckCircle2 size={16} /> : <span className="text-[10px] font-black">{i + 1}</span>}
                            </div>
                            <span className={`text-[10px] font-black uppercase ${i <= currentStepIdx ? 'text-black' : 'text-gray-300'}`}>{step}</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Left: Product List */}
                        <div className="lg:col-span-2 space-y-4">
                          <h4 className="text-xs font-black text-black uppercase flex items-center gap-2 mb-4">
                            <Package size={16} className="text-orange-500" /> My Items
                          </h4>
                          <div className="divide-y divide-gray-100 border rounded-2xl overflow-hidden">
                            {order?.Products.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center p-5 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black rounded-xl italic">
                                    {item?.Quantity}x
                                  </div>
                                  <div>
                                    <p className="font-bold text-black text-sm">{item?.ProductId?.ProductName}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quantity: {item?.Quantity}</p>
                                  </div>
                                </div>
                                <p className="font-black text-black text-sm">
                                  Rs. {item?.ProductId?.ProductSalePrice || item?.ProductId?.ProductPrice}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right: Shipping & Summary Card */}
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                            <div>
                                <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                  <MapPin size={12}/> Shipping Address
                                </h4>
                                <p className="text-sm font-bold text-black">{order?.FullName}</p>
                                <p className="text-xs text-gray-500 leading-relaxed">{order?.Address}, {order?.City}</p>
                            </div>

                            <div className="pt-6 border-t border-gray-200">
                                <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                  <CreditCard size={12}/> Payment Method
                                </h4>
                                <p className="text-sm font-bold text-black italic uppercase">Cash on Delivery</p>
                            </div>
                            
                            <button className="w-full bg-orange-500 hover:bg-black text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest text-xs">
                              Need Help?
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-gray-100 rounded-[40px]">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
               <ShoppingBag size={48} className="text-gray-200" />
            </div>
            <h3 className="text-xl font-black text-black uppercase tracking-widest">No Orders Yet</h3>
            <p className="text-gray-400 text-sm mt-1">Start shopping to fill your history.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;