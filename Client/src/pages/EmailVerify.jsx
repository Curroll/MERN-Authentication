import React, { useContext, useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;

  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();
  const [otpArray, setOtpArray] = useState(Array(6).fill(''));
  const [loading, setLoading] = useState(false);


  const inputRefs = useRef([]);

  // ✅ Handle input change
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    const newOtp = [...otpArray];
    newOtp[index] = e.target.value.slice(-1); // Ensure only the last character is taken
    setOtpArray(newOtp);
  };
  
  // ✅ Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // ✅ Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '').split('');
    const newOtp = [...otpArray];

    paste.forEach((char, idx) => {
      newOtp[idx] = char;
      if (inputRefs.current[idx]) {
        inputRefs.current[idx].value = char;
      }
    });

    setOtpArray(newOtp);
  };

  // ✅ Submit OTP
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const otp = otpArray.join('');

      if (otp.length < 6) {
        toast.warning("Please enter the complete 6-digit OTP.");
        return;
      }

      const response = await axios.post(`${backendUrl}/api/auth/verifyEmail`, { otp });

      const data = response?.data;

      if (data?.success) {
        toast.success(data?.message || "Email verified successfully.");
        await getUserData();
        navigate('/');
      } else {
        toast.error(data?.message || "OTP verification failed.");
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || error?.message || "Something went wrong during verification.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto-redirect if already verified
  useEffect(() => {
    if (isLoggedIn && userData?.isAccountVerified) {
      navigate('/');
    }
  }, [isLoggedIn, userData]);

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
      />

      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verification OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the six-digit code sent to your email.</p>

        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill('').map((  _ , index) => (
            <input
              key={index}
              type='text'
              maxLength='1'
              autoFocus={index === 0}
              value={otpArray[index]}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(e) => (inputRefs.current[index] = e)}
              className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 ${
            loading
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-500 to-indigo-900'
          } text-white font-semibold rounded`}
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
