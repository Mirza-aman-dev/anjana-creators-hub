import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../config/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { Search, BookOpen, Clock, LogOut, Menu, X } from 'lucide-react';
import Footer from '../../components/layout/Footer';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from '../../components/ui/LanguageToggle';

const StudentPortal = () => {
  const { user, logout, subscription } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const q = query(collection(db, 'courses'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        const fetchedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (fetchedCourses.length === 0) {
          setCourses([]);
        } else {
          setCourses(fetchedCourses);
        }
      } catch (error) {
        console.error("Error fetching courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getDaysRemaining = () => {
    if (!subscription?.expiresAt) return 0;
    const expires = new Date(subscription.expiresAt);
    const now = new Date();
    const diffTime = expires.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const categories = ['All', ...new Set(courses.map(c => c.category).filter(Boolean))];

  const filteredCourses = courses.filter(c => 
    (filter === 'All' || c.category === filter) &&
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/courses')}>
              <div className="bg-blue-600 p-2.5 rounded-xl shadow-md flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className="flex flex-col hidden sm:flex md:hidden lg:flex">
                 <span className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-tight">
                   Anjana Creators <span className="text-blue-600">Hub</span>
                 </span>
                 <span className="text-[9px] sm:text-[10px] text-slate-500 italic font-medium tracking-wide mt-0.5">
                   “Where there is a doubt, there is a solution!” 💡✨
                 </span>
              </div>
              <div className="flex flex-col sm:hidden">
                 <span className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                   Anjana <span className="text-blue-600">Hub</span>
                 </span>
                 <span className="text-[8px] text-slate-500 italic font-medium tracking-wide mt-0.5">
                   “Where there is a doubt, there is a solution!” 💡✨
                 </span>
              </div>
            </div>

            {/* Desktop Actions (Hidden on Mobile) */}
            <div className="hidden sm:flex items-center space-x-3 sm:space-x-4">
              {/* Days Left Badge */}
              {user?.role !== 'admin' && (
                <div className="flex items-center bg-green-50/80 border border-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-green-600" />
                  {getDaysRemaining()} {t.daysLeft}
                </div>
              )}

              {/* User Avatar */}
              <button 
                onClick={() => navigate('/profile')}
                className="w-9 h-9 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-base shadow-sm hover:ring-2 hover:ring-offset-2 hover:ring-cyan-500 transition-all focus:outline-none"
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'
                )}
              </button>

              {/* Logout Button */}
              <LanguageToggle />
              <button 
                onClick={handleLogout}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg transition-colors focus:outline-none"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Hamburger Icon */}
            <div className="flex sm:hidden items-center">
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sleek Mobile Drawer Menu */}
      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out sm:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Dark Backdrop */}
        <div 
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Sliding Drawer (Light Theme to match portal) */}
        <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 flex items-center justify-between border-b border-slate-100 bg-slate-50">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2.5 rounded-xl shadow-md flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-900 tracking-tight leading-tight">Anjana Creators Hub</span>
                <span className="text-[9px] text-slate-500 italic font-medium tracking-wide mt-0.5">
                  “Where there is a doubt, there is a solution!” 💡✨
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <LanguageToggle className="md:hidden" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Drawer Links */}
          <div className="flex flex-col p-6 space-y-6 flex-grow">
            {user?.role !== 'admin' && (
              <div className="flex flex-col p-4 bg-green-50 border border-green-100 rounded-xl shadow-sm">
                <span className="text-xs font-bold text-green-800 uppercase tracking-wider mb-1">{t.subscription}</span>
                <div className="flex items-center text-green-700 font-bold">
                  <Clock className="w-4 h-4 mr-1.5" />
                  {getDaysRemaining()} {t.daysLeft}
                </div>
              </div>
            )}
            
            <button 
              onClick={() => { setIsMobileMenuOpen(false); navigate('/profile'); }} 
              className="flex items-center text-left text-lg font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-base mr-4 shadow-sm">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'
                )}
              </div>
              {t.myProfile}
            </button>
            <div className="border-t border-slate-100 pt-4 flex flex-col space-y-4">
              <button onClick={() => { setIsMobileMenuOpen(false); navigate('/contact'); }} className="text-left text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{t.contactUs}</button>
              <button onClick={() => { setIsMobileMenuOpen(false); navigate('/terms'); }} className="text-left text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{t.terms}</button>
              <button onClick={() => { setIsMobileMenuOpen(false); navigate('/privacy'); }} className="text-left text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{t.privacy}</button>
              <button onClick={() => { setIsMobileMenuOpen(false); navigate('/refund'); }} className="text-left text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{t.refund}</button>
            </div>
          </div>

          {/* Drawer Footer CTA */}
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <button 
              onClick={handleLogout} 
              className="w-full py-4 px-4 bg-white hover:bg-red-50 text-red-600 border border-slate-200 hover:border-red-200 rounded-xl font-semibold shadow-sm transition-all flex items-center justify-center active:scale-95"
            >
              <LogOut className="w-5 h-5 mr-2" />
              {t.logout}
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">
          {t.yourCourses}
        </h1>
        
        {/* Search Bar */}
        <div className="relative mb-6 max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder={t.searchCourses}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm shadow-sm"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2 mb-6 sm:mb-8 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shadow-sm ${
                filter === cat 
                  ? 'bg-slate-900 text-white border border-slate-900' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
                <div className="aspect-video bg-slate-200 w-full"></div>
                <div className="p-5">
                  <div className="h-5 bg-slate-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6 mb-6"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <div 
                  key={course.id} 
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-100 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  {/* Card Thumbnail Area */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    {course.thumbnailUrl ? (
                      <img 
                        src={course.thumbnailUrl} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                        <BookOpen className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-sm font-medium">No Cover Image</span>
                      </div>
                    )}
                    
                    {/* Absolute Category Pill on Image */}
                    {course.category && (
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                        {course.category}
                      </div>
                    )}
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 line-clamp-2 leading-tight">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 flex-1 mb-6 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                      <span className="text-blue-600 font-semibold flex items-center group-hover:text-blue-700 transition-colors">
                        {t.startLearning} <span className="ml-1 text-lg leading-none">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{t.noCoursesFound}</h3>
                <p className="text-slate-500">{t.noCoursesDesc}</p>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default StudentPortal;