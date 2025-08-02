// import React, { useEffect, useState } from 'react';
// import { FaTrashAlt } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import SummaryApi from '../common/SummaryApi';
// import Axios from '../utils/Axios';
// import AxiosToastError from '../utils/AxiosToastError';
// import { useGlobalContext } from '../provider/GlobalProvider';
// import Loading from './Loading';
// import { MdOutlineShoppingCart } from 'react-icons/md';
// import { IoFolderOpenOutline } from "react-icons/io5";


// const AddToCartButton = ({ data }) => {
//   const { fetchCartItem, deleteCartItem, setShowCheckoutPopup } = useGlobalContext();
//   const cartItem = useSelector(state => state.cartItem.cart);

//   const [isAvailableCart, setIsAvailableCart] = useState(false);
//   const [cartItemDetails, setCartItemDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [animateAdd, setAnimateAdd] = useState(false);
//   const [animateDelete, setAnimateDelete] = useState(false);

//  const handleAddToCart = async (e) => {
//   e.preventDefault();
//   e.stopPropagation();

//   try {
//     setLoading(true);
//     const response = await Axios({
//       ...SummaryApi.addTocart,
//       data: { productId: data?._id },
//     });

//     const { data: responseData } = response;
//     if (responseData.success) {
//       // Removed: toast.success(responseData.message);
//       fetchCartItem?.();
//       setAnimateAdd(true);
//       setShowCheckoutPopup(true); // Show checkout popup
//       setTimeout(() => setAnimateAdd(false), 1000);
//     }
//   } catch (error) {
//     AxiosToastError(error); // You can keep this to show error toast if needed
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleRemoveFromCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (cartItemDetails?._id) {
//       setLoading(true);
//       setAnimateDelete(true);

//       setTimeout(async () => {
//         await deleteCartItem(cartItemDetails._id);
//         setAnimateDelete(false);
//         setLoading(false);
//       }, 800);
//     }
//   };

//   useEffect(() => {
//     if (!data) return;
//     const item = cartItem?.find(item => item?.productId?._id === data?._id);
//     setIsAvailableCart(!!item);
//     setCartItemDetails(item || null);
//   }, [data, cartItem]);

//   return (
//     <div className="relative w-full max-w-[140px] flex items-center justify-center">

//       {/* Slide + Pop for Add */}
//       <AnimatePresence>
//         {animateAdd && (
//           <motion.div
//             key="slide-pop-add"
//             className="absolute -top-6 text-white z-25"
//             initial={{ y: 30, scale: 0.2, opacity: 0 }}
//             animate={{
//               y: [-10, -20, -10, 10],
//               scale: [0.2, 1.6, 1.2, 1],
//               opacity: [0, 1, 0.9, 0],
//             }}
//             transition={{ duration: 1, ease: 'easeOut' }}
//             exit={{ opacity: 0 }}
//           >
//             <IoFolderOpenOutline  size={24} />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Slide + Pop for Delete */}
//       <AnimatePresence>
//         {animateDelete && (
//           <motion.div
//             key="slide-pop-delete"
//             className="absolute -bottom-6 text-red-700 z-10"
//             initial={{ y: 30, scale: 0.4, opacity: 0 }}
//             animate={{
//               y: [0, -100, -300],
//               scale: [0.4, 2, 0.8],
//               opacity: [0, 1, 0],
//               rotate: [0, 20, -20],
//             }}
//             transition={{ duration: 1, ease: 'easeOut' }}
//             exit={{ opacity: 0 }}
//           >
//             <IoFolderOpenOutline  size={20} />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Button UI */}
//       {isAvailableCart ? (
//         <button
//           onClick={handleRemoveFromCart}
//           className="flex items-center justify-center px-3 py-2 rounded-full bg-neutral-800 text-white hover:bg-black transition duration-200"
//         >
//           {loading ? <Loading /> : <FaTrashAlt size={25} />}
//         </button>
//       ) : (
//         <button
//           onClick={handleAddToCart}
//           className="flex items-center justify-center px-3 py-2 rounded-full bg-neutral-800 text-white hover:bg-black transition duration-300"
//         >
//           {loading ? <Loading /> : <MdOutlineShoppingCart size={25} />}
//         </button>
//       )}
//     </div>
//   );
// };

// export default AddToCartButton;




import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';
import Loading from './Loading';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoFolderOpenOutline } from "react-icons/io5";
import '../componentcss/AddToCartButton.css';

const AddToCartButton = ({ data }) => {
  const { fetchCartItem, deleteCartItem, setShowCheckoutPopup } = useGlobalContext();
  const cartItem = useSelector(state => state.cartItem.cart);

  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [cartItemDetails, setCartItemDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [animateAdd, setAnimateAdd] = useState(false);
  const [animateDelete, setAnimateDelete] = useState(false);

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
        fetchCartItem?.();
        setAnimateAdd(true);
        setShowCheckoutPopup(true);
        setTimeout(() => setAnimateAdd(false), 1000);
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
      setLoading(true);
      setAnimateDelete(true);
      setTimeout(async () => {
        await deleteCartItem(cartItemDetails._id);
        setAnimateDelete(false);
        setLoading(false);
      }, 800);
    }
  };

  useEffect(() => {
    if (!data) return;
    const item = cartItem?.find(item => item?.productId?._id === data?._id);
    setIsAvailableCart(!!item);
    setCartItemDetails(item || null);
  }, [data, cartItem]);

  return (
    <div className="cart-btn">
      {/* Add Animation */}
      <AnimatePresence>
        {animateAdd && (
          <motion.div
            key="cart-btn__add-animation"
            className="cart-btn__add-animation"
            initial={{ y: 30, scale: 0.2, opacity: 0 }}
            animate={{
              y: [-10, -20, -10, 10],
              scale: [0.2, 1.6, 1.2, 1],
              opacity: [0, 1, 0.9, 0],
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
            exit={{ opacity: 0 }}
          >
            <IoFolderOpenOutline size={24} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Animation */}
      <AnimatePresence>
        {animateDelete && (
          <motion.div
            key="cart-btn__delete-animation"
            className="cart-btn__delete-animation"
            initial={{ y: 30, scale: 0.4, opacity: 0 }}
            animate={{
              y: [0, -100, -300],
              scale: [0.4, 2, 0.8],
              opacity: [0, 1, 0],
              rotate: [0, 20, -20],
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
            exit={{ opacity: 0 }}
          >
            <IoFolderOpenOutline size={20} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      {isAvailableCart ? (
        <button onClick={handleRemoveFromCart} className="cart-btn__button cart-btn__button--remove">
          {loading ? <Loading /> : <FaTrashAlt size={25} />}
        </button>
      ) : (
        <button onClick={handleAddToCart} className="cart-btn__button cart-btn__button--add">
          {loading ? <Loading /> : <MdOutlineShoppingCart size={25} />}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;


















// {/* Cart */}
//             <button
//               onClick={() => setOpenCartSection(true)}
//               className="flex items-center gap-2 bg-black hover:bg-gray-600 px-2 py-2 rounded text-white"
//             >
//               <div className="animate-bounce">
//                 <BsCart4 size={24} />
//               </div>
//               <div className="font-semibold text-sm">
//                 {cartItem[0] ? (
//                   <div>
//                     <p>{totalQty} Item</p>
//                     <p>{DisplayPriceInRupees(totalPrice)}</p>
//                   </div>
//                 ) : (
//                   <Link to={"/CartMobile"}></Link>
//                 )}
//               </div>
//             </button>