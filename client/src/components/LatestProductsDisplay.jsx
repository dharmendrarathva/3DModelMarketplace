// import React, { useEffect, useRef, useState } from 'react';
// import Axios from '../utils/Axios';
// import AxiosToastError from '../utils/AxiosToastError';
// import CardLoading from './CardLoading';
// import CardProduct from './CardProduct';
// import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
// import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'; // Updated imports


// const LatestProductsDisplay = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const containerRef = useRef();
//   const loadingCardNumber = new Array(4).fill(null);

//   const fetchLatestProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await Axios.get('/api/product/get-latest-products');
//       if (response.data.success) {
//         setData(response.data.data);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLatestProducts();
//   }, []);

//   const handleScrollLeft = () => {
//     containerRef.current.scrollLeft -= 720;
//   };

//   const handleScrollRight = () => {
//     containerRef.current.scrollLeft += 720;
//   };

//   return (
//     <section className="w-full mb-6">
//       <div className="max-w-[1455px] mx-auto relative">
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
//   LATEST UPLOADS
// </h3>
//         {/* Scroll Buttons */}
//         <button
//           onClick={handleScrollLeft}
//           className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-6  text-white   hover:text-blue-600   transition-all duration-300"
//           aria-label="Scroll Left"
//         >
//           <BsChevronCompactLeft className="text-3xl md:text-4xl" />
//         </button>
//         <button
//           onClick={handleScrollRight}
//           className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-6  text-white     hover:text-blue-600   transition-all duration-300"
//           aria-label="Scroll Right"
//         >
//           <BsChevronCompactRight className="text-3xl md:text-4xl" />
//         </button>

//        <div
//   ref={containerRef}
//   className="w-full flex gap-4 md:gap-5 overflow-hidden scroll-smooth scrollbar-none pointer-events-none lg:pointer-events-auto"
// >

//           {loading
//             ? loadingCardNumber.map((_, index) => (
//                 <CardLoading key={`loading-${index}`} />
//               ))
//             : data.map((p, index) => (
//                 <CardProduct data={p} key={p._id + '-LatestProduct' + index} />
//               ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LatestProductsDisplay;



import React, { useEffect, useRef, useState } from 'react';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import CardLoading from './CardLoading';
import CardProduct from './CardProduct';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import '../componentcss/LatestProductsDisplay.css';

const LatestProductsDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const loadingCardNumber = new Array(4).fill(null);

  const fetchLatestProducts = async () => {
    try {
      setLoading(true);
      const response = await Axios.get('/api/product/get-latest-products');
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 720;
  };

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 720;
  };

  return (
    <section className="latest-products">
      <div className="latest-products__container">
        <h3 className="latest-products__title">
          LATEST UPLOADS
        </h3>
        
        {/* Scroll Buttons */}
        <button
          onClick={handleScrollLeft}
          className="latest-products__scroll-btn latest-products__scroll-btn--left"
          aria-label="Scroll Left"
        >
          <BsChevronCompactLeft className="latest-products__scroll-icon" />
        </button>
        <button
          onClick={handleScrollRight}
          className="latest-products__scroll-btn latest-products__scroll-btn--right"
          aria-label="Scroll Right"
        >
          <BsChevronCompactRight className="latest-products__scroll-icon" />
        </button>

        <div
          ref={containerRef}
          className="latest-products__scroll-container"
        >
          {loading
            ? loadingCardNumber.map((_, index) => (
                <CardLoading key={`loading-${index}`} />
              ))
            : data.map((p, index) => (
                <CardProduct data={p} key={p._id + '-LatestProduct' + index} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProductsDisplay;

