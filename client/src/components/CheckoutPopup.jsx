// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
// import "../componentcss/CheckoutPopup.css";

// const CheckoutPopup = ({ show, onClose }) => {
//   const navigate = useNavigate();
//   const cart = useSelector(state => state.cart);

//   if (!show) return null;

//   const handleCheckout = () => {
//     onClose();
//     navigate("/cart");
//   };

//   return (
//     <div className="CheckoutPopup-overlay">
//       <div className="CheckoutPopup-container">
//         <h2 className="CheckoutPopup-title">Item Added</h2>

//         {cart?.items?.length > 0 && (
//           <div className="CheckoutPopup-item">
//             <p className="CheckoutPopup-item-name">{cart.items[cart.items.length - 1].name}</p>
//             <p className="CheckoutPopup-item-price">
//               Price: {DisplayPriceInRupees(cart.items[cart.items.length - 1].price)}
//             </p>
//           </div>
//         )}

//         <p className="CheckoutPopup-message">Go to checkout to complete your purchase.</p>
//         <div className="CheckoutPopup-buttons">
//           <button className="CheckoutPopup-btn CheckoutPopup-btn-later" onClick={onClose}>
//             Later
//           </button>
//           <button className="CheckoutPopup-btn CheckoutPopup-btn-checkout" onClick={handleCheckout}>
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPopup;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
// import { pricewithDiscount } from "../utils/PriceWithDiscount";
// import "../componentcss/CheckoutPopup.css";
// import { FaShoppingBag } from "react-icons/fa";
// import { MdClose } from "react-icons/md";

// const CheckoutPopup = ({ show, onClose }) => {
//   const navigate = useNavigate();
//   const cartItem = useSelector((state) => state.cartItem.cart);
//   const { totalPrice = 0, totalQty = 0, notDiscountTotalPrice = 0 } = useSelector(state => state.cartItem) || {};

//   if (!show) return null;

//   const handleCheckout = () => {
//     onClose();
//     navigate("/cart");
//   };

//   // Get the last added item
//   const lastAddedItem = cartItem.length > 0 ? cartItem[cartItem.length - 1] : null;

//   return (
//     <div className="CheckoutPopup-overlay">
//       <div className="CheckoutPopup-container">
//         <div className="CheckoutPopup-header">
//           <h2 className="CheckoutPopup-title">
//             <FaShoppingBag className="CheckoutPopup-icon" /> 
//             Item Added to Cart
//           </h2>
//           <button className="CheckoutPopup-close" onClick={onClose}>
//             <MdClose />
//           </button>
//         </div>

//         {lastAddedItem && (
//           <div className="CheckoutPopup-item-details">
//             <div className="CheckoutPopup-item-image">
//               <img 
//                 src={lastAddedItem?.productId?.image[0] || imageEmpty} 
//                 alt={lastAddedItem?.productId?.name} 
//               />
//             </div>
//             <div className="CheckoutPopup-item-info">
//               <h3 className="CheckoutPopup-item-name">{lastAddedItem?.productId?.name}</h3>
//               <p className="CheckoutPopup-item-unit">{lastAddedItem?.productId?.unit}</p>
              
//               <div className="CheckoutPopup-item-pricing">
//                 <span className="CheckoutPopup-item-price">
//                   {DisplayPriceInRupees(
//                     pricewithDiscount(
//                       lastAddedItem?.productId?.price, 
//                       lastAddedItem?.productId?.discount || 0
//                     )
//                   )}
//                 </span>
//                 {lastAddedItem?.productId?.discount > 0 && (
//                   <>
//                     <span className="CheckoutPopup-item-original-price">
//                       <s>{DisplayPriceInRupees(lastAddedItem?.productId?.price)}</s>
//                     </span>
//                     <span className="CheckoutPopup-item-discount">
//                       {lastAddedItem?.productId?.discount}% OFF
//                     </span>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

       
//         <div className="CheckoutPopup-buttons">
//           <button 
//             className="CheckoutPopup-btn CheckoutPopup-btn-continue" 
//             onClick={onClose}
//           >
//             Continue Shopping
//           </button>
//           <button 
//             className="CheckoutPopup-btn CheckoutPopup-btn-checkout" 
//             onClick={handleCheckout}
//             disabled={cartItem.length === 0}
//           >
//             View Cart & Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPopup;



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
// import { pricewithDiscount } from "../utils/PriceWithDiscount";
// import "../componentcss/CheckoutPopup.css";
// import { FaCheckCircle } from "react-icons/fa";

// const CheckoutPopup = ({ show, onClose }) => {
//   const navigate = useNavigate();
//   const cartItem = useSelector((state) => state.cartItem.cart);
//   const { totalPrice = 0 } = useSelector(state => state.cartItem) || {};

//   if (!show) return null;

//   const handleCheckout = () => {
//     onClose();
//     navigate("/cart");
//   };

//   // Get the last added item
//   const lastAddedItem = cartItem.length > 0 ? cartItem[cartItem.length - 1] : null;

//   return (
//     <div className="CheckoutPopup-wrapper">
//       <div className="CheckoutPopup-container">
//         <div className="CheckoutPopup-header">
//           <FaCheckCircle className="CheckoutPopup-check-icon" />
//           <span>Item added to cart</span>
//         </div>

//         {lastAddedItem && (
//           <div className="CheckoutPopup-item-container">
//             <div className="CheckoutPopup-image-container">
//               <img 
//                 src={lastAddedItem?.productId?.image[0]} 
//                 alt={lastAddedItem?.productId?.name}
//                 className="CheckoutPopup-item-image"
//               />
//             </div>
//             <div className="CheckoutPopup-item-details">
//               <h3 className="CheckoutPopup-item-title">{lastAddedItem?.productId?.name}</h3>
//               <p className="CheckoutPopup-item-native">
//                 Native: {lastAddedItem?.productId?.software || '3ds Max'} | {lastAddedItem?.productId?.version || 'V-Ray'}
//               </p>
//               <p className="CheckoutPopup-item-formats">
//                 Formats: {lastAddedItem?.productId?.extension}
//               </p>
              
//               <div className="CheckoutPopup-price">
//                 {DisplayPriceInRupees(
//                   pricewithDiscount(
//                     lastAddedItem?.productId?.price, 
//                     lastAddedItem?.productId?.discount || 0
//                   )
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="CheckoutPopup-buttons">
//           <button 
//             className="CheckoutPopup-btn CheckoutPopup-btn-continue" 
//             onClick={onClose}
//           >
//             Continue Shopping
//           </button>
//           <button 
//             className="CheckoutPopup-btn CheckoutPopup-btn-checkout" 
//             onClick={handleCheckout}
//           >
//             View Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPopup;




import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import "../componentcss/CheckoutPopup.css";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

const CheckoutPopup = ({ show, onClose }) => {
  const navigate = useNavigate();
  const cartItem = useSelector((state) => state.cartItem.cart);

  if (!show) return null;

  const handleCheckout = () => {
    onClose();
    navigate("/cart");
  };

  // Get the last added item
  const lastAddedItem = cartItem.length > 0 ? cartItem[cartItem.length - 1] : null;

  return (
    <div className="CheckoutPopup-wrapper">
      <div className="CheckoutPopup-container">
        <div className="CheckoutPopup-top-row">
          <div className="CheckoutPopup-header">
            <FaCheckCircle className="CheckoutPopup-check-icon" />
            <span>Item added to cart</span>
          </div>
          <button className="CheckoutPopup-close-btn" onClick={onClose}>
            <FaTimes size={18} />
          </button>
        </div>

        {lastAddedItem && (
          <div className="CheckoutPopup-item-container">
            <div className="CheckoutPopup-image-container">
              <img 
                src={lastAddedItem?.productId?.image[0]} 
                alt={lastAddedItem?.productId?.name}
                className="CheckoutPopup-item-image"
              />
            </div>
            <div className="CheckoutPopup-item-details">
              <h3 className="CheckoutPopup-item-title">{lastAddedItem?.productId?.name}</h3>
             
              <p className="CheckoutPopup-item-formats">
                Formats: {lastAddedItem?.productId?.extension}
              </p>
              
              <div className="CheckoutPopup-price">
                {DisplayPriceInRupees(
                  pricewithDiscount(
                    lastAddedItem?.productId?.price, 
                    lastAddedItem?.productId?.discount || 0
                  )
                )}
              </div>
            </div>
          </div>
        )}

        <div className="CheckoutPopup-buttons">
          <button 
            className="CheckoutPopup-btn CheckoutPopup-btn-continue" 
            onClick={onClose}
          >
            Later
          </button>
          <button 
            className="CheckoutPopup-btn CheckoutPopup-btn-checkout" 
            onClick={handleCheckout}
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPopup;