import React from 'react';
import { Mail, ShieldCheck } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
      <div>
        <h3 className="text-white font-bold text-lg mb-4">MusaConsulting</h3>
        <p className="opacity-80">
          Professional clinical services and digital prescriptions managed by Dr. Musa Ashraf.
          Serving over 10 million patients with secure, modern healthcare.
        </p>
      </div>
      <div>
        <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
        <p className="flex items-center gap-2 mb-2">
          <ShieldCheck size={16} className="text-primary-500"/> Dr. Musa Ashraf
        </p>
        <p className="flex items-center gap-2">
          <Mail size={16} className="text-primary-500"/> 
          <a href="mailto:musa.ashraf@ashrafclinic.com" className="hover:text-primary-400">
            musa.ashraf@ashrafclinic.com
          </a>
        </p>
      </div>
      <div>
        <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-primary-400">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-primary-400">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div className="text-center mt-12 pt-8 border-t border-slate-800 text-xs opacity-50">
      © 2025 MusaConsulting. All rights reserved.
    </div>
  </footer>
);