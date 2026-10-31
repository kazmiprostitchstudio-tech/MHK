'use client';

import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Send, 
  Clock, 
  TrendingUp, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  Award,
  Layers
} from 'lucide-react';

export default function EmployeeDashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form State for Daily Stitch Log
  const [form, setForm] = useState({
    jobOrderNo: '',
    designName: '',
    stitchCount: '',
    machine: '',
    totalStitchesRun: '',
    totalGarments: '',
    shift: 'Day'
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // API call to post daily production log
      const res = await fetch('/api/production', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobOrderNo: form.jobOrderNo,
          designName: form.designName,
          stitchCount: Number(form.stitchCount),
          machine: form.machine || '672535000000000000000001', // Example Mongo ID fallback
          operator: userData?.id || '672535000000000000000002',
          totalStitchesRun: Number(form.totalStitchesRun),
          totalGarments: Number(form.totalGarments) || 0,
          shift: form.shift
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to submit entry');

      setMessage({ type: 'success', text: 'Daily stitch log submitted successfully!' });
      setForm({
        jobOrderNo: '',
        designName: '',
        stitchCount: '',
        machine: '',
        totalStitchesRun: '',
        totalGarments: '',
        shift: 'Day'
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error submitting log' });
    } finally {
      setLoading(false);
    }
  };

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
            <p className="text-[11px] text-slate-400">Operator Self-Service Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-white">{userData?.name || 'Worker Profile'}</p>
            <p className="text-xs text-amber-400/80">{userData?.role || 'Machine Operator'}</p>
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

      {/* Main Content Body */}
      <main className="flex-1 p-4 sm:p-8 max-w-5xl w-full mx-auto space-y-8">
        {/* Welcome Banner & Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-amber-500/10 to-slate-900 border border-amber-500/20 p-5 rounded-2xl md:col-span-2">
            <h2 className="text-xl font-bold text-amber-400 mb-1">
              Khushamdeed, {userData?.name || 'Karigar'}! 👋
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aaj ki machine production aur stitch entry niche form mein enter karein. Aapka record live admin ledger aur monthly performance tracking mein add ho raha hai.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Monthly Rank</p>
              <p className="text-lg font-extrabold text-white">Top 5 Operator</p>
              <span className="text-[10px] text-emerald-400">● Live Performance</span>
            </div>
          </div>
        </div>

        {/* Daily Production Entry Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" /> Daily Production & Stitch Entry
              </h3>
              <p className="text-xs text-slate-400 mt-1">Aj ka kaam aur machine output record karein</p>
            </div>
            <span className="text-xs px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full font-semibold">
              Live Sync
            </span>
          </div>

          {message.text && (
            <div className={`mb-6 p-4 rounded-2xl border text-sm flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Job Order No.
              </label>
              <input
                type="text"
                required
                placeholder="e.g. JOB-1042"
                value={form.jobOrderNo}
                onChange={(e) => setForm({ ...form, jobOrderNo: e.target.value })}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Design Name / Code
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Motif Rose 01"
                value={form.designName}
                onChange={(e) => setForm({ ...form, designName: e.target.value })}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Design Single Stitch Count
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 25000"
                value={form.stitchCount}
                onChange={(e) => setForm({ ...form, stitchCount: e.target.value })}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Total Stitches Run Today
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 250000"
                value={form.totalStitchesRun}
                onChange={(e) => setForm({ ...form, totalStitchesRun: e.target.value })}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Total Garments / Pieces Completed
              </label>
              <input
                type="number"
                placeholder="e.g. 100"
                value={form.totalGarments}
                onChange={(e) => setForm({ ...form, totalGarments: e.target.value })}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Shift Timing
              </label>
              <select
                value={form.shift}
                onChange={(e) => setForm({ ...form, shift: e.target.value })}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Day">Day Shift</option>
                <option value="Night">Night Shift</option>
              </select>
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting Entry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Stitch Log</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}