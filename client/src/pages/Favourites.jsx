// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import toast from 'react-hot-toast';
// import { valideURLConvert } from '../utils/valideURLConvert';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import { pricewithDiscount } from '../utils/PriceWithDiscount';
// import AddToCartButton from '../components/AddToCartButton';
// import AxiosToastError from '../utils/AxiosToastError';

// const Favourites = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         setLoading(true);
//         const response = await Axios(SummaryApi.getFavorites);
//         setFavorites(response.data.favorites || []); // Ensure it's always an array
//       } catch (error) {
//         AxiosToastError(error);
//         setFavorites([]); // Fallback in case of error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   const handleRemoveFavorite = async (productId) => {
//     try {
//       const response = await Axios({
//         ...SummaryApi.removeFavorite,
//         data: { productId },
//       });

//       if (response.data.success) {
//         toast.success('Removed from favorites');
//         setFavorites((prev) => prev.filter((item) => item._id !== productId));
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-xl font-semibold mb-4">Your Favorites</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : !favorites || favorites.length === 0 ? (
//         <p>No favorite items found.</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {favorites.map((data) => (
//             <div key={data._id} className="relative">
//               <Link
//                 to={`/product/${valideURLConvert(data.name)}-${data._id}`}
//                 className="border py-3 lg:p-4 grid gap-2 lg:gap-3 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300"
//               >
//                 <div className="min-h-24 w-full max-h-28 lg:max-h-36 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
//                   <img src={data.image[0]} alt={data.name} className="w-full h-full object-contain" />
//                 </div>

//                 <div className="px-2 lg:px-0">
//                   {Boolean(data.discount) && (
//                     <div className="text-green-600 bg-green-100 px-2 py-1 w-fit text-xs rounded-full">
//                       {data.discount}% discount
//                     </div>
//                   )}

//                   <div className="font-medium text-sm lg:text-base text-gray-800 line-clamp-2">
//                     {data.name}
//                   </div>

//                   <div className="text-gray-500 text-xs lg:text-sm">{data.extension}</div>

//                   <div className="flex items-center justify-between text-sm lg:text-base font-semibold text-gray-900 mt-2">
//                     <span>{DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}</span>
//                     <AddToCartButton data={data} />
//                   </div>
//                 </div>
//               </Link>

//               <button
//                 onClick={() => handleRemoveFavorite(data._id)}
//                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-700"
//               >
//                 ❌
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Favourites;
import React, { useState, useEffect } from "react";
import CardProduct from "../components/CardProduct";

const Favourites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

        // Filter out only the favorite products
        const favoriteProducts = allProducts.filter(product => storedFavorites.includes(product._id));

        setFavorites(favoriteProducts);
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">My Favorites ❤️</h1>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favorites.map((product) => (
                        <CardProduct key={product._id} data={product} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No favorite products yet.</p>
            )}
        </div>
    );
};

export default Favourites;
