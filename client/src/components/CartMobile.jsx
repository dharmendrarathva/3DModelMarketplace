// import React from 'react';
// import { useGlobalContext } from '../provider/GlobalProvider';
// import { FaCartShopping } from 'react-icons/fa6';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import { Link } from 'react-router-dom';
// import { FaCaretRight } from "react-icons/fa";
// import { useSelector } from 'react-redux';

// const CartMobileLink = () => {
//   const { totalPrice, totalQty } = useGlobalContext();
//   const cartItem = useSelector(state => state.cartItem.cart);

//   return (
//     <>
//       {cartItem[0] && (
//         <div className='sticky bottom-4 p-2'>
//           <div className='bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm flex items-center justify-between gap-3 lg:hidden'>
//             <div className='flex items-center gap-2'>
//               <div className='p-2 bg-green-500 rounded w-fit'>
//                 <FaCartShopping />
//               </div>
//               <div className='text-xs'>
//                 <p>{totalQty} items</p>
//                 <p>{DisplayPriceInRupees(totalPrice)}</p>
//               </div>
//             </div>
//             <Link to={"/cart"} className='flex items-center gap-1'>
//               <span className='text-sm'>View Cart</span>
//               <FaCaretRight />
//             </Link>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CartMobileLink;


import React from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import { FaCartShopping } from 'react-icons/fa6';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { Link } from 'react-router-dom';
import { FaCaretRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import '../componentcss/CartMobileLink.css'; // Import CSS

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector(state => state.cartItem.cart);

  if (!cartItem[0]) return null;

  return (
    <div className="cart-mobile-container">
      <div className="cart-mobile-banner">
        <div className="cart-mobile-content">
          <div className="cart-icon-wrapper">
            <FaCartShopping />
          </div>
          <div className="cart-details">
            <p>{totalQty} items</p>
            <p>{DisplayPriceInRupees(totalPrice)}</p>
          </div>
        </div>
        <Link to="/cart" className="cart-link">
          <span>View Cart</span>
          <FaCaretRight />
        </Link>
      </div>
    </div>
  );
};

export default CartMobileLink;