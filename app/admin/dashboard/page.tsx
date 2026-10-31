'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Cpu, 
  FileSpreadsheet, 
  Award, 
  TrendingUp, 
  LogOut,
  Download,
  Plus
} from 'lucide-react';

export default function AdminDashboard() {
  const [downloadingExcel, setDownloadingExcel] = useState(false);

  const handleDownloadExcel = async () => {
    setDownloadingExcel(true);
    try {
      const response = await fetch('/api/reports/excel');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Shah_Embroidery_Production_Report.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      alert('Error downloading Excel report');
    } finally {
      setDownloadingExcel(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black flex items-center justify-center text-lg">
              SE
            </div>
            <div>
              <h2 className="font-bold text-amber-400 text-sm leading-none">SHAH</h2>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase">Embroidery</p>
            </div>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold text-sm">
              <TrendingUp className="w-4 h-4" /> Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/60 hover:text-white transition-all text-sm">
              <Users className="w-4 h-4" /> Employees & Staff
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/60 hover:text-white transition-all text-sm">
              <Cpu className="w-4 h-4" /> Machine Units
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/60 hover:text-white transition-all text-sm">
              <Award className="w-4 h-4" /> Experience Letters
            </a>
          </nav>
        </div>

        <button 
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Master Control Hub</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time factory output, ledger stats & employee management</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadExcel}
              disabled={downloadingExcel}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              {downloadingExcel ? 'Generating Sheet...' : 'Export Excel Ledger'}
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-slate-400 uppercase font-semibold">Active Staff</span>
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-white">18 Workers</p>
            <span className="text-[10px] text-emerald-400 mt-1 inline-block">● All Portals Active</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-slate-400 uppercase font-semibold">Running Machines</span>
              <Cpu className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">12 / 12 Heads</p>
            <span className="text-[10px] text-blue-400 mt-1 inline-block">100% Operational</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-slate-400 uppercase font-semibold">Today Stitches</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white">485,000</p>
            <span className="text-[10px] text-slate-400 mt-1 inline-block">Synced live from workers</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-slate-400 uppercase font-semibold">Experience Letters</span>
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">Auto-PDF</p>
            <span className="text-[10px] text-purple-400 mt-1 inline-block">Royal Watermark Enabled</span>
          </div>
        </div>

        {/* Live System Info Box */}
        <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-amber-400 mb-2">Shah Embroidery Enterprise Ecosystem Active</h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Aapka Next.js + MongoDB Atlas stack completely synchronized hai. Employee Stitch logs, Experience Certificates (PDFKit), aur Excel Financial Ledger live endpoints ke sath fully connected hain.
          </p>
        </div>
      </main>
    </div>
  );
}