import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUser, FaShoppingBag, FaHeart, FaStore, FaUserPlus, FaSignOutAlt, FaBoxOpen, FaBars, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin'; // Import isAdmin function

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout
      });
      console.log("logout", response);
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md p-2 z-10">
      <div className="text-lg flex items-center justify-between gap-2 font-bold">
        <div className="flex items-center gap-2">
          <FaUserCircle size={22} />
          <span className="text-ellipsis line-clamp-1">{user.name || user.mobile}</span>
          <span className="text-medium text-red-600 font-normal">
            {user.role === "ADMIN" ? "(Admin)" : ""}
          </span>
        </div>

        <Link onClick={handleClose} to={"/dashboard/profile"} className="hover:text-primary-200">
          <HiOutlineExternalLink size={22} />
        </Link>
      </div>

      <hr className="my-2" />

      <Link to="/dashboard/profile" onClick={handleClose} className="flex px-4 py-2 items-center gap-2 hover:bg-gray-100">
        <FaUser /> My Profile
      </Link>

      {isAdmin(user.role) && (
        <>
          <Link to="/dashboard/product" onClick={handleClose} className="flex px-4 py-2 items-center gap-2 hover:bg-gray-100">
            <FaBoxOpen /> 3D Model
          </Link>
          <Link to="/dashboard/upload-product" onClick={handleClose} className="flex px-4 py-2 items-center gap-2 hover:bg-gray-100">
            <FaBoxOpen /> Upload 3D Model
          </Link>
          <Link to="/dashboard/category" onClick={handleClose} className="flex px-4 py-2 items-center gap-2 hover:bg-gray-100">
            <FaShoppingBag /> Category
          </Link>
          <Link to="/dashboard/subcategory" onClick={handleClose} className="flex px-4 py-2 items-center gap-2 hover:bg-gray-100">
            <FaBars /> Sub Category
          </Link>
        </>
      )}

      <Link to="/dashboard/my-orders" onClick={handleClose} className="flex px-4 py-2 items-center gap-2 hover:bg-gray-100">
        <FaShoppingCart /> Orders
      </Link>
      <Link to="/dashboard/address" onClick={handleClose} className="flex px-4 py-2 items-center gap-2 hover:bg-gray-100">
        <FaHeart /> About You
      </Link>
      <Link to="/dashboard/Seller3DModel" onClick={handleClose} className="flex px-4 py-2 items-center gap-2 hover:bg-gray-100">
        <FaStore /> Sell Own 3D Model
      </Link>
      <Link to="/register" onClick={handleClose} className="flex px-4 py-2 items-center gap-2 hover:bg-gray-100">
        <FaUserPlus /> New Register
      </Link>

      <hr className="my-2" />
      <button onClick={handleLogout} className="flex px-4 py-2 text-lg font-semibold text-gray-900 hover:bg-gray-100 items-center gap-2">
        <FaSignOutAlt /> Log out
      </button>
    </div>
  );
};

export default UserMenu;
