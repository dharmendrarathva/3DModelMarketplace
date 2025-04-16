import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { BsCart4 } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

const AddToCartButton = ({ data }) => {
  const { fetchCartItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector(state => state.cartItem.cart);
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [cartItemDetails, setCartItemDetails] = useState(null);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addTocart,
        data: { productId: data?._id },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem?.();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItemDetails?._id) {
      await deleteCartItem(cartItemDetails._id);
    }
  };

  useEffect(() => {
    if (!data) return;

    const item = cartItem?.find(item => item?.productId?._id === data?._id);
    setIsAvailableCart(!!item);
    setCartItemDetails(item || null);
  }, [data, cartItem]);

  return (
    <div className="w-full max-w-[140px]">
      {isAvailableCart ? (
        <button
          onClick={handleRemoveFromCart}
          className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FaTrashAlt size={16} className="mr-2" />
          <span className="font-semibold text-sm">Remove</span>
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              <BsCart4 size={20} className="mr-2" />
              <span className="font-semibold text-sm">Add</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
