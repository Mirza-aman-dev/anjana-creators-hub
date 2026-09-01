import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, fbDoc as doc, fbGetDoc as getDoc, fbUpdateDoc as updateDoc } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import ReactMarkdown from 'react-markdown';
import Footer from '../../components/layout/Footer';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from '../../components/ui/LanguageToggle';

import { 
  ChevronLeft, ChevronDown, ChevronRight, PlayCircle, 
  FileText, CheckCircle, HelpCircle, Menu, X, Clock, LogOut, BookOpen, 
  ArrowRight, Award, AlertCircle
} from 'lucide-react';

const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  const cleanUrl = url.trim();
  let videoId = '';
  if (cleanUrl.includes('youtu.be/')) {
    videoId = cleanUrl.split('youtu.be/')[1].split('?')[0];
  } else if (cleanUrl.includes('youtube.com/watch')) {
    try {
      const urlObj = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
      videoId = urlObj.searchParams.get('v');
    } catch(e) {}
  } else if (cleanUrl.includes('youtube.com/embed/')) {
    return cleanUrl;
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1` : cleanUrl;
};

const CourseRoom = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, subscription, logout } = useAuth();
  const { t, td } = useLanguage();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChapterId, setActiveChapterId] = useState(null);
  const [activeSubChapterId, setActiveSubChapterId] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [quizState, setQuizState] = useState({}); 
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);

  const getDaysLeft = () => {
    if (!subscription?.expiresAt) return 0;
    const diff = new Date(subscription.expiresAt).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };
  const daysLeft = getDaysLeft();

  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileSidebarOpen]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, 'courses', courseId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCourse(data);
          
          const firstChapterId = Object.keys(data.chapters || {})[0];
          if (firstChapterId) {
            setExpandedChapters({ [firstChapterId]: true });
            const firstSub = Object.keys(data.chapters[firstChapterId].subChapters || {})[0];
            if (firstSub) {
              setActiveChapterId(firstChapterId);
              setActiveSubChapterId(firstSub);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching course", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    if (user?.progress?.[courseId]?.completedSubChapters) {
      setCompletedLessons(user.progress[courseId].completedSubChapters);
    }
  }, [user, courseId]);

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const handleSubChapterClick = (chapterId, subId) => {
    setActiveChapterId(chapterId);
    setActiveSubChapterId(subId);
    setIsMobileSidebarOpen(false); 
  };

  const goToNextLesson = () => {
    const chapters = Object.values(course.chapters || {}).sort((a, b) => a.order - b.order);
    const currentChapIdx = chapters.findIndex(c => c.id === activeChapterId);
    if (currentChapIdx === -1) return;

    const currentChap = chapters[currentChapIdx];
    const subs = Object.values(currentChap.subChapters || {}).sort((a, b) => a.order - b.order);
    const currentSubIdx = subs.findIndex(s => s.id === activeSubChapterId);

    if (currentSubIdx !== -1 && currentSubIdx < subs.length - 1) {
       setActiveSubChapterId(subs[currentSubIdx + 1].id);
    } else if (currentChapIdx < chapters.length - 1) {
       const nextChap = chapters[currentChapIdx + 1];
       const nextSubs = Object.values(nextChap.subChapters || {}).sort((a, b) => a.order - b.order);
       
       setExpandedChapters(prev => ({ ...prev, [nextChap.id]: true }));
       setActiveChapterId(nextChap.id);
       if (nextSubs.length > 0) {
          setActiveSubChapterId(nextSubs[0].id);
       }
    } else {
       alert("Congratulations! You have completed the final lesson in this course.");
    }
  };

  const markComplete = async () => {
    if (completedLessons.includes(activeSubChapterId)) {
        goToNextLesson();
        return;
    }

    setCompletedLessons(prev => [...prev, activeSubChapterId]);

    if (user && user.role !== 'admin') {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          const courseProgress = data.progress?.[courseId] || { completedSubChapters: [] };
          if (!courseProgress.completedSubChapters.includes(activeSubChapterId)) {
            courseProgress.completedSubChapters.push(activeSubChapterId);
            await updateDoc(userRef, {
              [`progress.${courseId}`]: courseProgress
            });
          }
        }
      } catch (e) {
        console.error("Error marking complete in Firestore, updating local mock state:", e);
        const mockKey = `mock_user_${user.uid}`;
        const mock = localStorage.getItem(mockKey);
        if (mock) {
           const parsed = JSON.parse(mock);
           if (!parsed.progress) parsed.progress = {};
           if (!parsed.progress[courseId]) parsed.progress[courseId] = { completedSubChapters: [] };
           if (!parsed.progress[courseId].completedSubChapters.includes(activeSubChapterId)) {
              parsed.progress[courseId].completedSubChapters.push(activeSubChapterId);
              localStorage.setItem(mockKey, JSON.stringify(parsed));
           }
        }
      }
    }
    goToNextLesson();
  };

  const handleQuizAnswer = (questionIndex, optionIndex) => {
    setQuizState(prev => {
      const current = prev[activeSubChapterId] || { answers: {} };
      return {
        ...prev,
        [activeSubChapterId]: {
          ...current,
          answers: { ...current.answers, [questionIndex]: optionIndex }
        }
      };
    });
  };

  const submitQuiz = async (quizData) => {
    const currentQuizState = quizState[activeSubChapterId] || { answers: {} };
    let score = 0;
    let totalMarks = 0;
    
    quizData.questions.forEach((q, i) => {
      totalMarks += q.marks || 10;
      if (currentQuizState.answers[i] === q.correctAnswerIndex) {
        score += q.marks || 10;
      }
    });

    const passed = (score / totalMarks) * 100 >= (quizData.passingPercentage || 70);

    setQuizState(prev => ({
      ...prev,
      [activeSubChapterId]: {
        ...prev[activeSubChapterId],
        score,
        totalMarks,
        passed,
        submitted: true
      }
    }));

    if (passed) {
      await markComplete();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-700 bg-slate-50"><div className="animate-pulse flex flex-col items-center"><div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div><p className="font-semibold">Loading course...</p></div></div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center text-slate-700 font-semibold bg-slate-50">Course not found.</div>;

  const chaptersList = Object.values(course.chapters || {}).sort((a, b) => a.order - b.order);
  const activeChapter = course.chapters?.[activeChapterId];
  const activeSubChapter = activeChapter?.subChapters?.[activeSubChapterId];

  const CurriculumList = () => (
    <div className="py-2 pb-24 lg:pb-4 h-full overflow-y-auto custom-scrollbar">
      {chaptersList.map((chapter, idx) => (
        <div key={chapter.id} className="mb-2">
          <button 
            onClick={() => toggleChapter(chapter.id)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-100 transition-all text-left rounded-xl mx-2"
          >
            <span className="font-extrabold text-slate-900 text-sm tracking-wide">
              <span className="text-blue-700 mr-2 opacity-90">{String(idx + 1).padStart(2, '0')}.</span>
              {td(chapter.title)}
            </span>
            {expandedChapters[chapter.id] ? <ChevronDown className="w-5 h-5 text-blue-700 shrink-0" /> : <ChevronRight className="w-5 h-5 text-slate-500 shrink-0" />}
          </button>
          
          {expandedChapters[chapter.id] && (
            <div className="mt-1 space-y-1 px-4">
              {Object.values(chapter.subChapters || {}).sort((a, b) => a.order - b.order).map((sub) => {
                const isActive = activeSubChapterId === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleSubChapterClick(chapter.id, sub.id)}
                    className={`w-full flex items-center px-4 py-3 text-left transition-all rounded-xl border border-transparent ${
                      isActive 
                        ? 'bg-blue-50 text-blue-800 border-blue-200 shadow-sm font-bold' 
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    <div className={`mt-0.5 mr-3 shrink-0 p-1.5 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {sub.type === 'video' && <PlayCircle className="w-4 h-4" />}
                      {sub.type === 'notes' && <FileText className="w-4 h-4" />}
                      {sub.type === 'quiz' && <HelpCircle className="w-4 h-4" />}
                    </div>
                    <span className="text-sm flex-1 leading-snug">{td(sub.title)}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-blue-600 ml-2 animate-pulse"></div>}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-slate-50 font-sans overflow-hidden text-slate-800">
      
      {/* Top Navbar Header - Mobile Optimized */}
      <header className="bg-white border-b border-slate-200 h-[72px] flex items-center justify-between px-4 lg:px-8 shrink-0 z-20 shadow-sm">
        
        {/* Left Side: Mobile Menu & Logo Box */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
            <Menu className="w-7 h-7" />
          </button>
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
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
        </div>

        {/* Right Side: DP & Badges */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <LanguageToggle className="hidden sm:flex" />
          {user?.role !== 'admin' && (
            <div className="hidden sm:flex items-center bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
              <Clock className="w-4 h-4 mr-2" />
              {daysLeft} {t.daysLeft}
            </div>
          )}

          {/* Profile Avatar (Solid Color for Contrast) */}
          <div className="flex items-center space-x-4">
             <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white hover:ring-2 ring-blue-400 transition-all">
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
             </button>
             
             <div className="h-6 w-px bg-slate-300 hidden sm:block"></div>
             
             <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors hidden sm:block">
                <LogOut className="w-6 h-6" />
             </button>
             <LanguageToggle className="sm:hidden ml-2" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Mobile Sidebar Drawer */}
        <div className={`fixed inset-0 z-40 lg:hidden transform transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileSidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileSidebarOpen(false)}></div>
          
          <div className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white border-r border-slate-200 shadow-2xl flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-slate-900 tracking-wide">{t.curriculum}</h2>
              <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <CurriculumList />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <aside className="w-[340px] bg-white border-r border-slate-200 shrink-0 hidden lg:flex flex-col relative z-10 shadow-sm">
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <h2 className="font-black text-slate-800 uppercase tracking-widest text-xs">{t.courseCurriculum}</h2>
          </div>
          <CurriculumList />
        </aside>

        {/* Main Learning Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 relative custom-scrollbar">
          
          <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10 pb-32 relative z-10">
            
            {/* Mobile Sub-Header (Back & Badge) */}
            <div className="sm:hidden mb-8 flex justify-between items-center">
              <button onClick={() => navigate('/courses')} className="text-slate-700 flex items-center text-sm font-bold bg-white px-4 py-2 rounded-xl border border-slate-300 shadow-sm hover:bg-slate-50">
                <ChevronLeft className="w-4 h-4 mr-1" /> {t.back}
              </button>
              {user?.role !== 'admin' && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm">
                  {daysLeft}d left
                </span>
              )}
            </div>

            {activeSubChapter ? (
              <div className="w-full">
                
                {/* Active Chapter Label */}
                <div className="flex items-center space-x-2 text-blue-700 font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-3">
                  <span>{td(activeChapter?.title)}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{td(activeSubChapter.type)}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                  {td(activeSubChapter.title)}
                </h2>
                
                {/* VIDEO COMPONENT WITH REACT-PLAYER */}
                {activeSubChapter.type === 'video' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-xl mb-8 relative border border-slate-200">
                      
                          <iframe 
                            src={getYouTubeEmbedUrl(activeSubChapter.videoUrl)} 
                            title="Video Player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full border-0"
                          ></iframe>

                    </div>

                    {course?.description && (
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">About this Course</h3>
                        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                          {course.description}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end">
                      {completedLessons.includes(activeSubChapterId) ? (
                        <button 
                          onClick={goToNextLesson}
                          className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 text-lg ring-4 ring-emerald-600/30"
                        >
                          <CheckCircle className="w-6 h-6 mr-3" /> {t.chapterCompleted}
                        </button>
                      ) : (
                        <button 
                          onClick={markComplete}
                          className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 text-lg"
                        >
                          <CheckCircle className="w-6 h-6 mr-3" /> {t.completeLesson}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* NOTES COMPONENT */}
                {activeSubChapter.type === 'notes' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="prose prose-slate prose-headings:text-slate-900 prose-p:text-slate-800 max-w-none bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-lg">
                      <ReactMarkdown>{activeSubChapter.notesContent || t.noContent}</ReactMarkdown>
                    </div>
                    <div className="flex justify-end mt-10">
                      {completedLessons.includes(activeSubChapterId) ? (
                        <button 
                          onClick={goToNextLesson}
                          className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 text-lg ring-4 ring-emerald-600/30"
                        >
                           <CheckCircle className="w-5 h-5 mr-3" /> {t.chapterCompleted}
                        </button>
                      ) : (
                        <button 
                          onClick={markComplete}
                          className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 text-lg"
                        >
                           {t.markAsRead} <ArrowRight className="w-5 h-5 ml-3" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* QUIZ COMPONENT */}
                {activeSubChapter.type === 'quiz' && activeSubChapter.quizData && (
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <h3 className="font-black text-slate-900 text-xl flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                           <HelpCircle className="w-6 h-6 text-blue-700" />
                        </div>
                        {t.knowledgeCheck}
                      </h3>
                      <span className="inline-flex w-fit px-4 py-2 bg-white border border-slate-300 text-slate-800 rounded-full text-sm font-bold shadow-sm">
                        {t.passMark} <span className="text-blue-700 ml-2">{activeSubChapter.quizData.passingPercentage}%</span>
                      </span>
                    </div>
                    
                    <div className="p-6 sm:p-10">
                      {quizState[activeSubChapterId]?.submitted ? (
                        
                        /* QUIZ RESULTS UI */
                        <div className="text-center py-10 px-4">
                          <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full mb-8 shadow-inner border-4 ${quizState[activeSubChapterId].passed ? 'bg-emerald-100 border-emerald-300 text-emerald-600' : 'bg-rose-100 border-rose-300 text-rose-600'}`}>
                            {quizState[activeSubChapterId].passed ? <Award className="w-14 h-14" /> : <AlertCircle className="w-14 h-14" />}
                          </div>
                          <h4 className="text-3xl sm:text-4xl font-black mb-4 text-slate-900">
                            {quizState[activeSubChapterId].passed ? t.excellentWork : t.notQuiteThere}
                          </h4>
                          <p className="text-lg text-slate-700 mb-10 font-bold">
                            {t.youScored} <span className="font-black text-white bg-slate-900 px-3 py-1 rounded-lg mx-1">{quizState[activeSubChapterId].score}</span> {t.outOf} {quizState[activeSubChapterId].totalMarks}
                          </p>
                          
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                             <button 
                               onClick={() => setQuizState(prev => ({...prev, [activeSubChapterId]: {}}))}
                               className="w-full sm:w-auto text-slate-700 font-bold hover:bg-slate-100 bg-white px-8 py-4 rounded-xl border-2 border-slate-300 active:scale-95 transition-all"
                             >
                               {t.retakeQuiz}
                             </button>
                             {quizState[activeSubChapterId].passed && (
                               <button 
                                 onClick={markComplete}
                                 className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all"
                               >
                                 {t.continueJourney} <ArrowRight className="w-5 h-5 ml-2" />
                               </button>
                             )}
                          </div>
                        </div>

                      ) : (

                        /* QUIZ QUESTIONS UI */
                        <div className="space-y-10">
                          {activeSubChapter.quizData.questions.map((q, qIdx) => (
                            <div key={q.id} className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
                              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                                 <div className="bg-blue-600 text-white font-black text-xl w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                                   {qIdx + 1}
                                 </div>
                                 <div>
                                   <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                                     {q.question}
                                   </h4>
                                   <span className="inline-block mt-2 text-xs text-slate-600 font-bold uppercase tracking-widest border border-slate-300 bg-white px-2 py-1 rounded shadow-sm">
                                     {q.marks} {t.points}
                                   </span>
                                 </div>
                              </div>
                              
                              <div className="space-y-3">
                                {q.options.map((opt, optIdx) => {
                                  const isSelected = quizState[activeSubChapterId]?.answers?.[qIdx] === optIdx;
                                  return (
                                    <label key={optIdx} className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${isSelected ? 'bg-blue-50 border-blue-600' : 'bg-white border-slate-200 hover:border-blue-400'}`}>
                                      <div className="flex items-center h-5 mt-0.5">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-blue-600' : 'border-slate-300'}`}>
                                           {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>}
                                        </div>
                                        <input 
                                          type="radio" 
                                          name={`question_${q.id}`}
                                          checked={isSelected}
                                          onChange={() => handleQuizAnswer(qIdx, optIdx)}
                                          className="sr-only"
                                        />
                                      </div>
                                      <div className={`ml-3 text-base font-bold ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                                        {opt}
                                      </div>
                                    </label>
                                  )
                                })}
                              </div>
                            </div>
                          ))}
                          
                          <div className="pt-6 border-t border-slate-200 flex justify-end">
                            <button
                              onClick={() => submitQuiz(activeSubChapter.quizData)}
                              className="w-full sm:w-auto px-10 py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                              {t.submitAnswers} <CheckCircle className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
              </div>
            ) : (
              <div className="h-full min-h-[60vh] flex flex-col items-center justify-center text-slate-500">
                <div className="w-20 h-20 bg-slate-200 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                   <BookOpen className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">{t.welcomeTo} {course.title}</h3>
                <p className="text-base font-bold text-slate-600">{t.selectChapter}</p>
              </div>
            )}
          </div>
          <Footer />
        </main>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.03); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.15); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.25); }
      `}} />
    </div>
  );
};

export default CourseRoom;