import { FetchOrdersThunk, UpdateStatusThunk } from '@/StateManagement/AdminSlices/OrdersSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ChevronDown, Package, Calendar, User, CreditCard } from 'lucide-react';

const CheckoutComponent = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [status, setStatus] = useState("Pending");
  const dispatch = useDispatch();

  const { Orders } = useSelector(st => st.Orders);

  useEffect(() => {
    dispatch(FetchOrdersThunk());
  }, [dispatch]);

  const handleStatusUpdate = (id) => {
    dispatch(UpdateStatusThunk({ id: id, Data: { Status: status } })).then((res) => {
      if (res?.payload?.success) {
        dispatch(FetchOrdersThunk());
        toast.success(res.payload.message);
      } else {
        toast.error(res?.payload?.message);
      }
    });
  };

  return (
    <div className="w-full px-2 sm:px-4 py-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Order Management</h2>
          <p className="text-sm text-slate-500">Monitor and update customer shipments</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold self-start">
          Total Orders: {Orders?.length || 0}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {Orders?.map((order) => {
          const isExpanded = expandedId === order?._id;

          return (
            <div
              key={order?._id}
              className={`bg-white border rounded-2xl overflow-hidden transition-shadow ${
                isExpanded ? 'ring-1 ring-blue-500 shadow-md' : 'shadow-sm hover:shadow-md'
              }`}
            >
              {/* Responsive Header Row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : order?._id)}
                className="p-4 sm:p-6 cursor-pointer"
              >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                  {/* Customer & ID */}
                  <div className="space-y-1 col-span-1">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Customer</p>
                    <p className="font-bold text-slate-800 truncate">{order?.FullName}</p>
                    <p className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]">ID: {order?._id}</p>
                  </div>

                  {/* Date - Hidden on very small screens, shown on sm */}
                  <div className="hidden sm:block space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Ordered On</p>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar size={14} />
                      <span className="text-sm">{order?.createdAt?.split("T")[0]}</span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="space-y-1 text-right lg:text-left">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Total Amount</p>
                    <p className="font-bold text-blue-600">Rs. {order?.Total}</p>
                  </div>

                  {/* Status & Toggle */}
                  <div className="flex items-center justify-end gap-3 col-span-1 lg:col-span-1">
                    <span className={`hidden md:inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      order.Status === 'Shipped' || order.Status === 'Delivered' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order?.Status}
                    </span>
                    <ChevronDown 
                      className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                      size={20} 
                    />
                  </div>
                </div>
                
                {/* Mobile Status Badge (Only shows on mobile) */}
                <div className="mt-3 md:hidden">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      order.Status === 'Shipped' || order.Status === 'Delivered' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order?.Status}
                    </span>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="bg-slate-50 border-t">
                  <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Items Section */}
                    <div className="lg:col-span-2">
                      <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-4">
                        <Package size={14} /> Ordered Products
                      </h4>
                      <div className="bg-white border rounded-xl overflow-hidden">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-100 text-slate-600 text-[10px] uppercase font-bold">
                            <tr>
                              <th className="px-4 py-2">Item</th>
                              <th className="px-4 py-2 text-center">Qty</th>
                              <th className="px-4 py-2 text-right">Price</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {order?.Products.map((item, idx) => (
                              <tr key={idx}>
                                <td className="px-4 py-3 font-medium text-slate-700">{item?.ProductId?.ProductName}</td>
                                <td className="px-4 py-3 text-center text-slate-500">{item?.Quantity}</td>
                                <td className="px-4 py-3 text-right font-semibold">
                                    Rs. {item?.ProductId?.ProductSalePrice || item?.ProductId?.ProductPrice}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Status Update Card */}
                    <div className="space-y-4">
                      <div className="bg-white p-5 rounded-xl border shadow-sm">
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
                           Update Progress
                        </h4>
                        <div className="space-y-3">
                          <select 
                            className="w-full text-sm border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                            defaultValue={order?.Status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                          <button 
                            className="w-full bg-slate-900 hover:bg-black text-white text-sm font-bold py-2.5 rounded-lg transition-colors shadow-sm"
                            onClick={() => handleStatusUpdate(order?._id)}
                          >
                            Apply Status
                          </button>
                        </div>
                      </div>
                      
                      {/* Shipping Info Placeholder */}
                      <div className="bg-blue-600 text-white p-4 rounded-xl shadow-sm">
                        <p className="text-[10px] uppercase font-bold opacity-80 mb-1">Payment Method</p>
                        <div className="flex items-center gap-2">
                            <CreditCard size={16} />
                            <span className="font-bold">Cash on Delivery</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutComponent;