import React, { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()
  const [isComingSoon, setIsComingSoon] = useState(false) // State to control "Coming Soon" message visibility
  const [isPageBlank, setIsPageBlank] = useState(false) // State to control page blanking

  const handleOnlinePayment = async () => {
    setIsPageBlank(true) // Set the page to be blank when the button is clicked
    setIsComingSoon(true) // Show the "Coming Soon" message
    setTimeout(() => setIsComingSoon(false), 3000) // Hide the message after 3 seconds (adjustable)
  }

  return (
    <section className={`min-h-screen py-10 ${isPageBlank ? 'bg-white flex justify-center items-start pt-10' : 'bg-gray-100'}`}>
 {isPageBlank ? (
  // Show the card with the message and animation
  <div
  onClick={() => navigate('/')}
  className="cursor-pointer max-w-3xl mx-auto p-10 bg-white shadow-lg rounded-xl flex flex-col justify-center items-center animate-pulse text-center"
>
  <h2 className="text-6xl font-bold text-green-600">
  Payment feature will be available soon!
  </h2>
  <h1 className="text-3xl mt-6 text-yellow-500">
    Currently Enjoy Free Models😊
  </h1>
</div>

) : (

        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Checkout Summary</h2>

            <div className="space-y-4">
              {/* Items Total */}
              <div className="flex justify-between items-center border-b pb-2">
                <p className="text-gray-600">Items Total</p>
                <p className="text-gray-800 flex items-center gap-2">
                  <span className="line-through text-sm text-gray-400">{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                  <span className="font-medium">{DisplayPriceInRupees(totalPrice)}</span>
                </p>
              </div>

              {/* Quantity */}
              <div className="flex justify-between items-center border-b pb-2">
                <p className="text-gray-600">Quantity</p>
                <p className="text-gray-800">{totalQty} item{totalQty > 1 ? 's' : ''}</p>
              </div>

              {/* Delivery */}
              <div className="flex justify-between items-center border-b pb-2">
                <p className="text-gray-600">Platform Charges</p>
                <p className="text-green-600 font-semibold">Free</p>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-center pt-4 text-lg font-semibold">
                <p className="text-gray-800">Grand Total</p>
                <p className="text-black-700">{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="mt-8 space-y-4">
              <button
                onClick={handleOnlinePayment}
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg text-center font-medium"
              >
                Pay Online
              </button>

              <div className="mt-6 text-center text-green-600">
                <p>After Payment Success, we will Provide bought models Download Access for the next 30 minutes.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default CheckoutPage
