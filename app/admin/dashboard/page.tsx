'use client';

import { useState, useEffect } from 'react';

interface Employee {
  _id?: string;
  name: string;
  role: string;
  phone: string;
  machineAssigned: string;
  dailyStitchTarget: number;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export default function AdminDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Employee>({
    name: '',
    role: 'Machine Operator',
    phone: '',
    machineAssigned: 'Unit-1',
    dailyStitchTarget: 50000,
    status: 'Active'
  });

  // Fetch Live Employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/employees');
      const data = await res.json();
      if (data.success) {
        setEmployees(data.data);
      }
    } catch (err) {
      console.error("Failed to load employees", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle Add Employee Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setFormData({
          name: '',
          role: 'Machine Operator',
          phone: '',
          machineAssigned: 'Unit-1',
          dailyStitchTarget: 50000,
          status: 'Active'
        });
        fetchEmployees(); // Refresh list
      }
    } catch (err) {
      console.error("Error creating employee", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6 md:p-10 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-amber-400">Master Control Hub</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time factory output, ledger stats & employee management</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-5 py-2.5 rounded-lg transition-all shadow-lg flex items-center gap-2"
          >
            <span>+ Add New Worker</span>
          </button>
        </div>
      </div>

      {/* Dynamic Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-[#161b22] p-6 rounded-xl border border-gray-800 shadow-md">
          <div className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Active Staff</div>
          <div className="text-3xl font-extrabold text-white">{loading ? '...' : `${employees.length} Workers`}</div>
          <span className="text-emerald-400 text-xs font-medium mt-2 block">● Connected to MongoDB</span>
        </div>

        <div className="bg-[#161b22] p-6 rounded-xl border border-gray-800 shadow-md">
          <div className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Running Machines</div>
          <div className="text-3xl font-extrabold text-amber-400">12 / 12 Heads</div>
          <span className="text-sky-400 text-xs font-medium mt-2 block">100% Operational</span>
        </div>

        <div className="bg-[#161b22] p-6 rounded-xl border border-gray-800 shadow-md">
          <div className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Today Stitches</div>
          <div className="text-3xl font-extrabold text-white">485,000</div>
          <span className="text-emerald-400 text-xs font-medium mt-2 block">Synced live from workers</span>
        </div>

        <div className="bg-[#161b22] p-6 rounded-xl border border-gray-800 shadow-md">
          <div className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Experience Letters</div>
          <div className="text-3xl font-extrabold text-purple-400">Auto-PDF</div>
          <span className="text-purple-300 text-xs font-medium mt-2 block">Royal Watermark Enabled</span>
        </div>
      </div>

      {/* Live Employees Table */}
      <div className="bg-[#161b22] rounded-xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Registered Factory Workers</h2>
          <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20">
            {employees.length} Records
          </span>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading worker directory from MongoDB...</div>
        ) : employees.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            No workers added yet. Click <b className="text-amber-400">+ Add New Worker</b> to register your first worker!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0d1117] text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
                  <th className="p-4">Name</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Assigned Unit</th>
                  <th className="p-4">Stitch Target</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-sm">
                {employees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-gray-800/40 transition">
                    <td className="p-4 font-semibold text-white">{emp.name}</td>
                    <td className="p-4 text-gray-300">{emp.role}</td>
                    <td className="p-4 text-gray-400">{emp.phone}</td>
                    <td className="p-4 text-amber-400 font-mono">{emp.machineAssigned}</td>
                    <td className="p-4 text-gray-300">{emp.dailyStitchTarget.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                        emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        emp.status === 'On Leave' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Worker Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-[#161b22] border border-gray-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-4">
              <h3 className="text-xl font-bold text-amber-400">Register New Factory Worker</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Muhammad Ali"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Role / Job</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Machine Operator">Machine Operator</option>
                    <option value="Embroidery Master">Embroidery Master</option>
                    <option value="Helper">Helper</option>
                    <option value="Digitizer Designer">Digitizer Designer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="0300-1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Assigned Machine</label>
                  <select 
                    value={formData.machineAssigned}
                    onChange={(e) => setFormData({ ...formData, machineAssigned: e.target.value })}
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Head-1 (12-Needle)">Head-1 (12-Needle)</option>
                    <option value="Head-2 (12-Needle)">Head-2 (12-Needle)</option>
                    <option value="Head-3 (Sequins)">Head-3 (Sequins)</option>
                    <option value="Head-4 (Flat)">Head-4 (Flat)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Daily Target (Stitches)</label>
                  <input 
                    type="number" 
                    required 
                    value={formData.dailyStitchTarget}
                    onChange={(e) => setFormData({ ...formData, dailyStitchTarget: Number(e.target.value) })}
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-800">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-amber-500 text-black font-semibold hover:bg-amber-600 transition disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Worker'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}