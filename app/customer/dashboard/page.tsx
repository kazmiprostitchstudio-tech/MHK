'use client';

import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  FileText, 
  LogOut, 
  DollarSign, 
  TrendingUp, 
  ShoppingBag,
  Send
} from 'lucide-react';

export default function CustomerDashboard() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black flex items-center justify-center text-lg">
            SE
          </div>
          <div>
            <h1 className="font-bold text-amber-400 text-sm leading-none">SHAH EMBROIDERY</h1>
            <p className="text-[11px] text-slate-400">Client Order & Ledger Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-white">{userData?.name || 'Valued Client'}</p>
            <p className="text-xs text-amber-400/80">Customer Account</p>
          </div>
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white">
              Welcome, {userData?.name || 'Client'} 👋
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Shah Embroidery live client portal — Track production, orders & account balance in real-time.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs py-3 px-5 rounded-xl shadow-lg shadow-amber-500/20">
            <ShoppingBag className="w-4 h-4" /> Place New Order Request
          </button>
        </div>

        {/* Financial Ledger Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Orders</span>
              <Package className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-white">14 Completed</p>
            <span className="text-[10px] text-emerald-400 mt-1 inline-block">● 2 Orders In Production</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Paid</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white">Rs. 185,000</p>
            <span className="text-[10px] text-slate-400 mt-1 inline-block">Verified Payment Receipts</span>
          </div>

          <div className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl bg-gradient-to-b from-amber-500/5 to-slate-900">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-amber-400 uppercase font-semibold">Remaining Balance</span>
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-amber-400">Rs. 24,500</p>
            <span className="text-[10px] text-amber-300/80 mt-1 inline-block">Pending Invoice Due</span>
          </div>
        </div>

        {/* Live Active Orders Tracking Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-400" /> Live Orders Tracking
              </h3>
              <p className="text-xs text-slate-400 mt-1">Your current production batch status</p>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Job Order #</th>
                  <th className="p-3.5">Design Name</th>
                  <th className="p-3.5">Garment Quantity</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="p-4 font-bold text-amber-400">JOB-9021</td>
                  <td className="p-4 font-medium text-white">Royal Velvet Floral Motif</td>
                  <td className="p-4">350 Pcs</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full font-semibold">
                      <Clock className="w-3.5 h-3.5" /> Running on Machine-04
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-xs text-amber-400 hover:underline flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> View Bill PDF
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-bold text-amber-400">JOB-8842</td>
                  <td className="p-4 font-medium text-white">Sherwani Neck Embroidered Pattern</td>
                  <td className="p-4">120 Pcs</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Delivery
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-xs text-amber-400 hover:underline flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> Download Delivery Slip
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}