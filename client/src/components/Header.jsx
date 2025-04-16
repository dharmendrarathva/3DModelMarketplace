import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';
import D from '../assets/D.png';
import Search from './Search';
import useMobile from '../hooks/useMobile';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';


const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
    const cartItem = useSelector(state => state.cartItem.cart)
  //    const [totalPrice,setTotalPrice] = useState(0)
   const { totalPrice, totalQty} = useGlobalContext()
   const [openCartSection,setOpenCartSection] = useState(false)

   

  const redirectToLoginPage = () => {
    navigate("/login");
  };
  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };


 



  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="w-full flex items-center px-2 justify-between">
          
          <div className="h-full flex justify-start">
            <Link to="/" className="h-full flex items-center">
              <img src={D} width={350} height={60} alt="logo" className="hidden lg:block" />
              <img src={D} width={120} height={60} alt="logo" className="lg:hidden" />
            </Link>
          </div>

       

         
          <div onClick={redirectToSearchPage} className="hidden lg:block">
            <Search/>
          </div>

         
          <div className="flex items-center gap-6">
           
            <button className="text-neutral-600 lg:hidden" onClick={handleMobileUser}>
            <FaUserCircle size={20} />
            </button>


            {user?._id ? (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setOpenUserMenu(prev => !prev)}
                  className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-700"
                >
                  <FaUserCircle size={20} />
                  <span className="font-bold text-base">Account</span>
                  {openUserMenu ? <GoTriangleUp size={20} /> : <GoTriangleDown size={20} />}
                </button>

                {openUserMenu && (
                  <div className="absolute right-0 top-12 bg-white rounded p-4 min-w-52 lg:shadow-lg">
                    <UserMenu close={handleCloseUserMenu} />
                  </div>
                )}
              </div>
            ) : (
              <div className="relative hidden lg:block">
                <button
                  onClick={redirectToLoginPage}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-700"
                >
                  <FaUserCircle size={20} />
                  <span className="font-bold text-base">Login</span>
                </button>
              </div>
            )}

            {/* My Cart */}
            <button onClick={()=>setOpenCartSection(true)}className='flex items-center gap-2 bg-blue-800 hover:bg-blue-700 px-3 py-2 rounded text-white'>
                                            {/**add to card icons */}
                                            <div className='animate-bounce'>
                                                <BsCart4 size={26}/>
                                            </div>
                                            <div className='font-semibold text-sm'>
                                                {
                                                    cartItem[0] ? (
                                                        <div>
                                                            <p>{totalQty} Item</p>
                                                            <p>{DisplayPriceInRupees(totalPrice)}</p>
                                                        </div>
                                                    ) : (
                                                      
                                                         <Link to={"/CartMobile"}>My Cart </Link>
                                                    )

                                                }
                                                  
                                            </div>    
                               </button>
          </div>
        </div>
      )
        }


      <div className='container mx-auto px-2 lg:hidden'>
            <Search/>
        </div>

        {
            openCartSection && (
                <DisplayCartItem close={()=>setOpenCartSection(false)}/>
            )
        }
    </header>
  );
};  

export default Header;
