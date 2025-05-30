import React, { useContext } from 'react';
import { assets } from '../assets/assets'; 
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn, isLoading } = useContext(AppContent);


  const sendVerificationOtp = async () => {
     try {
      axios.defaults.withCredentials = true;

      const {data} = await axios.post(`${backendUrl}/api/auth/sendVerifyOtp`)
      if(data.success){
         navigate('/email-verify')
         toast.success(data.message )
      }else{
        toast.error(data.message )
      }

     } catch (error) {
      toast.error(data.message ) 
     }
  }

  const Logout = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`, {}, {
        withCredentials: true
      });

      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Logging Out");
    }
  };

  // 🧠 While checking auth, don't flash UI
  if (isLoading) {
    return (
      <div className="w-full p-4 sm:p-6 sm:px-24 absolute top-0 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />

      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group cursor-default">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li className="py-1 px-2 hover:bg-gray-200 cursor-pointer" onClick={sendVerificationOtp} >Verify Email</li>
              )}
              <li onClick={Logout} className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10">Logout</li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer"
        >
          Login
          <img src={assets.arrow_icon} alt="Arrow Icon" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
