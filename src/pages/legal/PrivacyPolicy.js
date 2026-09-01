import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <header className="max-w-4xl mx-auto flex items-center mb-8">
        <button 
          onClick={() => navigate('/')} 
          className="text-slate-500 hover:text-slate-900 flex items-center text-sm font-semibold transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> 
          Back to Home
        </button>
      </header>

      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-[2rem] shadow-sm border border-slate-200 mt-8">
        <div className="prose prose-slate prose-headings:text-slate-900 prose-p:text-slate-700 max-w-none">
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Data Collection and Security</h2>
          <p>
            At Anjana Creators Hub, we collect personal information that you voluntarily provide to us when registering for our e-learning platform. This information is limited to your Name, Email Address, and Phone number during registration and the checkout process.
          </p>
          <p>
            All user data is securely encrypted and stored following industry-standard practices. We do not store any sensitive financial data (like credit card numbers or UPI PINs) on our servers; all payments are processed through Razorpay's highly secure gateway.
          </p>

          <h2>2. How We Use Your Data</h2>
          <p>
            The information we collect is used strictly for the following purposes:
          </p>
          <ul>
            <li>To grant and authenticate your access to the digital e-learning tutorials.</li>
            <li>To track your course progress.</li>
            <li>To communicate important account notifications and support.</li>
          </ul>

          <h2>3. User Rights & Account Deletion</h2>
          <p>
            You have full control over your personal data. Users have the explicit right to delete their accounts at any time directly from the <strong>Profile page</strong> of our application.
          </p>
          <p>
            <strong>Data Deletion Policy:</strong> Upon initiating account deletion, all your personal data, including your profile information, course progress, and active subscriptions, is permanently wiped from both the frontend user interface and our backend databases. This action is irreversible.
          </p>

          <h2>4. Data Sharing</h2>
          <p>
            Your privacy is our priority. We will never sell, rent, trade, or distribute your personal information to any third parties for marketing purposes.
          </p>

          <hr />
          <p><strong>Business Contact Information:</strong><br/>
          Business Owner: Anjana Prince (Anjana Ap)<br/>
          Anjana Creators Hub<br/>
          Panchajanyam house, Karumala PO, Balussery VI, Kozhikode District, Kerala, India<br/>
          Email: anjanacreatorshub@gmail.com<br/>
          Phone: +91 7012909595</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
