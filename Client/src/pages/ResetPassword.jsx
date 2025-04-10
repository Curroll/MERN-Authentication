 import React, { useContext, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
 
 const ResetPassword = () => {
  const navigate = useNavigate();
  const {backendUrl} = useContext(AppContent);
  axios.defaults.withCredentials = true; 
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword ] = useState('');
  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmited] = useState(false )


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


  const onSubmitEmail = async (e) => {
     e.preventDefault()
     try {
      const {data} = await axios.post(`${backendUrl}/api/auth/sendResetOtp`, {email})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success &&  setIsEmailSent(true) 
     } catch (error) {
      toast.error(error.message )
     }
  }

  const onSubmitOtp  =  async (e) => { 
    e.preventDefault()
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmited(true) 

  }


  const onSubmitNewPassword = async (e ) => {
    e.preventDefault();
      try {

        const {data } = await axios.post(`${backendUrl}/api/auth/resetPassword`, {email, otp, newPassword })
      data.success ? toast.success(data.message) :  toast.error(data.message)
      data.success && navigate('/login ')

        } catch (error) {
          toast.error(error.message )
        }

    }



   return (
     <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
        <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
        />
        {!isEmailSent && 
          <form onSubmit ={onSubmitEmail } className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password </h1>
          <p className='text-center mb-6 text-indigo-300'>Enter Your Registered Email Address.</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] '>
            <img src={assets.mail_icon} alt="" className='w-3 h-3' />
            <input type="email" placeholder='Email Id' className='bg-transparent outline-none text-white' 
            value={email}
            onChange={e => setEmail(e.target.value)} 
            required
            />
          </div>
          <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit </button>
          </form> 
        }


        {/* Reset otp field */}

        {!isOtpSubmitted && isEmailSent &&
              <form onSubmit={onSubmitOtp } className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
              <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
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
                className={`w-full py-2.5 ${
                  loading
                    ? 'bg-indigo-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 to-indigo-900'
                } text-white font-semibold rounded`} 
              >
                {loading ? 'Submiting...' : 'Submit'}
              </button>
            </form>
        }
          
          
          {/* Enter new Password */}
          {isOtpSubmitted && isEmailSent && 
          
          <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password </h1>
          <p className='text-center mb-6 text-indigo-300'>Enter New Password .</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] '>
            <img src={assets.lock_icon } alt="" className='w-3 h-3' />
            <input type="password" placeholder='Password' className='bg-transparent outline-none text-white' 
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)} 
            required
            />
          </div>
          <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit </button>
          </form> 

          }

          


     </div>
   )  
 }
 
 export default ResetPassword