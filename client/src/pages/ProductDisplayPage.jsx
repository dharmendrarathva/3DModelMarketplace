import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/Image1.png'
import image2 from '../assets/Image2.png'
import image3 from '../assets/image3.png'
import AddToCartButton from '../components/AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import { valideURLConvert } from '../utils/valideURLConvert';
import { useGlobalContext } from '../provider/GlobalProvider';
import { BsDownload } from 'react-icons/bs';
import toast from 'react-hot-toast';

const ProductDisplayPage = () => {
  const params = useParams()
  const [downloading, setDownloading] = useState(false);

  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data,setData] = useState({
    name : "",
    image : []
  })
  const [image,setImage] = useState(0)
  const [loading,setLoading] = useState(false)
  const imageContainer = useRef()

  const fetchProductDetails = async()=>{
    try {
        const response = await Axios({
          ...SummaryApi.getProductDetails,
          data : {
            productId : productId 
          }
        })

        const { data : responseData } = response

        if(responseData.success){
          setData(responseData.data)
        }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProductDetails()
  },[params])
  
  const handleScrollRight = ()=>{
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = ()=>{
    imageContainer.current.scrollLeft -= 100
  }

   const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
    const { fetchCartItem } = useGlobalContext();
  
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
    
        
        setTimeout(() => {
          setDownloading(false);
        }, 1000);
      } catch (error) {
        console.error('Download error:', error);
        toast.error('Failed to download file');
        setDownloading(false);
      }
    }
    
    
  console.log("product data",data)
  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
        <div className=''>
            <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
                <img
                    src={data.image[image]}
                    className='w-full h-full object-scale-down'
                /> 
            </div>
            <div className='flex items-center justify-center gap-3 my-2'>
              {
                data.image.map((img,index)=>{
                  return(
                    <div key={img+index+"point"} className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-300"}`}></div>
                  )
                })
              }
            </div>
            <div className='grid relative'>
                <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
                      {
                        data.image.map((img,index)=>{
                          return(
                            <div className='w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md' key={img+index}>
                              <img
                                  src={img}
                                  alt='min-product'
                                  onClick={()=>setImage(index)}
                                  className='w-full h-full object-scale-down' 
                              />
                            </div>
                          )
                        })
                      }
                </div>
                <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute  items-center'>
                    <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
                        <FaAngleLeft/>
                    </button>
                    <button onClick={handleScrollRight} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
                        <FaAngleRight/>
                    </button>
                </div>
            </div>
            <div>
            </div>

            <div className='my-4  hidden lg:grid gap-3 '>
                <div>
                    <p className='font-semibold'>Description</p>
                    <p className='text-base'>{data.description}</p>
                </div>
                <div>
                    <p className='font-semibold'>Made In Extention</p>
                    <p className='text-base'>{data.extension}</p>
                </div>
                {
                  data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                    return(
                      <div>
                          <p className='font-semibold'>{element}</p>
                          <p className='text-base'>{data?.more_details[element]}</p>
                      </div>
                    )
                  })
                }
            </div>
        </div>


        <div className='p-4 lg:pl-7 text-base lg:text-lg'>
            <p className='bg-green-300 w-fit px-2 rounded-full'>Purchase Now</p>
            <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>  
            <p className=''>{data.extension}</p> 
            <Divider/>
            <div>
  <p className=''>Price</p> 
  <div className='flex items-center gap-2 lg:gap-4'>
    <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
      <p className='font-semibold text-lg lg:text-xl'>
        {data.price === 0 ? "FREE" : DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
      </p>
    </div>
    {
      data.discount && data.price !== 0 && (
        <>
          <p className='line-through'>{DisplayPriceInRupees(data.price)}</p>
          <p className="font-bold text-green-600 lg:text-2xl">{data.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
        </>
      )
    }
  </div>
</div>

              
              
            {
  data.price === 0 ? (
    <button
    onClick={handleDownload}
    disabled={downloading}
    className={`my-7 flex items-center justify-center px-4 py-2 rounded-md text-base transition ${
      downloading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
    }`}
  >
    {
      downloading ? (
        <>
          <svg className="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Downloading...
        </>
      ) : (
        <>
          <BsDownload size={20} className="mr-2" />
          Download
        </>
      )
    }
  </button>
  

  ) : (
    <button className='my-7 px-2 text-white rounded'>
      <AddToCartButton data={data} />
    </button>
  )
}


           <h2 className='font-semibold'>Why Buy from 3D Model Marketplace?</h2>
            <div>
                <div className='flex items-center gap-4 my-4'>
                    <img src={image2} alt='Affordable for Money' className='w-20 h-20' />
                    <div className='text-sm'>
                        <div className='font-semibold'>Affordable for Money</div>
                        <p>Get the best value with competitive pricing on 3D models.</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 my-4'>
                    <img src={image1} alt='Real 3D Rendered Previews' className='w-20 h-20' />
                    <div className='text-sm'>
                        <div className='font-semibold'>Real 3D Rendered Previews</div>
                        <p>See high-quality previews before purchasing.</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 my-4'>
                    <img src={image3} alt='Real Software Extensions Only' className='w-20 h-20' />
                    <div className='text-sm'>
                        <div className='font-semibold'>Real Exported Software Extensions Only</div>
                        <p>Download models that support your specific software requirements.</p>
                    </div>
                </div>
            </div>
        
            {/****only mobile */}
            <div className='my-4 grid gap-3 '>
                <div>
                    <p className='font-semibold'>Description</p>
                    <p className='text-base'>{data.description}</p>
                </div>
                <div>
                    <p className='font-semibold'>Made In Extension</p>
                    <p className='text-base'>{data.extension}</p>
                </div>
                {
                  data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                    return(
                      <div>
                          <p className='font-semibold'>{element}</p>
                          <p className='text-base'>{data?.more_details[element]}</p>
                      </div>
                    )
                  })
                }
            </div>
        </div>
    </section>
  )
}




export default ProductDisplayPage





















{/* {
                data.stock === 0 ? (
                  <p className='text-lg text-red-500 my-2'>Out of Stock</p>
                ) 
                : ( */}
                // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'> <AddToCartButton data={data}/> </button>
                   
                
                {/* 
                                )
                              }
                            */}