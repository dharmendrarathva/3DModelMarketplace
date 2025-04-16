import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Orders</h2>

        <div className="flex flex-col items-center justify-center bg-white py-16 px-6 rounded-xl shadow-md">
          <ShoppingCart className="w-14 h-14 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Available</h3>
          <p className="text-gray-500 mb-6 text-center">
            Looks like you haven't purchased anything yet. Start exploring and grab some awesome 3D models!
          </p>
          <button
            onClick={handleBuyNow}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
