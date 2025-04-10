import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Spinner from './components/Spinner';
import { ToastContainer } from 'react-toastify';
import AppContext from './context/AppContext.jsx';

const App = () => {
  const { isLoading } = useContext(AppContent);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
