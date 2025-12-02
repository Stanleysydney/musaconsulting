import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/Button';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only for register
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? 'http://localhost:5000/api/register' : 'http://localhost:5000/api/login';
    
    try {
      const res = await axios.post(endpoint, { name, email, password });
      
      // Save Token AND User Info
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      alert(isRegister ? "Registration Successful! Email sent." : "Login Successful! Notification sent.");
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || "Error connecting to server");
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen flex justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 h-fit">
        <h2 className="text-2xl font-bold mb-6 text-center">{isRegister ? 'New Patient Registration' : 'Patient Login'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input 
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 outline-none" 
              placeholder="Full Name" 
              onChange={e => setName(e.target.value)} required 
            />
          )}
          <input 
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 outline-none" 
            placeholder="Email Address" type="email"
            onChange={e => setEmail(e.target.value)} required 
          />
          <input 
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 outline-none" 
            type="password" placeholder="Password" 
            onChange={e => setPassword(e.target.value)} required 
          />
          <Button type="submit" className="w-full h-12">{isRegister ? 'Sign Up' : 'Log In'}</Button>
        </form>
        <div className="mt-6 text-center">
          <button onClick={() => setIsRegister(!isRegister)} className="text-primary-600 font-medium hover:underline">
            {isRegister ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};