import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle = ({ className = "" }) => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full border border-slate-300 bg-white/10 hover:bg-white/20 transition-all font-bold text-sm ${className}`}
            aria-label="Toggle Language"
        >
            <span className={language === 'eng' ? 'text-blue-500' : 'text-slate-500'}>ENG</span>
            <span className="text-slate-400">/</span>
            <span className={language === 'mal' ? 'text-blue-500' : 'text-slate-500'}>മല</span>
        </button>
    );
};

export default LanguageToggle;
