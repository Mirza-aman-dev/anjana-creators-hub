import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const Terms = () => {
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
          <h1>Terms & Conditions</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Introduction</h2>
          <p>
            Welcome to Anjana Creators Hub. By accessing or using our platform, you agree to be bound by these Terms & Conditions. Our service offers digital e-learning tutorials focusing on Facebook management and content creation.
          </p>

          <h2>2. Service Usage & Subscription</h2>
          <p>
            By purchasing the "All-Access Pass" for 499 /- (3 months), users are granted temporary, non-exclusive access to our video lectures and quizzes for a duration of exactly 3 months. After this 3-month period, access will automatically expire unless a new subscription is purchased.
          </p>

          <h2>3. Intellectual Property and Piracy</h2>
          <p>
            All content on Anjana Creators Hub, including video tutorials, text, and quizzes, is the exclusive intellectual property of Anjana Prince (Anjana Ap). 
          </p>
          <p>
            <strong>Strictly Prohibited Actions:</strong> Users are strictly prohibited from engaging in content piracy, downloading, recording, or redistributing any of the tutorials or materials provided on this platform. Any violation of these terms will result in an immediate and permanent account ban without a refund, and may be subject to legal action.
          </p>

          <h2>4. User Conduct</h2>
          <p>
            Users are expected to maintain the confidentiality of their account credentials. Sharing your account login with others is not permitted and may result in account termination.
          </p>

          <h2>5. Modifications to the Service and Prices</h2>
          <p>
            We reserve the right to modify or discontinue the Service (or any part or content thereof) without notice at any time. Prices for our products are subject to change without notice.
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

export default Terms;
