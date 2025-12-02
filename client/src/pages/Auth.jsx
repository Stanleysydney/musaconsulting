import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI';
import { ShieldCheck } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // SIMULATED BACKEND LOGIC (For Frontend Only Demo)
    // In a real app, this calls axios.post('/api/auth/...')
    
    const fakeToken = "jwt_token_simulated_12345";
    const fakeUser = { name: isLogin ? "Returning User" : formData.name, email: formData.email };
    
    // 1. Save Session
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('user', JSON.stringify(fakeUser));

    // 2. Simulate Email Notification
    console.log(`📧 SENDING EMAIL TO: ${formData.email}`);
    console.log(`Subject: ${isLogin ? 'Login Alert' : 'Welcome to MusaConsulting'}`);
    alert(isLogin ? "Login Successful! Check your email for alert." : "Registration Complete! Welcome email sent.");

    // 3. Redirect
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-gray-50 dark:bg-dark-bg">
      <div className="w-full max-w-md bg-white dark:bg-dark-card p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-dark-border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-clinic-100 dark:bg-clinic-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-clinic-600">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-slate-500">Secure access to your medical records</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input 
              type="text" placeholder="Full Name" required
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-dark-border focus:ring-2 focus:ring-clinic-500 outline-none transition"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          )}
          <input 
            type="email" placeholder="Email Address" required
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-dark-border focus:ring-2 focus:ring-clinic-500 outline-none transition"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-dark-border focus:ring-2 focus:ring-clinic-500 outline-none transition"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <Button type="submit" className="w-full py-4 text-lg">
            {isLogin ? 'Secure Login' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center mt-6 text-slate-500">
          {isLogin ? "No account?" : "Have an account?"} 
          <button onClick={() => setIsLogin(!isLogin)} className="text-clinic-600 font-bold ml-1 hover:underline">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}