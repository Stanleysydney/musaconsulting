import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';

// Lazy Load Pages for Performance (Crucial for "10 Million Users" Scale)
const Home = React.lazy(() => import('./pages/Home'));
const Auth = React.lazy(() => import('./pages/Auth'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Booking = React.lazy(() => import('./pages/Booking'));

// Loading Spinner
const Loading = () => (
  <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-clinic-600"></div>
  </div>
);

// Footer Component
const Footer = () => (
  <footer className="bg-dark-bg text-slate-400 py-16 border-t border-dark-border">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">
      <div className="col-span-2">
        <h3 className="text-white font-bold text-xl mb-4">MusaConsulting</h3>
        <p className="max-w-xs">World-class clinical therapy and medical prescriptions. Powered by Dr. Musa Ashraf.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Contact</h4>
        <p>Dr. Musa Ashraf</p>
        <a href="mailto:musa.ashraf@ashrafclinic.com" className="text-clinic-500 hover:underline">musa.ashraf@ashrafclinic.com</a>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Legal</h4>
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p className="mt-4">© 2025 MusaConsulting.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
        
        <main className="flex-grow">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/book" element={<Booking />} />
            </Routes>
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}