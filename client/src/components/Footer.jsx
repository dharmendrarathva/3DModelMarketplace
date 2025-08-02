// import React from 'react';
// import {
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaShoppingCart,
//   FaHeart,
//   FaStore,
//   FaUserPlus
// } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <footer className="bg-neutral-800 text-white mt-0">
//       <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

//         {/* Column 1 - About */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">About</h3>
//           <p className="text-sm text-gray-300">
//             Explore and sell high-quality 3D models. Built for creators, designers, and developers.
//           </p>
//         </div>

//         {/* Column 2 - Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <Link to="/dashboard/my-orders" className="flex items-center gap-2 hover:text-primary-400 transition">
//                 <FaShoppingCart /> Orders
//               </Link>
//             </li>
//             <li>
//               <Link to="/dashboard/address" className="flex items-center gap-2 hover:text-primary-400 transition">
//                 <FaHeart /> About You
//               </Link>
//             </li>
//             <li>
//               <Link to="/dashboard/Seller3DModel" className="flex items-center gap-2 hover:text-primary-400 transition">
//                 <FaStore /> Sell Own 3D Model
//               </Link>
//             </li>
//             <li>
//               <Link to="/register" className="flex items-center gap-2 hover:text-primary-400 transition">
//                 <FaUserPlus /> New Register
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Column 3 - Follow Us */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
//           <div className="flex gap-4 text-2xl">
//             <a href="#" className="hover:text-primary-400 transition"><FaFacebook /></a>
//             <a href="#" className="hover:text-primary-400 transition"><FaInstagram /></a>
//             <a href="#" className="hover:text-primary-400 transition"><FaLinkedin /></a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Line */}
//       <div className="text-center text-gray-400 text-sm py-4 border-t border-gray-700">
//         © All Rights Reserved 2025.
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaShoppingCart,
  FaHeart,
  FaStore,
  FaUserPlus
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../componentcss/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer__container">
        {/* Column 1 - About */}
        <div className="footer__column">
          <h3 className="footer__heading">About</h3>
          <p className="footer__about-text">
            Explore and sell high-quality 3D models. Built for creators, designers, and developers.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="footer__column">
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__links-list">
            <li>
              <Link to="/dashboard/my-orders" className="footer__link">
                <FaShoppingCart className="footer__link-icon" /> Orders
              </Link>
            </li>
            <li>
              <Link to="/dashboard/address" className="footer__link">
                <FaHeart className="footer__link-icon" /> About You
              </Link>
            </li>
            <li>
              <Link to="/dashboard/Seller3DModel" className="footer__link">
                <FaStore className="footer__link-icon" /> Sell Own 3D Model
              </Link>
            </li>
            <li>
              <Link to="/register" className="footer__link">
                <FaUserPlus className="footer__link-icon" /> New Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Follow Us */}
        <div className="footer__column">
          <h3 className="footer__heading">Follow Us</h3>
          <div className="footer__social-icons">
            <a href="#" className="footer__social-link"><FaFacebook /></a>
            <a href="#" className="footer__social-link"><FaInstagram /></a>
            <a href="#" className="footer__social-link"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="footer__bottom">
        © All Rights Reserved 2025.
      </div>
    </footer>
  );
};

export default Footer;