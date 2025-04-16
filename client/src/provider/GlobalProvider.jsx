import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";

export const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [notDiscountTotalPrice,setNotDiscountTotalPrice] = useState(0)
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
        data: {
          _id: cartId
        }
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
    const qty = cartItem.reduce((preve, curr) => preve + curr.remove, 0);
    setTotalQty(qty);
  
    const tPrice = cartItem.reduce(
      (preve, curr) =>
        preve + pricewithDiscount(curr?.productId?.price, curr?.productId?.discount) * curr.remove,
      0
    );
    setTotalPrice(tPrice);
  
    const originalPrice = cartItem.reduce(
      (preve, curr) => preve + curr?.productId?.price * curr.remove,
      0
    );
    setNotDiscountTotalPrice(originalPrice);
  }, [cartItem]);
  
  const handleLogoutOut = () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
  };

  useEffect(() => {
    fetchCartItem();
    handleLogoutOut();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        deleteCartItem,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
