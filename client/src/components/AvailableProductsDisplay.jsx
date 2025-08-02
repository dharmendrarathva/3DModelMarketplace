// import React, { useEffect, useState } from 'react';
// import Axios from '../utils/Axios';
// import AxiosToastError from '../utils/AxiosToastError';
// import CardLoading from './CardLoading';
// import CardProduct from './CardProduct';

// const AvailableProductsDisplay = ({ count = 10 }) => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchAvailableProducts = async (pageNum = 1) => {
//     try {
//       setLoading(true);
//       const response = await Axios.get(`/api/product/get-available-products?count=${count}&page=${pageNum}`);
//       if (response.data.success) {
//         const newData = response.data.data;
//         if (newData.length < count) {
//           setHasMore(false); // No more products to fetch
//         }
//         if (pageNum === 1) {
//           setData(newData); // First page
//         } else {
//           setData(prev => [...prev, ...newData]); // Append next page
//         }
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAvailableProducts(1);
//   }, [count]);

//   const handleLoadMore = () => {
//     const nextPage = page + 1;
//     setPage(nextPage);
//     fetchAvailableProducts(nextPage);
//   };

//   return (
//     <section className="w-full mb-6">
//       <div className="max-w-[1455px] mx-auto">
// <h3
//   className="mb-5"
//   style={{
//     fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
//     fontWeight: 'bold',
//     fontSize: '1rem',
//     color: '#26a9e0',
//     letterSpacing: '0.5px',
//   }}
// >
//   EXPLORE MODELS
// </h3>        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {data.map((p, index) => (
//             <CardProduct data={p} key={p._id + "AvailableProduct" + index} />
//           ))}
//           {loading &&
//             [...Array(count)].map((_, index) => (
//               <CardLoading key={"loading-" + index} />
//             ))}
//         </div>
//         {hasMore && !loading && (
//           <div className="flex justify-center mt-6">
//             <button
//               onClick={handleLoadMore}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition border-neutral-300 border-2 shadow-lg"
//             >
//               Show more
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default AvailableProductsDisplay;


import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import CardLoading from './CardLoading';
import CardProduct from './CardProduct';
import '../componentcss/AvailableProductsDisplay.css';

const AvailableProductsDisplay = ({ count = 10 }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchAvailableProducts = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response = await Axios.get(`/api/product/get-available-products?count=${count}&page=${pageNum}`);
      if (response.data.success) {
        const newData = response.data.data;
        if (newData.length < count) setHasMore(false);
        setData(prev => (pageNum === 1 ? newData : [...prev, ...newData]));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableProducts(1);
  }, [count]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAvailableProducts(nextPage);
  };

  return (
    <section className="products-display">
      <div className="products-display__wrapper">
        <h3 className="products-display__title">EXPLORE MODELS</h3>
        <div className="products-display__grid">
          {data.map((p, index) => (
            <CardProduct data={p} key={`${p._id}-AvailableProduct-${index}`} />
          ))}
          {loading && [...Array(count)].map((_, index) => (
            <CardLoading key={`loading-${index}`} />
          ))}
        </div>
        {hasMore && !loading && (
          <div className="products-display__load-more">
            <button onClick={handleLoadMore} className="products-display__load-more-btn">
              Show more
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableProductsDisplay;