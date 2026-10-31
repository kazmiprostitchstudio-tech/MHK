'use client';

import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  FileCode, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Upload, 
  LogOut, 
  Sparkles, 
  Plus, 
  Search,
  Check,
  AlertCircle
} from 'lucide-react';

export default function DesignerDashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Design Entry Form State
  const [designForm, setDesignForm] = useState({
    designName: '',
    clientName: '',
    stitchCount: '',
    colorChanges: '',
    wilcomFileName: '',
    category: 'Saree / Dupatta',
    status: 'In Digitizing'
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  const handleAddDesign = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating quick save to master design record
    setTimeout(() => {
      setMessage({ type: 'success', text: `Wilcom design "${designForm.designName}" saved to Master Records!` });
      setLoading(false);
      setDesignForm({
        designName: '',
        clientName: '',
        stitchCount: '',
        colorChanges: '',
        wilcomFileName: '',
        category: 'Saree / Dupatta',
        status: 'In Digitizing'
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black flex items-center justify-center text-lg shadow-md shadow-amber-500/10">
            SE
          </div>
          <div>
            <h1 className="font-bold text-amber-400 text-sm leading-none">SHAH EMBROIDERY</h1>
            <p className="text-[11px] text-slate-400">Wilcom Digitizing & Vector Studio</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-white">{userData?.name || 'Senior Digitizer'}</p>
            <p className="text-xs text-amber-400/80">Wilcom e4.2 Master</p>
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

      {/* Main Studio Body */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-900/20 via-slate-900 to-slate-900 border border-purple-500/20 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Palette className="w-5 h-5 text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Digitizing Studio</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Welcome, {userData?.name || 'Designer'} 🎨
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Upload Wilcom `.emb` / `.dst` metadata, calculate stitch density, and assign production design orders.
            </p>
          </div>
          <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs rounded-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Wilcom Studio Sync Active
          </span>
        </div>

        {/* Studio Grid: Add Design Form & Recent Digitized Library */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form: Add New Wilcom Master Design */}
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-fit">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
              <Plus className="w-4 h-4 text-amber-400" /> Master Design Entry
            </h3>

            {message.text && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" /> {message.text}
              </div>
            )}

            <form onSubmit={handleAddDesign} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Design Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Neckline D-102"
                  value={designForm.designName}
                  onChange={(e) => setDesignForm({ ...designForm, designName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Wilcom File Ref (`.emb` / `.dst`)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal_Neckline_v2.emb"
                  value={designForm.wilcomFileName}
                  onChange={(e) => setDesignForm({ ...designForm, wilcomFileName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Stitch Count</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 45000"
                    value={designForm.stitchCount}
                    onChange={(e) => setDesignForm({ ...designForm, stitchCount: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Color Stops</label>
                  <input
                    type="number"
                    placeholder="e.g. 6"
                    value={designForm.colorChanges}
                    onChange={(e) => setDesignForm({ ...designForm, colorChanges: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Current Status</label>
                <select
                  value={designForm.status}
                  onChange={(e) => setDesignForm({ ...designForm, status: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="In Digitizing">In Digitizing</option>
                  <option value="Sample Test Run">Sample Test Run</option>
                  <option value="Approved for Machines">Approved for Machines</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
              >
                <Upload className="w-4 h-4" /> Save Wilcom Record
              </button>
            </form>
          </div>

          {/* Table: Master Design Records */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-amber-400" /> Active Digitized Library
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Wilcom design catalog & machine status</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="p-3 rounded-l-xl">Design</th>
                    <th className="p-3">Wilcom File</th>
                    <th className="p-3">Stitches</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="p-3.5 font-bold text-white">Velvet Bridal Dupatta Border</td>
                    <td className="p-3.5 font-mono text-amber-400/90 text-[11px]">Bridal_Border_04.emb</td>
                    <td className="p-3.5 font-semibold">68,400</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full font-semibold text-[10px]">
                        <CheckCircle2 className="w-3 h-3" /> Ready for Factory
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3.5 font-bold text-white">Groom Sherwani Chest Motif</td>
                    <td className="p-3.5 font-mono text-amber-400/90 text-[11px]">Groom_Chest_v1.dst</td>
                    <td className="p-3.5 font-semibold">32,100</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full font-semibold text-[10px]">
                        <Clock className="w-3 h-3" /> Digitizing in Progress
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}