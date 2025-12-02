import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Stethoscope, UserCircle } from 'lucide-react';
import { Button } from './UI';

export const Navbar = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="fixed w-full z-50 glass-nav transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-clinic-600 p-2 rounded-xl text-white transform group-hover:rotate-12 transition-transform duration-300">
              <Stethoscope size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Musa<span className="text-clinic-600">Consulting</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-clinic-600 transition">Home</Link>
            <a href="/#services" className="font-medium hover:text-clinic-600 transition">Services</a>
            <a href="/#about" className="font-medium hover:text-clinic-600 transition">Dr. Musa</a>
            
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-border transition">
              {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-2 font-medium">
                  <UserCircle className="text-clinic-600"/> {user.name}
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="px-4 py-2 text-sm">Logout</Button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login"><Button variant="ghost" className="px-5">Login</Button></Link>
                <Link to="/book"><Button className="px-5 py-2.5">Book Now</Button></Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme}>{isDark ? <Sun size={20}/> : <Moon size={20}/>}</button>
            <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
          <div className="px-4 py-6 space-y-4 flex flex-col">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-lg">Home</Link>
            <Link to="/book" onClick={() => setIsOpen(false)} className="text-lg text-clinic-600 font-bold">Book Appointment</Link>
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg">Patient Portal</Link>
          </div>
        </div>
      )}
    </nav>
  );
};