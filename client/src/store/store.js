import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice.js";
import cartReducer from './cartProduct'
import addressReducer from './addressSlice.js';
import orderReducer from './orderSlice.js';



export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartItem : cartReducer,
     addresses : addressReducer,
     orders : orderReducer
  },
});
