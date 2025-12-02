import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Star, Video, ArrowRight, CheckCircle2, Globe, HeartPulse } from 'lucide-react';
import { Button, FadeIn } from '../components/UI';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      
      {/* --- HERO SECTION WITH BACKGROUND IMAGE --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop')" }}
        >
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-slate-900/70 dark:bg-slate-950/80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
              <span className="text-teal-200 font-semibold text-sm tracking-wide">Dr. Musa Ashraf is Online</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
              Healing Beyond <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Boundaries.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the future of medicine. Secure video consultations, instant prescriptions, and a caring touch for over 10 million users.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book">
                <Button className="h-16 px-10 text-xl shadow-teal-500/50 shadow-2xl border-none">Book Appointment</Button>
              </Link>
              <Link to="/#about">
                <Button variant="outline" className="h-16 px-10 text-xl border-white text-white hover:bg-white hover:text-slate-900">Meet The Doctor</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CARDS SECTION (Floating) --- */}
      <section className="relative z-20 -mt-24 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Video, title: "Video Therapy", desc: "Secure, HD video sessions from the privacy of your home." },
            { icon: ShieldCheck, title: "Digital Rx", desc: "Prescriptions sent directly to your pharmacy app instantly." },
            { icon: Globe, title: "Global Access", desc: "Get treated by Dr. Musa no matter where you are in the world." },
          ].map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800"
            >
              <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center text-teal-600 mb-6">
                <card.icon size={30} />
              </div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">{card.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- ABOUT SECTION (Longer Content) --- */}
      <section id="about" className="py-32 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute inset-0 bg-teal-500 blur-[100px] opacity-20 rounded-full"></div>
             <img 
               src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070" 
               alt="Dr Musa" 
               className="relative rounded-[2.5rem] shadow-2xl rotate-2 hover:rotate-0 transition duration-500 border-8 border-white dark:border-slate-900" 
             />
             <div className="absolute bottom-10 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-xs">
                <div className="flex gap-4 items-center">
                  <div className="bg-green-100 p-3 rounded-full text-green-600"><CheckCircle2 /></div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Verified Specialist</p>
                    <p className="text-xs text-gray-500">License #998231</p>
                  </div>
                </div>
             </div>
          </div>
          
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-slate-900 dark:text-white">Dr. Musa Ashraf</h2>
            <h3 className="text-2xl text-teal-600 font-medium mb-6">Lead Clinical Therapist & MD</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              "I believe healthcare should be accessible, dignified, and immediate. In my clinic, you are not just a number. You are a story, a life, and a priority."
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              Managing the health of 10 million users requires robust systems, but treating <b>you</b> requires a personal touch. That is what we offer at MusaConsulting.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-10">
               <div>
                 <p className="text-4xl font-bold text-slate-900 dark:text-white">15+</p>
                 <p className="text-gray-500">Years Experience</p>
               </div>
               <div>
                 <p className="text-4xl font-bold text-slate-900 dark:text-white">4.9/5</p>
                 <p className="text-gray-500">Patient Rating</p>
               </div>
            </div>

            <Button className="px-8 py-4 text-lg">Read Full Biography</Button>
          </div>
        </div>
      </section>

      {/* --- PARALLAX BREAK SECTION --- */}
      <section 
        className="py-40 bg-fixed bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2071')" }}
      >
        <div className="absolute inset-0 bg-teal-900/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <HeartPulse size={64} className="mx-auto mb-6 text-teal-300" />
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Your Health is Our Mission</h2>
          <p className="text-xl text-teal-100 mb-10">
            Whether it is a late-night concern or a routine check-up, our platform handles your data securely and connects you to care instantly.
          </p>
          <Link to="/book">
            <button className="bg-white text-teal-900 font-bold px-12 py-5 rounded-full hover:scale-105 transition shadow-2xl">
              Start Your Journey Today
            </button>
          </Link>
        </div>
      </section>

      {/* --- REVIEWS --- */}
      <section className="py-32 bg-white dark:bg-slate-900">
         <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">Patient Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
               {[1,2,3].map((i) => (
                 <div key={i} className="bg-gray-50 dark:bg-slate-800 p-8 rounded-3xl">
                    <div className="flex text-yellow-400 mb-4"><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/></div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-6">
                      "The booking system is so easy. I saw which days Dr. Musa was busy, booked my slot, and got a confirmation email instantly."
                    </p>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-slate-300"></div>
                       <p className="font-bold dark:text-white">Anonymous User</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}