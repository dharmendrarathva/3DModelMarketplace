import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import { useEffect } from 'react';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import { setAllCategory,setAllSubCategory,setLoadingCategory } from './store/productSlice';
import UploadSubCategoryModel from './components/UploadsubCategoryModel';
import { useLocation } from 'react-router-dom';
//import { handleAddItemCart } from './store/cartProduct'
import GlobalProvider, { useGlobalContext } from './provider/GlobalProvider';
import CartMobileLink from './components/CartMobile';



function App() {
  
  const dispatch = useDispatch()

  //const location = useLocation()

  const fetchUser = async()=>{  
    const userData = await fetchUserDetails()
   //console.log("userData",userData)
    dispatch(setUserDetails(userData.data))
  }

  
  const fetchCategory = async()=>{
    try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
            ...SummaryApi.getCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllCategory(responseData.data)) 
        //   console.log("category",responseData.data)
           
        }
    } catch (error) {
        
    }finally{
      dispatch(setLoadingCategory(false))
    }
  }

  

    const fetchSubCategory = async()=>{
      try {
          const response = await Axios({
              ...SummaryApi.getSubCategory
          })
          const { data : responseData } = response
  
          if(responseData.success){
             dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
          }
      } catch (error) {
          
      }finally{
      }
    }


    // const fetchCartItem = async()=>{
    //   try {
    //       const response = await Axios({
    //           ...SummaryApi.getCartItem
    //       })
    //       const { data : responseData } = response
  
    //       if(responseData.success){
    //          dispatch(handleAddItemCart(responseData.data))
    //          console.log(responseData)
    //       }
    //   } catch (error) {
    //       console.log(error)
    //   }finally{
    //   }
    // }


useEffect(()=>{
  fetchUser()
  fetchCategory()
  fetchSubCategory()
 //  fetchCartItem()
},[])


  return (
    <GlobalProvider>
    <Header/>
    <main className='min-h-[78vh]'>
      <Outlet/>
    </main>
    <Footer/>
      <Toaster />
      <Toaster/>
      {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
      }
       </GlobalProvider>
    
  ) 
}

export default App    