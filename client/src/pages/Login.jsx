import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';
import Axios from '../utils/Axios';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { motion } from 'framer-motion';
import '../pagescss/Login.css';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <section className="Login-container">
      <div className="Login-card">
        {/* Header Text */}
        <div className="Login-header">
          <motion.h2
            className="Login-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Welcome to
          </motion.h2>

          <motion.h2
            className="Login-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            3D Model Marketplace
          </motion.h2>
        </div>

        {/* Login Alert */}
        <div className="Login-alert">
          You must be logged in to access this page
        </div>

        {/* Login Form */}
        <form className="Login-form" onSubmit={handleSubmit}>
          <div className="Login-inputGroup">
            <label htmlFor="email" className="Login-label">Email:</label>
            <input
              type="email"
              id="email"
              className="Login-input"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {emailError && (
              <p className="Login-errorMessage">{emailError}</p>
            )}
          </div>

          <div className="Login-inputGroup">
            <label htmlFor="password" className="Login-label">Password:</label>
            <div className="Login-passwordContainer">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="Login-input"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="Login-passwordToggle"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>

            <Link
              to="/forgot-password"
              className="Login-forgotPassword"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="Login-button"
          >
            <span className="Login-buttonText">Login</span>
          </button>
        </form>

        <p className="Login-footer">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="Login-registerLink"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;