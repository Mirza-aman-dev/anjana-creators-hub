import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db, fbCollection as collection, fbGetDocs as getDocs, fbDoc as doc, fbUpdateDoc as updateDoc, fbSetDoc as setDoc, fbDeleteDoc as deleteDoc, fbGetDoc as getDoc } from '../../config/firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Users, IndianRupee, BookOpen, AlertCircle, LogOut, Lock, Plus, Trash2, Mail, Menu, X, Settings } from 'lucide-react';

import CourseBuilder from '../../components/admin/CourseBuilder';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, courses, users
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, expiredUsers: 0, totalRevenue: 0, totalCourses: 0 });
  const [usersList, setUsersList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  
  // Settings State
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  
  // Course Builder Modal State
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch Users
      const usersSnap = await getDocs(collection(db, 'users'));
      const users = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Fetch Courses
      const coursesSnap = await getDocs(collection(db, 'courses'));
      const courses = coursesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Fetch Transactions
      const txSnap = await getDocs(collection(db, 'transactions'));
      const txs = txSnap.docs.map(d => ({ id: d.id, ...d.data() }));

      // Fetch Enquiries
      const enqSnap = await getDocs(collection(db, 'enquiries'));
      const enqs = enqSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Fetch Settings
      try {
        const settingsSnap = await getDoc(doc(db, 'settings', 'general'));
        if (settingsSnap.exists() && settingsSnap.data().whatsapp) {
          setWhatsappNumber(settingsSnap.data().whatsapp);
        }
      } catch (err) {
        console.error("Could not fetch settings", err);
      }
      
      const sortedEnqs = enqs.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

      setUsersList(users);
      setCoursesList(courses);
      setTransactions(txs);
      setEnquiries(sortedEnqs);

      // Calc Stats
      const realUsers = users.filter(u => u.role !== 'admin');
      const active = realUsers.filter(u => {
        if (u.isManuallyLocked) return false;
        if (!u.subscription || u.subscription.status !== 'active') return false;
        return new Date(u.subscription.expiresAt) > new Date();
      });
      
      const totalRev = txs.reduce((sum, t) => sum + (t.amount || 0), 0);

      setStats({
        totalUsers: realUsers.length,
        activeUsers: active.length,
        expiredUsers: realUsers.length - active.length,
        totalRevenue: totalRev,
        totalCourses: courses.length
      });

    } catch (e) {
      console.error("Error fetching admin data", e);
    }
  };

  const toggleUserLock = async (userId, currentLockState) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        isManuallyLocked: !currentLockState
      });
      fetchData();
    } catch (e) {
      console.error("Error toggling lock", e);
    }
  };

  const extendSubscription = async (userId, currentExpiresAt) => {
    try {
      const baseDate = currentExpiresAt && new Date(currentExpiresAt) > new Date() 
        ? new Date(currentExpiresAt) 
        : new Date();
      
      const newExpiry = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000);
      
      await updateDoc(doc(db, 'users', userId), {
        'subscription.expiresAt': newExpiry.toISOString(),
        'subscription.status': 'active',
        isManuallyLocked: false
      });
      
      fetchData();
      alert("Added 30 days to subscription.");
    } catch (e) {
      console.error("Error extending sub", e);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleNewCourse = () => {
    setEditingCourse(null);
    setShowCourseModal(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowCourseModal(true);
  };

  const handleDeleteCourse = async (courseId, courseTitle) => {
    if (window.confirm(`Are you sure you want to completely delete "${courseTitle}"? This cannot be undone.`)) {
      try {
        await deleteDoc(doc(db, 'courses', courseId));
        fetchData();
      } catch (e) {
        console.error("Error deleting course", e);
        alert("Failed to delete the course.");
      }
    }
  };

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    try {
      await setDoc(doc(db, 'settings', 'general'), { whatsapp: whatsappNumber }, { merge: true });
      alert("Settings saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save settings.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Mock Chart Data
  const chartData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex relative overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-64 bg-gray-900 text-white flex flex-col shrink-0 z-30 transition-transform duration-200 ease-in-out`}>
        <div className="p-6 text-2xl font-bold text-center border-b border-gray-800 flex justify-between items-center md:block">
          <div>Admin<span className="text-blue-500">Center</span></div>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 py-6 space-y-2 overflow-y-auto">
          <button 
            onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-6 py-3 transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            Dashboard Overview
          </button>
          <button 
            onClick={() => { setActiveTab('courses'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-6 py-3 transition-colors ${activeTab === 'courses' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            Course Manager
          </button>
          <button 
            onClick={() => { setActiveTab('users'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-6 py-3 transition-colors ${activeTab === 'users' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            User Access & Subs
          </button>
          <button 
            onClick={() => { setActiveTab('enquiries'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-6 py-3 transition-colors ${activeTab === 'enquiries' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            User Enquiries
          </button>
          <button 
            onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center px-6 py-3 transition-colors ${activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            <Settings className="w-5 h-5 mr-3" /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center py-2 text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full">
        {/* Mobile Header with Hamburger */}
        <div className="md:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 truncate">
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'courses' && 'Course Manager'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'enquiries' && 'Enquiries'}
            {activeTab === 'settings' && 'Platform Settings'}
          </h1>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <h2 className="hidden md:block text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center text-gray-500 mb-4">
                  <IndianRupee className="w-6 h-6 mr-2 text-green-500" /> Total Revenue
                </div>
                <div className="text-3xl font-bold text-gray-900">₹{stats.totalRevenue}</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center text-gray-500 mb-4">
                  <Users className="w-6 h-6 mr-2 text-blue-500" /> Active Users
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.activeUsers}</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center text-gray-500 mb-4">
                  <AlertCircle className="w-6 h-6 mr-2 text-red-500" /> Expired Users
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.expiredUsers}</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center text-gray-500 mb-4">
                  <BookOpen className="w-6 h-6 mr-2 text-indigo-500" /> Total Courses
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalCourses}</div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8 h-96">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{ fill: 'transparent' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-sm">
                    <tr>
                      <th className="p-4 font-medium">User</th>
                      <th className="p-4 font-medium">Amount</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.slice(0, 5).map(tx => (
                      <tr key={tx.id} className="hover:bg-gray-50">
                        <td className="p-4 text-gray-900 font-medium">{tx.userEmail}</td>
                        <td className="p-4 text-gray-600">₹{tx.amount}</td>
                        <td className="p-4 text-gray-600">{new Date(tx.paidAt).toLocaleDateString()}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Success</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="hidden md:block text-3xl font-bold text-gray-900 mb-8">User Management</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-sm">
                    <tr>
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Email</th>
                      <th className="p-4 font-medium">Subscription</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {usersList.filter(u => u.role !== 'admin').map(u => {
                      const isExpired = !u.subscription?.expiresAt || new Date(u.subscription.expiresAt) < new Date();
                      const isLocked = u.isManuallyLocked || isExpired;
                      
                      return (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="p-4 text-gray-900 font-medium">{u.fullName || 'N/A'}</td>
                          <td className="p-4 text-gray-600">{u.email}</td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-max ${isLocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {isLocked ? 'Locked / Expired' : 'Active'}
                              </span>
                              <span className="text-xs text-gray-500 mt-1">
                                Exp: {u.subscription?.expiresAt ? new Date(u.subscription.expiresAt).toLocaleDateString() : 'Never'}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 space-x-2">
                            <button 
                              onClick={() => toggleUserLock(u.id, u.isManuallyLocked)}
                              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${u.isManuallyLocked ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                            >
                              {u.isManuallyLocked ? 'Unlock' : 'Lock'}
                            </button>
                            <button 
                              onClick={() => extendSubscription(u.id, u.subscription?.expiresAt)}
                              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-md hover:bg-blue-200 transition-colors"
                            >
                              +30 Days
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
              <h2 className="hidden md:block text-3xl font-bold text-gray-900">Course Manager</h2>
              <button onClick={handleNewCourse} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center sm:justify-start w-full sm:w-auto">
                <Plus className="w-5 h-5 mr-1" /> New Course
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesList.map(course => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                  <div className="h-40 bg-gray-100 relative">
                    {course.thumbnailUrl && <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />}
                    {!course.published && (
                      <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">Draft</span>
                    )}
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="font-bold text-lg leading-tight">{course.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{Object.keys(course.chapters || {}).length} Chapters</p>
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <button onClick={() => handleDeleteCourse(course.id, course.title)} className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleEditCourse(course)} className="text-blue-600 hover:bg-blue-800 font-medium text-sm">Edit Curriculum</button>
                  </div>
                </div>
              ))}
              {coursesList.length === 0 && (
                <div className="col-span-full text-center py-16 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">No courses yet</h3>
                  <p className="text-gray-500 mt-1 mb-4">Get started by creating your first course curriculum.</p>
                  <button onClick={handleNewCourse} className="text-blue-600 font-medium hover:underline">Create a Course</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'enquiries' && (
          <div>
            <h2 className="hidden md:block text-3xl font-bold text-gray-900 mb-8">Enquiries</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-sm">
                    <tr>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Email</th>
                      <th className="p-4 font-medium">Subject & Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {enquiries.length > 0 ? enquiries.map(enq => (
                      <tr key={enq.id} className="hover:bg-gray-50">
                        <td className="p-4 text-gray-600 text-sm align-top">{new Date(enq.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 text-gray-900 font-medium align-top">{enq.fullName}</td>
                        <td className="p-4 text-gray-600 text-sm align-top">
                          <a href={`mailto:${enq.email}`} className="text-blue-600 hover:underline">{enq.email}</a>
                        </td>
                        <td className="p-4 text-sm align-top">
                          <div className="font-bold text-gray-800 mb-1">{enq.subject}</div>
                          <div className="text-gray-600 max-w-md whitespace-pre-wrap">{enq.message}</div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="p-8 text-center text-gray-500">
                          <Mail className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                          No enquiries yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="hidden md:block text-3xl font-bold text-gray-900 mb-8">Platform Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Admin Credentials */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-blue-500" /> Admin Credentials
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 font-medium">
                      admin@gmail.com
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 font-medium">
                      admin@4343
                    </div>
                  </div>
                </div>
              </div>

              {/* General Settings */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-green-500" /> General Settings
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Support WhatsApp Number</label>
                    <p className="text-sm text-gray-500 mb-3">Include country code without '+' (e.g., 919876543210)</p>
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Enter WhatsApp Number"
                    />
                  </div>
                  <button
                    onClick={handleSaveSettings}
                    disabled={isSavingSettings}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                  >
                    {isSavingSettings ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Overlay for Course Builder */}
        {showCourseModal && (
          <CourseBuilder 
            initialCourse={editingCourse} 
            onClose={() => setShowCourseModal(false)}
            onSaved={fetchData}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
