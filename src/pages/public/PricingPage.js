import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db, fbDoc as doc, fbUpdateDoc as updateDoc, fbSetDoc as setDoc, fbCollection as collection } from '../../config/firebase';
import Footer from '../../components/layout/Footer';

const PricingPage = () => {
  const { user, subscription, setSubscription, setIsLocked, isLocked } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showFloatingBar, setShowFloatingBar] = useState(true);
  const pricingCardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Hide floating bar when the pricing card is in view
        setShowFloatingBar(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = pricingCardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const handleRazorpayPayment = async () => {
    setLoading(true);

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_TUP7iU8Z8nhAC1",
      amount: 499 * 100, // Amount in paise (₹499)
      currency: "INR",
      name: "Anjana Creators Hub",
      description: "3 Months All-Access Subscription",
      image: "https://anjanacreatorshub.com/logo512.png",
      handler: async function (response) {
        try {
          const now = new Date();
          const expiresAt = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days from now
          
          const subData = {
            status: 'active',
            plan: 'quarterly_300',
            amount: 499,
            currency: 'INR',
            subscribedAt: now.toISOString(),
            expiresAt: expiresAt.toISOString(),
            lastPaymentId: response.razorpay_payment_id
          };

          try {
            // Update user document in Firestore
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
              subscription: subData,
              isManuallyLocked: false
            });

            // Record transaction in Firestore
            const txRef = doc(collection(db, 'transactions'), response.razorpay_payment_id);
            await setDoc(txRef, {
              id: response.razorpay_payment_id,
              uid: user.uid,
              userEmail: user.email,
              userName: user.fullName || "User",
              amount: 499,
              currency: 'INR',
              plan: '3 Months All-Access',
              paidAt: now.toISOString(),
              validUntil: expiresAt.toISOString(),
              status: 'success'
            });
          } catch (dbError) {
            console.error("Failed to update payment status in DB (offline or permission denied):", dbError);
            // Fallback: update local mock data
            const localMock = localStorage.getItem(`mock_user_${user.uid}`);
            if (localMock) {
              const parsed = JSON.parse(localMock);
              parsed.subscription = subData;
              parsed.isManuallyLocked = false;
              localStorage.setItem(`mock_user_${user.uid}`, JSON.stringify(parsed));
            } else {
              localStorage.setItem(`mock_user_${user.uid}`, JSON.stringify({ 
                ...user, 
                subscription: subData, 
                isManuallyLocked: false 
              }));
            }
          }

          // Update global state
          setSubscription(subData);
          setIsLocked(false);
          
          alert("Payment successful! Access unlocked.");
          navigate('/courses');
        } catch (error) {
          console.error("Payment handler error:", error);
          alert("Payment was successful but an unexpected error occurred.");
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: user?.fullName || "",
        email: user?.email || ""
      },
      theme: {
        color: "#2563eb"
      },
      modal: {
        ondismiss: function() {
          setLoading(false);
        }
      }
    };

    const rzp1 = new window.Razorpay(options);
    
    rzp1.on('payment.failed', function (response) {
      alert(`Payment failed: ${response.error.description}`);
      setLoading(false);
    });
    
    rzp1.open();
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col font-sans overflow-x-hidden relative text-base">
      
      <main className="flex-grow pt-20 pb-20 md:pt-24 md:pb-32 px-6 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-12 md:gap-20 items-center md:items-start relative">
      
      {/* Alert Banners for Locked/Expired States */}
      <div className="w-full absolute top-6 px-4 z-50 flex flex-col items-center gap-3 left-0">
        {isLocked && subscription?.status === 'expired' && (
          <div className="bg-[#ffdad6] border border-[#ba1a1a]/20 text-[#93000a] px-6 py-3 rounded-full font-bold text-sm shadow-sm flex items-center animate-in slide-in-from-top-4">
            <span className="material-symbols-outlined text-[#93000a] text-[18px] mr-2">error</span>
            Your subscription has expired. Please renew to regain access to your courses.
          </div>
        )}
        
        {isLocked && user?.isManuallyLocked && (
          <div className="bg-[#ffdad6] border border-[#ba1a1a]/20 text-[#93000a] px-6 py-3 rounded-full font-bold text-sm shadow-sm flex items-center animate-in slide-in-from-top-4">
            <span className="material-symbols-outlined text-[#93000a] text-[18px] mr-2">error</span>
            Your account has been locked by an administrator.
          </div>
        )}
      </div>

{/*  Background Ambient Element  */}
<div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#003ec7]/5 blur-[120px] -z-10 pointer-events-none"></div>

{/*  Left Column: Emotional Value & Copy  */}
<div className="w-full md:w-1/2 flex flex-col space-y-6 md:space-y-12 mt-6 md:mt-0">
<div className="space-y-3">
<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0b1c30]" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>Unlock Your Full <span className="text-[#003ec7]">Learning Potential</span></h1>
<p className="text-lg text-[#434656]">
                    All Premium Courses. One Pass. 3 Months of Unlimited Learning.
                </p>
</div>

{/*  Malayalam Hero Copy  */}
<div className="bg-white p-6 rounded-xl border border-[#e5eeff] shadow-[0px_4px_20px_rgba(0,26,66,0.05)] space-y-3 relative overflow-hidden">
<div className="absolute right-0 top-0 w-32 h-32 bg-[#003ec7]/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
<h2 className="text-2xl md:text-3xl font-bold text-[#0b1c30] leading-tight" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>₹499 മാത്രം... 3 മാസത്തേക്ക് മുഴുവൻ <span className="text-[#003ec7]">Premium Courses</span> നിങ്ങളുടെത്!</h2>
<p className="text-base text-[#434656]">ഇനി ഓരോ കോഴ്സിനും വേറെ വേറെ പണം കൊടുക്കേണ്ടതില്ല.₹499 മാത്രം!</p>
</div>

{/*  Benefit Blocks (Bento-style Grid)  */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
<div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#eff4ff] transition-colors duration-200">
<span className="material-symbols-outlined text-[#003ec7] text-[24px]">library_books</span>
<div>
<h4 className="text-base font-bold text-[#0b1c30]">Every Premium Course</h4>
<p className="text-xs uppercase tracking-wider font-bold text-[#434656] mt-1">Unlock the complete library.</p>
</div>
</div>
<div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#eff4ff] transition-colors duration-200">
<span className="material-symbols-outlined text-[#003ec7] text-[24px]">video_library</span>
<div>
<h4 className="text-base font-bold text-[#0b1c30]">High-Quality Videos</h4>
<p className="text-xs uppercase tracking-wider font-bold text-[#434656] mt-1">Structured lessons for easy learning.</p>
</div>
</div>
<div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#eff4ff] transition-colors duration-200">
<span className="material-symbols-outlined text-[#003ec7] text-[24px]">download</span>
<div>
<h4 className="text-base font-bold text-[#0b1c30]">Downloadable Notes</h4>
<p className="text-xs uppercase tracking-wider font-bold text-[#434656] mt-1">Keep materials with you anytime.</p>
</div>
</div>
<div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#eff4ff] transition-colors duration-200">
<span className="material-symbols-outlined text-[#003ec7] text-[24px]">quiz</span>
<div>
<h4 className="text-base font-bold text-[#0b1c30]">Interactive Quizzes</h4>
<p className="text-xs uppercase tracking-wider font-bold text-[#434656] mt-1">Practice and check understanding.</p>
</div>
</div>
</div>
</div>

{/*  Right Column: Pricing Card (The Centerpiece)  */}
<div className="w-full md:w-1/2 flex justify-center md:justify-end relative mt-12 md:mt-0">
{/*  Decorative blur behind card  */}
<div className="absolute inset-0 bg-[#003ec7]/20 blur-[100px] rounded-full -z-10 max-w-sm mx-auto pointer-events-none"></div>
<div ref={pricingCardRef} className="bg-white/80 backdrop-blur-md shadow-[0px_4px_20px_rgba(0,26,66,0.05)] rounded-xl p-6 md:p-12 w-full max-w-md flex flex-col relative z-10 border-2 border-[#003ec7]/20">

<div className="text-center space-y-1 mb-6 mt-3">
<span className="text-xs uppercase tracking-wider font-bold text-[#4a5e89]">ALL-ACCESS PASS</span>
<div className="flex justify-center items-baseline gap-2" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
<span className="text-2xl font-bold text-[#ba1a1a] line-through decoration-2">₹1999</span>
<span className="text-5xl font-extrabold tracking-tight md:text-6xl text-[#0b1c30]">₹499</span>
<span className="text-lg text-[#434656]">/ 3 Months</span>
</div>
</div>

<div className="space-y-3 mb-12">
<div className="flex items-center gap-3 text-base text-[#434656]">
<span className="material-symbols-outlined text-[#003ec7]">check_circle</span>
<span className="">Full access to all current premium courses</span>
</div>
<div className="flex items-center gap-3 text-base text-[#434656]">
<span className="material-symbols-outlined text-[#003ec7]">check_circle</span>
<span className="">Track Your Progress & Stay Motivated</span>
</div>
<div className="flex items-center gap-3 text-base text-[#434656]">
<span className="material-symbols-outlined text-[#003ec7]">check_circle</span>
<span className="">Earn Certificates upon completion</span>
</div>
</div>

<button
                onClick={handleRazorpayPayment}
                disabled={loading || (isLocked && user?.isManuallyLocked)}
 className="w-full bg-[#0052FF] text-white py-3 px-6 rounded-lg font-bold text-xl hover:opacity-90 transition-opacity duration-200 shadow-[0px_4px_20px_rgba(0,26,66,0.05)] flex flex-col items-center justify-center gap-1 hover:scale-[1.02] active:scale-95 group">
{loading ? 'Processing...' : 'Unlock Premium — ₹499'}
<span className="text-xs uppercase tracking-wider font-normal opacity-80">3 Months Full Access</span>
</button>

<div className="mt-3 flex justify-center items-center gap-1 text-xs uppercase tracking-wider font-bold text-[#737688]">
<span className="material-symbols-outlined text-[16px]">lock</span>
                    🔒 Secure payment via Razorpay
                </div>
</div>
</div>
      </main>

      {/* Floating Bottom Bar for Mobile */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex justify-between items-center md:hidden z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-transform duration-300 transform ${showFloatingBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div>
          <div className="text-xs text-[#4a5e89] font-bold uppercase tracking-wider">All-Access Pass</div>
          <div className="flex items-baseline gap-1" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
            <span className="text-2xl font-extrabold tracking-tight text-[#0b1c30]">₹499</span>
            <span className="text-sm font-bold text-[#ba1a1a] line-through decoration-2">₹1999</span>
          </div>
        </div>
        <button 
          onClick={handleRazorpayPayment}
          disabled={loading || (isLocked && user?.isManuallyLocked)}
          className="bg-[#0052FF] text-white px-6 py-3 rounded-lg font-bold shadow-[0px_4px_20px_rgba(0,26,66,0.05)] text-sm active:scale-95 transition-transform disabled:opacity-50"
        >
          {loading ? 'Wait...' : 'Unlock Now'}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;
