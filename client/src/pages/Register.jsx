import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import '../pagescss/Register.css';
import { motion } from 'framer-motion';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!data.name.trim()) newErrors.name = 'Name is required.';

    if (!data.email.trim()) {
      newErrors.email = 'Email is required.';
    } else {
      const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = 'Invalid email format.';
      } else {
        const [username, domain] = data.email.split('@');
        if (domain !== 'gmail.com') {
          newErrors.email = 'Only Gmail addresses are allowed.';
        }
        if (!/^[a-z0-9]+$/.test(username)) {
          newErrors.email = 'Username must be lowercase letters and numbers only.';
        }
        const numbers = username.match(/\d/g);
        if (!numbers || numbers.length < 3) {
          newErrors.email = 'Username must include at least 3 numbers.';
        }
      }
    }

    if (!data.password) {
      newErrors.password = 'Password is required.';
    } else if (data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      const response = await Axios({ ...SummaryApi.register, data });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData({ name: '', email: '', password: '', confirmPassword: '' });
        navigate('/login');
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="register">
      <div className="register__container">
      <motion.h2
  className="register__title"
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.1, duration: 0.5 }}
>
  Create an Account
</motion.h2>


        <form className="register__form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="register__form-group">
            <label className="register__label">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="register__input"
            />
            {errors.name && <p className="register__error">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="register__form-group">
            <label className="register__label">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="register__input"
            />
            {errors.email && <p className="register__error">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="register__form-group">
            <label className="register__label">Password</label>
            <div className="register__password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="register__input"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="register__password-toggle"
              >
                {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
              </div>
            </div>
            {errors.password && <p className="register__error">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="register__form-group">
            <label className="register__label">Confirm Password</label>
            <div className="register__password-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="register__input"
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="register__password-toggle"
              >
                {showConfirmPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="register__error">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
         <button type="submit" className="register__button register__button--active">
  Register
</button>

        </form>

        <p className="register__footer">
          Already have an account?{' '}
          <Link to="/login" className="register__link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;