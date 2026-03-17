import { FetchOrdersThunk } from '@/StateManagement/AdminSlices/OrdersSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CheckoutComponent = () => {
  const [expandedId, setExpandedId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchOrdersThunk())
  }, [])

  const { Orders } = useSelector(st => st.Orders);

  console.log(Orders);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Order Management</h2>
        <div className="text-sm text-slate-500">Total Orders: {Orders?.length}</div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {Orders?.map((order, index) => {
          const isExpanded = expandedId === order?._id;

          return (
            <div
              key={order?._id}
              className={`
                bg-white border rounded-xl overflow-hidden transition-all duration-300
                ${isExpanded ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:border-blue-300 shadow-sm'}
                animate-in fade-in slide-in-from-bottom-2
              `}
              style={{ animationFillMode: 'backwards', animationDelay: `${index * 100}ms` }}
            >
              {/* Main Summary Row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : order?._id)}
                className="p-4 flex flex-wrap items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  <span className="text-sm font-mono font-bold text-slate-400">#{order?._id}</span>
                  <div>
                    <p className="font-semibold text-slate-800">{order?.FullName}</p>
                    <p className="text-xs text-slate-500">{order?.createdAt?.split("T")[0]}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <span className="font-bold text-slate-700">Rs. {order?.Total}</span>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium transition-colors
                    ${order.status === 'Shipped' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}
                  `}>
                    {order?.Status}
                  </span>

                  {/* Chevron Icon */}
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Animated Detail Section (Pure Tailwind Transition) */}
              <div className={`
                grid transition-[grid-template-rows] duration-300 ease-in-out
                ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
              `}>
                <div className="overflow-hidden bg-slate-50">
                  <div className="p-6 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-6">
                    {/* Items List */}
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Order Items</h4>
                      <div className="space-y-2 text-sm text-slate-600">
                        {
                          order?.Products.map((item) => (
                            <div className="flex justify-between border-b border-slate-200 pb-1">
                              <span>{item?.ProductId?.ProductName} × {item?.Quantity}</span>
                              <span>Rs. {item?.ProductId?.ProductSalePrice || item?.ProductId?.ProductPrice}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>

                    {/* Status Update Form */}
                    <div className="w-full md:w-64 bg-white p-4 rounded-lg border border-slate-200 shadow-inner">
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Update Status</label>
                      <div className="flex flex-col gap-2">
                        <select className="w-full text-sm border-slate-200 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 outline-none bg-slate-50">
                          <option>Pending</option>
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                        </select>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-md transition-all active:scale-95">
                          Save Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutComponent;