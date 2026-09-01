import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, fbCollection as collection, fbAddDoc as addDoc } from '../../config/firebase';
import { ChevronLeft, MapPin, Phone, Mail, Send } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const ContactUs = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    try {
      await addDoc(collection(db, 'enquiries'), data);
      setStatus('Message sent successfully! Our team will get back to you soon.');
      e.target.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <header className="max-w-5xl mx-auto flex items-center mb-8">
        <button 
          onClick={() => navigate('/')} 
          className="text-slate-500 hover:text-slate-900 flex items-center text-sm font-semibold transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> 
          Back to Home
        </button>
      </header>

      <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Contact Info */}
        <div className="md:w-1/3 bg-slate-900 text-white p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">Get in Touch</h2>
            <p className="text-slate-400 text-sm mb-10">
              We're here to help with any questions about your digital e-learning tutorials.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-400 mr-4 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-100">Registered Address</h4>
                  <p className="text-sm text-slate-400 leading-relaxed mt-1">
                    Anjana Creators Hub<br/>
                    Panchajanyam house, Karumala PO,<br/>
                    Balussery VI, Kozhikode District,<br/>
                    Kerala, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-400 mr-4 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-100">Contact Number</h4>
                  <p className="text-sm text-slate-400 mt-1">+91 7012909595</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-400 mr-4 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-100">Email Support</h4>
                  <p className="text-sm text-slate-400 mt-1">anjanacreatorshub@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 text-xs text-slate-500">
            Owned by Anjana Prince (Anjana Ap)
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-2/3 p-10 sm:p-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input name="fullName" required type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input name="email" required type="email" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
              <input name="subject" required type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" placeholder="How can we help?" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
              <textarea name="message" required rows="4" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" placeholder="Write your message here..."></textarea>
            </div>
            <button type="submit" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95">
              Send Message <Send className="w-5 h-5 ml-2" />
            </button>
            {status && <p className="text-emerald-600 font-semibold mt-4">{status}</p>}
          </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
