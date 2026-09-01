import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Footer from '../../components/layout/Footer';
import ShaderBackground from '../../components/ui/ShaderBackground';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from '../../components/ui/LanguageToggle';

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleGetStarted = async () => {
    if (user) {
      navigate('/courses');
    } else {
      navigate('/login');
    }
  };



  return (
    <div className="relative min-h-screen overflow-x-hidden font-body-md text-body-md antialiased selection:bg-primary-container selection:text-on-primary-container text-[#d8e2ff] dark">
      {/* Background Shader */}
      <ShaderBackground />

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-xl transition-all duration-300">
        <div className="max-w-container-max mx-auto flex justify-between items-center px-4 md:px-gutter h-20">
          {/* Brand */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-container to-secondary-container/50 glass-panel shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-tight">
                <span className="text-white">Anjana Creators </span><span className="text-gradient-brand">Hub</span>
              </span>
              <span className="text-[10px] sm:text-xs text-blue-200/80 italic font-medium tracking-wide mt-0.5">
                “Where there is a doubt, there is a solution!” 💡✨
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-stack-lg">
            <button onClick={() => navigate('/contact')} className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors hover:opacity-80">{t.contactUs}</button>
            <button onClick={() => navigate('/terms')} className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors hover:opacity-80">{t.terms}</button>
            <button onClick={() => navigate('/privacy')} className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors hover:opacity-80">{t.privacy}</button>
            <button onClick={() => navigate('/refund')} className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors hover:opacity-80">{t.refund}</button>
          </div>

          {/* Actions & Mobile Menu Toggle */}
          <div className="flex items-center gap-stack-sm">
            <LanguageToggle className="hidden md:flex" />
            <button onClick={handleGetStarted} className="hidden md:flex btn-high-gloss px-6 py-2.5 rounded-full font-label-md text-label-md text-white font-bold transition-all duration-300 active:scale-95">
              {user ? 'Go to Portal' : 'Sign In'}
            </button>
            {/* Mobile Hamburger Icon */}
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white p-2">
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sleek Mobile Drawer Menu */}
      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div 
          className={`absolute inset-0 bg-[#000d28]/80 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        <div className="absolute right-0 top-0 h-[100dvh] w-4/5 max-w-sm bg-surface-container border-l border-white/10 shadow-2xl flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center space-x-3">
               <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-container to-secondary-container/50 glass-panel shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
               </div>
               <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">Anjana Creators Hub</span>
                  <span className="text-[9px] sm:text-[10px] text-blue-200/80 italic font-medium tracking-wide mt-0.5">
                    “Where there is a doubt, there is a solution!” 💡✨
                  </span>
               </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageToggle className="md:hidden" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-on-surface-variant hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col p-6 space-y-6 flex-grow">
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/contact'); }} className="text-left font-label-md text-label-md text-on-surface-variant hover:text-white transition-colors">{t.contactUs}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/terms'); }} className="text-left font-label-md text-label-md text-on-surface-variant hover:text-white transition-colors">{t.terms}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/privacy'); }} className="text-left font-label-md text-label-md text-on-surface-variant hover:text-white transition-colors">{t.privacy}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/refund'); }} className="text-left font-label-md text-label-md text-on-surface-variant hover:text-white transition-colors">{t.refund}</button>
            {user && (
              <button onClick={async () => { setIsMobileMenuOpen(false); await logout(); }} className="text-left font-label-md text-label-md text-error hover:text-red-400 transition-colors">
                Sign Out
              </button>
            )}
          </div>

          <div className="p-6 border-t border-white/10 bg-white/5">
            <button onClick={() => { setIsMobileMenuOpen(false); handleGetStarted(); }} className="w-full btn-high-gloss py-4 px-4 rounded-xl font-label-md text-label-md text-white font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center">
              {user ? 'Go to Portal' : 'Sign In Now'}
            </button>
          </div>
        </div>
      </div>

      <main className="relative pt-32 pb-section-padding z-10">
        {/* Hero Section */}
        <section className="max-w-container-max mx-auto px-4 md:px-gutter relative">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full -z-10 opacity-60 mix-blend-screen pointer-events-none" style={{ maskImage: "radial-gradient(circle at 70% 30%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)", WebkitMaskImage: "radial-gradient(circle at 70% 30%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)" }}>
            <img alt="Anjana" className="object-cover w-full h-full object-top" src="/assets/images/anjana.jpeg" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg items-end md:items-center min-h-[85vh] md:min-h-[70vh] pb-10 md:pb-0">
            <div className="lg:col-span-7 flex flex-col items-start space-y-stack-md pt-[35vh] md:pt-0">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-tertiary/20">
                <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="font-label-md text-xs md:text-label-md text-tertiary tracking-widest uppercase">{t.heroBadge}</span>
              </div>
              <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg font-extrabold tracking-tighter leading-tight text-white drop-shadow-2xl">
                {t.heroTitle1} <br />
                <span className="text-gradient-brand">{t.heroTitle2}</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4 leading-relaxed">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-stack-md mt-8 w-full sm:w-auto">
                <button onClick={handleGetStarted} className="w-full sm:w-auto btn-high-gloss px-8 py-4 rounded-xl font-label-md text-label-md text-white font-bold flex items-center justify-center gap-2 group">
                  {t.heroButton}
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
              <div className="mt-8 flex items-center gap-4 glass-panel px-5 py-3 rounded-full">
                <div className="flex -space-x-2">
                  <span className="material-symbols-outlined text-tertiary drop-shadow-[0_0_8px_rgba(76,215,246,0.5)]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-tertiary drop-shadow-[0_0_8px_rgba(76,215,246,0.5)]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-tertiary drop-shadow-[0_0_8px_rgba(76,215,246,0.5)]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-tertiary drop-shadow-[0_0_8px_rgba(76,215,246,0.5)]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-tertiary drop-shadow-[0_0_8px_rgba(76,215,246,0.5)]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                </div>
                <span className="font-label-md text-xs md:text-label-md text-on-surface-variant">Trusted by 20k+ followers</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-surface-variant/20 relative z-10">
        <div className="max-w-container-max mx-auto px-4 md:px-gutter">
          <div className="text-center mb-16">
            <h2 className="font-display-md text-display-sm md:text-display-md font-black text-white">{t.featuresTitle}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-lg">
            
            <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-container/40 to-transparent border border-primary/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(46,91,255,0.2)] group-hover:shadow-[0_0_40px_rgba(46,91,255,0.4)] transition-shadow">
                <span className="material-symbols-outlined text-primary text-3xl icon-3d animate-float" style={{ fontVariationSettings: '"FILL" 1' }}>manage_accounts</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-white mb-3 group-hover:text-primary transition-colors">{t.f1Title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{t.f1Desc}</p>
            </div>

            <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary-container/40 to-transparent border border-secondary/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(111,0,190,0.2)] group-hover:shadow-[0_0_40px_rgba(111,0,190,0.4)] transition-shadow">
                <span className="material-symbols-outlined text-secondary text-3xl icon-3d animate-float" style={{ fontVariationSettings: '"FILL" 1' }}>handyman</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-white mb-3 group-hover:text-secondary transition-colors">{t.f2Title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{t.f2Desc}</p>
            </div>

            <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-tertiary-container/40 to-transparent border border-tertiary/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,120,140,0.2)] group-hover:shadow-[0_0_40px_rgba(0,120,140,0.4)] transition-shadow">
                <span className="material-symbols-outlined text-tertiary text-3xl icon-3d animate-float" style={{ fontVariationSettings: '"FILL" 1' }}>trending_up</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-white mb-3 group-hover:text-tertiary transition-colors">{t.f3Title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{t.f3Desc}</p>
            </div>

            <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-shadow">
                <span className="material-symbols-outlined text-white text-3xl icon-3d animate-float" style={{ fontVariationSettings: '"FILL" 1' }}>policy</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-white mb-3 group-hover:text-blue-200 transition-colors">{t.f4Title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{t.f4Desc}</p>
            </div>

          </div>
        </div>
      </section>
      </main>

      {/* Universal Footer - KYC Compliant */}
      <Footer />
    </div>
  );
};

export default LandingPage;