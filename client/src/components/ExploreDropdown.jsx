// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { valideURLConvert } from '../utils/valideURLConvert';
// import { FaStore, FaHeart, FaBoxOpen } from 'react-icons/fa';

// const ExploreDropdown = ({ onClose }) => {
//   const categoryData = useSelector(state => state.product.allCategory);
//   const subCategoryData = useSelector(state => state.product.allSubCategory);

//   // Split categories into only 2 columns (skip index 0)
//   const columns = [[], [], []];
//   categoryData?.forEach((cat, index) => {
//     columns[(index % 2) + 1].push(cat);
//   });

//   return (
//     <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] z-50 mt-1.5 rounded-xl bg-[#1e1e1e]/80 backdrop-blur-lg border border-white/20 shadow-2xl text-white">
//       <div className="flex max-h-[400px] overflow-y-auto">
        
//         {/* Left Column – Seller & About Links */}
//         <div className="flex-1 p-4 flex flex-col gap-4 border-r border-white/20">
//           <Link
//             to="/dashboard/upload-product"
//             onClick={onClose}
//             className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition"
//           >
//             <FaBoxOpen className="text-lg" /> <span>Become a Seller!</span>
//           </Link>
//           <Link
//             to="/dashboard/address"
//             onClick={onClose}
//             className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition"
//           >
//             <FaHeart className="text-lg" /> <span>About Us</span>
//           </Link>
//         </div>

//         {/* Category Columns (no border between them) */}
//         {columns.slice(1).map((group, colIndex) => (
          
//           <ul key={colIndex} className="flex-1 p-2 space-y-1">
//             {group.map(cat => {
//               const subcategory = subCategoryData.find(sub =>
//                 sub.category.some(c => c._id === cat._id)
//               );

//               const toUrl = subcategory
//                 ? `/${valideURLConvert(cat.name)}-${cat._id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
//                 : `/${valideURLConvert(cat.name)}-${cat._id}`;

//               return (
                
//                 <li key={cat._id}>
                  
//                   <Link
//                     to={toUrl}
//                     onClick={onClose}
//                     className="flex items-center gap-3 hover:bg-white/10 rounded-md px-3 py-2 transition"
//                   >
//                     <div className="w-10 h-10 flex items-center justify-center bg-neutral-300 rounded-full overflow-hidden">
//                       <img
//                         src={cat.image}
//                         alt={cat.name}
//                         className="w-full h-full object-contain"
//                       />
//                     </div>
//                     <span>{cat.name}</span>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ExploreDropdown;


import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { valideURLConvert } from '../utils/valideURLConvert';
import { FaStore, FaHeart, FaBoxOpen } from 'react-icons/fa';
import '../componentcss/ExploreDropdown.css';

const ExploreDropdown = ({ onClose }) => {
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);

  // Split categories into only 2 columns (skip index 0)
  const columns = [[], [], []];
  categoryData?.forEach((cat, index) => {
    columns[(index % 2) + 1].push(cat);
  });

  return (
    <div className="explore-dropdown">
      <div className="explore-dropdown__container">
        {/* Left Column – Seller & About Links */}
        <div className="explore-dropdown__left-column">
          <Link
            to="/dashboard/upload-product"
            onClick={onClose}
            className="explore-dropdown__link"
          >
            <FaBoxOpen className="explore-dropdown__icon" /> <span>Become a Seller!</span>
          </Link>
          <Link
            to="/dashboard/address"
            onClick={onClose}
            className="explore-dropdown__link"
          >
            <FaHeart className="explore-dropdown__icon" /> <span>About Us</span>
          </Link>
        </div>

        {/* Category Columns */}
        {columns.slice(1).map((group, colIndex) => (
          <ul key={colIndex} className="explore-dropdown__category-column">
            {group.map(cat => {
              const subcategory = subCategoryData.find(sub =>
                sub.category.some(c => c._id === cat._id)
              );

              const toUrl = subcategory
                ? `/${valideURLConvert(cat.name)}-${cat._id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
                : `/${valideURLConvert(cat.name)}-${cat._id}`;

              return (
                <li key={cat._id}>
                  <Link
                    to={toUrl}
                    onClick={onClose}
                    className="explore-dropdown__category-link"
                  >
                    <div className="explore-dropdown__category-image">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="explore-dropdown__image"
                      />
                    </div>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ExploreDropdown;