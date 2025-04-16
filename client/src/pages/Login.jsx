import React, { useState, useEffect } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';
import Axios from '../utils/Axios';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [emailError, setEmailError] = useState('');


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  
    if (name === 'email') {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      setEmailError(gmailRegex.test(value) ? '' : '');
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Gmail validation regex
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  
    if (!gmailRegex.test(data.email)) {
      toast.error('Please enter a valid Gmail address (example@gmail.com)');
      return;
    }
  
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      });
  
      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }
  
      const userDetails = await fetchUserDetails();
      dispatch(setUserDetails(userDetails.data));
  
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          email: '',
          password: ''
        });
        navigate('/');
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  

  useEffect(() => {
    setTimeout(() => setShowWelcome(true), 500);
    setTimeout(() => setShowMarketplace(true), 2000);
    setTimeout(() => setShowLoginForm(true), 3500);
  }, []);

  const textStyle = {
    animation: 'draw 2s forwards',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '0'
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white shadow-xl rounded-lg p-8 mx-auto w-full max-w-md mt-10 text-center">
        {/* Animated Text */}
        <div className="flex flex-col items-center mb-6">
          {showWelcome && (
            <h2
              className="text-2xl font-bold text-gray-700"
              style={textStyle}
            >
              Welcome to
            </h2>
          )}

          {showMarketplace && (
            <h2
              className="text-2xl font-bold text-black-700 mt-6"
              style={textStyle}
            >
              3D Model Marketplace
            </h2>
          )}
        </div>

        {/* Login Form */}
        {showLoginForm && (
          <>
            <div className="bg-red-100 text-red-400 text-center py-3 mb-4">
              You must be logged in to access this page
            </div>

            <form className="grid gap-6 mt-6" onSubmit={handleSubmit}>
            <div className="grid gap-2 text-left">
  <label htmlFor="email" className="font-semibold">Email:</label>
  <input
    type="email"
    id="email"
    className="bg-blue-50 p-3 border rounded-lg outline-none focus:border-green-400"
    name="email"
    value={data.email}
    onChange={handleChange}
    placeholder="Enter your email"
  />
  {emailError && (
    <p className="text-sm text-red-500 mt-1">{emailError}</p>
  )}
</div>


              <div className="grid gap-2 text-left">
                <label htmlFor="password" className="font-semibold">Password:</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="bg-blue-50 p-3 pr-10 border rounded-lg outline-none focus:border-green-400 w-full"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  <div
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black-400 cursor-pointer"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>

                <Link
                  to="/forgot-password"
                  className="block ml-auto text-sm text-black-400 hover:text-primary-300"
                >
                  Forgot password?
                </Link>
              </div>

              <button
  type="submit"
  onClick={handleSubmit}
  className="flex items-center justify-center bg-blue-600 hover:bg--700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-900"
  disabled={!data.email || !data.password}
>
 
  <span className="font-semibold text-sm">Login</span>
</button>

            </form>

            <p className="text-center mt-4">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-green-700 hover:text-green-800"
              >
                Register
              </Link>
            </p>
          </>
        )}
      </div>

      {/* Inline Keyframes Animation */}
      <style>{`
        @keyframes draw {
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Login;