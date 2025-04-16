import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { FaCaretRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import AddToCartButton from './AddToCartButton';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import imageEmpty from '../assets/b1.png';
import toast from 'react-hot-toast';

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      navigate('/checkout');
      if (close) close();
      return;
    }
    toast('Please Login');
  };

  return (
    <section className="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center">
      <div className="bg-white w-full h-full max-w-full flex flex-col overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b shadow-sm">
          <h2 className="text-lg font-semibold">My Cart</h2>
          <button onClick={close} className="text-gray-600 hover:text-black">
            <IoClose size={25} />
          </button>
        </div>

        {/* Cart Content */}
        <div className={`flex-1 overflow-y-auto bg-blue-50 p-4 space-y-6 ${cartItem.length > 0 ? 'flex' : 'flex items-center justify-center'}`}>
          {/* Product List */}
          <div className="w-2/3 pr-4">
            {cartItem.length > 0 ? (
              <>
                {/* Total Savings */}
                <div className="flex justify-between items-center bg-blue-100 text-blue-600 rounded-full px-4 py-2 font-medium text-sm">
                  <span>Total Savings</span>
                  <span>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</span>
                </div>

                {/* Cart Items */}
                <div className="space-y-6">
                  {cartItem.map((item) => {
                    const originalPrice = item?.productId?.price;
                    const discountPercent = item?.productId?.discount || 0;
                    const discountedPrice = pricewithDiscount(originalPrice, discountPercent);

                    return (
                      <div key={item?._id + 'cartItemDisplay'} className="bg-white p-4 rounded-xl shadow-md">
                        {/* Flex container for image and details */}
                        <div className="flex items-center gap-6">
                          {/* Image */}
                          <div className="w-80 h-44 bg-gray-100 border rounded-lg overflow-hidden flex items-center justify-center">
                            <img
                              src={item?.productId?.image[0] || imageEmpty}
                              alt={item?.productId?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>


                          {/* Details */}
                          <div className="text-sm flex-1">
                            <p className="font-semibold text-gray-800 text-base">{item?.productId?.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{item?.productId?.unit}</p>

                            <div className="mt-2">
                              <p className="text-black-600 font-semibold text-lg">
                                {DisplayPriceInRupees(discountedPrice)}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-sm">
                                <s className="text-gray-400">{DisplayPriceInRupees(originalPrice)}</s>
                                <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium">
                                  {discountPercent}% OFF
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/*Remove Controls */}
                        <div className="mt-4 px-1">
                          <AddToCartButton data={item?.productId} />
                        </div>
                      </div>
                    );
                  })}
                </div>

              </>
            ) : (
              // Empty Cart View
              <div className="w-full h-full flex items-center justify-center">
              <div className="bg-white shadow-lg rounded-xl p-10 flex flex-col items-center justify-center w-[500px] h-[450px] text-center">
                <img
                  src={imageEmpty}
                  alt="Empty Cart"
                  className="w-40 h-40 object-contain mb-4"
                />
               <p className="text-lg font-semibold text-black-700 mb-2 animate-shake">Your cart is empty!</p>

                <p className="text-sm text-gray-500 mb-6">Looks like you haven’t added anything yet.</p>
                <Link
                  onClick={close}
                  to="/"
                  className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            
            

            
            )}
          </div>

          {/* Bill Details */}
          {cartItem.length > 0 && (
            <div className="w-1/3 pl-4 bg-white rounded-xl p-4 space-y-2 shadow">
              <h3 className="font-semibold text-base text-gray-800">Bill details</h3>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Items total</span>
                <span className="flex items-center gap-2">
                  <s className="text-gray-400">{DisplayPriceInRupees(notDiscountTotalPrice)}</s>
                  {DisplayPriceInRupees(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Quantity total</span>
                <span>{totalQty} item{totalQty > 1 && 's'}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Platform Charge</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-base font-bold text-black mt-2">
                <span>Grand total</span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </div>

              {/* Checkout Button */}
              <div className="p-4 border-t bg-white">
                <div className="bg-green-700 text-white px-4 py-3 rounded-lg flex justify-between items-center">
                  <span className="font-semibold">{DisplayPriceInRupees(totalPrice)}</span>
                  <button onClick={redirectToCheckoutPage} className="flex items-center gap-1 hover:underline">
                    Proceed <FaCaretRight />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default DisplayCartItem;
