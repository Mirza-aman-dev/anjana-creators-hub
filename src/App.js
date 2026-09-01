import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { PublicRoute, UserProtectedRoute, SubscriptionProtectedRoute, AdminProtectedRoute } from './components/auth/Guards';
import WhatsAppFAB from './components/ui/WhatsAppFAB';

// Lazy load pages for performance
const LandingPage = React.lazy(() => import('./pages/public/LandingPage'));
const PricingPage = React.lazy(() => import('./pages/public/PricingPage'));
const OnboardingPage = React.lazy(() => import('./pages/auth/OnboardingPage'));
const AuthPage = React.lazy(() => import('./pages/auth/login'));
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const StudentPortal = React.lazy(() => import('./pages/course/StudentPortal'));
const CourseRoom = React.lazy(() => import('./pages/course/CourseRoom'));
const ProfilePage = React.lazy(() => import('./pages/user/ProfilePage'));
const ContactUs = React.lazy(() => import('./pages/legal/ContactUs'));
const Terms = React.lazy(() => import('./pages/legal/Terms'));
const PrivacyPolicy = React.lazy(() => import('./pages/legal/PrivacyPolicy'));
const RefundPolicy = React.lazy(() => import('./pages/legal/RefundPolicy'));

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/refund" element={<RefundPolicy />} />
              </Route>

              {/* Authenticated but maybe not onboarded */}
              <Route path="/onboarding" element={<OnboardingPage />} />

              {/* User Protected Routes (Needs Full Name) */}
              <Route element={<UserProtectedRoute />}>
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              {/* Subscription Protected Routes (Needs Active Subscription) */}
              <Route element={<SubscriptionProtectedRoute />}>
                <Route path="/courses" element={<StudentPortal />} />
                <Route path="/courses/:courseId" element={<CourseRoom />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<AdminProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
              
              {/* Fallback */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
            <WhatsAppFAB />
          </React.Suspense>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
