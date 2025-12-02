import React from 'react';
import { FadeIn } from '../components/UI';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Patient"}');

  return (
    <div className="min-h-screen pt-28 px-4 max-w-7xl mx-auto">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Hello, {user.name}</h1>
          <p className="text-slate-500">Here is your health overview.</p>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-clinic-600 rounded-3xl p-8 text-white shadow-lg">
          <p className="opacity-80 font-medium mb-1">Next Appointment</p>
          <p className="text-3xl font-bold">Oct 24, 2:00 PM</p>
          <div className="mt-4 inline-block bg-white/20 px-3 py-1 rounded-full text-sm">Video Call</div>
        </div>
        <div className="glass-card p-8 rounded-3xl">
          <p className="text-slate-500 font-medium mb-1">Active Prescriptions</p>
          <p className="text-4xl font-bold text-slate-900 dark:text-white">3</p>
        </div>
        <div className="glass-card p-8 rounded-3xl">
          <p className="text-slate-500 font-medium mb-1">Messages</p>
          <p className="text-4xl font-bold text-slate-900 dark:text-white">1 New</p>
        </div>
      </div>

      <FadeIn className="glass-card rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-dark-border">
          <h3 className="font-bold text-lg">Recent Activity</h3>
        </div>
        <div className="p-6">
          <table className="w-full text-left">
             <thead>
               <tr className="text-slate-400 text-sm border-b border-gray-100 dark:border-dark-border">
                 <th className="pb-3">Type</th>
                 <th className="pb-3">Date</th>
                 <th className="pb-3">Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
               {[
                 { type: "Therapy Session", date: "Oct 20, 2025", status: "Completed", color: "text-green-500" },
                 { type: "Prescription Refill", date: "Oct 18, 2025", status: "Processing", color: "text-orange-500" },
                 { type: "General Consult", date: "Sep 15, 2025", status: "Completed", color: "text-green-500" }
               ].map((row, i) => (
                 <tr key={i}>
                   <td className="py-4 font-medium">{row.type}</td>
                   <td className="py-4 text-slate-500">{row.date}</td>
                   <td className={`py-4 font-bold ${row.color}`}>{row.status}</td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
      </FadeIn>
    </div>
  );
}