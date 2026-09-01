import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const useLanguage = () => {
    return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
    // Initialize from local storage or default to English
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('language');
        return saved ? saved : 'eng';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        // Toggle the global body font class
        if (language === 'mal') {
            document.body.classList.add('font-malayalam');
        } else {
            document.body.classList.remove('font-malayalam');
        }
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'eng' ? 'mal' : 'eng'));
    };

    const t = translations[language] || translations['eng'];

    const td = (text) => {
        if (!text) return text;
        return t[text] || text;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, td }}>
            {children}
        </LanguageContext.Provider>
    );
};
