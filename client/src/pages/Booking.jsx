import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/UI';

export default function Booking() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Hardcoded dates for demo visual
  const [selectedDate, setSelectedDate] = useState(null);
  const bookedDates = ['2025-10-25', '2025-10-28'];

  const [formData, setFormData] = useState({
    name: '',
    email: '', // Make sure to use a REAL email here when testing
    problem: ''
  });

  // Calendar Logic
  const daysArray = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log("Sending data to server...");
      
      // The Critical Connection Line
      const response = await axios.post('http://localhost:5000/api/appointments/book', {
        ...formData,
        date: selectedDate
      });

      console.log("Server Response:", response.data);
      setStep(3); // Go to Success Screen
      
    } catch (err) {
      console.error(err);
      // Show the actual error message from backend if available
      setError(err.response?.data?.error || "Cannot connect to Backend. Is the server running on Port 5000?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-gray-50 dark:bg-slate-950 flex justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl p-8 border border-gray-100 dark:border-gray-800">
        
        {/* Step 1: Pick Date */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select a Date</h2>
            <div className="grid grid-cols-7 gap-2 mb-8">
               {daysArray.map(day => {
                 const dateStr = `2025-10-${day < 10 ? `0${day}` : day}`;
                 const isBooked = bookedDates.includes(dateStr);
                 return (
                   <button 
                     key={day}
                     disabled={isBooked}
                     onClick={() => setSelectedDate(dateStr)}
                     className={`h-10 w-10 rounded-full font-bold transition-all ${selectedDate === dateStr ? 'bg-teal-600 text-white' : isBooked ? 'bg-red-100 text-red-300' : 'bg-gray-100 hover:bg-teal-100'}`}
                   >
                     {day}
                   </button>
                 )
               })}
            </div>
            <Button disabled={!selectedDate} onClick={() => setStep(2)} className="w-full py-4">Next Step</Button>
          </div>
        )}

        {/* Step 2: Form */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-2">Your Details</h2>
            <p className="text-sm text-gray-500 mb-6">Selected Date: <span className="font-bold text-teal-600">{selectedDate}</span></p>
            
            <input required placeholder="Name" className="w-full p-4 rounded-xl bg-gray-50 border outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required type="email" placeholder="Your Email (For Notification)" className="w-full p-4 rounded-xl bg-gray-50 border outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
            <textarea required placeholder="Describe your problem..." className="w-full p-4 rounded-xl bg-gray-50 border outline-none" onChange={e => setFormData({...formData, problem: e.target.value})} />
            
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
                <AlertCircle size={20} /> {error}
              </div>
            )}

            <div className="flex gap-4">
               <Button type="button" variant="ghost" onClick={() => setStep(1)} className="flex-1">Back</Button>
               <Button type="submit" className="flex-1" disabled={loading}>
                 {loading ? <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Processing</span> : 'Confirm Booking'}
               </Button>
            </div>
          </form>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
            <p className="text-gray-500">
              Notification email sent to <b>{formData.email}</b>.
            </p>
            <Button onClick={() => window.location.href='/'} className="mt-8">Done</Button>
          </div>
        )}

      </div>
    </div>
  );
}