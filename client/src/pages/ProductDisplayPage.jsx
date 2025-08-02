// import React, { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import SummaryApi from '../common/SummaryApi';
// import Axios from '../utils/Axios';
// import AxiosToastError from '../utils/AxiosToastError';
// import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import Divider from '../components/Divider';
// import image1 from '../assets/Image1.png';
// import image2 from '../assets/Image2.png';
// import image3 from '../assets/image3.png';
// import AddToCartButton from '../components/AddToCartButton';
// import { pricewithDiscount } from '../utils/PriceWithDiscount';
// import { valideURLConvert } from '../utils/valideURLConvert';
// import { useGlobalContext } from '../provider/GlobalProvider';
// import { BsDownload } from 'react-icons/bs';
// import { RiExpandDiagonal2Fill } from "react-icons/ri";
// import { useSelector } from 'react-redux';
// import CardProduct from '../components/CardProduct';
// import DisplayLoad from './DisplayLoad'; // adjust the path as needed



// const ProductDisplayPage = () => {
//   const user = useSelector(state => state.user);


//   const params = useParams();
//   const [downloading, setDownloading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [image, setImage] = useState(0);
// const [loading, setLoading] = useState(true); // true by default
//   const imageContainer = useRef();
//   const scrollRef = useRef(null);
//   const { fetchCartItem } = useGlobalContext();

//   const [similarProducts, setSimilarProducts] = useState([]);

//   let productId = params?.product?.split("-")?.slice(-1)[0];
  
  
//   const [data, setData] = useState({
//     name: "",
//     image: [],
//     zipFile: ""
//   });





//   const scroll = (direction) => {
//     const container = scrollRef.current;
//     if (!container) return;
//     const amount = container.offsetWidth / 1;
//     container.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
//   };
//   const fetchProductDetails = async () => {
//     try {
//       const response = await Axios({
//         ...SummaryApi.getProductDetails,
//         data: { productId }
//       });

//       const { data: responseData } = response;
//       if (responseData.success) {
//         setData(responseData.data);
//         fetchSimilarProducts(productId); // Fetch similar after details
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const fetchSimilarProducts = async (productId) => {
//     try {
//       const response = await Axios({
//         ...SummaryApi.getSimilarProducts,
//         data: { productId }
//       });

//       if (response.data.success) {
//         setSimilarProducts(response.data.data);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, [params]);

  
// useEffect(() => {
//   window.scrollTo({ top: 0, behavior: "instant" });
//   fetchProductDetails();
// }, [params]);

//   const handleScrollRight = () => {
//     imageContainer.current.scrollLeft += 100;
//   };


//   const handleScrollLeft = () => {
//     imageContainer.current.scrollLeft -= 100;
//   };



//   const handleDownload = async (publicId) => {
//     try {
//       const response = await fetch(`/api/download/generate-signed-url/${publicId}`);
//       const data = await response.json();

//       if (data.success && data.url) {
//         const a = document.createElement('a');
//         a.href = data.url;
//         a.setAttribute('download', '');
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//       } else {
//         console.error("Failed to generate signed URL");
//       }
//     } catch (error) {
//       console.error("Error fetching signed URL:", error);
//     }
//   };

//   return (
//       <>
//     {loading ? (
//       <DisplayLoad />
//     ) : (
//     <section className='bg-neutral-900 mx-auto p-8 grid lg:grid-cols-2 items-start gap-8 m-0'>
//       {/* LEFT SIDE */}
//       <div>


//         <div className="relative bg-black h-[530px] rounded overflow-hidden lg:w-[960px]">
//           {/* Full View Button Inside Top Right */}
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="absolute top-3 right-3 bg-neutral-800 text-white text-[25px] p-2 rounded-full hover:bg-neutral-700 transition"
//             title="Full View"
//           >
//             <RiExpandDiagonal2Fill />  </button>
//           {/* Main Image */}
//           <div className="bg-black h-[530px] rounded-[10px] overflow-hidden lg:w-[960px]">
//             <img src={data.image[image]} alt="product" className="w-full h-full object-cover" />
//           </div>


//         </div>

//         {/* Thumbnail Slider */}
//         <div className="relative flex items-center justify-center w-[1400px] max-w-[870px] mx-[43px] mt-5">
//           {/* Left Button */}
//           <button
//             onClick={() => scroll("left")}
//             className="absolute left-[-47px] bg-neutral-800 hover:bg-white/20 text-white p-2 rounded-full"
//           >
//             <FaAngleLeft size={20} />
//           </button>

//           {/* Slider */}
//           <div
//             ref={scrollRef}
//             className="w-full flex overflow-x-auto space-x-3 p-2 rounded-lg hide-scrollbar"
//           >
//             {data.image.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`thumb-${index}`}
//                 onClick={() => setImage(index)}
//                 className={`h-[100px] w-[155px] rounded-[10px] cursor-pointer transition-all duration-200 
//           ${image === index ? "border-2 border-white" : "opacity-100 hover:opacity-100"}`}
//               />
//             ))}
//           </div>

//           {/* Right Button */}
//           <button
//             onClick={() => scroll("right")}
//             className="absolute right-[-47px]  bg-neutral-800 hover:bg-white/20 text-white p-2 rounded-full"
//           >
//             <FaAngleRight size={20} />
//           </button>
//         </div>





//           {/* Description (Desktop) */}
//           <div className='my-4 mt-10 hidden lg:grid gap-3'>
//             <div>
//               <p className='text-white font-semibold'>Description</p>
//               <p className='text-neutral-300'>{data.description}</p>

//             </div>

//             {data?.more_details && Object.keys(data?.more_details).map((element, index) => (
//               <div key={index}>
//                 <p className='text-white font-semibold'>{element}</p>
//                 <p className='text-neutral-400'>{data?.more_details[element]}</p>

//               </div>
//             ))}
//           </div>
//         </div>

//       {/* RIGHT SIDE */}
//       <div className="p-6  bg-neutral-800 rounded-2xl shadow-lg text-base lg:text-lg lg:ml-[calc(50%+-5rem)] space-y-6">
//     <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#3A3A3A] rounded-full">
//   {user.avatar ? (
//     <img
//       src={user.avatar}
//       alt={user.name}
//       className="w-6 h-6 rounded-full object-cover"
//     />
//   ) : (
//     <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">
//       {user.name?.charAt(0) || "U"}
//     </div>
//   )}
//   <span className="text-white text-sm font-medium">{user.name}</span>
// </div>





//         <h2 className="text-white text-lg font-semibold lg:text-2xl">{data.name}</h2>

//         {/* Price Display */}
//         <div className="space-y-2">
//           <p className="text-neutral-100">Price</p>
//           <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
//             <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
//               <p className="font-semibold text-lg lg:text-xl">
//                 {data.price === 0 ? "FREE" : DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
//               </p>
//             </div>
//             {data.discount && data.price !== 0 && (
//               <>
//                 <p className="line-through text-neutral-500">{DisplayPriceInRupees(data.price)}</p>
//                 <p className="font-bold text-green-700 lg:text-2xl">
//                   {data.discount}% <span className="text-base text-neutral-500">Discount</span>
//                 </p>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Action Button */}
//         {data.price === 0 ? (
//           <button
//             onClick={() => handleDownload("3DMMP-ZIP/data.zip")}
//             disabled={downloading}
//             className={`my-4 flex items-center justify-center px-4 py-2 rounded-md text-base transition ${downloading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
//           >
//             {downloading ? (
//               <>
//                 <svg className="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                 </svg>
//                 Downloading...
//               </>
//             ) : (
//               <>
//                 <BsDownload size={20} className="mr-2" />
//                 Download ZIP
//               </>
//             )}
//           </button>
//         ) : (
          // <button className="my-10  flex items-center gap-2  text-white px-4 py-2 rounded-full shadow bg-neutral-900 hover:bg-black transition duration-200">
          //   <span >Add</span>
          //   <AddToCartButton data={data} />

          // </button>



//         )}

//         {/* Supported Formats */}
//         <div className="space-y-2">
//           <h3 className="font-semibold text-white">Supported Formats</h3>
//           <p className="text-neutral-400">{data.extension}</p>
//         </div>

//         <Divider />

//         {/* Why Buy Section */}
//         <div className="space-y-4">
//           <h2 className="font-semibold text-white">Why Buy from 3D Model Marketplace?</h2>
//           <div className="space-y-4">
//             <div className="flex items-center gap-4">
//               <img src={image2} alt="Affordable for Money" className="w-20 h-20" />
//               <div className="text-sm">
//                 <div className="font-semibold text-white">Affordable for Money</div>
//                 <p className="text-neutral-400">Get the best value with competitive pricing on 3D models.</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <img src={image1} alt="Real 3D Rendered Previews" className="w-20 h-20" />
//               <div className="text-sm">
//                 <div className="font-semibold text-white">Real 3D Rendered Previews</div>
//                 <p className="text-neutral-400">See high-quality previews before purchasing.</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <img src={image3} alt="Real Software Extensions Only" className="w-20 h-20" />
//               <div className="text-sm">
//                 <div className="font-semibold text-white">Real Exported Software Extensions Only</div>
//                 <p className="text-neutral-400">Download models that support your specific software requirements.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* {similarProducts.length > 0 && (
//   <div className="mt-20 w-full col-span-2">
//     <h2 className="text-white text-xl font-semibold mb-6">Similar Category Products</h2>
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//       {similarProducts.map((product) => (
//         <div key={product._id} className="bg-neutral-800 p-4 rounded-xl hover:shadow-lg transition">
//           <img
//             src={product.image[0]}
//             alt={product.name}
//             className="w-full h-48 object-cover rounded-md mb-3"
//           />
//           <h3 className="text-white text-lg font-semibold">{product.name}</h3>
//           <p className="text-neutral-400 text-sm mb-2">{product.extension}</p>
//           <p className="text-green-400 font-bold">
//             {product.price === 0
//               ? 'FREE'
//               : DisplayPriceInRupees(pricewithDiscount(product.price, product.discount))}
//           </p>
//         </div>
//       ))}
//     </div>
//   </div>
// )} */}
//       {similarProducts.length > 0 && (
//         <div className="mt-20 w-full col-span-2">
//           <h2 className="text-white text-xl font-semibold mb-6">Products in the Same Category</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {similarProducts
//               .filter((product) => product._id !== productId)
//               .map((product) => (
//                 <CardProduct key={product._id} data={product} />
//               ))}
//           </div>
//         </div>
//       )}


//       {/* Full Image Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-85 z-50 flex items-center justify-center overflow-hidden">
//           {/* Close Button */}
//           <button
//             onClick={() => setIsModalOpen(false)}
//             className="absolute top-5 right-5 text-white text-5xl z-50 hover:text-red-500"
//           >
//             &times;
//           </button>

//           {/* Main Content Wrapper */}
//           <div className="flex w-full h-full px-6 items-center justify-center gap-4 py-8">

//             {/* Left Vertical Thumbnails */}
//             <div className="flex flex-col gap-3 max-h-[80vh] overflow-y-auto scrollbar-none">
//               {data.image.map((img, index) => (
//                 <img
//                   key={img + index}
//                   src={img}
//                   alt="thumbnail"
//                   onClick={(e) => {
//                     setImage(index);
//                     e.target.scrollIntoView({
//                       behavior: 'smooth',
//                       block: 'center',
//                     });
//                   }}
//                   className={`w-32 h-32 object-cover rounded cursor-pointer transition-all duration-150 ${image === index ? 'border-white' : 'border-transparent'} hover:scale-105 hover:shadow-xl`}
//                 />
//               ))}
//             </div>

//             {/* Main Image */}
//             <div className="flex-1 flex items-center justify-center">
//               <img
//                 src={data.image[image]}
//                 alt="large view"
//                 className="max-w-full max-h-full object-contain rounded-[10px]"
//               />
//             </div>

//           </div>
//         </div>
//       )}
//     </section>
//      )}
//   </>

//   );
// };

// export default ProductDisplayPage;

// ProductDisplayPage.jsx



import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import Divider from '../components/Divider';
import image1 from '../assets/Image1.png';
import image2 from '../assets/Image2.png';
import image3 from '../assets/image3.png';
import AddToCartButton from '../components/AddToCartButton';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import { valideURLConvert } from '../utils/valideURLConvert';
import { useGlobalContext } from '../provider/GlobalProvider';
import { BsDownload } from 'react-icons/bs';
import { RiExpandDiagonal2Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import CardProduct from '../components/CardProduct';
import DisplayLoad from './DisplayLoad';
import '../pagescss/ProductDisplayPage.css';
import { TbArrowsDiagonalMinimize } from "react-icons/tb";

const ProductDisplayPage = () => {
  const user = useSelector(state => state.user);
  const params = useParams();
  const [downloading, setDownloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const imageContainer = useRef();
  const scrollRef = useRef(null);
  const { fetchCartItem } = useGlobalContext();
  const [similarProducts, setSimilarProducts] = useState([]);

  let productId = params?.product?.split("-")?.slice(-1)[0];
  
  const [data, setData] = useState({
    name: "",
    image: [],
    zipFile: ""
  });

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = container.offsetWidth / 1;
    container.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId }
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
        fetchSimilarProducts(productId);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async (productId) => {
    try {
      const response = await Axios({
        ...SummaryApi.getSimilarProducts,
        data: { productId }
      });

      if (response.data.success) {
        setSimilarProducts(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchProductDetails();
  }, [params]);

  const handleDownload = async (publicId) => {
    try {
      const response = await fetch(`/api/download/generate-signed-url/${publicId}`);
      const data = await response.json();

      if (data.success && data.url) {
        const a = document.createElement('a');
        a.href = data.url;
        a.setAttribute('download', '');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error("Failed to generate signed URL");
      }
    } catch (error) {
      console.error("Error fetching signed URL:", error);
    }
  };

  return (
    <>
      {loading ? (
        <DisplayLoad />
      ) : (
        <section className="productDisplayPage">
          {/* LEFT SIDE */}
          <div className="productDisplayPage__imagesSection">
            <div className="productDisplayPage__mainImageContainer">
              <button
                onClick={() => setIsModalOpen(true)}
                className="productDisplayPage__fullViewButton"
                title="Full View"
              >
                <RiExpandDiagonal2Fill />  
              </button>
              <div className="productDisplayPage__mainImageWrapper">
                <img src={data.image[image]} alt="product" className="productDisplayPage__mainImage" />
              </div>
            </div>

            {/* Thumbnail Slider */}
            <div className="productDisplayPage__thumbnailSliderContainer">
              <button
                onClick={() => scroll("left")}
                className="productDisplayPage__sliderNavButton productDisplayPage__sliderNavButton--left"
              >
                <FaAngleLeft size={20} />
              </button>

              <div
                ref={scrollRef}
                className="productDisplayPage__thumbnailSlider"
              >
                {data.image.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`thumb-${index}`}
                    onClick={() => setImage(index)}
                    className={`productDisplayPage__thumbnailImage ${image === index ? "productDisplayPage__thumbnailImage--active" : ""}`}
                  />
                ))}
              </div>

              <button
                onClick={() => scroll("right")}
                className="productDisplayPage__sliderNavButton productDisplayPage__sliderNavButton--right"
              >
                <FaAngleRight size={20} />
              </button>
            </div>

            {/* Description (Desktop) */}
            <div className='productDisplayPage__description'>
              <div className="productDisplayPage__userBadge">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="productDisplayPage__userAvatar"
                  />
                ) : (
                  <div className="productDisplayPage__avatarPlaceholder">
                    {user.name?.charAt(0) || "U"}
                  </div>
                )}
                <span className="productDisplayPage__userName">{user.name}</span>
              </div>
              <div>
                <p className='productDisplayPage__descriptionTitle'>Description</p>
                <p className='productDisplayPage__descriptionText'>{data.description}</p>
              </div>

              {data?.more_details && Object.keys(data?.more_details).map((element, index) => (
                <div key={index}>
                  <p className='productDisplayPage__detailTitle'>{element}</p>
                  <p className='productDisplayPage__detailText'>{data?.more_details[element]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="productDisplayPage__detailsSection">
            <h2 className="productDisplayPage__title">{data.name}</h2>

            {/* Price Display */}
            <div className="productDisplayPage__priceSection">
              <p className="productDisplayPage__priceLabel">Price</p>

              {data.price === 0 ? (
                <div className="productDisplayPage__priceContainer">
                  <div className="productDisplayPage__discountedLine">
                    <div className="productDisplayPage__discountedPrice">
                      <p>FREE</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="productDisplayPage__priceContainer">
                  <div className="productDisplayPage__discountedLine">
                    <div className="productDisplayPage__discountedPrice">
                      <p>{DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}</p>
                    </div>
                    {data.discount && (
                      <p className="productDisplayPage__discountPercentage">
                        {data.discount}% <span className="productDisplayPage__discountLabel">Discount</span>
                      </p>
                    )}
                  </div>

                  {data.discount && (
                    <p className="productDisplayPage__originalPrice">{DisplayPriceInRupees(data.price)}</p>
                  )}
                </div>
              )}
            </div>

            {/* Action Button */}
            {data.price === 0 ? (
              <button
                onClick={() => handleDownload("3DMMP-ZIP/data.zip")}
                disabled={downloading}
                className={`productDisplayPage__downloadButton ${downloading ? 'productDisplayPage__downloadButton--downloading' : ''}`}
              >
                {downloading ? (
                  <>
                    <svg className="productDisplayPage__downloadSpinner" viewBox="0 0 24 24">
                      <circle className="productDisplayPage__spinnerCircle" cx="12" cy="12" r="10" />
                      <path className="productDisplayPage__spinnerPath" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Downloading...
                  </>
                ) : (
                  <>
                    <BsDownload size={20} className="productDisplayPage__downloadIcon" />
                    Download ZIP
                  </>
                )}
              </button>
            ) : (
              <button className="productDisplayPage__addToCartButton">
                <span>Add</span>
                <span className="productDisplayPage__cartIcon">
                  <AddToCartButton data={data} />
                </span>
              </button>
            )}

            {/* Supported Formats */}
            <div className="productDisplayPage__formatsSection">
              <h3 className="productDisplayPage__sectionTitle">Supported Formats</h3>
              <p className="productDisplayPage__formatsText">{data.extension}</p>
            </div>

            <Divider />

            {/* Why Buy Section */}
            <div className="productDisplayPage__benefitsSection">
              <h2 className="productDisplayPage__sectionTitle">Why Buy from 3D Model Marketplace?</h2>
              <div className="productDisplayPage__benefitsList">
                <div className="productDisplayPage__benefitItem">
                  <img src={image2} alt="Affordable for Money" className="productDisplayPage__benefitIcon" />
                  <div className="productDisplayPage__benefitText">
                    <div className="productDisplayPage__benefitTitle">Affordable for Money</div>
                    <p className="productDisplayPage__benefitDescription">Get the best value with competitive pricing on 3D models.</p>
                  </div>
                </div>
                <div className="productDisplayPage__benefitItem">
                  <img src={image1} alt="Real 3D Rendered Previews" className="productDisplayPage__benefitIcon" />
                  <div className="productDisplayPage__benefitText">
                    <div className="productDisplayPage__benefitTitle">Real 3D Rendered Previews</div>
                    <p className="productDisplayPage__benefitDescription">See high-quality previews before purchasing.</p>
                  </div>
                </div>
                <div className="productDisplayPage__benefitItem">
                  <img src={image3} alt="Real Software Extensions Only" className="productDisplayPage__benefitIcon" />
                  <div className="productDisplayPage__benefitText">
                    <div className="productDisplayPage__benefitTitle">Real Exported Software Extensions Only</div>
                    <p className="productDisplayPage__benefitDescription">Download models that support your specific software requirements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

      {/* Similar Products */}
{similarProducts.length > 0 && (
  <div className="productDisplayPage__similarProductsSection">
    <h2 className="productDisplayPage__sectionTitle1">
      Discover Related Models
    </h2>
    <div className="productDisplayPage__similarProductsGrid">
      {similarProducts
        .filter((product) => product._id !== productId)
        .map((product) => (
          <CardProduct 
            key={product._id} 
            data={product} 
          />
        ))}
    </div>
  </div>
)}

          {/* Full Image Modal */}
          {isModalOpen && (
            <div className="productDisplayPage__imageModalWrapper">
              <button onClick={() => setIsModalOpen(false)} className="productDisplayPage__modalCloseBtn">
                <TbArrowsDiagonalMinimize size={34}/>
              </button>

              <div className="productDisplayPage__imageModalContent productDisplayPage__imageModalContent--horizontalLayout">
                <button
                  className="productDisplayPage__modalArrow productDisplayPage__modalArrow--left"
                  onClick={() => setImage((prev) => (prev > 0 ? prev - 1 : prev))}
                  disabled={image === 0}
                >
                  <FaAngleLeft size={24} />
                </button>

                <div className="productDisplayPage__imageModalMain">
                  <img src={data.image[image]} alt="fullscreen view" className="productDisplayPage__mainImage productDisplayPage__mainImage--fullsize" />
                </div>

                <button
                  className="productDisplayPage__modalArrow productDisplayPage__modalArrow--right"
                  onClick={() => setImage((prev) => (prev < data.image.length - 1 ? prev + 1 : prev))}
                  disabled={image === data.image.length - 1}
                >
                  <FaAngleRight size={24} />
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default ProductDisplayPage;


  //        {/* Full Image Modal */}
  //         {isModalOpen && (
          
  //             <div className="image-modal-wrapper">
  //     {/* Close Button */}
  //     <button
  //       onClick={() => setIsModalOpen(false)}
  //       className="modal-close-btn"
  //     >
  //       &times;
  //     </button>

  //     {/* Modal Content */}
  //     <div className="image-modal-content">
  //       {/* Thumbnails */}
  //       <div className="image-modal-thumbnails no-scrollbar">
  //         {data.image.map((img, index) => (
  //           <img
  //             key={img + index}
  //             src={img}
  //             alt="thumbnail"
  //             onClick={(e) => {
  //               setImage(index);
  //               e.target.scrollIntoView({
  //                 behavior: 'smooth',
  //                 block: 'center',
  //               });
  //             }}
  //             className={`thumbnail-img ${image === index ? 'active-thumbnail' : ''}`}
  //           />
  //         ))}
  //       </div>

  //       {/* Main Image */}
  //       <div className="image-modal-main">
  //         <img
  //           src={data.image[image]}
  //           alt="fullscreen view"
  //           className="main-image"
  //         />
  //       </div>
  //     </div>
  //   </div>
  // )}