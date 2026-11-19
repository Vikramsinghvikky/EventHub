import React, { useState, useRef, useEffect } from 'react';
import HangingLanyardCard from './HangingLanyardCard';
import { sendOtp, verifyOtp, registerUser, loginUser } from './api/auth';
import {
  ChevronLeft,
  Eye,
  EyeOff,
  GraduationCap,
  Briefcase,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  Sparkles,
  Check,
  ShieldCheck,
  ChevronDown,
  Phone,
  Building2,
  KeyRound,
  RefreshCw
} from 'lucide-react';

export default function Auth({
  previewMode = 'desktop',
  onLoginSuccess,
}) {
  // Navigation View Switch: true = Log In, false = Create Account
  const [isLoginView, setIsLoginView] = useState(true);

  // Responsive layout: supports viewport switcher ('mobile') and physical mobile devices (< 768px)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileLayout = previewMode === 'mobile' || windowWidth < 1024;

  // Mobile Continuous Scroll Progress (0 to 1)
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef(null);
  const loginSectionRef = useRef(null);

  // Auto-scroll states & timers
  const [autoScrollActive, setAutoScrollActive] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const autoScrollTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const userInteractedRef = useRef(false);

  // Cancel auto-scroll if user manually interacts (touches, clicks/flips card, scrolls, or clicks buttons)
  const handleUserInteraction = () => {
    if (userInteractedRef.current) return;
    userInteractedRef.current = true;
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setAutoScrollActive(false);
  };

  // Smooth scroll trigger to login/create account section (100% full screen scroll)
  const triggerSmoothScroll = () => {
    if (!loginSectionRef.current || !scrollContainerRef.current) return;
    const targetTop = loginSectionRef.current.offsetTop || scrollContainerRef.current.clientHeight;
    scrollContainerRef.current.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
  };

  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    // Calculate smooth progress normalized between 0 and 1 over 260px scroll distance
    const progress = Math.min(Math.max(scrollTop / 260, 0), 1);
    setScrollProgress(progress);

    // If user manually scrolls during countdown, immediately cancel auto-scroll
    if (scrollTop > 8 && autoScrollActive) {
      handleUserInteraction();
    }
  };

  // Reset scroll to top and trigger 3-second auto-scroll when in mobile view
  useEffect(() => {
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    setScrollProgress(0);
    userInteractedRef.current = false;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }

    if (isMobileLayout) {
      setAutoScrollActive(true);

      autoScrollTimerRef.current = setTimeout(() => {
        if (!userInteractedRef.current) {
          triggerSmoothScroll();
        }
        setAutoScrollActive(false);
      }, 750);
    } else {
      setAutoScrollActive(false);
    }

    return () => {
      if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [previewMode, isMobileLayout]);

  // --- LOG IN FORM STATES ---
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // --- CREATE ACCOUNT FORM STATES ---
  const [fullName, setFullName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [department, setDepartment] = useState('AIML');
  const [customDepartment, setCustomDepartment] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [role, setRole] = useState('student'); // 'student' | 'faculty'
  const [idNumber, setIdNumber] = useState('');
  const [idProofFile, setIdProofFile] = useState(null);
  const [idProofPreview, setIdProofPreview] = useState(null);
  const [registerErrors, setRegisterErrors] = useState({});
  const [registerLoading, setRegisterLoading] = useState(false);

  // OTP Input refs & timer ref
  const otpRefs = useRef([]);
  const otpTimerRef = useRef(null);

  // Registration success banner state
  const [registerSuccess, setRegisterSuccess] = useState('');

  const fileInputRef = useRef(null);

  // Clean up OTP timer on unmount
  useEffect(() => {
    return () => {
      if (otpTimerRef.current) clearInterval(otpTimerRef.current);
    };
  }, []);

  // OTP HANDLERS
  const startOtpCountdown = () => {
    setOtpTimer(30);
    setCanResendOtp(false);
    if (otpTimerRef.current) clearInterval(otpTimerRef.current);
    otpTimerRef.current = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(otpTimerRef.current);
          setCanResendOtp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (!registerEmail.trim()) {
      setRegisterErrors((prev) => ({
        ...prev,
        email: 'Please enter your college email first',
      }));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail.trim())) {
      setRegisterErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address (e.g., student@jnnce.ac.in)',
      }));
      return;
    }

    setRegisterErrors((prev) => {
      const copy = { ...prev };
      delete copy.email;
      return copy;
    });

    setOtpLoading(true);
    setOtpError('');
    try {
      await sendOtp(registerEmail.trim());
      setOtpDigits(['', '', '', '', '', '']);
      setIsOtpSent(true);
      startOtpCountdown();
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } catch (err) {
      setRegisterErrors((prev) => ({
        ...prev,
        email: err.message || 'Failed to send OTP to your email',
      }));
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const char = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);
    setOtpError('');

    if (char && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) {
      const newDigits = [...otpDigits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] || '';
      }
      setOtpDigits(newDigits);
      setOtpError('');
      const nextIdx = Math.min(pasted.length, 5);
      otpRefs.current[nextIdx]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otpDigits.join('');
    if (code.length < 6) {
      setOtpError('Please enter all 6 digits of the OTP code');
      return;
    }

    setOtpLoading(true);
    setOtpError('');

    try {
      await verifyOtp(registerEmail.trim(), code);
      setIsEmailVerified(true);
      setIsOtpSent(false);
      if (otpTimerRef.current) clearInterval(otpTimerRef.current);
      setRegisterErrors((prev) => {
        const copy = { ...prev };
        delete copy.email;
        delete copy.otp;
        return copy;
      });
    } catch (err) {
      setOtpError(err.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResendOtp) return;
    setOtpDigits(['', '', '', '', '', '']);
    setOtpError('');
    setOtpLoading(true);
    try {
      await sendOtp(registerEmail.trim());
      startOtpCountdown();
      otpRefs.current[0]?.focus();
    } catch (err) {
      setOtpError(err.message || 'Failed to resend OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  // File Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file) => {
    if (file.size > 10 * 1024 * 1024) {
      setRegisterErrors((prev) => ({
        ...prev,
        idProof: 'File size must be under 10MB',
      }));
      return;
    }

    setRegisterErrors((prev) => {
      const copy = { ...prev };
      delete copy.idProof;
      return copy;
    });

    setIdProofFile(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setIdProofPreview(e.target?.result);
      reader.readAsDataURL(file);
    } else {
      setIdProofPreview(null);
    }
  };

  const removeFile = (e) => {
    e?.stopPropagation();
    setIdProofFile(null);
    setIdProofPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // LOG IN SUBMISSION
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!loginEmail.trim()) {
      errors.email = 'Institutional or registered email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!loginPassword) {
      errors.password = 'Password is required';
    } else if (loginPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    setLoginErrors({});
    setLoginLoading(true);

    try {
      const response = await loginUser({
        email: loginEmail,
        password: loginPassword,
      });

      setLoginSuccess(true);
      const isFacultyLogin =
        response?.data?.user?.role === 'faculty' ||
        loginEmail.toLowerCase().includes('faculty') ||
        loginEmail.toLowerCase().includes('prof');

      const loggedUser = response?.data?.user || {
        name: isFacultyLogin ? 'Prof. S. R. Sharma' : loginEmail.split('@')[0],
        email: loginEmail,
        role: isFacultyLogin ? 'faculty' : 'student',
        idNumber: isFacultyLogin ? 'FAC-AIML-082' : '4JN23AI042',
        collegename: 'JNNCE',
        department: isFacultyLogin ? 'Artificial Intelligence & Machine Learning' : 'AIML',
        designation: isFacultyLogin ? 'Associate Professor & Event Convener' : undefined,
      };
      localStorage.setItem('eventhub_user', JSON.stringify(loggedUser));

      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess(loggedUser);
        }, 700);
      }
      setTimeout(() => setLoginSuccess(false), 3500);
    } catch (err) {
      setLoginErrors({
        server: err.message || 'Invalid email or password',
      });
    } finally {
      setLoginLoading(false);
    }
  };

  // CREATE ACCOUNT SUBMISSION
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!registerEmail.trim()) {
      errors.email = 'Institutional / College email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail.trim())) {
      errors.email = 'Please enter a valid college email address';
    } else if (!isEmailVerified) {
      errors.email = 'Please verify your college email with the 6-digit OTP';
    }

    const cleanPhone = phoneNumber.trim().replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^[+]?[0-9]{10,15}$/.test(cleanPhone)) {
      errors.phoneNumber = 'Please enter a valid 10-15 digit phone number (e.g. 9845012345)';
    }

    if (!collegeName.trim()) {
      errors.collegeName = 'College name is required';
    }

    const deptValue = department === 'OTHER' ? customDepartment.trim() : department;
    if (!deptValue) {
      errors.department = 'Department is required';
    }

    if (!registerPassword) {
      errors.password = 'Password is required';
    } else if (registerPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!role) {
      errors.role = 'Please select your role (Student or Faculty)';
    }

    // Role-specific validation: Faculty requires employee ID & proof; Student does NOT
    if (role === 'faculty') {
      if (!idNumber.trim()) {
        errors.idNumber = 'Faculty Employee ID is required';
      }
      if (!idProofFile) {
        errors.idProof = 'Valid Faculty ID proof is required';
      }
    }

    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }

    setRegisterErrors({});
    setRegisterLoading(true);

    try {
      const otpCode = otpDigits.join('').trim();
      const payload = {
        name: fullName.trim(),
        email: registerEmail.trim(),
        phonenumber: cleanPhone,
        collegename: collegeName.trim(),
        department: deptValue,
        password: registerPassword,
        role: role,
        otp: otpCode,
      };

      await registerUser(payload);

      setRegisterSuccess(`Account created successfully for ${fullName.trim()}! Switching to login...`);
      setLoginEmail(registerEmail.trim());

      // Reset registration form
      setFullName('');
      setPhoneNumber('');
      setCollegeName('');
      setRegisterPassword('');
      setIdNumber('');
      setIdProofFile(null);
      setIdProofPreview(null);
      setIsEmailVerified(false);
      setOtpDigits(['', '', '', '', '', '']);

      // Auto-switch to Log In view after 1.5s
      setTimeout(() => {
        setIsLoginView(true);
        setRegisterSuccess('');
      }, 1500);
    } catch (err) {
      setRegisterErrors({
        server: err.message || 'Registration failed. Please check your details.',
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="w-full h-screen min-h-screen overflow-hidden flex flex-col lg:flex-row bg-[#FF6B00] lg:bg-white relative">
      {/* Outer Scroll Container for Mobile / Full Screen Viewport */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onTouchStart={handleUserInteraction}
        onMouseDown={handleUserInteraction}
        onWheel={handleUserInteraction}
        className={`w-full h-full flex flex-col lg:flex-row transition-all duration-500 ease-in-out relative ${
          isMobileLayout ? 'overflow-y-auto scroll-smooth no-scrollbar' : 'overflow-hidden'
        }`}
      >
        {/* ========================================================
            LEFT PANEL: 100dvh ON MOBILE / 50% WIDTH ON DESKTOP
           ======================================================== */}
        <div
          className={`bg-gradient-to-b from-[#FF7A1A] via-[#FF6B00] to-[#E65100] relative px-4 sm:px-6 lg:px-8 pt-5 pb-6 text-white overflow-hidden transition-all duration-500 flex flex-col justify-between border-r border-orange-600/30 ${
            isMobileLayout
              ? 'w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex-shrink-0'
              : 'w-full lg:w-1/2 h-full flex-shrink-0 shadow-lg'
          }`}
        >
            {/* Ambient Translucent Orange/White Light Orbs (With Upward Parallax Drift) */}
            <div
              className="absolute top-2 -left-8 w-28 h-14 bg-white/20 rounded-full blur-[1px] pointer-events-none transition-transform duration-150 ease-out"
              style={{
                transform: isMobileLayout ? `translateY(-${scrollProgress * 24}px)` : undefined,
              }}
            ></div>
            <div className="absolute top-8 left-8 w-20 h-10 bg-white/25 rounded-full pointer-events-none"></div>
            <div
              className="absolute top-1 right-2 w-32 h-16 bg-white/20 rounded-full blur-[1px] pointer-events-none transition-transform duration-150 ease-out"
              style={{
                transform: isMobileLayout ? `translateY(-${scrollProgress * 30}px)` : undefined,
              }}
            ></div>
            <div className="absolute top-10 right-14 w-24 h-11 bg-white/25 rounded-full pointer-events-none"></div>

            {/* Sparkles (✦) Floating at different parallax speeds */}
            <div
              className="absolute top-4 left-1/4 text-white/80 text-xs select-none transition-transform duration-150 ease-out"
              style={{
                transform: isMobileLayout ? `translateY(-${scrollProgress * 36}px)` : undefined,
              }}
            >
              ✦
            </div>
            <div
              className="absolute top-10 right-1/4 text-white/90 text-sm select-none transition-transform duration-150 ease-out"
              style={{
                transform: isMobileLayout ? `translateY(-${scrollProgress * 20}px)` : undefined,
              }}
            >
              ✦
            </div>
            <div className="absolute top-16 left-8 text-white/70 text-[10px] select-none">✦</div>
            <div className="absolute top-14 right-8 text-white/70 text-[10px] select-none">✦</div>

            {/* Hanging Lanyard Assembly (3D Depth Recede Applied in Real-Time via scrollProgress) */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-auto w-full overflow-hidden">
              <HangingLanyardCard
                scrollProgress={scrollProgress}
                isMobile={isMobileLayout}
                onCardInteract={handleUserInteraction}
              />
            </div>

            {/* Subtle Animated Auto-Scroll / Scroll Hint (Fades out immediately once scrolling begins) */}
            {isMobileLayout && (
              <div
                className="relative z-20 flex flex-col items-center justify-center pt-2 pb-2 transition-opacity duration-200"
                style={{
                  opacity: Math.max(1 - scrollProgress * 3.5, 0),
                  pointerEvents: scrollProgress > 0.1 ? 'none' : 'auto',
                }}
              >
                <button
                  type="button"
                  onClick={triggerSmoothScroll}
                  className="flex items-center gap-2 text-[11px] font-bold text-white bg-black/25 px-4 py-2 rounded-full backdrop-blur-md shadow-sm border border-white/20 select-none cursor-pointer active:scale-95 transition-all"
                >
                  {autoScrollActive ? (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      <span>
                        {isLoginView ? 'Auto-scrolling to Log in...' : 'Auto-scrolling to Create Account...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {isLoginView ? 'Scroll down to log in' : 'Scroll down to Create Account'}
                      </span>
                    </>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                </button>
              </div>
            )}
          </div>


          {/* ========================================================
              RIGHT PANEL (50% WIDTH ON DESKTOP): AUTHENTICATION FORM
             ======================================================== */}
          <div
            ref={loginSectionRef}
            className={`bg-white flex flex-col justify-between overflow-y-auto transition-all duration-350 ease-out border-l border-gray-100 ${
              isMobileLayout
                ? 'w-full min-h-[100dvh] relative z-20 flex-shrink-0 p-6 sm:p-8'
                : 'w-full lg:w-1/2 flex-1 h-full bg-white px-8 sm:px-12 lg:px-14 xl:px-18 py-8 lg:py-10 overflow-y-auto'
            }`}
          >
            {/* Mobile View Top Navigation Bar: View EventHub Pass */}
            {isMobileLayout && (
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gray-100 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF7ED] hover:bg-[#FFEDD5] text-[#FF6B00] text-xs font-bold transition-all shadow-xs cursor-pointer group"
                  title="Scroll back up to view 3D EventHub Lanyard Pass"
                >
                  <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform stroke-[2.5]" />
                  <span>View EventHub Pass</span>
                </button>

                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{isLoginView ? 'Secure Log in' : 'Campus Sign up'}</span>
                </div>
              </div>
            )}
            {isLoginView ? (
              /* ================= VIEW 1: LOG IN VIEW ================= */
              <div className="animate-view-fade w-full max-w-[430px] mx-auto my-auto py-2">
                
                {/* Title */}
                <div className="mb-6">
                  <h1 className="text-[28px] sm:text-[32px] font-bold text-[#111827] tracking-tight leading-tight">
                    Log in
                  </h1>
                  <p className="text-[13px] text-[#6B7280] mt-1.5 leading-snug">
                    By logging in, you agree to our{' '}
                    <a href="#terms" className="font-bold text-[#111827] hover:underline">
                      Terms of Use
                    </a>
                    .
                  </p>
                </div>

                {loginSuccess && (
                  <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Login successful! Welcome back to EventHub.</span>
                  </div>
                )}

                {loginErrors.server && (
                  <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>{loginErrors.server}</span>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4B5563] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Your email"
                      className={`w-full h-12 px-4 rounded-xl text-sm bg-white border ${
                        loginErrors.email
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-[#E5E7EB] focus:border-[#FF6B00] focus:ring-[#FF6B00]/25'
                      } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm`}
                    />
                    {loginErrors.email ? (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {loginErrors.email}
                      </p>
                    ) : (
                      <p className="text-[11px] text-[#6B7280] mt-1.5">
                        Enter your institutional or registered email.
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-[#4B5563]">
                        Password
                      </label>
                      <a
                        href="#forgot"
                        className="text-xs text-[#FF6B00] hover:underline font-semibold"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full h-12 pl-4 pr-11 rounded-xl text-sm bg-white border ${
                          loginErrors.password
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-[#E5E7EB] focus:border-[#FF6B00] focus:ring-[#FF6B00]/25'
                        } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {loginErrors.password && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {loginErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Full-width Vibrant Orange Pill Button: "Log in" */}
                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full h-12 sm:h-13 py-3.5 mt-2 rounded-full bg-[#FF6B00] hover:bg-[#EA5E00] active:scale-[0.985] text-white font-semibold text-[15px] shadow-float transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
                  >
                    {loginLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Logging in...</span>
                      </>
                    ) : (
                      <span>Log in</span>
                    )}
                  </button>
                </form>

                {/* Bottom Switch Link: Switch to Create Account */}
                <div className="mt-6 text-center space-y-3">
                  <p className="text-[13px] text-[#6B7280]">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLoginView(false)}
                      className="font-bold text-[#FF6B00] hover:text-[#EA5E00] hover:underline focus:outline-none transition-colors cursor-pointer"
                    >
                      Create Account
                    </button>
                  </p>
                </div>

                {/* Privacy Policy Footer */}
                <div className="mt-5 pt-3 text-center border-t border-gray-200/60">
                  <p className="text-[11px] text-[#9CA3AF]">
                    For more information, please see our{' '}
                    <a href="#privacy" className="font-semibold text-[#6B7280] hover:underline">
                      Privacy policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            ) : (
              /* ================= VIEW 2: CREATE ACCOUNT VIEW ================= */
              <div className="animate-view-fade w-full max-w-[430px] mx-auto my-auto py-2">
                
                {/* Title */}
                <div className="mb-5">
                  <h1 className="text-[28px] sm:text-[32px] font-bold text-[#111827] tracking-tight leading-tight">
                    Create Account
                  </h1>
                  <p className="text-[13px] text-[#6B7280] mt-1 leading-snug">
                    Sign up for <span className="font-bold text-[#111827]">EventHub</span> to explore and manage campus events.
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  {/* 1. Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4B5563] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (registerErrors.fullName) {
                          setRegisterErrors((prev) => {
                            const c = { ...prev };
                            delete c.fullName;
                            return c;
                          });
                        }
                      }}
                      placeholder="e.g., Arjun Kumar"
                      className={`w-full h-11 px-3.5 rounded-xl text-sm bg-white border ${
                        registerErrors.fullName
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-[#E5E7EB] focus:border-[#FF6B00] focus:ring-[#FF6B00]/25'
                      } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm`}
                    />
                    {registerErrors.fullName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {registerErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* 2. Institutional / College Email + Inline Verify Button & 6-Digit OTP Box */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-[#4B5563]">
                        Institutional / College Email
                      </label>
                      {isEmailVerified && (
                        <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified ✓
                        </span>
                      )}
                    </div>

                    <div className="relative flex items-center">
                      <input
                        type="email"
                        disabled={isEmailVerified}
                        value={registerEmail}
                        onChange={(e) => {
                          setRegisterEmail(e.target.value);
                          if (registerErrors.email) {
                            setRegisterErrors((prev) => {
                              const c = { ...prev };
                              delete c.email;
                              return c;
                            });
                          }
                        }}
                        placeholder="e.g., student@jnnce.ac.in"
                        className={`w-full h-11 pl-3.5 pr-24 rounded-xl text-sm ${
                          isEmailVerified
                            ? 'bg-emerald-50/50 border-emerald-300 text-gray-800'
                            : 'bg-white border-[#E5E7EB]'
                        } border ${
                          registerErrors.email
                            ? 'border-red-500 focus:ring-red-200'
                            : 'focus:border-[#FF6B00] focus:ring-[#FF6B00]/25'
                        } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm`}
                      />

                      {/* Right-Side Inline Action Button */}
                      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {isEmailVerified ? (
                          <button
                            type="button"
                            onClick={() => {
                              setIsEmailVerified(false);
                              setIsOtpSent(false);
                              setOtpDigits(['', '', '', '', '', '']);
                            }}
                            className="text-[11px] text-gray-400 hover:text-[#FF6B00] font-medium px-2 py-1 hover:underline cursor-pointer"
                            title="Change email address"
                          >
                            Change
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="px-3 py-1.5 rounded-lg bg-[#FF6B00] hover:bg-[#EA5E00] active:scale-95 text-white text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1"
                          >
                            <span>{isOtpSent ? 'Resend' : 'Verify'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {registerErrors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {registerErrors.email}
                      </p>
                    )}

                    {/* Inline 6-Digit OTP Verification Box */}
                    {isOtpSent && !isEmailVerified && (
                      <div className="mt-2.5 p-3 sm:p-3.5 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] space-y-2.5 animate-view-fade shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#C2410C]">
                            <KeyRound className="w-3.5 h-3.5 text-[#FF6B00]" />
                            <span>6-Digit Email Verification Code</span>
                          </div>
                          <span className="text-[10px] font-semibold text-orange-700 bg-white px-2 py-0.5 rounded-full border border-orange-200">
                            Demo OTP: 123456
                          </span>
                        </div>

                        <p className="text-[11px] text-gray-600 leading-tight">
                          Enter the 6-digit code sent to <span className="font-semibold text-gray-900">{registerEmail}</span>
                        </p>

                        {/* 6 Auto-Advancing Input Boxes */}
                        <div className="flex items-center justify-between gap-1.5 max-w-[280px] mx-auto py-1">
                          {otpDigits.map((digit, idx) => (
                            <input
                              key={idx}
                              ref={(el) => (otpRefs.current[idx] = el)}
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(idx, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                              onPaste={handleOtpPaste}
                              className={`w-9 sm:w-10 h-10 sm:h-11 text-center text-base font-bold font-mono rounded-xl bg-white border ${
                                digit ? 'border-[#FF6B00] ring-1 ring-[#FF6B00]/40 text-[#FF6B00]' : 'border-gray-300 text-gray-900'
                              } focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/30 focus:outline-none shadow-xs transition-all`}
                            />
                          ))}
                        </div>

                        {otpError && (
                          <p className="text-red-500 text-xs flex items-center justify-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {otpError}
                          </p>
                        )}

                        {/* Confirm OTP & Resend Countdown Row */}
                        <div className="flex items-center justify-between pt-1 border-t border-orange-200/70">
                          {canResendOtp ? (
                            <button
                              type="button"
                              onClick={handleResendOtp}
                              className="text-xs font-bold text-[#FF6B00] hover:text-[#EA5E00] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <RefreshCw className="w-3 h-3" />
                              <span>Resend OTP</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-gray-500 font-medium">
                              Resend OTP in <span className="font-bold text-[#FF6B00] font-mono">{otpTimer}s</span>
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={otpLoading || otpDigits.join('').length < 6}
                            className="px-3.5 py-1.5 rounded-xl bg-[#FF6B00] hover:bg-[#EA5E00] active:scale-95 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                          >
                            {otpLoading ? (
                              <>
                                <div className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                                <span>Verifying...</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Confirm OTP</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3 & 4. Phone Number & College Name (2-Column Grid on tablet/desktop) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold text-[#4B5563] mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            if (registerErrors.phoneNumber) {
                              setRegisterErrors((prev) => {
                                const c = { ...prev };
                                delete c.phoneNumber;
                                return c;
                              });
                            }
                          }}
                          placeholder="e.g., +919845012345"
                          className={`w-full h-11 pl-9 pr-3 rounded-xl text-sm bg-white border ${
                            registerErrors.phoneNumber
                              ? 'border-red-500 focus:ring-red-200'
                              : 'border-[#E5E7EB] focus:border-[#FF6B00] focus:ring-[#FF6B00]/25'
                          } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm`}
                        />
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {registerErrors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {registerErrors.phoneNumber}
                        </p>
                      )}
                    </div>

                    {/* College Name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#4B5563] mb-1">
                        College Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={collegeName}
                          onChange={(e) => {
                            setCollegeName(e.target.value);
                            if (registerErrors.collegeName) {
                              setRegisterErrors((prev) => {
                                const c = { ...prev };
                                delete c.collegeName;
                                return c;
                              });
                            }
                          }}
                          placeholder="e.g., JNNCE"
                          className={`w-full h-11 pl-9 pr-3 rounded-xl text-sm bg-white border ${
                            registerErrors.collegeName
                              ? 'border-red-500 focus:ring-red-200'
                              : 'border-[#E5E7EB] focus:border-[#FF6B00] focus:ring-[#FF6B00]/25'
                          } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm`}
                        />
                        <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {registerErrors.collegeName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {registerErrors.collegeName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 5 & 6. Department & Password (2-Column Grid on tablet/desktop) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Department */}
                    <div>
                      <label className="block text-xs font-semibold text-[#4B5563] mb-1">
                        Department
                      </label>
                      <select
                        value={department}
                        onChange={(e) => {
                          setDepartment(e.target.value);
                          if (registerErrors.department) {
                            setRegisterErrors((prev) => {
                              const c = { ...prev };
                              delete c.department;
                              return c;
                            });
                          }
                        }}
                        className="w-full h-11 px-3 rounded-xl text-sm bg-white border border-[#E5E7EB] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/25 text-gray-900 focus:outline-none transition-all shadow-sm cursor-pointer"
                      >
                        <option value="AIML">AIML - AI & Machine Learning</option>
                        <option value="CSE">CSE - Computer Science & Engg</option>
                        <option value="ISE">ISE - Information Science & Engg</option>
                        <option value="ECE">ECE - Electronics & Comm Engg</option>
                        <option value="EEE">EEE - Electrical & Electronics</option>
                        <option value="MECH">MECH - Mechanical Engg</option>
                        <option value="CIVIL">CIVIL - Civil Engg</option>
                        <option value="OTHER">Other / Custom Department</option>
                      </select>
                      {department === 'OTHER' && (
                        <input
                          type="text"
                          value={customDepartment}
                          onChange={(e) => setCustomDepartment(e.target.value)}
                          placeholder="Enter your department"
                          className="w-full h-10 mt-1.5 px-3 rounded-xl text-sm bg-white border border-[#E5E7EB] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/25 text-gray-900 placeholder-gray-400 focus:outline-none transition-all shadow-sm"
                        />
                      )}
                      {registerErrors.department && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {registerErrors.department}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-xs font-semibold text-[#4B5563] mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showRegisterPassword ? 'text' : 'password'}
                          value={registerPassword}
                          onChange={(e) => {
                            setRegisterPassword(e.target.value);
                            if (registerErrors.password) {
                              setRegisterErrors((prev) => {
                                const c = { ...prev };
                                delete c.password;
                                return c;
                              });
                            }
                          }}
                          placeholder="e.g., Password@123"
                          className={`w-full h-11 pl-3.5 pr-11 rounded-xl text-sm bg-white border ${
                            registerErrors.password
                              ? 'border-red-500 focus:ring-red-200'
                              : 'border-[#E5E7EB] focus:border-[#FF6B00] focus:ring-[#FF6B00]/25'
                          } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                        >
                          {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {registerErrors.password && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {registerErrors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Role Selector Cards (Student vs Faculty) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-[#374151]">
                        Select your role
                      </label>
                      <span className="text-[11px] font-medium text-[#FF6B00]">* Required</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Student Card */}
                      <button
                        type="button"
                        onClick={() => {
                          setRole('student');
                          setRegisterErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.role;
                            delete copy.idNumber;
                            delete copy.idProof;
                            return copy;
                          });
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                          role === 'student'
                            ? 'border-[#FF6B00] bg-[#FFF7ED] ring-1 ring-[#FF6B00] shadow-sm'
                            : 'border-[#E5E7EB] bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                              role === 'student' ? 'bg-[#FF6B00] text-white' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              role === 'student' ? 'border-[#FF6B00] bg-[#FF6B00]' : 'border-gray-300 bg-white'
                            }`}
                          >
                            {role === 'student' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900">Student</div>
                        </div>
                      </button>

                      {/* Faculty Card */}
                      <button
                        type="button"
                        onClick={() => {
                          setRole('faculty');
                          setRegisterErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.role;
                            return copy;
                          });
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                          role === 'faculty'
                            ? 'border-[#FF6B00] bg-[#FFF7ED] ring-1 ring-[#FF6B00] shadow-sm'
                            : 'border-[#E5E7EB] bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                              role === 'faculty' ? 'bg-[#FF6B00] text-white' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              role === 'faculty' ? 'border-[#FF6B00] bg-[#FF6B00]' : 'border-gray-300 bg-white'
                            }`}
                          >
                            {role === 'faculty' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900">Faculty</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Faculty Mode: Requires Faculty Employee ID & ID Card Upload Dropzone */}
                  {role === 'faculty' && (
                    <div className="p-3.5 rounded-2xl bg-orange-50/40 border border-orange-200/80 space-y-3 shadow-xs animate-view-fade">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF6B00]">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Faculty Verification Credentials</span>
                      </div>

                      {/* Faculty Employee ID */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-800 mb-1">
                          Faculty Employee ID
                        </label>
                        <input
                          type="text"
                          value={idNumber}
                          onChange={(e) => {
                            setIdNumber(e.target.value);
                            if (registerErrors.idNumber) {
                              setRegisterErrors((prev) => {
                                const c = { ...prev };
                                delete c.idNumber;
                                return c;
                              });
                            }
                          }}
                          placeholder="e.g., FAC-2026-089"
                          className={`w-full h-10 px-3.5 rounded-xl text-sm bg-white border ${
                            registerErrors.idNumber
                              ? 'border-red-500 focus:ring-red-200'
                              : 'border-[#E5E7EB] focus:border-[#FF6B00] focus:ring-[#FF6B00]/25'
                          } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-xs`}
                        />
                        {registerErrors.idNumber && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {registerErrors.idNumber}
                          </p>
                        )}
                      </div>

                      {/* Faculty ID Proof Dropzone */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-semibold text-gray-800">
                            Upload Valid Faculty ID Proof
                          </label>
                          <span className="text-[10px] text-gray-400 font-medium">JPG, PNG, PDF</span>
                        </div>

                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept=".jpg,.jpeg,.png,.pdf"
                          className="hidden"
                        />

                        {!idProofFile ? (
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className={`w-full border-2 border-dashed ${
                              registerErrors.idProof
                                ? 'border-red-400 bg-red-50/20'
                                : 'border-gray-300 hover:border-[#FF6B00] bg-white hover:bg-orange-50/20'
                            } rounded-xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-all group`}
                          >
                            <div className="w-8 h-8 rounded-full bg-[#FFF7ED] group-hover:bg-[#FFEDD5] flex items-center justify-center text-[#FF6B00] mb-1.5 transition-colors">
                              <UploadCloud className="w-4 h-4 stroke-[2.2]" />
                            </div>
                            <span className="text-xs font-semibold text-gray-700 group-hover:text-[#FF6B00] text-center">
                              Upload Faculty ID Card (JPG, PNG, PDF)
                            </span>
                            <span className="text-[10px] text-gray-400 mt-0.5">
                              Drag & drop or click to choose file
                            </span>
                          </div>
                        ) : (
                          <div className="w-full bg-white border border-[#FED7AA] rounded-xl p-2.5 flex items-center justify-between shadow-xs">
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              {idProofPreview ? (
                                <img
                                  src={idProofPreview}
                                  alt="ID Preview"
                                  className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-[#FF6B00] flex-shrink-0">
                                  <FileText className="w-5 h-5" />
                                </div>
                              )}
                              <div className="overflow-hidden">
                                <div className="text-xs font-semibold text-gray-900 truncate">
                                  {idProofFile.name}
                                </div>
                                <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                  <span>{(idProofFile.size / 1024).toFixed(0)} KB</span>
                                  <span>•</span>
                                  <span className="text-emerald-600 font-medium flex items-center gap-0.5">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-2 py-1 text-[11px] font-medium text-gray-600 hover:text-gray-900 rounded cursor-pointer"
                              >
                                Change
                              </button>
                              <button
                                type="button"
                                onClick={removeFile}
                                className="p-1 text-gray-400 hover:text-red-500 rounded cursor-pointer"
                                aria-label="Remove file"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}

                        {registerErrors.idProof && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {registerErrors.idProof}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {registerErrors.server && (
                    <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>{registerErrors.server}</span>
                    </div>
                  )}

                  {registerSuccess && (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-view-fade">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="font-semibold">{registerSuccess}</span>
                    </div>
                  )}

                  {/* Primary Orange Pill Button: "Create Account" */}
                  <button
                    type="submit"
                    disabled={registerLoading}
                    className="w-full h-12 py-3.5 mt-2 rounded-full bg-[#FF6B00] hover:bg-[#EA5E00] active:scale-[0.985] text-white font-semibold text-[15px] shadow-float transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
                  >
                    {registerLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </button>
                </form>

                {/* Bottom Switch Link: Back to Log in */}
                <div className="mt-4 pt-2 text-center">
                  <p className="text-[13px] text-[#6B7280]">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLoginView(true)}
                      className="font-bold text-[#FF6B00] hover:text-[#EA5E00] hover:underline focus:outline-none transition-colors cursor-pointer"
                    >
                      Log in
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* Subtle Brand Footer pinned to bottom */}
            <footer className="w-full max-w-md mx-auto mt-auto pt-10 pb-1 text-center text-[11px] text-gray-400 select-none flex-shrink-0">
              <p>© {new Date().getFullYear()} EventHub • College Event Management Platform</p>
            </footer>
          </div>
        </div>
      </div>
  );
}
