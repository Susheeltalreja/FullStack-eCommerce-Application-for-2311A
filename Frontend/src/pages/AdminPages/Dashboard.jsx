import React, { useEffect, useState } from 'react'
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
  UserCheck
} from 'lucide-react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Dashboard() {
  // These stats now correspond to your Models (Auth, Product, Checkout)

  const [Stats, setStats] = useState(null);
  const [RecentOrders, setRecentOrders] = useState([]);
  const [PendingUsers, setPendingUsers] = useState([]);
  const [VerifiedToday, setVerifiedToday] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      const response = await axios.get("http://localhost:5000/admin/dashboard");
      console.log(response)
      setStats(response.data.stats);
      setRecentOrders(response.data.recentOrders);
      setPendingUsers(response.data.pendingUsers);
      setVerifiedToday(response.data.verifiedToday);
    }
    fetchStats();
  }, [])
  console.log(Stats);

  const stats = [
    {
      title: "Total Revenue",
      value: Stats?.revenue || 0,
      icon: <DollarSign />,
      color: "bg-orange-500"
    },

    {
      title: "Total Customers",
      value: Stats?.customers || 0,
      icon: <Users />,
      color: "bg-blue-500"
    },

    {
      title: "Active Products",
      value: Stats?.products || 0,
      icon: <Package />,
      color: "bg-emerald-500"
    },

    {
      title: "Pending Orders",
      value: Stats?.pendingOrders || 0,
      icon: <Clock />,
      color: "bg-amber-500"
    },
  ]

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-10 font-sans text-slate-900">

      {/* --- Header --- */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase">Admin Overview</h1>
          <p className="text-gray-400 font-medium">Monitoring your Store performance and User verification.</p>
        </div>
        <div className="hidden md:block text-right text-xs font-bold text-gray-400 uppercase tracking-widest">
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* --- Stats Row --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="relative overflow-hidden bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className={`${stat.color} absolute top-0 right-0 h-1 w-full opacity-20`}></div>
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-2xl text-white`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{stat.title}</p>
                <h3 className="text-2xl font-black text-zinc-900">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* --- Recent Orders (from CheckoutModel) --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black uppercase tracking-tight">Recent Checkouts</h2>
            <button className="text-xs font-bold text-orange-600 bg-orange-50 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all">Export CSV</button>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr className="text-gray-400 text-[10px] uppercase tracking-widest font-black">
                  <th className="px-8 py-5">Customer Info</th>
                  <th className="px-6 py-5">Location</th>
                  <th className="px-6 py-5">Amount</th>
                  <th className="px-6 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {/* Visualizing your CheckoutModel data */}
                {RecentOrders.map((data, i) => (
                  <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-8 py-5">
                      <div className="font-bold text-zinc-900">{data?.FullName}</div>
                      <div className="text-xs text-gray-400">{data?.Email}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-zinc-700">{data?.City}</div>
                      <div className="text-[10px] text-gray-400 uppercase">{data?.PostalCode}</div>
                    </td>
                    <td className="px-6 py-5 font-black text-zinc-900 text-lg">Rs. {data?.Total}</td>
                    <td className="px-6 py-5">
                      <span className="flex items-center gap-1.5 text-amber-600 font-black text-[10px] uppercase bg-amber-50 w-fit px-3 py-1 rounded-full">
                        <Clock className="h-3 w-3" /> {data?.Status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- User Verification (from AuthModel) --- */}
        <div className="space-y-6">
          <h2 className="text-xl font-black uppercase tracking-tight px-2">Identity Verification</h2>
          <div className="bg-zinc-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Background design element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>

            <div className="space-y-6 relative z-10">
              {PendingUsers && PendingUsers.length > 0 ? (
                PendingUsers.map((user, i) => (
                  <div key={i} className="flex items-center justify-between bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-orange-500 rounded-xl flex items-center justify-center font-black">
                        S
                      </div>
                      <div>
                        <div className="text-sm font-bold">{user.UserName}</div>
                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">OTP: {user.UserOTP}</div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-green-500/20 text-green-500 rounded-lg transition-colors">
                      <CheckCircle className="h-5 w-5" />
                    </button>
                  </div>
                ))
              ) : (<p className="text-zinc-500 text-sm">No pending users to verify.</p>)}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-zinc-500 font-medium text-xs">Verified Today</span>
                <span className="font-black text-orange-500">{VerifiedToday}%</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className={`bg-orange-500 h-full w-[${VerifiedToday}%] transition-all duration-1000`}></div>
              </div>
            </div>
          </div>

          {/* Quick Add Product Card */}
          <Link to="/admin/products" className="bg-orange-600 p-6 rounded-[2rem] text-white flex items-center justify-between group cursor-pointer hover:bg-orange-500 transition-all">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Inventory</p>
              <h4 className="font-bold">Add New Product</h4>
            </div>
            <div className="bg-white/20 p-2 rounded-xl group-hover:rotate-90 transition-transform">
              <Plus className="h-5 w-5" />
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}

// Minimal Plus Icon
const Plus = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
)

export default Dashboard