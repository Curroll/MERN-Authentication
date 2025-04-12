// rafce

import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const onSubmitHandler = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     const trimmedEmail = email.trim();
  //     const trimmedPassword = password.trim();

  //     if (state === "Sign Up") {
  //       const { data } = await axios.post(
  //         `${backendUrl}/api/auth/register`,
  //         {
  //           name: name.trim(),
  //           email: trimmedEmail,
  //           password: trimmedPassword,
  //         }
  //       );

  //       if (data.success) {
  //         localStorage.setItem("token", data.token);
  //         setIsLoggedIn(true);
  //         await getUserData();
  //         navigate("/");
  //       } else {
  //         toast.error(data.message);
  //       }
  //     } else {
  //       const { data } = await axios.post(
  //         `${backendUrl}/api/auth/login`,
  //         {
  //           email: trimmedEmail,
  //           password: trimmedPassword,
  //         }
  //       );

  //       if (data.success) {
  //         localStorage.setItem("token", data.token);
  //         setIsLoggedIn(true);
  //         await getUserData();
  //         navigate("/");
  //       } else {
  //         toast.error(data.message);
  //       }
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error?.response?.data?.message || "Something went wrong"
  //     );
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

const onSubmitHandler = async (e) => {
  try {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    if(state === 'Sign Up'){
      const { data } = await axios.post(`${backendUrl}/api/auth/register`,{
        name,email,password
      })
      if(data.success){
        setIsLoggedIn(true);
        getUserData()
        navigate('/') 
      }else{
         toast.error(data.message); 
      }
    }else{
      const { data } = await axios.post(`${backendUrl}/api/auth/login`,{
        email,password
      })
      if(data.success){
        setIsLoggedIn(true);
        getUserData()
        navigate('/') 
      }else{
         toast.error(data.message); 
      }
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
    toast.error(errorMessage);
  }  
}

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#555A5C]">
              <img src={assets.person_icon} alt="person" />
              <input
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#555A5C]">
            <img src={assets.mail_icon} alt="email" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none"
              type="email"
              placeholder="Email Id"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#555A5C]">
            <img src={assets.lock_icon} alt="lock" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : state}
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs mt-4">
          {state === "Sign Up" ? (
            <>
              Already have an Account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-400 cursor-pointer underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an Account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-400 underline cursor-pointer"
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
