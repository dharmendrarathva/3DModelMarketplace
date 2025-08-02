import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaStore,
  FaUserPlus,
  FaSignOutAlt,
  FaBoxOpen,
  FaBars,
  FaShoppingCart
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { logout } from '../store/userSlice';
import isAdmin from '../utils/isAdmin';
import '../componentcss/UserMenu.css';

const UserMenu = ({ close = () => {} }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });
      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate('/');
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
    const handleClose = ()=>{
      if(close){
        close()
      }
   }

  return (
    <div className="user-menu">
      <nav className="user-menu__nav">
        <Link to="/dashboard/profile" onClick={close} className="user-menu__link">
          <FaUser className="user-menu__icon" /> My Profile
        </Link>

        {isAdmin(user.role) && (
          <>
            <Link to="/dashboard/product" onClick={close} className="user-menu__link">
              <FaBoxOpen className="user-menu__icon" /> 3D Model
            </Link>
            <Link to="/dashboard/upload-product" onClick={close} className="user-menu__link">
              <FaBoxOpen className="user-menu__icon" /> Upload 3D Model
            </Link>
            <Link to="/dashboard/category" onClick={close} className="user-menu__link">
              <FaShoppingBag className="user-menu__icon" /> Category
            </Link>
            <Link to="/dashboard/subcategory" onClick={close} className="user-menu__link">
              <FaBars className="user-menu__icon" /> Sub Category
            </Link>
          </>
        )}

        <Link to="/dashboard/my-orders" onClick={close} className="user-menu__link">
          <FaShoppingCart className="user-menu__icon" /> Orders
        </Link>
        <Link to="/dashboard/Seller3DModel" onClick={close} className="user-menu__link">
          <FaStore className="user-menu__icon" /> Donate Free Model
        </Link>
        <Link to="/register" onClick={close} className="user-menu__link">
          <FaUserPlus className="user-menu__icon" /> New Register
        </Link>
           <Link onClick={handleClose} to={"/dashboard/address"} className="user-menu__link"> 
           <FaHeart className="user-menu__icon" />Save Address
           </Link>
      </nav>

      <hr className="user-menu__divider" />

      <button
        onClick={handleLogout}
        className="user-menu__logout-btn"
      >
        <FaSignOutAlt className="user-menu__icon" /> Log out
      </button>
    </div>
  );
};

export default UserMenu;