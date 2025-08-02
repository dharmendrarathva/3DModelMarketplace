
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsDownload } from 'react-icons/bs';
import toast from 'react-hot-toast';

import { valideURLConvert } from '../utils/valideURLConvert';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from './AddToCartButton';
import { useGlobalContext } from '../provider/GlobalProvider';
import '../componentcss/CardProduct.css';

const CardProduct = ({ data }) => {
  const user = useSelector(state => state.user);
  const { fetchCartItem } = useGlobalContext();
  const [downloading, setDownloading] = useState(false);

  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;

  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setDownloading(true);
      const zipFileUrl = data?.zipFile;

      if (!zipFileUrl) {
        toast.error('Download link not available');
        setDownloading(false);
        return;
      }

      const response = await fetch(zipFileUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${data.name}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Download started');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Link to={url} className="CardProduct">
      {/* Image with hover label */}
      <div className="CardProduct-image-container">
        <img
          src={data.image[0]}
          alt={data.name}
          className="CardProduct-image"
        />
        <div className="CardProduct-hover-label">3D View</div>
      </div>

      {/* Details */}
      <div className="CardProduct-details">
        <div className="CardProduct-text">
          <div className="CardProduct-name">{data.name}</div>
          <div className="CardProduct-extension">{data.extension}</div>
        </div>

        <div className="CardProduct-footer">
          <div className="CardProduct-price">
            {data.price === 0
              ? 'FREE'
              : DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
          </div>
          <div className="CardProduct-action">
            {data.price === 0 ? (
              <button
                onClick={handleDownload}
                disabled={downloading}
                className={`CardProduct-download-btn ${downloading ? 'CardProduct-downloading' : ''}`}
              >
                {downloading ? (
                  <div className="CardProduct-download-spinner"></div>
                ) : (
                  <BsDownload size={24} />
                )}
              </button>
            ) : (
              <AddToCartButton data={data} />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;

















// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { BsDownload } from 'react-icons/bs';
// import toast from 'react-hot-toast';

// import { valideURLConvert } from '../utils/valideURLConvert';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import { pricewithDiscount } from '../utils/PriceWithDiscount';
// import AddToCartButton from './AddToCartButton';
// import { useGlobalContext } from '../provider/GlobalProvider';

// const CardProduct = ({ data }) => {
//   const user = useSelector(state => state.user);
//   const { fetchCartItem } = useGlobalContext();
//   const [downloading, setDownloading] = useState(false);

//   const url = `/product/${valideURLConvert(data.name)}-${data._id}`;

//   const handleDownload = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     try {
//       setDownloading(true);
//       const zipFileUrl = data?.zipFile;

//       if (!zipFileUrl) {
//         toast.error('Download link not available');
//         setDownloading(false);
//         return;
//       }

//       const response = await fetch(zipFileUrl);
//       const blob = await response.blob();
//       const link = document.createElement('a');
//       link.href = window.URL.createObjectURL(blob);
//       link.download = `${data.name}.zip`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       toast.success('Download started');
//     } catch (error) {
//       console.error('Download error:', error);
//       toast.error('Failed to download file');
//     } finally {
//       setDownloading(false);
//     }
//   };

//   return (
//     <Link
//       to={url}
//       className="w-[340px] h-[290px] flex-shrink-0 bg-[#1c1c1c] border border-[#333] rounded-xl shadow-lg hover:shadow-md transition duration-300 flex flex-col overflow-hidden"
//     >
      
//      {/* Image with hover button label */}
// <div className="h-[180px] w-full relative group overflow-hidden">
//   <img
//     src={data.image[0]}
//     alt={data.name}
//     className="w-full h-full object-cover transition duration-300"
//   />

//   {/* 3D View label on hover */}
//   <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//     <div className="bg-black bg-opacity-100 text-white text-xs px-3 py-1 rounded-md shadow">
//       3D View
//     </div>
//   </div>
// </div>


     
// {/* Details */}
// <div className="px-2 py-1 flex flex-col justify-between flex-grow min-h-[80px]">
//   <div className="mb-1">
//     <div className="text-[13px] font-semibold text-white truncate">{data.name}</div>
//     <div className="text-[11px] font-semibold text-gray-400">{data.extension} {/* by {user.name} */}</div>
//     {/* <div class="text-[11px] font-semibold text-gray-400">by {user.name}</div> */}
    
//   </div>

//   <div className="flex items-center">
//     <div className="text-sm font-semibold text-white">
//       {data.price === 0
//         ? 'FREE'
//         : DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
//     </div>
//     <div className="ml-auto">
//       {data.price === 0 ? (
//         <button
//           onClick={handleDownload}
//           disabled={downloading}
//           className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
//             downloading
//               ? 'bg-black cursor-not-allowed'
//               : 'bg-neutral-800 hover:bg-black text-white'
//           }`}
//         >
//           {downloading ? (
//             <svg
//               className="animate-spin h-9 w-9 text-white"
//               viewBox="0 0 24 24"
//               fill="black"
//             >
//               <circle
//                 className="opacity-100"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="1"
//               />
//               <path
//                 className="opacity-100"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v8z"
//               />
//             </svg>
//           ) : (
//             <BsDownload size={24} />
//           )}
//         </button>
//       ) : (
//         <AddToCartButton data={data} />
//       )}
//     </div>
//   </div>
// </div>


//     </Link>
//   );
// };

// export default CardProduct;










// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { BsDownload } from 'react-icons/bs';
// import toast from 'react-hot-toast';

// import { valideURLConvert } from '../utils/valideURLConvert';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import { pricewithDiscount } from '../utils/PriceWithDiscount';
// import AddToCartButton from './AddToCartButton';
// import { useGlobalContext } from '../provider/GlobalProvider';

// const CardProduct = ({ data }) => {
//   const user = useSelector(state => state.user);
//   const { fetchCartItem } = useGlobalContext();
//   const [downloading, setDownloading] = useState(false);

//   const url = `/product/${valideURLConvert(data.name)}-${data._id}`;

//   const handleDownload = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     try {
//       setDownloading(true);
//       const zipFileUrl = data?.zipFile;

//       if (!zipFileUrl) {
//         toast.error('Download link not available');
//         setDownloading(false);
//         return;
//       }

//       const response = await fetch(zipFileUrl);
//       const blob = await response.blob();
//       const link = document.createElement('a');
//       link.href = window.URL.createObjectURL(blob);
//       link.download = `${data.name}.zip`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       toast.success('Download started');
//     } catch (error) {
//       console.error('Download error:', error);
//       toast.error('Failed to download file');
//     } finally {
//       setDownloading(false);
//     }
//   };

//   return (
//     <Link
//       to={url}
//       className="w-[340px] h-[290px] flex-shrink-0 bg-[#ffffff] border  rounded-xl shadow-lg hover:shadow-md transition duration-300 flex flex-col overflow-hidden"
//     >
      
//      {/* Image with hover button label */}
// <div className="h-[180px] w-full relative group overflow-hidden">
//   <img
//     src={data.image[0]}
//     alt={data.name}
//     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//   />
  
//   {/* Button-like label on hover */}
//   <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//     <div className="bg-black bg-opacity-100 text-white text-xs px-3 py-1 rounded-md shadow">
//       3D View
//     </div>
//   </div>
// </div>


     
// {/* Details */}
// <div className="px-3 py-2 flex flex-col flex-grow justify-between">
//   <div className="mb-1">
//     <div className="text-[15px] font-semibold text-black truncate">{data.name}</div>
//     <div className="text-[11px] font-semibold text-gray-700">{data.extension} {/* by {user.name} */}</div>
//     <div class="text-[11px] font-semibold text-gray-900">by {user.name}</div>
    
//   </div>

//   <div className="flex items-center">
//     <div className="text-sm font-semibold text-white">
//       {data.price === 0
//         ? 'FREE'
//         : DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
//     </div>
//     <div className="ml-auto">
//       {data.price === 0 ? (
//         <button
//           onClick={handleDownload}
//           disabled={downloading}
//           className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
//             downloading
//               ? 'bg-black cursor-not-allowed'
//               : 'bg-neutral-800 hover:bg-black text-white'
//           }`}
//         >
//           {downloading ? (
//             <svg
//               className="animate-spin h-9 w-9 text-white"
//               viewBox="0 0 24 24"
//               fill="black"
//             >
//               <circle
//                 className="opacity-100"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="1"
//               />
//               <path
//                 className="opacity-100"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v8z"
//               />
//             </svg>
//           ) : (
//             <BsDownload size={24} />
//           )}
//         </button>
//       ) : (
//         <AddToCartButton data={data} />
//       )}
//     </div>
//   </div>
// </div>


//     </Link>
//   );
// };

// export default CardProduct;