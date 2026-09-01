import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const RefundPolicy = () => {
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
          <h1>Refund and Cancellation Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Refund Eligibility</h2>
          <p>
            At Anjana Creators Hub, we strive to deliver high-quality digital e-learning tutorials for Facebook management and content creation. Due to the digital nature of our 499 /- (3 months) All-Access Pass subscription, refunds are strictly governed by the following condition:
          </p>
          <p>
            <strong>Technical Errors:</strong> If a user successfully pays the subscription fee but faces technical errors on our platform that persistently prevent access to the purchased courses, they are eligible for a full refund. 
          </p>
          <p>
            Refunds will not be granted for changes of mind, partial usage, or failure to utilize the platform within the 3-month access period.
          </p>

          <h2>2. Refund Processing Time</h2>
          <p>
            If your refund request meets the eligibility criteria and is approved by our support team, it will be processed and credited back to your original payment method within <strong>2 working days</strong>.
          </p>

          <h2>3. Cancellation Policy</h2>
          <p>
            Your All-Access Pass subscription is a one-time payment of 499 /- that grants you access for exactly 3 months.
          </p>
          <p>
            <strong>No Auto-Charges:</strong> The subscription automatically expires at the end of the 3-month period. We do not automatically renew or auto-charge your payment method. You do not need to manually cancel your subscription to prevent future billing.
          </p>

          <h2>4. Requesting a Refund</h2>
          <p>
            To request a refund due to technical issues, please contact us immediately with your registered email and proof of payment:
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

export default RefundPolicy;
