
// import { createContext, useContext, useEffect, useState } from "react";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import { useDispatch, useSelector } from "react-redux";
// import { handleAddItemCart } from "../store/cartProduct";
// import AxiosToastError from "../utils/AxiosToastError";
// import toast from "react-hot-toast";
// import { pricewithDiscount } from "../utils/PriceWithDiscount";
// import CheckoutPopup from "../components/CheckoutPopup";
// import { handleAddAddress } from "../store/addressSlice";
// import { setOrder } from "../store/orderSlice";


// // 1. Define proper initial context shape
// const initialContext = {
//   fetchCartItem: async () => {},
//   deleteCartItem: async () => {},
//   fetchAddress: async () => {},
//   fetchOrder: async () => {},
//   totalPrice: 0,
//   totalQty: 0,
//   notDiscountTotalPrice: 0,
//   setShowCheckoutPopup: () => {}
// };

// // 2. Create context with defaults
// export const GlobalContext = createContext(initialContext);

// // 3. Add safety check to custom hook
// export const useGlobalContext = () => {
//   const context = useContext(GlobalContext);
//   if (context === undefined) {
//     throw new Error('useGlobalContext must be used within GlobalProvider');
//   }
//   return context;
// };

// const GlobalProvider = ({ children }) => {
//   const dispatch = useDispatch();
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalQty, setTotalQty] = useState(0);
//   const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
//   const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  
//   const cartItem = useSelector(state => state.cartItem.cart);
//   const user = useSelector(state => state?.user);

//   const fetchCartItem = async () => {
//     try {
//       const response = await Axios({ ...SummaryApi.getCartItem });
//       const { data: responseData } = response;

//       if (responseData.success) {
//         dispatch(handleAddItemCart(responseData.data));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteCartItem = async (cartId) => {
//     try {
//       const response = await Axios({
//         ...SummaryApi.deleteCartItem,
//         data: { _id: cartId }
//       });
//       const { data: responseData } = response;

//       if (responseData.success) {
//         toast.success(responseData.message);
//         fetchCartItem();
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   useEffect(() => {
//     const qty = cartItem.reduce((prev, curr) => prev + curr.remove, 0);
//     setTotalQty(qty);

//     const discounted = cartItem.reduce(
//       (prev, curr) =>
//         prev +
//         pricewithDiscount(curr?.productId?.price, curr?.productId?.discount) *
//           curr.remove,
//       0
//     );
//     setTotalPrice(discounted);

//     const original = cartItem.reduce(
//       (prev, curr) => prev + curr?.productId?.price * curr.remove,
//       0
//     );
//     setNotDiscountTotalPrice(original);
//   }, [cartItem]);

//   const handleLogoutOut = () => {
//     localStorage.clear();
//     dispatch(handleAddItemCart([]));
//   };

//   useEffect(() => {
//     fetchCartItem();
//     handleLogoutOut();
//   }, [user]);
//   const fetchAddress = async()=>{
//       try {
//         const response = await Axios({
//           ...SummaryApi.getAddress
//         })
//         const { data : responseData } = response

//         if(responseData.success){
//           dispatch(handleAddAddress(responseData.data))
//         }
//       } catch (error) {
//           // AxiosToastError(error)
//       }
//     }
//       const fetchOrder = async()=>{
//       try {
//         const response = await Axios({
//           ...SummaryApi.getOrderItems,
//         })
//         const { data : responseData } = response

//         if(responseData.success){
//             dispatch(setOrder(responseData.data))
//         }
//       } catch (error) {
//         console.log(error)
//       }
//     }

//   // 4. Ensure all values are defined in provider
//   const contextValue = {
//     fetchCartItem,
//     deleteCartItem,
//     totalPrice,
//      fetchAddress,
//       fetchOrder,
//     totalQty,
//     notDiscountTotalPrice,
//     setShowCheckoutPopup
//   };

//   return (
//     <GlobalContext.Provider value={contextValue}>
     
//       <CheckoutPopup 
//         show={showCheckoutPopup} 
//         onClose={() => setShowCheckoutPopup(false)} 
//       />
//        {children}
      
//     </GlobalContext.Provider>
//   );
// };

// export default GlobalProvider;



import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import CheckoutPopup from "../components/CheckoutPopup";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

// 1. Define proper initial context shape
const initialContext = {
  fetchCartItem: async () => {},
  deleteCartItem: async () => {},
  fetchAddress: async () => {},
  fetchOrder: async () => {},
  totalPrice: 0,
  totalQty: 0,
  notDiscountTotalPrice: 0,
  setShowCheckoutPopup: () => {}
};

// 2. Create context with defaults
export const GlobalContext = createContext(initialContext);

// 3. Add safety check to custom hook
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within GlobalProvider');
  }
  return context;
};

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  
  const cartItem = useSelector(state => state.cartItem.cart);
  const user = useSelector(state => state?.user);

  const fetchCartItem = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getCartItem });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: { _id: cartId }
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    const qty = cartItem.reduce((prev, curr) => prev + curr.quantity, 0);
    setTotalQty(qty);

    const discounted = cartItem.reduce(
      (prev, curr) =>
        prev +
        pricewithDiscount(curr?.productId?.price, curr?.productId?.discount) *
          curr.quantity,
      0
    );
    setTotalPrice(discounted);

    const original = cartItem.reduce(
      (prev, curr) => prev + curr?.productId?.price * curr.quantity,
      0
    );
    setNotDiscountTotalPrice(original);
  }, [cartItem]);

  const handleLogoutOut = () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
  };

  useEffect(() => {
    fetchCartItem();
    handleLogoutOut();
    fetchAddress();
    fetchOrder();
  }, [user]);

  const fetchAddress = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getAddress });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
      }
    } catch (error) {
      // AxiosToastError(error)
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getOrderItems });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setOrder(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    fetchCartItem,
    deleteCartItem,
    fetchAddress,
    fetchOrder,
    totalPrice,
    totalQty,
    notDiscountTotalPrice,
    setShowCheckoutPopup
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      <CheckoutPopup 
        show={showCheckoutPopup} 
        onClose={() => setShowCheckoutPopup(false)} 
      />
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
