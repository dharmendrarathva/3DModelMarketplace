import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/otpVerification";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import Address from "../pages/Address";
import Seller3DModel from "../pages/Seller3DModel";
import AdminPermision from "../layouts/AdminPermision";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../pages/CartMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Favourites from "../pages/Favourites";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";


//import Zip from "../components/Zip";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path :"search",
                element : <SearchPage/>
            },
            {
                path : 'login',
                element : <Login/>
            },
            {
                path : "register",
                element : <Register/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "verification-otp",
                element : <OtpVerification/>
            },
            {
                path : "user",
                element : <UserMenuMobile/>
            },
              {
                path : "dashboard",
                element : <Dashboard/>,
                children : [
                    {
                        path : "profile",
                        element : <Profile/>
                    },  {
                        path : "my-orders",
                        element : <MyOrders/>
                    }, 
                    

                    {
                        path : 'category',
                        element : <AdminPermision><CategoryPage/></AdminPermision>
                    },
                    {
                        path : "subcategory",
                        element : <AdminPermision><SubCategoryPage/></AdminPermision>
                    },
                    {
                        path : 'upload-product',
                        element :<AdminPermision><UploadProduct/></AdminPermision>
                    },
                    {
                        path : 'product',
                        element :  <AdminPermision><ProductAdmin/></AdminPermision>
                    },
                    {
                        path : "address",
                        element : <Address/>
                    },
                    {
                        path : "Seller3DModel",
                        element : <Seller3DModel/>
                    }
                    
                    
                ]
            },
            {
                path : ":category",
                children : [
                    {
                        path : ":subCategory",
                        element : <ProductListPage/>
                    }
                ]
            },
            {
                path : "product/:product",
                element : <ProductDisplayPage/>
            },
            {
                path : 'cart',
                element : <CartMobile/>
            },
            {
                path : "checkout",
                element : <CheckoutPage/>
            }
            ,
            {
                path : "Favourites",
                element : <Favourites/>
            },
             {
                path : "success",
                element : <Success/>
            },
            {
                path : 'cancel',
                element : <Cancel/>
            }
        ]
    } 
])

export default router