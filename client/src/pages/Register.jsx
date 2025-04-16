import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error('Password and Confirm Password must be the same');
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        navigate('/login');
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white shadow-xl rounded-lg p-8 mx-auto w-full max-w-md mt-10 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Create an Account</h2>

        <form className="grid gap-6 text-left" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name" className="font-semibold">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-blue-50 p-3 border rounded-lg outline-none focus:border-green-400"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
              autoFocus
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="email" className="font-semibold">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-blue-50 p-3 border rounded-lg outline-none focus:border-green-400"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password" className="font-semibold">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="bg-blue-50 p-3 pr-10 border rounded-lg outline-none focus:border-green-400 w-full"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword" className="font-semibold">Confirm Password:</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className="bg-blue-50 p-3 pr-10 border rounded-lg outline-none focus:border-green-400 w-full"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter confirm password"
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </div>

          <button
  type="submit"
  className={`flex items-center justify-center ${
    valideValue ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500"
  } text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-900`}
  disabled={!valideValue}
>
  <span className="font-semibold text-sm">Register</span>
</button>

        </form>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
