import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Clock, ChevronLeft, LogOut, Award, Eye, EyeOff, ShieldAlert, KeyRound, AlertCircle, CheckCircle, X, Trash2, Edit3, Mail } from 'lucide-react';
import { fbReauthenticate, fbUpdatePassword, fbDeleteUser, db, fbDoc as doc, fbDeleteDoc } from '../../config/firebase';
import Footer from '../../components/layout/Footer';

const ProfilePage = () => {
  const { user, subscription, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getDaysRemaining = () => {
    if (!subscription?.expiresAt) return 0;
    const expires = new Date(subscription.expiresAt);
    const now = new Date();
    const diffTime = expires.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysRemaining();
  const isExpired = daysLeft <= 0;

  // Modal States
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState('');
  
  const [securityError, setSecurityError] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [isActionLoading, setIsActionLoading] = useState(false);

  const closeModals = () => {
    setIsPasswordModalOpen(false);
    setIsDeleteModalOpen(false);
    setSecurityError('');
    setSecuritySuccess('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmEmail('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
  };

  const handlePasswordReset = async () => {
    setSecurityError('');
    setSecuritySuccess('');
    if (!currentPassword || !newPassword) {
      return setSecurityError("Both current and new passwords are required.");
    }
    setIsActionLoading(true);
    try {
      await fbReauthenticate(currentPassword);
      await fbUpdatePassword(newPassword);
      setSecuritySuccess("Password updated successfully.");
      setTimeout(() => {
        closeModals();
      }, 2000);
    } catch (err) {
      setSecurityError(err.message || "Failed to update password. Check your current password.");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setSecurityError('');
    
    if (!confirmEmail) {
      return setSecurityError("Please enter your email address to confirm.");
    }
    if (confirmEmail.toLowerCase() !== user.email.toLowerCase()) {
      return setSecurityError("Email does not match your account email.");
    }

    if (!window.confirm("FINAL WARNING: This will permanently delete your account, all your course progress, and active subscriptions. This cannot be undone. Are you absolutely sure?")) {
      return;
    }
    
    setIsActionLoading(true);
    try {
      // Delete user data from Firestore first
      try {
        await fbDeleteDoc(doc(db, 'users', user.uid));
      } catch (e) {
        console.warn("Failed to delete Firestore data, continuing with Auth deletion", e);
      }
      
      // Delete user from Firebase Auth
      await fbDeleteUser();
      await logout();
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/requires-recent-login') {
         setSecurityError("For security reasons, please log out and log back in before deleting your account.");
      } else {
         setSecurityError(err.message || "Failed to delete account.");
      }
      setIsActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col relative">
      
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/courses')} 
            className="text-slate-500 hover:text-slate-900 flex items-center text-sm font-medium transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> 
            <span className="hidden sm:inline">Back to Courses</span>
            <span className="sm:hidden">Back</span>
          </button>
          
          <h1 className="text-lg sm:text-xl font-black text-slate-900">Your Profile</h1>
          
          <button 
            onClick={handleLogout} 
            className="text-slate-500 hover:text-red-600 flex items-center text-sm font-medium transition-colors"
          >
            <LogOut className="w-5 h-5 sm:mr-1" /> 
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Profile Content */}
      <main className="flex-1 flex justify-center py-10 px-4 sm:px-6">
        <div className="bg-white w-full max-w-md rounded-[2rem] shadow-sm border border-slate-200 p-8 flex flex-col items-center h-fit">
          
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-[#0097A7] flex items-center justify-center text-white text-5xl font-medium shadow-md shadow-cyan-900/20 mb-6 border-4 border-white ring-1 ring-slate-100">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span>{user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}</span>
            )}
          </div>
          
          {/* User Details */}
          <h2 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight text-center">
            {user?.fullName || 'User'}
          </h2>
          <p className="text-slate-500 text-sm mb-4 text-center">
            {user?.email}
          </p>

          {/* Conditional Renew Button if Expired */}
          {isExpired && (
            <button 
              onClick={() => navigate('/pricing')}
              className="px-6 py-2 mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full font-bold transition-colors border border-blue-200 text-sm"
            >
              Renew Subscription
            </button>
          )}

          {/* Divider */}
          <div className="w-full h-px bg-slate-100 my-8"></div>

          {/* Stats Cards */}
          <div className="w-full space-y-4">
            
            {/* Subscription Card */}
            <div className="flex items-center p-5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
              <Clock className={`w-8 h-8 mr-5 shrink-0 ${isExpired ? 'text-red-500' : 'text-[#2E7D32]'}`} />
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Subscription
                </h3>
                <div className="flex items-baseline">
                  <span className={`text-3xl font-black tracking-tight mr-2 ${isExpired ? 'text-red-600' : 'text-slate-900'}`}>
                    {Math.max(0, daysLeft)}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    days remaining
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Expires on {subscription?.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString('en-GB') : 'N/A'}
                </p>
              </div>
            </div>

            {/* Learning Progress Card */}
            <div className="flex items-center p-5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
              <Award className="w-8 h-8 mr-5 shrink-0 text-[#5C6BC0]" />
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Learning Progress
                </h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-black tracking-tight mr-2 text-slate-900">
                    {Object.keys(user?.progress || {}).length}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    courses started
                  </span>
                </div>
              </div>
            </div>

            {/* Security Settings Card (Action Buttons Only) */}
            <div className="w-full mt-8 p-6 rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center mb-6">
                <ShieldAlert className="w-6 h-6 mr-3 text-slate-800" />
                <h3 className="text-lg font-black text-slate-900">Security Settings</h3>
              </div>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all active:scale-95"
                >
                  <span className="flex items-center"><Edit3 className="w-4 h-4 mr-2 text-slate-500" /> Reset Password</span>
                  <ChevronLeft className="w-4 h-4 rotate-180 text-slate-400" />
                </button>
                
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-red-200 rounded-xl shadow-sm text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-all active:scale-95"
                >
                  <span className="flex items-center"><Trash2 className="w-4 h-4 mr-2 text-red-500" /> Delete Account</span>
                  <ChevronLeft className="w-4 h-4 rotate-180 text-red-400" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* --- PASSWORD RESET MODAL --- */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModals}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-black text-slate-900 flex items-center">
                <ShieldAlert className="w-5 h-5 mr-2 text-blue-600" /> Update Password
              </h3>
              <button onClick={closeModals} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {securityError && (
                <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-xl flex items-start text-sm border border-red-200">
                  <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                  <span>{securityError}</span>
                </div>
              )}
              {securitySuccess && (
                <div className="mb-6 p-3 bg-emerald-50 text-emerald-700 rounded-xl flex items-start text-sm border border-emerald-200">
                  <CheckCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                  <span>{securitySuccess}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Current Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all outline-none"
                      placeholder="Required"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all outline-none"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handlePasswordReset}
                    disabled={isActionLoading}
                    className="w-full flex items-center justify-center px-4 py-3 rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isActionLoading ? 'Saving...' : 'Confirm & Reset Password'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE ACCOUNT MODAL --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModals}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 border border-red-100">
            <div className="p-6 border-b border-red-50 flex justify-between items-center bg-red-50">
              <h3 className="font-black text-red-600 flex items-center">
                <Trash2 className="w-5 h-5 mr-2" /> Delete Account
              </h3>
              <button onClick={closeModals} className="p-1.5 text-red-400 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-xl text-sm border border-red-100">
                <p className="font-bold mb-1">Danger Zone!</p>
                <p className="text-red-600/90 text-xs">This will permanently delete your account, courses, and active subscription. There is no undo.</p>
              </div>

              {securityError && (
                <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-xl flex items-start text-sm border border-red-200">
                  <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                  <span>{securityError}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Confirm Email ID</label>
                  <p className="text-xs text-slate-500 mb-3">Please type <span className="font-bold text-slate-800 select-all">{user.email}</span> to confirm.</p>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm transition-all outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isActionLoading || confirmEmail.toLowerCase() !== user.email.toLowerCase()}
                    className="w-full flex items-center justify-center px-4 py-3 rounded-xl shadow-sm text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 disabled:bg-red-300"
                  >
                    {isActionLoading ? 'Deleting...' : 'I understand, delete my account'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Universal Footer - KYC Compliant */}
      <Footer />
    </div>
  );
};

export default ProfilePage;