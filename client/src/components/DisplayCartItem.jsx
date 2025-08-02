// import React from 'react';
// import { IoClose } from 'react-icons/io5';
// import { Link, useNavigate } from 'react-router-dom';
// import { useGlobalContext } from '../provider/GlobalProvider';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import { FaCaretRight } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import AddToCartButton from './AddToCartButton';
// import { pricewithDiscount } from '../utils/PriceWithDiscount';
// import imageEmpty from '../assets/b1.png';
// import toast from 'react-hot-toast';
// import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
// import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';


// const DisplayCartItem = ({ close }) => {
//   const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  
//   const cartItem = useSelector((state) => state.cartItem.cart);
//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const redirectToCheckoutPage = () => {
//     if (user?._id) {
//       navigate('/checkout');
//       if (close) close();
//       return;
//     }
//     toast('Please Login');

    
//   };

//   return (
//     <section className="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center">
//       <div className="bg-black w-full h-full max-w-full flex flex-col overflow-auto">
//         {/* Header */}
//     <div className="flex items-center justify-between p-4 border-b shadow-sm bg-gray-800">
//   <h2 className="text-lg text-white font-semibold">My Cart</h2>
//   <button
//     onClick={close}
//     className="flex items-center gap-1 text-neutral-100 hover:text-blue-600 transition font-medium"
//   >
//     <FaAngleLeft className="text-lg" />
//     Back
//   </button>
// </div>



//         {/* Cart Content */}
//         <div className={`flex-1 overflow-y-auto bg-black/90 p-4 space-y-6 ${cartItem.length > 0 ? 'flex' : 'flex items-center justify-center'}`}>
//           {/* Product List */}
//           <div className="w-2/3 pr-4">
//             {cartItem.length > 0 ? (
//               <>
//                 {/* Total Savings */}
//                 <div className="flex justify-between items-center bg-blue-100 text-blue-600 rounded-full px-4 py-0.5 font-medium text-sm">
//                   <span>Total Savings</span>
//                   <span>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</span>
//                 </div>

//                 {/* Cart Items */}
//                 <div className="space-y-6">
//                   {cartItem.map((item) => {
//                     const originalPrice = item?.productId?.price;
//                     const discountPercent = item?.productId?.discount || 0;
//                     const discountedPrice = pricewithDiscount(originalPrice, discountPercent);

//                     return (
//                       <div key={item?._id + 'cartItemDisplay'} className="bg-[#1c1c1c] border  p-4 rounded-xl shadow-md">
//                         {/* Flex container for image and details */}
//                         <div className="flex items-center gap-6">
//                           {/* Image */}
//                           <div className="w-80 h-44 bg-gray-100 border rounded-lg overflow-hidden flex items-center justify-center">
//                           <Link
//   to={`/product/${item?.productId?.name?.split(" ").join("-")}-${item?.productId?._id}`}
//   onClick={close}   // close the cart drawer when user clicks
//   className="w-80 h-44 bg-gray-100 border rounded-lg overflow-hidden flex items-center justify-center"
// >
//   <img
//     src={item?.productId?.image[0] || imageEmpty}
//     alt={item?.productId?.name}
//     className="w-full h-full object-cover"
//   />
// </Link>
//                           </div>


//                           {/* Details */}
// <div className="text-sm flex-1 w-full  ">
//   {/* Name and Add Button on same line */}
//   <div className="flex justify-between items-start gap-2">
//     <p className="font-semibold text-gray-800 text-base">{item?.productId?.name}</p>
//     <AddToCartButton data={item?.productId} />
//   </div>
  
//   <p className="text-xs text-gray-500 mt-1">{item?.productId?.unit}</p>

//   <div className="mt-2">
//     <p className="text-black-600 font-semibold text-lg">
//       {DisplayPriceInRupees(discountedPrice)}
//     </p>
//     <div className="flex items-center gap-2 mt-1 text-sm">
//       <s className="text-gray-400">{DisplayPriceInRupees(originalPrice)}</s>
//       <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium">
//         {discountPercent}% OFF
//       </span>
//     </div>
//     <span className="text-neutral-700 text-xs mt-1 block">
//       SUPPORTED FORMATS <br />
//       {item?.productId?.extension}
//     </span>
//   </div>
// </div>

//                         </div>
                      
//                       </div>
//                     );
//                   })}
//                 </div>

//               </>
//             ) : (
//               // Empty Cart View
//               <div className="w-full h-full flex items-center justify-center">
//               <div className="bg-white shadow-lg rounded-xl p-10 flex flex-col items-center justify-center w-[500px] h-[450px] text-center">
//                 <img
//                   src={imageEmpty}
//                   alt="Empty Cart"
//                   className="w-40 h-40 object-contain mb-4"
//                 />
//                <p className="text-lg font-semibold text-black-700 mb-2 animate-shake">Your cart is empty!</p>

//                 <p className="text-sm text-gray-500 mb-6">Looks like you haven’t added anything yet.</p>
//                 <Link
//                   onClick={close}
//                   to="/"
//                   className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition"
//                 >
//                   Shop Now
//                 </Link>
//               </div>
//             </div>
            
            

            
//             )}
//           </div>

//           {/* Bill Details */}
//           {cartItem.length > 0 && (
//             <div className="w-1/3 pl-4 bg-white rounded-xl p-4 space-y-2 shadow">
//               <h3 className="font-semibold text-base text-gray-800">Bill details</h3>
//               <div className="flex justify-between text-sm text-gray-700">
//                 <span>Items total</span>
//                 <span className="flex items-center gap-2">
//                   <s className="text-gray-400">{DisplayPriceInRupees(notDiscountTotalPrice)}</s>
//                   {DisplayPriceInRupees(totalPrice)}
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm text-gray-700">
//                 <span>Quantity total</span>
//                 <span>{totalQty} item{totalQty > 1 && 's'}</span>
//               </div>
//               <div className="flex justify-between text-sm text-gray-700">
//                 <span>Platform Charge</span>
//                 <span className="text-green-600">Free</span>
//               </div>
//               <div className="flex justify-between text-base font-bold text-black mt-2">
//                 <span>Grand total</span>
//                 <span>{DisplayPriceInRupees(totalPrice)}</span>
//               </div>

//               {/* Checkout Button */}
//               <div className="p-4 border-t bg-white">
//                 <div className="bg-green-700 text-white px-4 py-3 rounded-lg flex justify-between items-center">
//                   <span className="font-semibold">{DisplayPriceInRupees(totalPrice)}</span>
//                   <button onClick={redirectToCheckoutPage} className="flex items-center gap-1 hover:underline">
//                     Proceed <FaCaretRight />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </section>
//   );
// };

// export default DisplayCartItem;



// import React from 'react';
// import { IoClose } from 'react-icons/io5';
// import { Link, useNavigate } from 'react-router-dom';
// import { useGlobalContext } from '../provider/GlobalProvider';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import { FaCaretRight } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import AddToCartButton from './AddToCartButton';
// import { pricewithDiscount } from '../utils/PriceWithDiscount';
// import imageEmpty from '../assets/b1.png';
// import toast from 'react-hot-toast';
// import { FaAngleLeft } from 'react-icons/fa6';

// const DisplayCartItem = ({ close }) => {
//   const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
//   const cartItem = useSelector((state) => state.cartItem.cart);
//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const redirectToCheckoutPage = () => {
//     if (user?._id) {
//       navigate('/checkout');
//       if (close) close();
//     } else {
//       toast('Please Login');
//     }
//   };

//   return (
//     <section className="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center">
//       <div className="bg-black w-full h-full max-w-full flex flex-col overflow-auto">
        
//         {/* Header */}
//         <div className="flex items-center justify-between p-4  shadow-sm bg-gray-900">
//           <h2 className="text-lg text-white font-semibold">My Cart</h2>
//           <button
//             onClick={close}
//             className="flex items-center gap-1 text-gray-300 hover:text-blue-500 transition font-medium"
//           >
//             <FaAngleLeft className="text-lg" />
//             Back
//           </button>
//         </div>

//         {/* Cart Content */}
//         <div className={`flex-1 overflow-y-auto p-4 space-y-6 ${cartItem.length > 0 ? 'flex' : 'flex items-center justify-center'}`}>
          
//           {/* Product List */}
//           <div className="w-2/3 pr-4">
//             {cartItem.length > 0 ? (
//               <>
//                 {/* Total Savings */}
//                 <div className="flex justify-between items-center bg-blue-900 text-blue-300 rounded-full px-4 py-1 font-medium text-sm">
//                   <span>Total Savings</span>
//                   <span>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</span>
//                 </div>

//                 {/* Cart Items */}
//                 <div className="space-y-6">
//                   {cartItem.map((item) => {
//                     const originalPrice = item?.productId?.price;
//                     const discountPercent = item?.productId?.discount || 0;
//                     const discountedPrice = pricewithDiscount(originalPrice, discountPercent);

//                     return (
//                       <div key={item?._id + 'cartItemDisplay'} className="bg-neutral-800 border border-gray-700 p-4 rounded-xl shadow-md">
//                         <div className="flex items-center gap-6">
//                           {/* Image */}
//                           <Link
//                             to={`/product/${item?.productId?.name?.split(" ").join("-")}-${item?.productId?._id}`}
//                             onClick={close}
//                             className="w-80 h-44 bg-gray-200  rounded-lg overflow-hidden flex items-center justify-center"
//                           >
//                             <img
//                               src={item?.productId?.image[0] || imageEmpty}
//                               alt={item?.productId?.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </Link>

//                           {/* Details */}
//                           <div className="text-sm flex-1 text-white">
//                             <div className="flex justify-between items-start gap-2">
//                               <p className="font-semibold text-white text-base">{item?.productId?.name}</p>
//                               <AddToCartButton data={item?.productId} />
//                             </div>
//                             <p className="text-xs text-gray-400 mt-1">{item?.productId?.unit}</p>

//                             <div className="mt-2">
//                               <p className="text-green-400 font-semibold text-lg">
//                                 {DisplayPriceInRupees(discountedPrice)}
//                               </p>
//                               <div className="flex items-center gap-2 mt-1 text-sm">
//                                 <s className="text-gray-500">{DisplayPriceInRupees(originalPrice)}</s>
//                                 <span className="bg-green-800 text-green-300 px-2 py-0.5 rounded-full text-xs font-medium">
//                                   {discountPercent}% OFF
//                                 </span>
//                               </div>
//                               <span className="text-gray-400 text-xs mt-1 block">
//                                 SUPPORTED FORMATS <br />
//                                 {item?.productId?.extension}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             ) : (
//               <div className="w-full h-full flex items-center justify-center">
//                 <div className="bg-gray-900 shadow-lg rounded-xl p-10 flex flex-col items-center justify-center w-[500px] h-[450px] text-center">
//                   <img
//                     src={imageEmpty}
//                     alt="Empty Cart"
//                     className="w-40 h-40 object-contain mb-4"
//                   />
//                   <p className="text-lg font-semibold text-white mb-2 animate-shake">Your cart is empty!</p>
//                   <p className="text-sm text-gray-400 mb-6">Looks like you haven’t added anything yet.</p>
//                   <Link
//                     onClick={close}
//                     to="/"
//                     className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition"
//                   >
//                     Shop Now
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Bill Details */}
//           {cartItem.length > 0 && (
//             <div className="w-1/3 pl-4 bg-gray-900 rounded-xl p-4 space-y-2 shadow border border-gray-700 text-white">
//               <h3 className="font-semibold text-base">Bill details</h3>
//               <div className="flex justify-between text-sm">
//                 <span>Items total</span>
//                 <span className="flex items-center gap-2">
//                   <s className="text-gray-500">{DisplayPriceInRupees(notDiscountTotalPrice)}</s>
//                   {DisplayPriceInRupees(totalPrice)}
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span>Quantity total</span>
//                 <span>{totalQty} item{totalQty > 1 && 's'}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span>Platform Charge</span>
//                 <span className="text-green-400">Free</span>
//               </div>
//               <div className="flex justify-between text-base font-bold mt-2">
//                 <span>Grand total</span>
//                 <span>{DisplayPriceInRupees(totalPrice)}</span>
//               </div>

//               {/* Checkout Button */}
//               <div className="p-4 border-t border-gray-700 bg-gray-900">
//                 <div className="bg-green-700 text-white px-4 py-3 rounded-lg flex justify-between items-center">
//                   <span className="font-semibold">{DisplayPriceInRupees(totalPrice)}</span>
//                   <button onClick={redirectToCheckoutPage} className="flex items-center gap-1 hover:underline">
//                     Proceed <FaCaretRight />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </section>
//   );
// };

// export default DisplayCartItem;





// import React from 'react';
// import { FaAngleLeft } from 'react-icons/fa6';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useGlobalContext } from '../provider/GlobalProvider';
// import AddToCartButton from './AddToCartButton';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import { pricewithDiscount } from '../utils/PriceWithDiscount';
// import imageEmpty from '../assets/b1.png';
// import { FaCaretRight, FaPaypal, FaGooglePay, FaCreditCard } from "react-icons/fa";
// import { SiPaytm } from "react-icons/si";
// import paypal from '../assets/payment-icons/Paypal.png';
// import gpay from '../assets/payment-icons/gpay.png';
// import debitCard from '../assets/payment-icons/debit-card.png';       
// import paytm from '../assets/payment-icons/paytm.png';
// import { MdOutlineRemoveShoppingCart } from "react-icons/md";



// const DisplayCartItem = ({ close }) => {
//   const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
//   const cartItem = useSelector((state) => state.cartItem.cart);
//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();



//   const handleBack = () => {
//     if (close) {
//       close();
//     } else {
//       navigate(-1);
//     }
//   };

//   const redirectToCheckoutPage = () => {
//     if (user?._id) {
//       if (close) close(); // Close cart overlay if needed
//       navigate('/checkout');
//     } else {
//       navigate('/login');
//     }
//   };

//   return (
//     <section className="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center">
//       <div className="bg-black w-full h-full max-w-full flex flex-col overflow-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between p-4 shadow-sm bg-gray-900">
//           <h2 className="text-lg text-white font-semibold">My Cart</h2>
//           <button
//             onClick={handleBack}
//             className="flex items-center gap-1 text-gray-300 hover:text-blue-500 transition font-medium"
//           >
//             <FaAngleLeft className="text-lg" />
//             Back
//           </button>
//         </div>

//         {/* Cart Content */}
//         <div className={`flex-1 overflow-y-auto p-4 space-y-6 ${cartItem.length > 0 ? 'flex' : 'flex items-center justify-center'}`}>

//           {/* Product List */}
//           <div className="w-2/3 pr-4">
//             {cartItem.length > 0 ? (
//               <>
//                 {/* Total Savings */}
//                 <div className="flex justify-between items-center bg-blue-900 text-blue-300 rounded-full px-4 py-1 font-medium text-sm">
//                   <span>Total Savings</span>
//                   <span>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</span>
//                 </div>

//                 {/* Cart Items */}
//                 <div className="space-y-6 mt-4 pb-6">
//                  {cartItem.map((item) => {
//   const originalPrice = item?.productId?.price;
//   const discountPercent = item?.productId?.discount || 0;
//   const discountedPrice = pricewithDiscount(originalPrice, discountPercent);

//   return (
//     <Link
//       key={item?._id + 'cartItemDisplay'}
//       to={`/product/${item?.productId?.name?.split(" ").join("-")}-${item?.productId?._id}`}
//       onClick={handleBack}
//       className="block bg-neutral-800 border border-gray-700 p-4 rounded-xl shadow-md"
//     >
//       <div className="flex items-center gap-6">
//         {/* Image */}
//         <div className="w-80 h-44 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
//           <img
//             src={item?.productId?.image[0] || imageEmpty}
//             alt={item?.productId?.name}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Details */}
//         <div className="text-sm flex-1 text-white">
//           <div className="flex justify-between items-start gap-2">
//             <p className="font-semibold text-white text-base">{item?.productId?.name}</p>
//             <AddToCartButton data={item?.productId} />
//           </div>
//           <p className="text-xs text-gray-400 mt-1">{item?.productId?.unit}</p>

//           <div className="mt-2">
//             <p className="text-green-400 font-semibold text-lg">
//               {DisplayPriceInRupees(discountedPrice)}
//             </p>
//             <div className="flex items-center gap-2 mt-1 text-sm">
//               <s className="text-gray-500">{DisplayPriceInRupees(originalPrice)}</s>
//               <span className="bg-green-800 text-green-300 px-2 py-0.5 rounded-full text-xs font-medium">
//                 {discountPercent}% OFF
//               </span>
//             </div>
//             <span className="text-gray-400 text-xs mt-1 block">
//               SUPPORTED FORMATS <br />
//               {item?.productId?.extension}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// })}

//                 </div>
//               </>
//             ) : (
//               <div className="w-full h-full flex items-center justify-center">
//                 <div className="bg-neutral-900 shadow-lg rounded-xl p-10 flex flex-col items-center justify-center w-[500px] h-[450px] text-center space-y-4  border border-gray-700">
//                <MdOutlineRemoveShoppingCart  className="w-40 h-40 text-neutral-300 mb-4 " />
//                   <p className="text-lg font-semibold text-white mb-2 animate-shake">Your cart is empty!</p>
//                   <p className="text-sm text-gray-400 mb-6">Looks like you haven’t added anything yet.</p>
//                   <Link
//                     onClick={handleBack}
//                     to="/"
//                     className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition"
//                   >
//                     Shop Now
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Bill Details */}

//  {cartItem.length > 0 && (
//         <div className="w-full md:w-1/3 pl-0 md:pl-4 bg-gray-900 rounded-xl p-4 space-y-4 shadow border border-gray-700 text-white">
//           <h3 className="font-semibold text-lg">Bill details</h3>

//           <div className="flex justify-between text-sm">
//             <span>Items total</span>
//             <span className="flex items-center gap-2">
//               <s className="text-gray-500">{DisplayPriceInRupees(notDiscountTotalPrice)}</s>
//               {DisplayPriceInRupees(totalPrice)}
//             </span>
//           </div>

//           <div className="flex justify-between text-sm">
//             <span>Quantity total</span>
//             <span>{totalQty} item{totalQty > 1 && 's'}</span>
//           </div>

//           <div className="flex justify-between text-sm">
//             <span>Platform Charge</span>
//             <span className="text-green-400">Free</span>
//           </div>

//           <div className="flex justify-between text-base font-bold mt-2">
//             <span>Grand total</span>
//             <span>{DisplayPriceInRupees(totalPrice)}</span>
//           </div>

//           {/* Checkout Button */}
//           <div className="p-4 border-t border-gray-700 bg-gray-900">
//             <div className="bg-green-700 text-white px-4 py-3 rounded-lg flex justify-between items-center">
//               <span className="font-semibold">{DisplayPriceInRupees(totalPrice)}</span>
//               <button onClick={redirectToCheckoutPage} className="flex items-center gap-1 hover:underline">
//                 Proceed <FaCaretRight />
//               </button>
//             </div>
//           </div>

//         {/* Accepted Payment Methods */}
// <div className="mt-10">
//   <p className="text-center text-lg text-white font-semibold mb-5">Accepted Payment</p>
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    
//     {/* Payment Method Card */}
//     {[
//       { name: "PayPal", src: paypal },
//       { name: "Google Pay", src: gpay },
//       { name: "Paytm", src: paytm },
//       { name: "Debit Card", src: debitCard },
//     ].map((method, idx) => (
//       <div
//         key={idx}
//         className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 transition rounded-xl shadow-md"
//       >
//         <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
//           <img
//             src={method.src}
//             alt={method.name}
//             className="w-10 h-10 object-contain"
//           />
//         </div>
//         <span className="text-white font-medium text-base">{method.name}</span>
//       </div>
      
//     ))}
//   </div>
// {/* Bottom Notice */}
//   <p className="mt-6 text-center text-sm text-gray-400">
//    <span className="italic">Before purchasing, Check Your License  </span>
// <a  className="text-blue-400 hover:underline font-medium">
//   Terms and Conditions
// </a>

//     .
//   </p>

// </div>


//         </div>
//       )}

//         </div>
//       </div>
      
//     </section>
    
//   );
// };

// export default DisplayCartItem;



// import React from 'react';
// import { FaAngleLeft } from 'react-icons/fa6';
// import { Link, useNavigate} from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useGlobalContext } from '../provider/GlobalProvider';
// import AddToCartButton from './AddToCartButton';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import { pricewithDiscount } from '../utils/PriceWithDiscount';
// import imageEmpty from '../assets/b1.png';
// import { FaCaretRight} from "react-icons/fa";
// import paypal from '../assets/payment-icons/Paypal.png';
// import gpay from '../assets/payment-icons/gpay.png';
// import debitCard from '../assets/payment-icons/debit-card.png';       
// import paytm from '../assets/payment-icons/paytm.png';
// import { MdOutlineShoppingCart } from 'react-icons/md';



// const DisplayCartItem = ({ close }) => {
//   const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
//   const cartItem = useSelector((state) => state.cartItem.cart);
//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();



//   const handleBack = () => {
//     if (close) {
//       close();
//     } else {
//       navigate(-1);
//     }
//   };

//   const redirectToCheckoutPage = () => {
//     if (user?._id) {
//       if (close) close();
//       navigate('/checkout');
//     } else {
//       navigate('/login');
//     }
//   };

//   return (
//     <section className="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center">
// <div className="bg-black w-full h-screen flex flex-col">
        
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 shadow-sm bg-gray-900">
//           <h2 className="text-lg text-white font-semibold">My Cart</h2>
//           <button
//             onClick={handleBack}
//             className="flex items-center gap-1 text-gray-300 hover:text-blue-500 transition font-medium"
//           >
//             <FaAngleLeft className="text-lg" />
//             Back
//           </button>
//         </div>

//         {/* Cart Content */}
//         <div className="flex-1 p-4 space-y-6 flex">

//           {/* Product List - Scrollable */}
//           <div className="w-full   pr-4 h-[calc(100vh-80px)] overflow-y-auto scroll-smooth hide-scrollbar">
//             {cartItem.length > 0 ? (
//               <>
//                 <div className="flex justify-between items-center bg-blue-900 text-blue-300 rounded-full px-4 py-1 font-medium text-sm">
//                   <span>Total Savings</span>
//                   <span>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</span>
//                 </div>

//                 <div className="space-y-6 mt-4 pb-6">
//                   {cartItem.map((item) => {
//                     const originalPrice = item?.productId?.price;
//                     const discountPercent = item?.productId?.discount || 0;
//                     const discountedPrice = pricewithDiscount(originalPrice, discountPercent);

//                     return (
//                       <Link
//                         key={item?._id + 'cartItemDisplay'}
//                         to={`/product/${item?.productId?.name?.split(" ").join("-")}-${item?.productId?._id}`}
//                         onClick={handleBack}
//                         className="block bg-neutral-800 border border-gray-700 p-4 rounded-xl shadow-md"
//                       >
//                         <div className="flex items-center gap-6">
//                           <div className="w-80 h-44 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
//                             <img
//                               src={item?.productId?.image[0] || imageEmpty}
//                               alt={item?.productId?.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <div className="text-sm flex-1 text-white">
//                             <div className="flex justify-between items-start gap-2">
//                               <p className="font-semibold text-white text-base">{item?.productId?.name}</p>
//                               <AddToCartButton data={item?.productId} />
//                             </div>
//                             <p className="text-xs text-gray-400 mt-1">{item?.productId?.unit}</p>
//                             <div className="mt-2">
//                               <p className="text-green-400 font-semibold text-lg">
//                                 {DisplayPriceInRupees(discountedPrice)}
//                               </p>
//                               <div className="flex items-center gap-2 mt-1 text-sm">
//                                 <s className="text-gray-500">{DisplayPriceInRupees(originalPrice)}</s>
//                                 <span className="bg-green-800 text-green-300 px-2 py-0.5 rounded-full text-xs font-medium">
//                                   {discountPercent}% OFF
//                                 </span>
//                               </div>
//                               <span className="text-gray-400 text-xs mt-1 block">
//                                 SUPPORTED FORMATS <br />
//                                 {item?.productId?.extension}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </>
//             ) : (
// <div className="flex flex-1 items-center justify-center">
//   <div className="relative w-full max-w-[1000px] h-[690px] bg-neutral-900 shadow-2xl rounded-xl p-10 flex flex-col items-center justify-center text-center space-y-4 border border-gray-700 overflow-hidden animate-bounceInCartoon">

//     {/* Sea Container wrapping all */}
//     <div className="seaContainer">

//       {/* Submarine Animation */}
//       <div className="submarine__container">
//         <div className="light"></div>
//         <div className="submarine__periscope"></div>
//         <div className="submarine__periscope-glass"></div>
//         <div className="submarine__sail">
//           <div className="submarine__sail-shadow dark1"></div>
//           <div className="submarine__sail-shadow light1"></div>
//           <div className="submarine__sail-shadow dark2"></div>
//         </div>
//         <div className="submarine__body">
//           <div className="submarine__window one"></div>
//           <div className="submarine__window two"></div>
//           <div className="submarine__shadow-dark"></div>
//           <div className="submarine__shadow-light"></div>
//           <div className="submarine__shadow-arcLight"></div>
//         </div>
//         <div className="submarine__propeller">
//           <div className="propeller__perspective">
//             <div className="submarine__propeller-parts darkOne"></div>
//             <div className="submarine__propeller-parts lightOne"></div>
//           </div>        
//         </div>
//       </div>

//       {/* Bubbles */}
//       <div className="bubbles__container">
//         <span className="bubbles bubble-1"></span>
//         <span className="bubbles bubble-2"></span>
//         <span className="bubbles bubble-3"></span>
//         <span className="bubbles bubble-4"></span>
//       </div>

//       {/* Ground */}
//       <div className="ground__container">
//         <div className="ground ground1">
//           {[...Array(10)].map((_, i) => (
//             <span key={i} className={`up-${i + 1}`}></span>
//           ))}
//         </div>
//         <div className="ground ground2">
//           {[...Array(20)].map((_, i) => (
//             <span key={i} className={`up-${i + 1}`}></span>
//           ))}
//         </div>
//       </div>

//       {/* Text + Button Container */}

//       {/* Empty Cart Text & Button */}
//       <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-6">
//         <p className="text-xl font-bold text-white">Oops! Your cart is empty!</p>
//         <Link
//   onClick={handleBack}
//   to="/"
//   className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition"
// >
//   <MdOutlineShoppingCart className="text-lg" />
//   Shop Now
// </Link>

//       </div>




//     </div>
//   </div>
// </div>


//             )}
//           </div>

//           {/* Bill Details - Fixed Section */}
//           {cartItem.length > 0 && (
//             <div className="w-full md:w-1/3 sticky top-0 self-start bg-gray-900 rounded-xl p-4 space-y-4 shadow border border-gray-700 text-white h-fit">
//               <h3 className="font-semibold text-lg">Bill details</h3>

//               <div className="flex justify-between text-sm">
//                 <span>Items total</span>
//                 <span className="flex items-center gap-2">
//                   <s className="text-gray-500">{DisplayPriceInRupees(notDiscountTotalPrice)}</s>
//                   {DisplayPriceInRupees(totalPrice)}
//                 </span>
//               </div>

//               <div className="flex justify-between text-sm">
//                 <span>Quantity total</span>
//                 <span>{totalQty} item{totalQty > 1 && 's'}</span>
//               </div>

//               <div className="flex justify-between text-sm">
//                 <span>Platform Charge</span>
//                 <span className="text-green-400">Free</span>
//               </div>

//               <div className="flex justify-between text-base font-bold mt-2">
//                 <span>Grand total</span>
//                 <span>{DisplayPriceInRupees(totalPrice)}</span>
//               </div>
                
// <div className="animate-flickerSmooth bg-gradient-to-r from-gray-900 via-slate-700 to-gray-900 rounded-b-2xl shadow-inner p-4 border-t border-white/50">

//                 <div className="bg-green-700 text-white px-4 py-3 rounded-lg flex justify-between items-center">
//                   <span className="font-semibold">{DisplayPriceInRupees(totalPrice)}</span>
//                   <button onClick={redirectToCheckoutPage} className="flex items-center gap-1 hover:underline">
//                     Proceed <FaCaretRight />
//                   </button>
//                 </div>
//               </div>

//               <div className="mt-10">
//                 <p className="text-center text-lg text-white font-semibold mb-5">Accepted Payment</p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {[{ name: "PayPal", src: paypal }, { name: "G Pay", src: gpay }, { name: "Paytm", src: paytm }, { name: "Debit", src: debitCard }].map((method, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 transition rounded-xl shadow-md"
//                     >
//                       <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
//                         <img
//                           src={method.src}
//                           alt={method.name}
//                           className="w-10 h-10 object-contain"
//                         />
//                       </div>
//                       <span className="text-white font-medium text-base">{method.name}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <p className="mt-6 text-center text-sm text-gray-400">
//                   <span className="italic">Before purchasing, Check Your License </span>
//                   <a className="text-blue-400 hover:underline font-medium">Terms and Conditions</a>.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DisplayCartItem;




// import React from 'react';
// import { FaAngleLeft, FaCaretRight } from 'react-icons/fa6';
// import { MdOutlineShoppingCart } from 'react-icons/md';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useGlobalContext } from '../provider/GlobalProvider';
// import AddToCartButton from './AddToCartButton';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import { pricewithDiscount } from '../utils/PriceWithDiscount';
// import imageEmpty from '../assets/b1.png';
// import paypal from '../assets/payment-icons/Paypal.png';
// import gpay from '../assets/payment-icons/gpay.png';
// import debitCard from '../assets/payment-icons/debit-card.png';
// import paytm from '../assets/payment-icons/paytm.png';
// import '../Componentcss/DisplayCartItem.css';

// const DisplayCartItem = ({ close }) => {
//   const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
//   const cartItem = useSelector((state) => state.cartItem.cart);
//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const handleBack = () => {
//     close ? close() : navigate(-1);
//   };

//   const redirectToCheckoutPage = () => {
//     if (user?._id) {
//       if (close) close();
//       navigate('/checkout');
//     } else {
//       navigate('/login');
//     }
//   };

//   return (
//     <section className="cart-overlay">
//       <div className="cart-container">
//         {/* Header */}
//       <div className="cart-header">
//   <button className="back-btn" onClick={handleBack}>
//     <FaAngleLeft /> Back
//   </button>
//   <h2>Shopping Cart</h2>
//   <div></div> {/* empty right column to balance */}
// </div>

//         {/* Content */}
//         <div className="cart-content">
//           {/* Left: Items */}
//           <div className="cart-items">
//             {cartItem.length > 0 ? (
//               <>
//                 <div className="savings-box">
//                   <span>Total Savings</span>
//                   <span>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</span>
//                 </div>

//                 <div className="cart-products">
//                   {cartItem.map((item) => {
//                     const originalPrice = item?.productId?.price;
//                     const discount = item?.productId?.discount || 0;
//                     const discounted = pricewithDiscount(originalPrice, discount);

//                     return (
//                      <Link
//   key={item?._id}
//   to={`/product/${item?.productId?.name?.split(" ").join("-")}-${item?.productId?._id}`}
//   onClick={handleBack}
//   className="product-card relative"
// >

//                         <div className="product-inner">
//                           <div className="product-img">
//                             <img
//                               src={item?.productId?.image[0] || imageEmpty}
//                               alt={item?.productId?.name}
//                             />
//                           </div>
//                           <div className="product-details">
//                            <div className="product-name">
//   <p>{item?.productId?.name}</p>
// </div>
// <div className="remove-btn-container">
//   <AddToCartButton data={item?.productId} />
// </div>

//                             <p className="unit">{item?.productId?.unit}</p>
//                             <div className="mt-2">
//                               <p className="price-discounted">
//                                 {DisplayPriceInRupees(discounted)}
//                               </p>
//                               <div className="price-original">
//                                 <s>{DisplayPriceInRupees(originalPrice)}</s>
//                                 <span>{discount}% OFF</span>
//                               </div>
//                               <span className="formats">
//                                 SUPPORTED FORMATS <br />
//                                 {item?.productId?.extension}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </>
//             ) : (
//               <div className="empty-cart-container">
//                 <div className="seaContainer">
//                   <div className="submarine__container">
//                     <div className="light"></div>
//                     <div className="submarine__periscope"></div>
//                     <div className="submarine__periscope-glass"></div>
//                     <div className="submarine__sail">
//                       <div className="submarine__sail-shadow dark1"></div>
//                       <div className="submarine__sail-shadow light1"></div>
//                       <div className="submarine__sail-shadow dark2"></div>
//                     </div>
//                     <div className="submarine__body">
//                       <div className="submarine__window one"></div>
//                       <div className="submarine__window two"></div>
//                       <div className="submarine__shadow-dark"></div>
//                       <div className="submarine__shadow-light"></div>
//                       <div className="submarine__shadow-arcLight"></div>
//                     </div>
//                     <div className="submarine__propeller">
//                       <div className="propeller__perspective">
//                         <div className="submarine__propeller-parts darkOne"></div>
//                         <div className="submarine__propeller-parts lightOne"></div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="bubbles__container">
//                     {[1, 2, 3, 4].map((b) => (
//                       <span className={`bubbles bubble-${b}`} key={b}></span>
//                     ))}
//                   </div>
//                   <div className="ground__container">
//                     {[1, 2].map((g, i) => (
//                       <div className={`ground ground${g}`} key={i}>
//                         {[...Array(g === 1 ? 10 : 20)].map((_, i) => (
//                           <span key={i} className={`up-${i + 1}`}></span>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                   <div className="empty-message">
//                     <p>Oops! Your cart is empty!</p>
//                     <Link onClick={handleBack} to="/" className="shop-now-btn">
//                       <MdOutlineShoppingCart /> Shop Now
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right: Summary */}
//           {cartItem.length > 0 && (
//            <div className="bill-summary">
//   <h3>Bill details</h3>

//   <div className="summary-row">
//     <span>Items total</span>
//     <span>
//       <s className="original-price">{DisplayPriceInRupees(notDiscountTotalPrice)}</s>
//       {DisplayPriceInRupees(totalPrice)}
//     </span>
//   </div>

//   <div className="summary-row">
//     <span>Quantity total</span>
//     <span>{totalQty} item{totalQty > 1 && 's'}</span>
//   </div>

//   <div className="summary-row">
//     <span>Platform Charge</span>
//     <span className="platform-free">Free</span>
//   </div>

//   <div className="summary-total">
//     <span>Grand total</span>
//     <span>{DisplayPriceInRupees(totalPrice)}</span>
//   </div>


//   <div className="checkout-bar">
//     <div className="checkout-action">
//       <span>{DisplayPriceInRupees(totalPrice)}</span>
// <button className="proceed-btn" onClick={redirectToCheckoutPage}>
//   Proceed <FaCaretRight className="proceed-icon" />
// </button>
//     </div>  
//   </div>

//   <div className="payment-options">
//     <h4>Accepted Payment</h4>
//     <div className="payment-grid">
//       <div className="payment-method"><div className="payment-icon"><img src={paypal} alt="PayPal" /></div> PayPal</div>
//       <div className="payment-method"><div className="payment-icon"><img src={gpay} alt="GPay" /></div> G Pay</div>
//       <div className="payment-method"><div className="payment-icon"><img src={paytm} alt="Paytm" /></div> Paytm</div>
//       <div className="payment-method"><div className="payment-icon"><img src={debitCard} alt="Debit" /></div> Debit</div>
//     </div>
//   </div>

//   <p className="terms">
//     Before purchasing, <span>Check Your License <a href="#">Terms and Conditions</a></span>.
//   </p>
// </div>

//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DisplayCartItem;

import React from 'react';
import { FaAngleLeft, FaCaretRight } from 'react-icons/fa6';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGlobalContext } from '../provider/GlobalProvider';
import AddToCartButton from './AddToCartButton';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import imageEmpty from '../assets/b1.png';
import paypal from '../assets/payment-icons/Paypal.png';
import gpay from '../assets/payment-icons/gpay.png';
import debitCard from '../assets/payment-icons/debit-card.png';
import paytm from '../assets/payment-icons/paytm.png';
import '../Componentcss/DisplayCartItem.css';

const DisplayCartItem = ({ close }) => {
  const { 
    notDiscountTotalPrice = 0, 
    totalPrice = 0, 
    totalQty = 0 
  } = useGlobalContext() || {};

  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (totalPrice === null) {
    return <div className="DisplayCartItem-loading-spinner">Loading cart...</div>;
  }

  const handleBack = () => {
    close ? close() : navigate(-1);
  };

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      if (close) close();
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="DisplayCartItem-overlay">
      <div className="DisplayCartItem-container">
        {/* Header */}
        <div className="DisplayCartItem-header">
          <button className="DisplayCartItem-back-btn" onClick={handleBack}>
            <FaAngleLeft /> Back
          </button>
          <h2>Shopping Cart</h2>
          <div></div>
        </div>

        {/* Content */}
        <div className="DisplayCartItem-content">
          {/* Left: Items */}
          <div className="DisplayCartItem-items">
            {cartItem.length > 0 ? (
              <>
                <div className="DisplayCartItem-savings-box">
                  <span>Total Savings</span>
                  <span>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</span>
                </div>

                <div className="DisplayCartItem-products">
                  {cartItem.map((item) => {
                    const originalPrice = item?.productId?.price;
                    const discount = item?.productId?.discount || 0;
                    const discounted = pricewithDiscount(originalPrice, discount);

                    return (
                      <Link
                        key={item?._id}
                        to={`/product/${item?.productId?.name?.split(" ").join("-")}-${item?.productId?._id}`}
                        onClick={handleBack}
                        className="DisplayCartItem-product-card"
                      >
                        <div className="DisplayCartItem-product-inner">
                          <div className="DisplayCartItem-product-img">
                            <img
                              src={item?.productId?.image[0] || imageEmpty}
                              alt={item?.productId?.name}
                            />
                          </div>
                          <div className="DisplayCartItem-product-details">
                            <div className="DisplayCartItem-product-name">
                              <p>{item?.productId?.name}</p>
                            </div>
                            <div className="DisplayCartItem-remove-btn-container">
                              <AddToCartButton data={item?.productId} />
                            </div>
                            <p className="DisplayCartItem-unit">{item?.productId?.unit}</p>
                            <div className="DisplayCartItem-mt-2">
                              <p className="DisplayCartItem-price-discounted">
                                {DisplayPriceInRupees(discounted)}
                              </p>
                              <div className="DisplayCartItem-price-original">
                                <s>{DisplayPriceInRupees(originalPrice)}</s>
                                <span>{discount}% OFF</span>
                              </div>
                              <span className="DisplayCartItem-formats">
                                SUPPORTED FORMATS <br />
                                {item?.productId?.extension}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="DisplayCartItem-empty-container">
                <div className="DisplayCartItem-seaContainer">
                  <div className="DisplayCartItem-submarine__container">
                    <div className="DisplayCartItem-light"></div>
                    <div className="DisplayCartItem-submarine__periscope"></div>
                    <div className="DisplayCartItem-submarine__periscope-glass"></div>
                    <div className="DisplayCartItem-submarine__sail">
                      <div className="DisplayCartItem-submarine__sail-shadow DisplayCartItem-dark1"></div>
                      <div className="DisplayCartItem-submarine__sail-shadow DisplayCartItem-light1"></div>
                      <div className="DisplayCartItem-submarine__sail-shadow DisplayCartItem-dark2"></div>
                    </div>
                    <div className="DisplayCartItem-submarine__body">
                      <div className="DisplayCartItem-submarine__window DisplayCartItem-one"></div>
                      <div className="DisplayCartItem-submarine__window DisplayCartItem-two"></div>
                      <div className="DisplayCartItem-submarine__shadow-dark"></div>
                      <div className="DisplayCartItem-submarine__shadow-light"></div>
                      <div className="DisplayCartItem-submarine__shadow-arcLight"></div>
                    </div>
                    <div className="DisplayCartItem-submarine__propeller">
                      <div className="DisplayCartItem-propeller__perspective">
                        <div className="DisplayCartItem-submarine__propeller-parts DisplayCartItem-darkOne"></div>
                        <div className="DisplayCartItem-submarine__propeller-parts DisplayCartItem-lightOne"></div>
                      </div>
                    </div>
                  </div>
                  <div className="DisplayCartItem-bubbles__container">
                    {[1, 2, 3, 4].map((b) => (
                      <span className={`DisplayCartItem-bubbles DisplayCartItem-bubble-${b}`} key={b}></span>
                    ))}
                  </div>
                  <div className="DisplayCartItem-ground__container">
                    {[1, 2].map((g, i) => (
                      <div className={`DisplayCartItem-ground DisplayCartItem-ground${g}`} key={i}>
                        {[...Array(g === 1 ? 10 : 20)].map((_, i) => (
                          <span key={i} className={`DisplayCartItem-up-${i + 1}`}></span>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="DisplayCartItem-empty-message">
                    <p>Oops! Your cart is empty!</p>
                    <Link onClick={handleBack} to="/" className="DisplayCartItem-shop-now-btn">
                      <MdOutlineShoppingCart /> Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Summary */}
          {cartItem.length > 0 && (
            <div className="DisplayCartItem-summary">
              <h3>Bill details</h3>

              <div className="DisplayCartItem-summary-row">
                <span>Items total</span>
                <span>
                  <s className="DisplayCartItem-original-price">{DisplayPriceInRupees(notDiscountTotalPrice)}</s>
                  {DisplayPriceInRupees(totalPrice)}
                </span>
              </div>

              <div className="DisplayCartItem-summary-row">
                <span>Quantity total</span>
                <span>{totalQty} item{totalQty > 1 && 's'}</span>
              </div>

              <div className="DisplayCartItem-summary-row">
                <span>Platform Charge</span>
                <span className="DisplayCartItem-platform-free">Free</span>
              </div>

              <div className="DisplayCartItem-summary-total">
                <span>Grand total</span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </div>

              <div className="DisplayCartItem-checkout-bar">
                <div className="DisplayCartItem-checkout-action">
                  <span>{DisplayPriceInRupees(totalPrice)}</span>
                  <button className="DisplayCartItem-proceed-btn" onClick={redirectToCheckoutPage}>
                    Proceed <FaCaretRight className="DisplayCartItem-proceed-icon" />
                  </button>
                </div>  
              </div>

              <div className="DisplayCartItem-payment-options">
                <h4>Accepted Payment</h4>
                <div className="DisplayCartItem-payment-grid">
                  <div className="DisplayCartItem-payment-method"><div className="DisplayCartItem-payment-icon"><img src={paypal} alt="PayPal" /></div> PayPal</div>
                  <div className="DisplayCartItem-payment-method"><div className="DisplayCartItem-payment-icon"><img src={gpay} alt="GPay" /></div> G Pay</div>
                  <div className="DisplayCartItem-payment-method"><div className="DisplayCartItem-payment-icon"><img src={paytm} alt="Paytm" /></div> Paytm</div>
                  <div className="DisplayCartItem-payment-method"><div className="DisplayCartItem-payment-icon"><img src={debitCard} alt="Debit" /></div> Debit</div>
                </div>
              </div>

              <p className="DisplayCartItem-terms">
                Before purchasing, <span>Check Your License <a href="#">Terms and Conditions</a></span>.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DisplayCartItem;