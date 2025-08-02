




// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { FaUserCircle } from "react-icons/fa";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
// import { useSelector } from 'react-redux';
// import UserMenu from './UserMenu';
// import D from '../assets/D.png';
// import Search from './Search';
// import useMobile from '../hooks/useMobile';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import { useGlobalContext } from '../provider/GlobalProvider';
// import DisplayCartItem from './DisplayCartItem';
// import lg2 from '../assets/lg2.png';
// import ExploreDropdown from './ExploreDropdown';

// const Header = () => {


  
//   const [isMobile] = useMobile();
//   const location = useLocation();
//   const isSearchPage = location.pathname === "/search";
//   const navigate = useNavigate();
//   const user = useSelector((state) => state?.user);
//   const cartItem = useSelector(state => state.cartItem.cart);
//   // const { totalPrice, totalQty } = useGlobalContext();
// const { totalPrice = 0, totalQty = 0 } = useGlobalContext() || {};


//   const [openUserMenu, setOpenUserMenu] = useState(false);
//   const [openCartSection, setOpenCartSection] = useState(false);
//   const [openExploreMenu, setOpenExploreMenu] = useState(false);

//   const redirectToLoginPage = () => navigate("/login");
//   const redirectToSearchPage = () => navigate("/search");

//   const handleCloseUserMenu = () => setOpenUserMenu(false);
//   const handleMobileUser = () => {
//     if (!user._id) return navigate("/login");
//     navigate("/user");
//   };

//   return (
//     <header className="h-16 lg:h-14 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-0.5 bg-black">
//       {!(isSearchPage && isMobile) && (
// <div className="w-full max-w-[1460px] mx-auto px-4 flex items-center justify-between">
//           {/* Logo & Explore */}
//           <div className="h-full flex justify-start relative">
//             <Link to="/" className="h-full flex items-center ml-0">
//               <div className="hidden lg:flex items-center gap-2">
//                 <img src={lg2} alt="Logo" className="h-10 w-10" />
//                 <span className="text-white font-bold text-[20px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
//                   3D Model Marketplace
//                 </span>
//               </div>
//               <span className="lg:hidden text-white font-bold text-[20px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
//                 3DMMP
//               </span>
//             </Link>

//             {/* Explore Dropdown */}
//             <div
//   className="hidden lg:flex items-center ml-10 relative"
//   onMouseEnter={() => setOpenExploreMenu(true)}
//   onMouseLeave={() => setOpenExploreMenu(false)}
// >
//   <button
//     className="text-white  text-sm hover:text-blue-500 flex items-center gap-1"
//   >
//     EXPLORE
//     {openExploreMenu ? <GoTriangleUp size={20} /> : <GoTriangleDown size={20} />}
//   </button>
//   {openExploreMenu && (
//     <ExploreDropdown onClose={() => setOpenExploreMenu(false)} />
//   )}
// </div>

//           </div>

//           {/* Desktop Search */}
//           <div onClick={redirectToSearchPage} className="hidden lg:block">
//             <Search />
//           </div>

//           {/* User & Cart */}
//           <div className="flex items-center gap-4">
//             {/* Mobile User */}
//             <button className="text-neutral-600 lg:hidden" onClick={handleMobileUser}>
              
//               <FaUserCircle size={20} />
//             </button>


// {user?._id ? (
//   <div className="relative hidden lg:block">
//     <button
//       onClick={() => setOpenUserMenu(prev => !prev)}
//       className="flex items-center gap-2 bg-gray-700 text-white px-3 py-1 rounded-md hover:bg-gray-600 "
//     >
//       {user.avatar ? (
//         <div className="w-7 h-7 rounded-full border border-white/50 overflow-hidden">
//           <img
//             src={user.avatar}
//             alt={user.name || "User"}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       ) : (
//         <div className="w-7 h-7 flex items-center justify-center bg-white text-gray-700 font-semibold rounded-full border border-gray-300">
//           {user.name?.[0]?.toUpperCase() || "U"}
//         </div>
//       )}

//       <span className="font-semibold style={{ fontFamily: 'Montserrat, sans-serif'}} text-sm">Account</span>
//       {openUserMenu ? <GoTriangleUp size={18} /> : <GoTriangleDown size={18} />}
//     </button>

//     {openUserMenu && (
//       <div className="absolute top-11 right-[-50px] bg-neutral-800 text-white rounded-md p-3 min-w-60 shadow-lg z-50 border border-white/10">
//         <UserMenu close={handleCloseUserMenu} />
//       </div>
//     )}
//   </div>
// ) : (
//   <div className="relative hidden lg:block">
//     <button
//       onClick={redirectToLoginPage}
//       className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-md hover:bg-gray-800 border border-white/20"
//     >
//       <FaUserCircle size={18} />
//       <span className="font-semibold text-sm">Login</span>
//     </button>
//   </div>
// )}


// <div className="relative" onClick={() => setOpenCartSection(true)}>
//   {/* Cart Icon */}
// <MdOutlineShoppingCart
//   size={30}
//   className="text-white cursor-pointer hover:text-neutral-600 transition duration-300"
// />

//   {/* Badge */}
//   {totalQty > 0 && (
//     <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//       {totalQty}
//     </span>
//   )}
// </div>

//           </div>
//         </div>
//       )}

//       {/* Mobile Search */}
//       <div className="container mx-auto px-2 lg:hidden">
//         <Search />
//       </div>

//       {/* Cart Panel */}
//       {openCartSection && <DisplayCartItem close={() => setOpenCartSection(false)} />}
//     </header>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';
import Search from './Search';
import useMobile from '../hooks/useMobile';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';
import ExploreDropdown from './ExploreDropdown';
import '../componentcss/Header.css';
import lg2 from '../assets/lg2.png';

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const cartItem = useSelector(state => state.cartItem.cart);
  const { totalPrice = 0, totalQty = 0 } = useGlobalContext() || {};

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openCartSection, setOpenCartSection] = useState(false);
  const [openExploreMenu, setOpenExploreMenu] = useState(false);

  const redirectToLoginPage = () => navigate("/login");
  const redirectToSearchPage = () => navigate("/search");

  const handleCloseUserMenu = () => setOpenUserMenu(false);
  const handleMobileUser = () => {
    if (!user._id) return navigate("/login");
    navigate("/user");
  };

  return (
    <header className="header">
      {!(isSearchPage && isMobile) && (
        <div className="header__main">
          {/* Logo & Explore */}
          <div className="header__left">
            <Link to="/" className="header__logo">
              <div className="header__logo-desktop">
                <img src={lg2} alt="Logo" className="header__logo-img" />
                <span className="header__logo-text">3D Model Marketplace</span>
              </div>
              <span className="header__logo-mobile">3DMMP</span>
            </Link>

            {/* Explore Dropdown */}
            <div
              className="header__explore"
              onMouseEnter={() => setOpenExploreMenu(true)}
              onMouseLeave={() => setOpenExploreMenu(false)}
            >
              <button className="header__explore-button">
                EXPLORE
                {openExploreMenu ? <GoTriangleUp size={20} /> : <GoTriangleDown size={20} />}
              </button>
              {openExploreMenu && (
                <ExploreDropdown onClose={() => setOpenExploreMenu(false)} />
              )}
            </div>
          </div>

          {/* Desktop Search */}
          <div onClick={redirectToSearchPage} className="header__search-desktop">
            <Search />
          </div>

          {/* User & Cart */}
          <div className="header__right">
            {/* Mobile User */}
            <button className="header__mobile-user" onClick={handleMobileUser}>
              <FaUserCircle size={20} />
            </button>

            {user?._id ? (
              <div className="header__user-menu">
                <button
                  onClick={() => setOpenUserMenu(prev => !prev)}
                  className="header__user-button"
                >
                  {user.avatar ? (
                    <div className="header__user-avatar">
                      <img
                        src={user.avatar}
                        alt={user.name || "User"}
                        className="header__avatar-img"
                      />
                    </div>
                  ) : (
                    <div className="header__user-initial">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="header__user-text">Account</span>
                  {openUserMenu ? <GoTriangleUp size={18} /> : <GoTriangleDown size={18} />}
                </button>

                {openUserMenu && (
                  <div className="header__user-dropdown">
                    <UserMenu close={handleCloseUserMenu} />
                  </div>
                )}
              </div>
            ) : (
              <div className="header__login">
                <button
                  onClick={redirectToLoginPage}
                  className="header__login-button"
                >
                  <FaUserCircle size={18} />
                  <span className="header__login-text">Login</span>
                </button>
              </div>
            )}

            <div className="header__cart" onClick={() => setOpenCartSection(true)}>
              <MdOutlineShoppingCart size={30} className="header__cart-icon" />
              {totalQty > 0 && (
                <span className="header__cart-badge">
                  {totalQty}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search */}
      <div className="header__mobile-search">
        <Search />
      </div>

      {/* Cart Panel */}
      {openCartSection && <DisplayCartItem close={() => setOpenCartSection(false)} />}
    </header>
  );
};

export default Header;




























