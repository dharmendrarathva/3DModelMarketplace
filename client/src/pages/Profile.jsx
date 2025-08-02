// Profile.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Image, Mail, Phone, User, Shield, Edit3 } from 'lucide-react';
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';

import '../pagescss/Profile.css';

const Profile = () => {
  const user = useSelector(state => state.user);
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name || '',
    email: user.email || '',
    mobile: String(user.mobile || ''),
    role: user.role || '',
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user.name || '',
      email: user.email || '',
      mobile: String(user.mobile || ''),
      role: user.role || '',
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleMobileChange = (value) => {
    setUserData(prev => ({
      ...prev,
      mobile: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        const updatedUserData = await fetchUserDetails();
        dispatch(setUserDetails(updatedUserData.data));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile__container">
      {/* Left Side - Profile Visuals */}
      <div className="profile__visuals">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="profile__avatar-container"
        >
          <div className="profile__avatar-wrapper">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="profile__avatar-image"
              />
            ) : (
              <User size={80} className="profile__avatar-icon" />
            )}
            <button 
              onClick={() => setProfileAvatarEdit(true)}
              className="profile__edit-avatar-btn"
            >
              <Edit3 size={18} />
            </button>
          </div>
          <h2 className="profile__user-name">{userData.name}</h2>
          <p className="profile__user-role">{userData.role || 'Member'}</p>
        </motion.div>

        <div className="profile__stats">
          <div className="profile__stat-item">
            <span className="profile__stat-label">Member Since</span>
            <span className="profile__stat-value">Jun 2023</span>
          </div>
          <div className="profile__stat-item">
            <span className="profile__stat-label">Last Active</span>
            <span className="profile__stat-value">Today</span>
          </div>
        </div>
      </div>

      {/* Right Side - Profile Form */}
      <div className="profile__form-container">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="profile__form-header"
        >
          <h1 className="profile__form-title">Profile Settings</h1>
          <p className="profile__form-subtitle">Update your personal information</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="profile__form">
          <div className="profile__form-section">
            <h3 className="profile__section-title">
              <User size={20} className="profile__section-icon" />
              Personal Details
            </h3>
            
            <div className="profile__form-grid">
              <div className="profile__form-group">
                <label className="profile__input-label">Full Name</label>
                <motion.input
                  type="text"
                  className="profile__text-input"
                  value={userData.name}
                  name="name"
                  onChange={handleOnChange}
                  required
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div className="profile__form-group">
                <label className="profile__input-label">Email Address</label>
                <input
                  type="email"
                  className="profile__text-input profile__text-input--readonly"
                  value={userData.email}
                  readOnly
                />
              </div>

              <div className="profile__form-group">
                <label className="profile__input-label">Phone Number</label>
                <input
                  type="tel"
                  name="mobile"
                  className="profile__text-input"
                  value={userData.mobile}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="profile__form-group">
                <label className="profile__input-label">Account Type</label>
                <input
                  type="text"
                  className="profile__text-input profile__text-input--readonly"
                  value={userData.role || 'Standard'}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="profile__form-actions">
            <motion.button
              type="submit"
              className="profile__submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? (
                <span className="profile__loading-indicator">
                  <svg className="profile__loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="profile__loading-spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="profile__loading-spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : 'Save Changes'}
            </motion.button>
          </div>
        </form>
      </div>

      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
      )}
    </div>
  );
};

export default Profile;