import React from 'react';

import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand and Description */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tight">
                Anjana Creators <span className="text-blue-500">Hub</span>
              </span>
              <span className="text-[10px] text-slate-400 italic font-medium tracking-wide mt-0.5">
                “Where there is a doubt, there is a solution!” 💡✨
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            {t.footerDesc}
          </p>
        </div>

        {/* Legal & Support Links */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">{t.legalSupport}</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/contact" className="hover:text-blue-400 transition-colors">{t.contactUs}</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-blue-400 transition-colors">{t.terms}</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">{t.privacy}</Link>
            </li>
            <li>
              <Link to="/refund" className="hover:text-blue-400 transition-colors">{t.refund}</Link>
            </li>
          </ul>
        </div>

        {/* Registered Business Details (Razorpay Requirement) */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">{t.regOffice}</h4>
          <address className="not-italic text-sm text-slate-400 space-y-2">
            <p className="font-semibold text-slate-300">Anjana Creators Hub</p>
            <p>Panchajanyam house, Karumala PO,</p>
            <p>Balussery VI, Kozhikode District,</p>
            <p>Kerala, India</p>
            <p className="pt-2"><strong>Phone:</strong> +91 7012909595</p>
            <p><strong>Email:</strong> anjanacreatorshub@gmail.com</p>
          </address>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Anjana Creators Hub. {t.allRights}</p>
        <p className="mt-2 md:mt-0">{t.ownedBy}</p>
      </div>
    </footer>
  );
};

export default Footer;
